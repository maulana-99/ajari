// VS Code-style diagnostics for JS: ESLint (lazy-loaded, ~1 MB) + Indonesian explanation per problem.
let linterP;
const getLinter = () =>
  (linterP ??= import('eslint-linter-browserify').then((m) => new (m.Linter ?? m.default.Linter)({ configType: 'flat' })));

const globals = Object.fromEntries(Object.getOwnPropertyNames(globalThis).map((k) => [k, 'readonly']));

const config = [
  {
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals },
    rules: {
      'no-undef': 'error',
      'no-const-assign': 'error',
      'no-func-assign': 'error',
      'no-import-assign': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'for-direction': 'error',
      'valid-typeof': 'error',
      'use-isnan': 'error',
      'no-unsafe-negation': 'error',
      'no-unexpected-multiline': 'error',
      'no-cond-assign': ['warn', 'always'],
      'no-unreachable': 'warn',
      'no-unused-vars': ['warn', { args: 'none' }],
      'no-self-assign': 'warn',
      'no-sparse-arrays': 'warn',
      'no-empty': 'warn',
      eqeqeq: 'warn',
    },
  },
];

const name = (m) => /'([^']+)'/.exec(m)?.[1] ?? '';

// [cause, fix] per ESLint rule. `n` = name quoted in the original message.
const rules = {
  'no-undef': (n) =>
    /^_+$/.test(n)
      ? ['Ini bagian kosong dari kerangka kode.', 'Ganti <code>___</code> dengan jawabanmu.']
      : [
          `<code>${n}</code> belum pernah dibuat (dideklarasikan), jadi JavaScript tidak mengenalnya.`,
          `Cek ejaan dan huruf besar/kecil (misal <code>console</code> bukan <code>Console</code>), atau buat dulu dengan <code>let</code>/<code>const</code>.`,
        ],
  'no-const-assign': (n) => [
    `<code>${n}</code> dibuat dengan <code>const</code>, jadi isinya tidak boleh diganti.`,
    `Ubah <code>const</code> menjadi <code>let</code> jika nilainya memang perlu berubah.`,
  ],
  'no-func-assign': (n) => [
    `<code>${n}</code> adalah nama fungsi, tapi kamu mengisinya dengan nilai lain.`,
    'Pakai nama variabel yang berbeda.',
  ],
  'no-import-assign': (n) => [
    `<code>${n}</code> berasal dari <code>import</code> dan tidak bisa diisi ulang.`,
    'Simpan ke variabel baru jika perlu diubah.',
  ],
  'no-dupe-keys': (n) => [
    `Object punya dua properti bernama <code>${n}</code>. Yang terakhir akan menimpa yang pertama.`,
    'Hapus salah satu atau ganti namanya.',
  ],
  'no-dupe-else-if': () => [
    'Syarat <code>else if</code> ini sama dengan syarat sebelumnya, jadi cabang ini tidak akan pernah jalan.',
    'Ubah syaratnya atau hapus cabangnya.',
  ],
  'no-duplicate-case': () => ['Ada dua <code>case</code> dengan nilai yang sama di <code>switch</code>.', 'Hapus salah satunya.'],
  'for-direction': () => [
    'Arah perulangan salah: penghitung bergerak menjauhi batasnya, jadi perulangan tidak akan berhenti (atau tidak pernah jalan).',
    'Pakai <code>i++</code> jika syaratnya <code>&lt;</code>, dan <code>i--</code> jika syaratnya <code>&gt;</code>.',
  ],
  'valid-typeof': () => [
    '<code>typeof</code> hanya menghasilkan "string", "number", "boolean", "undefined", "object", "function", "symbol", atau "bigint".',
    'Periksa ejaan teks pembandingnya.',
  ],
  'use-isnan': () => [
    'Membandingkan dengan <code>NaN</code> memakai <code>===</code> selalu bernilai false.',
    'Gunakan <code>Number.isNaN(nilai)</code>.',
  ],
  'no-unsafe-negation': () => [
    'Tanda <code>!</code> hanya membalik sisi kiri, bukan seluruh perbandingan.',
    'Bungkus dengan kurung: <code>!(a in b)</code>.',
  ],
  'no-unexpected-multiline': () => [
    'Baris ini diawali <code>(</code>, <code>[</code>, atau backtick, sehingga bisa tersambung dengan baris sebelumnya.',
    'Tambahkan titik koma <code>;</code> di akhir baris sebelumnya.',
  ],
  'no-cond-assign': () => [
    'Di dalam syarat ada <code>=</code> (mengisi nilai), bukan perbandingan.',
    'Gunakan <code>===</code> untuk membandingkan.',
  ],
  'no-unreachable': () => [
    'Kode ini tidak akan pernah dijalankan karena letaknya setelah <code>return</code>, <code>break</code>, atau <code>throw</code>.',
    'Pindahkan ke atas atau hapus.',
  ],
  'no-unused-vars': (n) => [
    `<code>${n}</code> dibuat tapi tidak pernah dipakai.`,
    `Gunakan variabelnya (misal <code>console.log(${n})</code>) atau hapus.`,
  ],
  'no-self-assign': (n) => [
    `<code>${n}</code> diisi dengan dirinya sendiri. Tidak ada efeknya.`,
    'Mungkin maksudmu mengisi dengan nilai lain.',
  ],
  'no-sparse-arrays': () => ['Ada koma ganda di array, sehingga ada slot kosong.', 'Hapus koma yang berlebih.'],
  'no-empty': () => ['Blok <code>{ }</code> ini kosong.', 'Isi dengan kode atau hapus bloknya.'],
  eqeqeq: () => [
    '<code>==</code> membandingkan secara longgar: <code>"5" == 5</code> bernilai true.',
    'Gunakan <code>===</code> (atau <code>!==</code>) agar tipenya juga dibandingkan.',
  ],
};

