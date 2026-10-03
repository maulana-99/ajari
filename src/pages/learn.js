import { createEditor } from '../editor/editor.js';
import { createConsole } from '../editor/console.js';
import { runWorker, buildPreview } from '../runtime/runner.js';

const store = {
  get(k, d) {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
};

const errorTips = [
  [/not defined/i, 'Nama itu belum dibuat atau salah ketik. Ingat, huruf besar dan kecil dianggap berbeda.'],
  [/constant/i, 'Variabel <code>const</code> tidak bisa diisi ulang. Gunakan <code>let</code> jika nilainya perlu berubah.'],
  [/is not a function/i, 'Kamu memanggil sesuatu dengan tanda kurung <code>()</code>, padahal itu bukan fungsi. Cek ejaan namanya.'],
  [
    /cannot read propert|cannot set propert|of null/i,
    'Kamu mengakses isi dari sesuatu yang kosong (<code>undefined</code> atau <code>null</code>). Jika memakai <code>querySelector</code>, pastikan selector-nya cocok dengan elemen di HTML.',
  ],
  [
    /unexpected|syntax|missing|invalid/i,
    'Ada penulisan yang kurang pas. Periksa tanda kurung, kurung kurawal, kutip, dan koma: apakah semuanya berpasangan?',
  ],
  [/terlalu lama|tidak selesai/i, 'Perulangan sepertinya tidak pernah berhenti. Pastikan ada sesuatu yang membuat syaratnya suatu saat jadi salah.'],
];

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
const JS_FILE = 'belajar.js';
const fileOrder = ['index.html', 'style.css', 'script.js'];

/**
 * Teacher-style course page. cfg = { prefix, name, lessons, projects?, explain?, hints?, web? }.
 * JS courses run one file in a Worker and check console output in this page.
 * Web courses (web: true) edit index.html/style.css/script.js, render them in a sandboxed iframe,
 * and run each step's check *inside* that iframe (the function source is injected), so checks can inspect the DOM.
 */
export function mount(root, cfg) {
  const { prefix: P, web } = cfg;
  const projects = cfg.projects ?? [];
  const explain = cfg.explain ?? {};
  const hints = cfg.hints ?? {};
  const lessons = [...cfg.lessons, ...projects];
  const courseKeys = cfg.lessons.flatMap((L, li) => L.steps.map((_, si) => `${li}-${si}`));

  root.innerHTML = `
  <div class="learn${web ? ' web' : ''}">
    <section class="pane left">
      <div class="pane-bar">
        <div class="ftabs" role="tablist" aria-label="File"></div>
        <button type="button" class="problems" data-act="problems" title="Masalah di kode (arahkan kursor ke garis bergelombang untuk penjelasan)"><span class="pe">&#8855; 0</span> <span class="pw">&#9888; 0</span></button>
        <span class="spacer"></span>
        <button type="button" class="ghost" data-act="reset" title="Kembalikan kode awal langkah ini">Kode awal</button>
        <button type="button" class="primary" data-act="run" title="Ctrl+Enter">&#9654; Jalankan</button>
      </div>
      <div class="editor-host"></div>
      ${
        web
          ? `<div class="ws-bottom lw-bottom">
        <div class="b-tabs" role="tablist">
          <button type="button" role="tab" data-tab="preview" class="on">Preview</button>
          <button type="button" role="tab" data-tab="console">Console <span class="badge con-badge" hidden></span></button>
        </div>
        <iframe class="preview lw-preview" title="Preview halaman" sandbox="allow-scripts allow-modals allow-forms"></iframe>
        <div class="console-host" hidden></div>
      </div>`
          : '<div class="console-host"></div>'
      }
    </section>
    <aside class="pane right teacher">
      <div class="t-head">
        <button type="button" class="ghost" data-act="menu" aria-haspopup="dialog">&#9776; Pelajaran</button>
        <div class="t-title"><small></small><strong></strong></div>
      </div>
      <div class="progress" role="progressbar" aria-label="Kemajuan pelajaran"><i></i></div>
      <div class="t-body" tabindex="0"></div>
      <div class="t-nav">
        <button type="button" class="ghost" data-act="prev">&larr; Sebelumnya</button>
        <span class="t-count"></span>
        <button type="button" class="primary" data-act="next">Lanjut &rarr;</button>
      </div>
    </aside>
    <div class="overlay" hidden><div class="menu" role="dialog" aria-label="Daftar pelajaran"></div></div>
  </div>`;

  const $ = (s) => root.querySelector(s);
  const body = $('.t-body');
  const overlay = $('.overlay');
  const frame = $('.lw-preview');
  const pos = store.get(P + 'pos', { l: 0, s: 0 });
  if (!lessons[pos.l]?.steps[pos.s]) Object.assign(pos, { l: 0, s: 0 });
  const done = new Set(store.get(P + 'done', []));
  let hintIdx = 0;
  let runner;
  let cancelWeb;
  let loading = false;
  let dead = false;
  let problems = [];
  let files = {};
  let active = '';

  const key = () => `${pos.l}-${pos.s}`;
  const courseDone = () => courseKeys.every((k) => done.has(k));
  const isLocked = (l = pos.l) => lessons[l].project && !courseDone() && !store.get(P + 'unlock', false);
  const step = () => lessons[pos.l].steps[pos.s];

  // JS steps store a single string (kept for saved progress compatibility); web steps store a files object.
  const asFiles = (x) => (x == null ? null : typeof x === 'string' ? { [JS_FILE]: x } : x);
  const starter = (S) => asFiles(web ? S.files : (S.code ?? ''));
  const same = (a, b) => Object.keys({ ...a, ...b }).every((k) => (a[k] ?? '').trim() === (b[k] ?? '').trim());
  const save = () => !loading && !isLocked() && store.set(P + 'code.' + key(), web ? files : files[JS_FILE]);

  const con = createConsole($('.console-host'), 'Output', { badge: $('.con-badge') });
  const ed = createEditor($('.editor-host'), {
    name: web ? 'index.html' : JS_FILE,
    onRun: run,
    onChange: (t) => {
      if (loading || !(active in files)) return;
      files[active] = t;
      save();
    },
    onDiagnostics: (ds) => {
      problems = ds;
      const e = ds.filter((d) => d.severity === 'error').length;
      $('.problems .pe').textContent = '⊗ ' + e;
      $('.problems .pw').textContent = '⚠ ' + (ds.length - e);
      $('.problems').classList.toggle('has-err', e > 0);
    },
  });

  function renderTabs() {
    const box = $('.ftabs');
    box.innerHTML = '';
    for (const name of Object.keys(files)) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(name === active));
      b.className = 'ftab' + (name === active ? ' on' : '');
      b.textContent = name;
      b.onclick = () => openFile(name);
      box.append(b);
    }
  }

  function openFile(name) {
    active = name;
    const was = loading;
    loading = true;
    ed.set(files[name], name);
    loading = was;
    renderTabs();
  }

  function setFiles(next) {
    const order = (a) => fileOrder.indexOf(a) + 1 || 99;
    files = Object.fromEntries(Object.entries(next).sort(([a], [b]) => order(a) - order(b)));
    openFile(active in files ? active : Object.keys(files)[0]);
    save();
  }

  function showTab(name) {
    if (!web) return;
    root.querySelectorAll('.b-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === name));
    $('.console-host').hidden = name !== 'console';
    if (name === 'console') con.seen();
    frame.hidden = name !== 'preview';
  }

  function bubble(html, cls = '') {
    const d = document.createElement('div');
    d.className = 'bubble ' + cls;
    d.innerHTML = html;
    return d;
  }

  function deepDive(X) {
    const d = document.createElement('details');
    d.className = 'bubble deep';
    d.open = true;
    d.innerHTML = `<summary>Penjelasan detail</summary>
      <h3>Bedah kode: fungsi tiap baris</h3><div class="lines"></div>
      ${X.flow ? `<h3>${web ? 'Apa yang terjadi' : 'Alur eksekusi: urutan yang dijalankan'}</h3><ol>${X.flow.map((f) => `<li>${f}</li>`).join('')}</ol>` : ''}
      ${X.result ? `<h3>Kenapa hasilnya begini?</h3><p>${X.result}</p>` : ''}`;
    const box = d.querySelector('.lines');
    for (const [code, why] of X.lines) {
      const row = document.createElement('div');
      row.className = 'ln';
      row.innerHTML = '<pre></pre><p></p>';
      row.querySelector('pre').textContent = code;
      row.querySelector('p').innerHTML = why;
      box.append(row);
    }
    return d;
  }

  function updateProgress() {
    const total = lessons.reduce((n, l) => n + l.steps.length, 0);
    const pct = (done.size / total) * 100;
    $('.progress i').style.width = pct + '%';
    $('.progress').setAttribute('aria-valuenow', Math.round(pct));
  }

  function render() {
    const L = lessons[pos.l];
    const S = step();
    store.set(P + 'pos', pos);
    hintIdx = 0;
    $('.t-title small').textContent = L.project
      ? `Mini Project ${pos.l - cfg.lessons.length + 1} dari ${projects.length}`
      : `${cfg.name} · Pelajaran ${pos.l + 1} dari ${cfg.lessons.length}`;
    $('.t-title strong').textContent = L.title;
    $('.t-count').textContent = `Langkah ${pos.s + 1}/${L.steps.length}`;
    updateProgress();
    $('[data-act=prev]').disabled = pos.l === 0 && pos.s === 0;
    $('[data-act=next]').disabled = pos.l === lessons.length - 1 && pos.s === L.steps.length - 1;
    if (web) {
      cancelWeb?.();
      frame.srcdoc = '';
      showTab('preview');
    }
    con.clear();

    body.innerHTML = '';
    if (isLocked()) return renderLock();
    const h = document.createElement('h2');
    h.textContent = S.title;
    body.append(h);
    if (pos.s === 0) body.append(bubble(`<p><i>${L.intro}</i></p>`, 'intro'));
    if (S.body) body.append(bubble(S.body));
    const X = S.deep ?? explain[S.title];
    if (X?.lines) body.append(deepDive(X));
    if (S.task) body.append(bubble(`<h3>${L.project ? 'Tugas langkah ini' : 'Tugas kecil'}</h3><p>${S.task}</p>`, 'task'));
    if (S.task) {
      const tools = document.createElement('div');
      tools.className = 'tools';
      tools.innerHTML = `<button type="button" class="ghost" data-act="hint">Beri petunjuk</button><button type="button" class="ghost" data-act="solution">Lihat contoh jawaban</button>`;
      body.append(tools);
    }
    const fb = document.createElement('div');
    fb.className = 'feedback';
    fb.setAttribute('aria-live', 'polite');
    body.append(fb);
    body.scrollTop = 0;

    active = '';
    loading = true;
    setFiles(asFiles(store.get(P + 'code.' + key(), null)) ?? starter(S));
    loading = false;
    document.title = `${S.title} - ${cfg.name}`;
  }

  function renderLock() {
    const left = courseKeys.filter((k) => !done.has(k));
    const h = document.createElement('h2');
    h.textContent = 'Mini project masih terkunci';
    body.append(h);
    body.append(
      bubble(`<p>Mini project adalah tempat kamu <b>menggabungkan</b> semua yang sudah dipelajari menjadi program utuh. Supaya tidak kewalahan, selesaikan dulu semua langkah pelajaran.</p>
<p>Kemajuanmu: <b>${courseKeys.length - left.length} dari ${courseKeys.length}</b> langkah selesai. Langkah yang belum:</p><div class="tools left-steps"></div>
<p><button type="button" class="primary" data-act="goto-undone">Lanjutkan pelajaran yang belum selesai</button></p>
<p class="muted">Sudah yakin dengan dasarnya? <button type="button" class="ghost" data-act="unlock">Tetap buka mini project</button></p>`),
    );
    const box = body.querySelector('.left-steps');
    for (const k of left.slice(0, 8)) {
      const [li, si] = k.split('-').map(Number);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'm-step';
      b.textContent = `${li + 1}. ${cfg.lessons[li].steps[si].title}`;
      b.onclick = () => go(li, si);
      box.append(b);
    }
    if (left.length > 8) box.insertAdjacentHTML('beforeend', `<span class="muted">dan ${left.length - 8} lainnya</span>`);
    loading = true;
    active = '';
    setFiles({ [JS_FILE]: '// Mini project terkunci.\n// Selesaikan semua pelajaran dulu, lalu kembali ke sini.\n' });
    loading = false;
  }

  function feedback(html, cls) {
    const fb = $('.feedback');
    if (!fb) return;
    fb.innerHTML = '';
    fb.append(bubble(html, cls));
    fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // Returns true when this call completed the whole course (unlocking the mini projects).
  function markDone() {
    const before = courseDone();
    done.add(key());
    store.set(P + 'done', [...done]);
    updateProgress();
    return projects.length > 0 && !before && courseDone();
  }

  const unlockNote = () =>
    $('.feedback').append(
      bubble(
        `<p><b>Semua pelajaran selesai!</b> ${projects.length} mini project sekarang terbuka: ${projects.map((p) => p.title.replace(/^Mini Project \d+: /, '')).join(', ')}.</p><p><button type="button" class="primary" data-act="start-projects">Mulai Mini Project</button></p>`,
        'ok',
      ),
    );

  // Renders the files in the preview iframe and runs the step check inside it.
  // Resolves { logs, error, res }; res is undefined when a newer run cancelled this one.
  function runWeb(S) {
    cancelWeb?.();
    return new Promise((resolve) => {
      const logs = [];
      let error = null;
      const onMsg = (e) => {
        if (e.source !== frame.contentWindow || !e.data) return;
        const m = e.data;
        if (m.t === 'log') {
          logs.push(m.s);
          con.log(m.l, m.s);
        } else if (m.t === 'err') {
          error ??= m.s;
          con.log('error', m.s);
        } else if (m.t === 'check') finish(m.r);
      };
      const finish = (r) => {
        clearTimeout(timer);
        removeEventListener('message', onMsg);
        cancelWeb = null;
        resolve({ logs, error, res: r });
      };
      const timer = setTimeout(() => {
        error ??= 'Halaman tidak selesai dimuat. Mungkin ada perulangan yang tidak pernah berhenti?';
        finish(null);
      }, 5000);
      cancelWeb = () => finish(undefined);
      addEventListener('message', onMsg);
      try {
        frame.srcdoc = buildPreview(files, 'index.html', { check: S.check ? String(S.check) : null, notifyLoad: true });
      } catch (e) {
        error = e.message;
        con.log('error', e.message);
        finish(null);
      }
    });
  }

  // Runs the current files and evaluates the step check. Resolves { logs, error, res }, res = true | string | null.
  async function execute(S, { silent = false } = {}) {
    if (web) {
      if (!files['index.html']) return { logs: [], error: 'File index.html tidak ada.', res: null };
      return runWeb(S);
    }
    const code = files[JS_FILE];
    const r = runWorker({ 'main.js': code }, 'main.js', {
      onEvent: silent
        ? undefined
        : (e) => {
            if (e.t === 'log') con.log(e.l, e.s);
            if (e.t === 'err') con.log('error', e.s);
          },
    });
    if (!silent) runner = r;
    const ctx = { code, ...(await r.finished) };
    return { ...ctx, res: S.check && !ctx.error ? S.check(ctx) : null };
  }

  const errorHtml = (error) => {
    const lp = problems.find((d) => d.severity === 'error');
    if (lp)
      return `<p><b>Ups, ada error di ${web ? `${active} ` : ''}baris ${lp.line}</b> (lihat garis merah bergelombang): <code>${esc(lp.message)}</code></p><p><b>Penyebab:</b> ${lp.cause}</p><p><b>Perbaikan:</b> ${lp.fix}</p>`;
    const tip = errorTips.find(([re]) => re.test(error))?.[1] ?? 'Baca pesan error di output, biasanya menyebut apa yang bermasalah.';
    return `<p><b>Ups, ada error:</b> <code>${esc(error)}</code></p><p>${tip}</p>`;
  };

  async function run() {
    if (isLocked()) return;
    runner?.stop();
    con.clear();
    const S = step();
    const btn = $('[data-act=run]');
    btn.disabled = true;
    if (web) showTab('preview');
    const ctx = await execute(S);
    btn.disabled = false;
    if (dead || step() !== S || ctx.res === undefined) return;
    if (ctx.error) return feedback(errorHtml(ctx.error) + '<p>Tenang, error itu normal dan bagian dari belajar. Perbaiki lalu jalankan lagi.</p>', 'warn');
    if (S.check) {
      if (ctx.res === true) {
        const unlocked = markDone();
        feedback(`<p><b>Berhasil!</b> ${S.done ?? ''}</p>`, 'ok');
        if (unlocked) unlockNote();
        return;
      }
      if (!web && !ctx.logs.length)
        return feedback('<p>Kodenya jalan, tapi belum ada yang tercetak. Gunakan <code>console.log(...)</code> untuk menampilkan hasil.</p>', 'warn');
      return feedback(
        `<p><b>Hampir!</b> ${ctx.res}</p><p>Butuh bantuan? Tekan <i>Beri petunjuk</i>. Petunjuk dibuka bertahap, dari pengingat konsep sampai kerangka kode.</p>`,
        'warn',
      );
    }
    const unlocked = markDone();
    feedback(S.after ?? '<p>Bagus! Coba ubah kodenya dan jalankan lagi.</p>', 'ok');
    if (unlocked) unlockNote();
  }

  const hintsFor = (S) => hints[S.title] ?? { hints: S.hints ?? [], skeleton: S.skeleton };
  const levelNames = ['Ingat konsepnya', 'Langkah berikutnya', 'Lebih spesifik', 'Hampir jadi'];

  // What the teacher "sees" in the current code: unchanged starter, blanks, lint errors, runtime errors, or check result.
  async function diagnose(S) {
    if (same(files, starter(S)))
      return 'Kodemu masih sama seperti kode awal. Mulai dari petunjuk pertama di bawah, ubah sedikit demi sedikit, lalu tekan <b>Jalankan</b>.';
    const blank = Object.keys(files).find((f) => files[f].includes('___'));
    if (blank)
      return `Masih ada bagian <code>___</code> yang belum diisi${web ? ` di <b>${blank}</b>` : ''}. Ganti setiap <code>___</code> dengan jawabanmu.`;
    const lp = problems.find((d) => d.severity === 'error');
    if (lp) return `Ada error di <b>${web ? active + ' ' : ''}baris ${lp.line}</b> (garis merah): ${lp.cause} ${lp.fix}`;
    const r = await execute(S, { silent: true });
    if (r.res === undefined) return '';
    if (r.error) {
      const tip = errorTips.find(([re]) => re.test(r.error))?.[1] ?? '';
      return `Saat dijalankan muncul error <code>${esc(r.error)}</code>. ${tip}`;
    }
    if (!S.check) return 'Kodemu berjalan tanpa error.';
    if (r.res === true) return 'Kodemu sebenarnya sudah benar! Tekan <b>Jalankan</b> untuk menyelesaikan langkah ini.';
    if (web) return r.res;
    if (!r.logs.length) return 'Kodemu berjalan, tapi belum mencetak apa pun. Hasil hanya terlihat jika memakai <code>console.log(...)</code>.';
    return /Hasil saat ini/.test(r.res) ? r.res : `${r.res}<br>Output kodemu sekarang: <code>${esc(r.logs.join(' | ').slice(0, 200))}</code>`;
  }

  // Shows code (string or files object) as one <pre> per file, filled via textContent.
  function codeBlocks(container, code) {
    const f = asFiles(code);
    for (const [name, text] of Object.entries(f)) {
      if (Object.keys(f).length > 1) container.insertAdjacentHTML('beforeend', `<div class="fname">${esc(name)}</div>`);
      const pre = document.createElement('pre');
      pre.textContent = text;
      container.append(pre);
    }
  }

  async function showHints(advance) {
    const S = step();
    const H = hintsFor(S);
    const levels = [...H.hints, ...(H.skeleton ? [null] : [])];
    if (advance) hintIdx = Math.min(hintIdx + 1, levels.length);
    const diag = await diagnose(S);
    if (dead || step() !== S) return;
    const items = levels
      .slice(0, hintIdx)
      .map((h, i) =>
        h === null
          ? `<li class="skel"><span class="lvl">Petunjuk ${i + 1} · Kerangka kode</span><p>Isi setiap <code>___</code> dengan jawabanmu.</p><div class="code"></div><button type="button" class="ghost" data-act="skeleton">Pakai kerangka di editor</button></li>`
          : `<li><span class="lvl">Petunjuk ${i + 1} · ${levelNames[Math.min(i, levelNames.length - 1)]}</span><p>${h}</p></li>`,
      )
      .join('');
    const more =
      hintIdx < levels.length
        ? `<button type="button" class="primary" data-act="hint">Petunjuk berikutnya (${hintIdx + 1}/${levels.length})</button>`
        : '<p class="muted">Semua petunjuk sudah dibuka. Masih buntu? Tidak apa-apa, tekan <i>Lihat contoh jawaban</i> lalu pelajari kenapa jawabannya begitu.</p>';
    feedback(
      `<h3>Yang guru lihat dari kodemu</h3><p>${diag}</p>${levels.length ? `<h3>Petunjuk</h3><ol class="hint-steps">${items}</ol>` : ''}${more}`,
      'hint',
    );
    const box = $('.feedback .skel .code');
    if (box) codeBlocks(box, H.skeleton);
    $('.feedback .hint-steps li:last-child')?.classList.add('new');
  }

  function go(l, s) {
    runner?.stop();
    pos.l = l;
    pos.s = s;
    render();
  }

  const next = () => {
    const L = lessons[pos.l];
    if (pos.s < L.steps.length - 1) go(pos.l, pos.s + 1);
    else if (pos.l < lessons.length - 1) go(pos.l + 1, 0);
  };
  const prev = () => {
    if (pos.s > 0) go(pos.l, pos.s - 1);
    else if (pos.l > 0) go(pos.l - 1, lessons[pos.l - 1].steps.length - 1);
  };

  function openMenu() {
    const m = $('.menu');
    m.innerHTML = `<h2>Daftar pelajaran: ${esc(cfg.name)}</h2>`;
    lessons.forEach((L, li) => {
      if (li === cfg.lessons.length)
        m.insertAdjacentHTML(
          'beforeend',
          `<h2 class="m-sep">Mini Project ${isLocked(li) ? '<small>(terkunci, selesaikan semua pelajaran dulu)</small>' : ''}</h2>`,
        );
      const d = document.createElement('div');
      d.className = 'm-lesson';
      d.innerHTML = `<h3>${li + 1}. ${L.title}</h3>`;
      const row = document.createElement('div');
      L.steps.forEach((S, si) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'm-step' + (done.has(`${li}-${si}`) ? ' done' : '') + (li === pos.l && si === pos.s ? ' cur' : '');
        b.textContent = S.title;
        b.onclick = () => {
          overlay.hidden = true;
          go(li, si);
        };
        row.append(b);
      });
      d.append(row);
      m.append(d);
    });
    const r = document.createElement('button');
    r.type = 'button';
    r.className = 'ghost';
    r.textContent = 'Hapus semua kemajuan course ini';
    r.onclick = () => {
      if (!confirm('Hapus semua kemajuan dan kode yang tersimpan di course ini?')) return;
      Object.keys(localStorage)
        .filter((k) => k.startsWith(P))
        .forEach((k) => localStorage.removeItem(k));
      done.clear();
      overlay.hidden = true;
      go(0, 0);
    };
    m.append(r);
    overlay.hidden = false;
    m.querySelector('.cur')?.scrollIntoView({ block: 'center' });
  }

  function replaceFiles(next, msg) {
    if (!same(files, starter(step())) && !confirm(msg)) return;
    setFiles(asFiles(next));
    ed.focus();
  }

  root.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    const tab = e.target.closest('[data-tab]')?.dataset.tab;
    if (tab) showTab(tab);
    if (e.target === overlay) overlay.hidden = true;
    if (!act) return;
    const S = step();
    if (act === 'run') run();
    else if (act === 'problems') {
      const d = problems.find((x) => x.severity === 'error') ?? problems[0];
      if (d) ed.goto(d.from);
    } else if (act === 'next') next();
    else if (act === 'prev') prev();
    else if (act === 'menu') openMenu();
    else if (act === 'reset') !isLocked() && setFiles(starter(S));
    else if (act === 'start-projects') go(cfg.lessons.length, 0);
    else if (act === 'unlock') {
      store.set(P + 'unlock', true);
      render();
    } else if (act === 'goto-undone') {
      const k = courseKeys.find((x) => !done.has(x));
      if (k) go(...k.split('-').map(Number));
    } else if (act === 'hint') showHints(true);
    else if (act === 'skeleton') replaceFiles(hintsFor(S).skeleton, 'Ganti kode di editor dengan kerangka? Kodemu sekarang akan ditimpa.');
    else if (act === 'solution') {
      feedback(
        `<p>Ini salah satu contoh jawaban. Pelajari dulu, lalu coba tulis dengan caramu sendiri:</p><div class="code"></div><button type="button" class="ghost" data-act="use">Pakai di editor</button>`,
        'hint',
      );
      codeBlocks($('.feedback .code'), S.solution);
      const why = S.solWhy ?? explain[S.title]?.solWhy;
      if (why) $('.feedback').firstChild.insertAdjacentHTML('beforeend', `<p><b>Kenapa jawaban ini benar?</b> ${why}</p>`);
    } else if (act === 'use') replaceFiles(S.solution, 'Ganti kode di editor dengan contoh jawaban? Kodemu sekarang akan ditimpa.');
  });
  const onKey = (e) => e.key === 'Escape' && (overlay.hidden = true);
  document.addEventListener('keydown', onKey);

  render();
  return () => {
    dead = true;
    runner?.stop();
    cancelWeb?.();
    ed.destroy();
    document.removeEventListener('keydown', onKey);
  };
}
