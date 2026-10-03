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

| File | Isi |
| --- | --- |
| `src/learn.js` | Halaman belajar (dipakai kedua course) |
| `src/workspace.js` | Workspace bebas |
| `src/runner.js` | Menjalankan kode di Worker / iframe |
| `src/lint.js` | Pemeriksaan ESLint + penjelasan error |
| `src/lessons.js`, `src/explain.js`, `src/hints.js` | Konten Ajari JS |
| `src/projects.js` | Mini project Ajari JS |
| `src/web-lessons.js` | Konten Ajari Web |
