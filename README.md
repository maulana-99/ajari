# Ajari

Belajar JavaScript, HTML, dan CSS dari dasar, dibimbing seperti guru. Bukan tempat adu soal seperti LeetCode: setiap langkah menjelaskan konsepnya, memberi contoh yang bisa langsung dijalankan, lalu tugas kecil dengan umpan balik yang ramah.

## Fitur

- **Ajari JS**: 9 pelajaran JavaScript dasar (variabel sampai object) dan 3 mini project (Rapor Nilai, Daftar Tugas, Kasir Mini) yang terbuka setelah semua pelajaran selesai.
- **Ajari Web**: 11 pelajaran HTML, CSS, dan JavaScript di halaman (DOM, event, input), dengan preview langsung.
- **Guru di panel kanan**: penjelasan per baris, alur eksekusi, petunjuk bertahap sampai kerangka kode, dan contoh jawaban beserta alasannya.
- **Editor seperti VS Code** (CodeMirror 6): autocomplete, garis merah untuk error (ESLint) dengan penjelasan penyebab dan perbaikan dalam bahasa Indonesia.
- **Workspace**: editor kosong dengan banyak file (HTML, CSS, JS, `import` antar file), console, dan preview untuk membuat proyek sendiri.
- Semua kode berjalan di browser (Web Worker atau iframe sandbox). Kemajuan disimpan di `localStorage`, tanpa server dan tanpa akun.

## Menjalankan

```sh
npm install
npm run dev     # server pengembangan
npm run build   # build produksi ke dist/
```

## Struktur

```
src/
├── main.js                 # router: #/learn, #/web, #/workspace
├── pages/
│   ├── learn.js            # halaman belajar (dipakai semua course)
│   └── workspace.js        # workspace bebas
├── editor/
│   ├── editor.js           # CodeMirror + autocomplete + lint
│   ├── lint.js             # ESLint + penjelasan error (Bahasa Indonesia)
│   └── console.js          # panel output
├── runtime/
│   └── runner.js           # menjalankan kode di Worker / iframe sandbox
├── courses/
│   ├── index.js            # daftar course
│   ├── js/                 # Ajari JS: lessons, explain, hints, projects
│   └── web/                # Ajari Web: lessons
└── styles/
    └── main.css
```

Menambah course baru: buat folder di `src/courses/`, daftarkan di `courses/index.js` dengan `prefix` penyimpanan yang unik, lalu tambahkan route di `main.js`.