// [pattern, (match, lineText) => [cause, fix]] for parser errors.
const parse = [
  [
    /Unterminated string/,
    () => [
      'Teks dibuka dengan tanda kutip, tapi tidak ditutup.',
      'Tutup dengan tanda kutip yang sama (<code>"</code> atau <code>\'</code>) sebelum akhir baris.',
    ],
  ],
  [
    /Unterminated template/,
    () => ['Template literal dibuka dengan backtick (<code>`</code>) tapi tidak ditutup.', 'Tambahkan backtick penutup.'],
  ],
  [/Unterminated comment/, () => ['Komentar <code>/*</code> tidak ditutup.', 'Tambahkan <code>*/</code>.']],
  [
    /Identifier '(.+)' has already been declared/,
    (m) => [
      `<code>${m[1]}</code> sudah dibuat sebelumnya. Satu nama hanya boleh dideklarasikan sekali.`,
      `Hapus <code>let</code>/<code>const</code> di baris ini untuk mengisi ulang, atau pakai nama lain.`,
    ],
  ],
  [
    /Missing initializer in const/,
    () => [
      'Variabel <code>const</code> wajib langsung diberi nilai.',
      'Tulis <code>const nama = nilai;</code>, atau pakai <code>let</code>.',
    ],
  ],
  [
    /'return' outside of function/,
    () => ['<code>return</code> hanya boleh dipakai di dalam fungsi.', 'Pindahkan ke dalam fungsi atau hapus.'],
  ],
  [
    /Unexpected keyword '(.+)'/,
    (m) => [
      `Kata kunci <code>${m[1]}</code> muncul di tempat yang salah, atau dipakai sebagai nama variabel.`,
      'Kata kunci seperti <code>let</code>, <code>if</code>, <code>for</code> tidak boleh dijadikan nama.',
    ],
  ],
  [
    /Unexpected character/,
    () => [
      'Ada karakter yang tidak dikenal, sering kali tanda kutip miring (“ ”) hasil salin-tempel.',
      'Ganti dengan kutip biasa <code>"</code> atau <code>\'</code>.',
    ],
  ],
  [
    /Unexpected string/,
    () => ['Ada teks yang menempel tanpa penghubung.', 'Mungkin kurang <code>+</code> atau koma <code>,</code> di antara dua nilai.'],
  ],
  [
    /Unexpected number/,
    () => [
      'Ada angka yang menempel tanpa penghubung, atau nama variabel diawali angka.',
      'Tambahkan operator/koma, dan jangan awali nama dengan angka.',
    ],
  ],
  [
    /Invalid left-hand side|Assigning to rvalue/,
    () => ['Sisi kiri tanda <code>=</code> harus berupa variabel.', 'Untuk membandingkan, gunakan <code>===</code>.'],
  ],
  [
    /Unexpected token\s*$/,
    () => [
      'Kode berakhir sebelum lengkap.',
      'Ada kurung <code>( )</code>, kurung kurawal <code>{ }</code>, atau kurung siku <code>[ ]</code> yang belum ditutup.',
    ],
  ],
  [
    /Unexpected token (.+)/,
    (m, line) =>
      /\bconst\s+\w+\s*;/.test(line)
        ? ['Variabel <code>const</code> wajib langsung diberi nilai.', 'Tulis <code>const nama = nilai;</code>.']
        : [
            `Ada <code>${m[1]}</code> di tempat yang tidak diharapkan.`,
            'Biasanya ada kurung, kurung kurawal, kutip, atau koma yang kurang/berlebih di dekat sini atau di baris sebelumnya.',
          ],
  ],
];

function explain(msg, lineText) {
  if (msg.ruleId) return rules[msg.ruleId]?.(name(msg.message)) ?? ['', ''];
  const text = msg.message.replace(/^Parsing error:\s*/, '');
  for (const [re, fn] of parse) {
    const m = re.exec(text);
    if (m) return fn(m, lineText);
  }
  return ['Penulisan kode belum sesuai aturan JavaScript.', 'Periksa pasangan kurung, kutip, dan koma.'];
}

// Returns CodeMirror diagnostics for `doc` (a CodeMirror Text).
export async function lintJs(doc) {
  const L = await getLinter();
  const lineAt = (l) => doc.line(Math.min(Math.max(l, 1), doc.lines));
  const pos = (l, c) => {
    const ln = lineAt(l);
    return Math.min(ln.from + Math.max(c - 1, 0), ln.to);
  };
  return L.verify(doc.toString(), config)
    .sort((a, b) => a.line - b.line || a.column - b.column)
    .map((m) => {
      let from = pos(m.line, m.column);
      let to = m.endLine ? pos(m.endLine, m.endColumn) : from;
      if (to <= from) {
        // Parser errors only give a point; underline the token there (or the char before at end of line).
        const ln = lineAt(m.line);
        const word = /^\w+|^\S/.exec(doc.sliceString(from, ln.to));
        if (word) to = from + word[0].length;
        else if (from > ln.from) from = (to = from) - 1;
        else to = Math.min(from + 1, doc.length);
      }
      const [cause, fix] = explain(m, lineAt(m.line).text);
      return {
        from,
        to,
        severity: m.severity === 2 ? 'error' : 'warning',
        message: m.message,
        // not `source`: CodeMirror would print it again after renderMessage
        src: m.ruleId ? `eslint(${m.ruleId})` : 'js',
        line: m.line,
        cause,
        fix,
      };
    });
}
