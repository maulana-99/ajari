import { createEditor } from '../editor/editor.js';
import { createConsole } from '../editor/console.js';
import { runWorker, buildPreview } from '../runtime/runner.js';

const KEY = 'ws.project';

const sample = {
  'index.html': `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <title>Proyek Mini</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 id="judul">Halo!</h1>
  <button id="tombol">Klik aku</button>
  <script type="module" src="script.js"></script>
</body>
</html>
`,
  'style.css': `body { font-family: sans-serif; text-align: center; padding: 2rem; }
button { font-size: 1rem; padding: .5rem 1rem; }
`,
  'script.js': `import { sapa } from './utils.js';

const judul = document.querySelector('#judul');
let hitung = 0;

document.querySelector('#tombol').addEventListener('click', () => {
  hitung++;
  judul.textContent = sapa('dunia') + ' x' + hitung;
  console.log('Diklik', hitung, 'kali');
});
`,
  'utils.js': `export const sapa = (nama) => \`Halo, \${nama}!\`;
`,
};

const blank = { 'main.js': '// Tulis kodemu di sini lalu tekan Jalankan (Ctrl+Enter)\nconsole.log("Halo dari workspace!");\n' };

function load() {
  try {
    const p = JSON.parse(localStorage.getItem(KEY));
    if (p?.files && Object.keys(p.files).length) return p;
  } catch {}
  return { files: { ...blank }, open: ['main.js'], active: 'main.js' };
}

const validName = (n) => /^[\w\-][\w.\-/]*$/.test(n) && !n.endsWith('/') && !n.includes('..');
const ext = (n) => n.split('.').pop();
const icons = { js: 'JS', mjs: 'JS', html: '<>', css: '#', json: '{}' };

