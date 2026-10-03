// Lenient helpers for task checks (JS course, run in the page). A task passes when the code runs and
// produces the right result. Text is compared ignoring case, spaces and punctuation, and extra
// output is allowed, so "halo budi" matches "Halo, Budi!" and debugging logs don't fail a task.
// Rules of the language itself stay strict, because JavaScript enforces them: `Console.log`
// or a misspelled variable is a real error, and the editor explains it.

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

// Rounds float noise (4200.000000000001) and drops thousand separators (140.000 / 140,000).
const tidyNumbers = (s) =>
  String(s)
    .replace(/\d+\.\d{6,}/g, (n) => String(Math.round(n * 100) / 100))
    .replace(/(\d)[.,](?=\d{3}(?!\d))/g, '$1');

// Lowercase, keep only letters, digits, decimal points and [ ] (so "[x]" and "[ ]" stay distinct).
export const loose = (s) =>
  tidyNumbers(s)
    .toLowerCase()
    .replace(/(\d)\.(\d)/g, '$1\u0000$2')
    .replace(/[^a-z0-9\u0000[\]]/g, '')
    .replace(/\u0000/g, '.');

export const lines = (c) => c.logs.flatMap((l) => String(l).split('\n'));
// True if `b` occurs in `a` without touching extra digits, so "hasil8" is not found in "hasil80".
const contains = (a, b) => {
  for (let i = a.indexOf(b); i >= 0; i = a.indexOf(b, i + 1)) {
    const before = a[i - 1] ?? '';
    const after = a[i + b.length] ?? '';
    if (!(/\d/.test(b[0]) && /[\d.]/.test(before)) && !(/\d/.test(b.at(-1)) && /\d/.test(after))) return true;
  }
  return false;
};
export const printed = (c, want) => lines(c).some((l) => contains(loose(l), loose(want)));
// Numbers in the output. A minus counts only as a sign, not in words like "ke-1".
export const nums = (c) =>
  (tidyNumbers(c.logs.join('\n'))
    .replace(/([a-z])-(\d)/gi, '$1 $2')
    .match(/(?<![\w.])-?\d+(?:\.\d+)?/g) ?? []
  ).map(Number);
export const hasNum = (c, n) => nums(c).includes(n);
// Tests the code with comments removed.
export const code = (c, re) => re.test(c.code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, ''));

const lineMatches = (line, want) => {
  const a = loose(line);
  const b = loose(want);
  return a === b || (b.length > 2 && contains(a, b));
};

// Expected lines must appear in this order; other output in between is fine.
export const expectLines = (exp) => (c) => {
  const got = lines(c);
  let at = 0;
  for (const [i, want] of exp.entries()) {
    const found = got.findIndex((l, j) => j >= at && lineMatches(l, want));
    if (found < 0) {
      const after = i ? ` setelah <code>${esc(exp[i - 1])}</code>` : '';
      const sample = got.length ? ` Outputmu: <code>${esc(got.slice(0, 6).join(' | '))}${got.length > 6 ? ' | ...' : ''}</code>` : '';
      return `Belum terlihat baris seperti <code>${esc(want)}</code>${after}. Huruf besar/kecil, spasi, dan tanda baca tidak masalah, yang penting isinya.${sample}`;
    }
    at = found + 1;
  }
  return true;
};
