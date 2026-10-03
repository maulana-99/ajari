// Runs project files in a Worker (JS only) or builds an HTML preview for a sandboxed iframe.
// `prelude` is stringified and injected into the sandbox, so it must stay self-contained.
export function prelude(post) {
  const ins = (v, d, seen) => {
    if (typeof v === 'string') return d ? `'${v}'` : v;
    if (v === null || (typeof v !== 'object' && typeof v !== 'function')) return String(v);
    if (typeof v === 'function') return `[Function: ${v.name || 'anonymous'}]`;
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (v instanceof Date) return v.toISOString();
    if (seen.includes(v)) return '[Circular]';
    if (d > 3) return Array.isArray(v) ? '[Array]' : '[Object]';
    const s = [...seen, v];
    if (Array.isArray(v)) return '[' + v.map((x) => ins(x, d + 1, s)).join(', ') + ']';
    const k = Object.keys(v);
    return k.length ? '{ ' + k.map((x) => `${x}: ${ins(v[x], d + 1, s)}`).join(', ') + ' }' : '{}';
  };
  for (const l of ['log', 'info', 'debug', 'warn', 'error']) {
    const lv = l === 'warn' || l === 'error' ? l : 'log';
    console[l] = (...a) => post({ t: 'log', l: lv, s: a.map((x) => ins(x, 0, [])).join(' ') });
  }
  addEventListener('error', (e) => {
    e.preventDefault();
    post({ t: 'err', s: e.message || 'Terjadi error' });
  });
  addEventListener('unhandledrejection', (e) => {
    e.preventDefault();
    post({ t: 'err', s: 'Promise ditolak: ' + ins(e.reason, 0, []) });
  });
}

const norm = (p) => p.replace(/^\.?\//, '');

function resolvePath(files, from, spec) {
  const parts = from.split('/').slice(0, -1);
  for (const p of spec.split('/')) {
    if (p === '.' || p === '') continue;
    p === '..' ? parts.pop() : parts.push(p);
  }
  const path = parts.join('/');
  return [path, path + '.js', path + '/index.js'].find((p) => p in files);
}

// Rewrites relative imports to URLs made by `mk` (blob: or data:), dependencies first.
function bundle(files, entry, mk) {
  const cache = {};
  const stack = [];
  const load = (path) => {
    if (path in cache) return cache[path];
    if (stack.includes(path)) throw new Error('Import melingkar: ' + [...stack, path].join(' -> '));
    stack.push(path);
    const code = files[path].replace(/(\bfrom\s*|\bimport\s*)(['"])(\.{1,2}\/[^'"]+)\2/g, (m, k, q, spec) => {
      const t = resolvePath(files, path, spec);
      if (!t) throw new Error(`File "${spec}" tidak ditemukan (diimport dari ${path})`);
      return k + q + load(t) + q;
    });
    stack.pop();
    return (cache[path] = mk(code));
  };
  return load(entry);
}

export function runWorker(files, entry, { onEvent, timeout = 3000, keepAlive = false } = {}) {
  const urls = [];
  const mk = (c) => {
    const u = URL.createObjectURL(new Blob([c], { type: 'text/javascript' }));
    urls.push(u);
    return u;
  };
  const logs = [];
  let error = null;
  let worker, timer, settled, isDone, resolveFn;
  const finished = new Promise((r) => (resolveFn = r));
  const stop = () => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    worker?.terminate();
    urls.forEach((u) => URL.revokeObjectURL(u));
    onEvent?.({ t: 'end' });
    resolveFn({ logs, error });
  };
  const emit = (m) => {
    if (m.t === 'log') logs.push(m.s);
    if (m.t === 'err' && !error) error = m.s;
    onEvent?.(m);
  };
  try {
    const main = bundle(files, entry, mk);
    const pre = mk(`(${prelude})((m) => self.postMessage(m));`);
    const done = mk(`self.postMessage({ t: 'done' });`);
    worker = new Worker(mk(`import '${pre}'; import '${main}'; import '${done}';`), { type: 'module' });
  } catch (e) {
    emit({ t: 'err', s: e.message });
    stop();
    return { stop, finished };
  }
  worker.onmessage = (e) => {
    const m = e.data;
    if (m.t === 'done') {
      isDone = true;
      clearTimeout(timer);
      if (!keepAlive) setTimeout(stop, 150);
    } else {
      emit(m);
      if (m.t === 'err' && !isDone) setTimeout(stop, 50);
    }
  };
  worker.onerror = (e) => {
    e.preventDefault();
    emit({ t: 'err', s: e.message || 'Kesalahan penulisan kode (syntax error). Cek tanda kurung, kutip, dan koma.' });
    stop();
  };
  timer = setTimeout(() => {
    emit({ t: 'err', s: 'Kode berjalan terlalu lama dan dihentikan. Mungkin ada perulangan yang tidak pernah berhenti?' });
    stop();
  }, timeout);
  return { stop, finished };
}

const dataUrl = (c) => 'data:text/javascript;base64,' + btoa(unescape(encodeURIComponent(c)));

// opts.check: source of a function (d) => true | string, run inside the page after load.
// The page always posts { t: 'check', r } when loaded, so callers also learn when the page is ready.
export function buildPreview(files, entry, opts = {}) {
  let html = files[entry];
  html = html.replace(/<link\b[^>]*>/gi, (m) => {
    const href = /href=["']([^"']+)["']/i.exec(m)?.[1];
    const f = href && files[norm(href)];
    return /stylesheet/i.test(m) && f != null ? `<style>${f}</style>` : m;
  });
  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (m, attrs, inline) => {
    const src = /src=["']([^"']+)["']/i.exec(attrs)?.[1];
    const isModule = /type=["']module["']/i.test(attrs);
    if (src) {
      const p = norm(src);
      if (files[p] == null) return m;
      const mod = isModule || /^\s*(import|export)\s/m.test(files[p]);
      return mod
        ? `<script type="module" src="${bundle(files, p, dataUrl)}"></script>`
        : `<script>${files[p].replace(/<\/script/gi, '<\\/script')}</script>`;
    }
    if (!isModule) return m;
    return `<script type="module" src="${bundle({ ...files, '<inline>': inline }, '<inline>', dataUrl)}"></script>`;
  });
  const tag = `<script>(${prelude})((m) => { (window.__logs ||= []).push(m); parent.postMessage(m, '*'); });</script>`;
  html = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + tag) : tag + html;
  if (!opts.check && !opts.notifyLoad) return html;
  // JSON: escape every "<" (only occurs inside strings). Code: only break up "</script".
  const safe = (s) => s.replace(/</g, '\\u003c');
  const safeCode = (s) => s.replace(/<\/script/gi, '<\\/script');
  return (
    html +
    `<script>addEventListener('load', () => setTimeout(() => {
  const q = (s) => (typeof s === 'string' ? document.querySelector(s) : s);
  const d = {
    $: q,
    $$: (s) => [...document.querySelectorAll(s)],
    text: (s) => (q(s)?.textContent ?? '').trim(),
    css: (s, p) => (q(s) ? getComputedStyle(q(s))[p] : ''),
    click: (s) => q(s)?.click(),
    type: (s, v) => { const el = q(s); if (el) { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); } },
    get logs() { return (window.__logs || []).filter((m) => m.t === 'log').map((m) => m.s); },
    src: ${safe(JSON.stringify(files))},
  };
  let r = null;
  ${opts.check ? `try { r = (${safeCode(opts.check)})(d); } catch (e) { r = 'Pemeriksaan gagal: ' + e.message; }` : ''}
  parent.postMessage({ t: 'check', r }, '*');
}, 80));</script>`
  );
}