export function mount(root) {
  document.title = 'Workspace - Ajari';
  root.innerHTML = `
  <div class="ws">
    <aside class="explorer">
      <div class="ex-head"><span>FILE</span>
        <span>
          <button type="button" data-act="new" title="File baru" aria-label="File baru">+</button>
          <button type="button" data-act="sample" title="Muat proyek contoh HTML + JS" aria-label="Muat proyek contoh">&#9733;</button>
        </span>
      </div>
      <ul class="ex-list"></ul>
    </aside>
    <section class="ws-main">
      <div class="tabbar"><div class="tabs"></div>
        <button type="button" class="ghost" data-act="stop" hidden>&#9632; Stop</button>
        <button type="button" class="primary" data-act="run" title="Ctrl+Enter">&#9654; Jalankan</button>
      </div>
      <div class="editor-host"></div>
      <div class="ws-bottom">
        <div class="b-tabs" role="tablist">
          <button type="button" role="tab" data-tab="console" class="on">Console</button>
          <button type="button" role="tab" data-tab="problems">Problems <span class="badge" hidden></span></button>
          <button type="button" role="tab" data-tab="preview">Preview</button>
        </div>
        <div class="console-host"></div>
        <ul class="problem-list" hidden></ul>
        <iframe class="preview" title="Preview" sandbox="allow-scripts allow-modals allow-forms" hidden></iframe>
      </div>
    </section>
  </div>`;

  const $ = (s) => root.querySelector(s);
  const state = load();
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  };
  const con = createConsole($('.console-host'), 'Console');
  const frame = $('.preview');
  let runner;
  let loading = false;

  const ed = createEditor($('.editor-host'), {
    doc: state.files[state.active] ?? '',
    name: state.active,
    onRun: run,
    onDiagnostics: renderProblems,
    onChange: (t) => {
      if (loading || !(state.active in state.files)) return;
      state.files[state.active] = t;
      save();
    },
  });

  function showTab(name) {
    root.querySelectorAll('.b-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === name));
    $('.console-host').hidden = name !== 'console';
    $('.problem-list').hidden = name !== 'problems';
    frame.hidden = name !== 'preview';
  }

  function renderProblems(ds) {
    const list = $('.problem-list');
    const badge = $('.badge');
    list.innerHTML = ds.length ? '' : '<li class="none">Tidak ada masalah di file ini.</li>';
    badge.hidden = !ds.length;
    badge.textContent = ds.length;
    badge.classList.toggle('err', ds.some((d) => d.severity === 'error'));
    for (const d of ds) {
      const li = document.createElement('li');
      li.innerHTML = `<button type="button"><i></i><span class="pm"></span><small></small><div class="pc"></div></button>`;
      li.querySelector('i').className = d.severity;
      li.querySelector('i').textContent = d.severity === 'error' ? '\u2297' : '\u26A0';
      li.querySelector('.pm').textContent = d.message;
      li.querySelector('small').textContent = ` ${d.src} [Ln ${d.line}]`;
      li.querySelector('.pc').innerHTML = d.cause ? `${d.cause} ${d.fix}` : '';
      li.querySelector('button').onclick = () => ed.goto(d.from);
      list.append(li);
    }
  }

  function openFile(name) {
    if (!state.open.includes(name)) state.open.push(name);
    state.active = name;
    loading = true;
    ed.set(state.files[name], name);
    loading = false;
    renderAll();
    ed.focus();
  }

  function closeTab(name) {
    const i = state.open.indexOf(name);
    state.open.splice(i, 1);
    if (state.active === name) {
      const n = state.open[Math.min(i, state.open.length - 1)];
      if (n) return openFile(n);
      state.active = null;
      loading = true;
      ed.set('', 'x.txt');
      loading = false;
    }
    renderAll();
  }

  function renderAll() {
    save();
    const list = $('.ex-list');
    list.innerHTML = '';
    for (const name of Object.keys(state.files).sort()) {
      const li = document.createElement('li');
      li.className = name === state.active ? 'on' : '';
      li.innerHTML = `<button type="button" class="f-open"><i></i><span></span></button><button type="button" class="f-btn" data-ren title="Ganti nama" aria-label="Ganti nama">&#9998;</button><button type="button" class="f-btn" data-del title="Hapus" aria-label="Hapus">&times;</button>`;
      li.querySelector('i').textContent = icons[ext(name)] ?? '~';
      li.querySelector('span').textContent = name;
      li.querySelector('.f-open').onclick = () => openFile(name);
      li.querySelector('[data-ren]').onclick = () => rename(name);
      li.querySelector('[data-del]').onclick = () => remove(name);
      list.append(li);
    }
    const tabs = $('.tabs');
    tabs.innerHTML = '';
    for (const name of state.open) {
      const t = document.createElement('div');
      t.className = 'tab' + (name === state.active ? ' on' : '');
      t.innerHTML = `<button type="button" class="t-name"></button><button type="button" class="t-x" aria-label="Tutup tab">&times;</button>`;
      t.querySelector('.t-name').textContent = name;
      t.querySelector('.t-name').onclick = () => openFile(name);
      t.querySelector('.t-x').onclick = () => closeTab(name);
      tabs.append(t);
    }
  }

  function askName(msg, initial = '') {
    const n = prompt(msg, initial)?.trim();
    if (!n || n === initial) return null;
    if (!validName(n)) return alert('Nama file tidak valid. Gunakan huruf, angka, titik, strip, atau garis bawah, misalnya halaman.js') ?? null;
    if (n in state.files) return alert(`File "${n}" sudah ada.`) ?? null;
    return n;
  }

  function create() {
    const n = askName('Nama file baru (contoh: app.js, index.html, style.css):');
    if (!n) return;
    state.files[n] = '';
    openFile(n);
  }

  function rename(old) {
    const n = askName('Nama baru untuk file ini:', old);
    if (!n) return;
    state.files[n] = state.files[old];
    delete state.files[old];
    state.open = state.open.map((x) => (x === old ? n : x));
    if (state.active === old) state.active = n;
    loading = true;
    if (state.active === n) ed.set(state.files[n], n);
    loading = false;
    renderAll();
  }

  function remove(name) {
    if (!confirm(`Hapus "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    delete state.files[name];
    if (state.open.includes(name)) closeTab(name);
    else renderAll();
  }

  function stop() {
    runner?.stop();
    runner = null;
    frame.srcdoc = '';
    $('[data-act=stop]').hidden = true;
  }

  function run() {
    stop();
    con.clear();
    const f = state.active;
    if (!f) return con.note('Buka sebuah file dulu.');
    const files = state.files;
    const html = ext(f) === 'html' ? f : Object.keys(files).find((k) => ext(k) === 'html' && files[k].includes(f));
    if (html) {
      showTab('preview');
      try {
        frame.srcdoc = buildPreview(files, html);
      } catch (e) {
        showTab('console');
        con.log('error', e.message);
      }
      return;
    }
    if (!/^(js|mjs)$/.test(ext(f))) {
      showTab('console');
      return con.note(`File "${f}" tidak bisa dijalankan sendirian. Buka file .js atau .html.`);
    }
    showTab('console');
    $('[data-act=stop]').hidden = false;
    runner = runWorker(files, f, {
      timeout: 5000,
      keepAlive: true,
      onEvent: (e) => {
        if (e.t === 'log') con.log(e.l, e.s);
        else if (e.t === 'err') con.log('error', e.s);
        else if (e.t === 'end') $('[data-act=stop]').hidden = true;
      },
    });
    runner.finished.then(() => con.note('Program selesai.'));
  }

  const onMsg = (e) => {
    if (e.source !== frame.contentWindow || !e.data) return;
    if (e.data.t === 'log') con.log(e.data.l, e.data.s);
    else if (e.data.t === 'err') con.log('error', e.data.s);
  };
  window.addEventListener('message', onMsg);

  root.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    const tab = e.target.closest('[data-tab]')?.dataset.tab;
    if (tab) showTab(tab);
    if (act === 'run') run();
    else if (act === 'stop') {
      stop();
      con.note('Program dihentikan.');
    } else if (act === 'new') create();
    else if (act === 'sample') {
      if (!confirm('Ganti seluruh isi workspace dengan proyek contoh? File yang ada sekarang akan hilang.')) return;
      stop();
      state.files = { ...sample };
      state.open = ['index.html', 'script.js'];
      openFile('index.html');
    }
  });

  if (!state.open.length || !state.active) {
    state.open = [Object.keys(state.files)[0]];
    state.active = state.open[0];
    loading = true;
    ed.set(state.files[state.active], state.active);
    loading = false;
  }
  renderAll();

  return () => {
    stop();
    ed.destroy();
    window.removeEventListener('message', onMsg);
  };
}
