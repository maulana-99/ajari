import { EditorView, keymap } from '@codemirror/view';
import { linter, lintGutter, setDiagnostics } from '@codemirror/lint';
import { Compartment, EditorSelection, Prec } from '@codemirror/state';
import { lintJs } from './lint.js';
import { basicSetup } from 'codemirror';
import { indentWithTab } from '@codemirror/commands';
import { javascript, javascriptLanguage, scopeCompletionSource } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';

// javascript() already suggests keywords/snippets/local names; add a curated set of globals
// (the full window scope floods the popup with hundreds of browser APIs).
const g = globalThis;
const scope = Object.fromEntries(
  'console Math JSON Array Object String Number Boolean Date Promise Map Set RegExp Error parseInt parseFloat isNaN setTimeout setInterval clearTimeout clearInterval document window alert prompt'
    .split(' ')
    .map((k) => [k, g[k]]),
);
const js = () => [javascript(), javascriptLanguage.data.of({ autocomplete: scopeCompletionSource(scope) })];
const langs = { js, mjs: js, json: js, html, css };
const langFor = (name) => (langs[name.split('.').pop()] || (() => []))();
const lintable = (name) => /\.(m?js)$/.test(name);

// Hover tooltip like VS Code: original message + source, then cause/fix in Indonesian.
function render(d) {
  const el = document.createElement('div');
  el.className = 'lint-msg';
  el.innerHTML = `<div class="lm-head"><span></span> <small></small></div>${d.cause ? `<div><b>Penyebab:</b> ${d.cause}</div>` : ''}${d.fix ? `<div><b>Perbaikan:</b> ${d.fix}</div>` : ''}`;
  el.querySelector('span').textContent = d.message;
  el.querySelector('small').textContent = `${d.src} [Ln ${d.line}]`;
  return el;
}

export function createEditor(parent, { doc = '', name = 'a.js', onChange, onRun, onDiagnostics } = {}) {
  const lang = new Compartment();
  const lint = new Compartment();
  let cur = name;
  const jsLint = [
    linter(
      async (v) => {
        const ds = (await lintJs(v.state.doc)).map((d) => ({ ...d, renderMessage: () => render(d) }));
        if (v.state.doc !== view.state.doc || !lintable(cur)) return [];
        onDiagnostics?.(ds);
        return ds;
      },
      { delay: 300 },
    ),
    lintGutter(),
  ];
  const lintFor = (n) => (lintable(n) ? jsLint : []);
  const view = new EditorView({
    parent,
    doc,
    extensions: [
      Prec.highest(
        keymap.of([
          { key: 'Mod-Enter', run: () => (onRun?.(), true) },
          { key: 'Mod-s', run: () => true },
        ]),
      ),
      basicSetup,
      keymap.of([indentWithTab]),
      lang.of(langFor(name)),
      lint.of(lintFor(name)),
      oneDark,
      EditorView.updateListener.of((u) => u.docChanged && onChange?.(u.state.doc.toString())),
    ],
  });
  return {
    get: () => view.state.doc.toString(),
    set(text, n = name) {
      cur = n;
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: text },
        effects: [lang.reconfigure(langFor(n)), lint.reconfigure(lintFor(n))],
      });
      if (!lintable(n)) {
        view.dispatch(setDiagnostics(view.state, []));
        onDiagnostics?.([]);
      }
    },
    goto(pos) {
      view.dispatch({ selection: EditorSelection.cursor(pos), scrollIntoView: true });
      view.focus();
    },
    focus: () => view.focus(),
    destroy: () => view.destroy(),
  };
}
