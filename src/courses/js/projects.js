// Mini projects, unlocked after all lessons are done. Same step format as lessons.js, plus
// hints/skeleton/solWhy inline. Each step's starter code already contains the finished parts
// of the previous steps, so the learner builds the project piece by piece.
import { expectLines, hasNum, printed } from '../check.js';

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

/* ---------- Mini Project 1: Rapor Nilai Kelas ---------- */
const SISWA = `const siswa = [
  { nama: "Andi", nilai: 85 },
  { nama: "Budi", nilai: 62 },
  { nama: "Citra", nilai: 93 },
  { nama: "Dewi", nilai: 74 },
];
`;
const PREDIKAT = `
function predikat(nilai) {
  if (nilai >= 90) {
    return "A";
  } else if (nilai >= 80) {
    return "B";
  } else if (nilai >= 70) {
    return "C";
  } else {
    return "D";
  }
}
`;

/* ---------- Mini Project 2: Daftar Tugas ---------- */
const TUGAS = `const tugas = [];

function tambah(judul) {
  tugas.push({ judul: judul, selesai: false });
}

tambah("Belajar JS");
tambah("Cuci piring");
tambah("Baca buku");
`;
const TAMPIL = `
function tampilkan() {
  for (let i = 0; i < tugas.length; i++) {
    let tanda = "[ ]";
    if (tugas[i].selesai) {
      tanda = "[x]";
    }
    console.log((i + 1) + ". " + tanda + " " + tugas[i].judul);
  }
}

function selesai(nomor) {
  tugas[nomor - 1].selesai = true;
}
`;

/* ---------- Mini Project 3: Kasir Mini ---------- */
const MENU = `const menu = [
  { kode: "K1", nama: "Kopi", harga: 15000 },
  { kode: "T1", nama: "Teh", harga: 8000 },
  { kode: "R1", nama: "Roti", harga: 12000 },
];
`;
const CARI = `
function cariMenu(kode) {
  for (const item of menu) {
    if (item.kode === kode) {
      return item;
    }
  }
  return null;
}
`;
const BELI = `
const keranjang = [];

function beli(kode, jumlah) {
  const item = cariMenu(kode);
  if (item === null) {
    console.log("Kode " + kode + " tidak ada di menu");
    return;
  }
  keranjang.push({ nama: item.nama, harga: item.harga, jumlah: jumlah });
  console.log("+ " + jumlah + " " + item.nama);
}
`;
const TOTAL = `
function hitungTotal() {
  let total = 0;
  for (const isi of keranjang) {
    total += isi.harga * isi.jumlah;
  }
  return total;
}
`;

export const projects = [
  {
    project: true,
    title: 'Mini Project 1: Rapor Nilai Kelas',
    intro: 'Mengolah nilai siswa menjadi rapor: predikat, rata-rata, dan siapa yang lulus.',
    steps: [
      {
        title: 'Rapor 1: Tampilkan data',
        body: `<p>Selamat datang di mini project pertama! Di sini kamu tidak belajar hal baru. Kamu <b>menggabungkan</b> semua yang sudah dipelajari menjadi satu program utuh.</p>
<p>Targetnya, program mencetak rapor seperti ini:</p>
<pre>Andi: 85 (B) - Lulus
Budi: 62 (D) - Remedial
...
Rata-rata: 78.5
Lulus: 3 dari 4</pre>
<p>Kita bangun dalam 4 langkah kecil. Langkah pertama: tampilkan dulu datanya. Data siswa sudah disiapkan sebagai <b>array berisi object</b>.</p>`,
        task: 'Gunakan perulangan <code>for...of</code> untuk mencetak setiap siswa dengan format <code>Andi: 85</code>.',
        code: SISWA + '\n// Tampilkan setiap siswa dengan format: Andi: 85\n',
        hints: [
          'Ingat pelajaran <b>Object</b>: array berisi object bisa diputar dengan <code>for (const s of siswa)</code>. Setiap putaran, <code>s</code> berisi satu object siswa.',
          'Nama ada di <code>s.nama</code> dan nilai di <code>s.nilai</code>.',
          'Sambung dengan <code>+</code>: <code>s.nama + ": " + s.nilai</code>. Perhatikan spasi setelah titik dua.',
        ],
        skeleton: SISWA + '\nfor (const s of ___) {\n  console.log(s.___ + ": " + s.___);\n}\n',
        solution: SISWA + '\nfor (const s of siswa) {\n  console.log(s.nama + ": " + s.nilai);\n}\n',
        solWhy: '<code>for...of</code> mengambil satu object per putaran ke dalam <code>s</code>. <code>s.nama</code> dan <code>s.nilai</code> membaca propertinya, lalu <code>+</code> menyambungnya menjadi satu teks. Empat siswa berarti empat putaran, jadi empat baris.',
        check: expectLines(['Andi: 85', 'Budi: 62', 'Citra: 93', 'Dewi: 74']),
        done: 'Data sudah tampil. Sekarang kita butuh predikat untuk setiap nilai.',
      },
      {
        title: 'Rapor 2: Fungsi predikat',
        body: `<p>Setiap nilai punya predikat: <b>A</b> jika &gt;= 90, <b>B</b> jika &gt;= 80, <b>C</b> jika &gt;= 70, selain itu <b>D</b>.</p>
<p>Karena aturan ini dipakai untuk banyak siswa, kita bungkus dalam <b>fungsi</b>. Ingat: fungsi harus <code>return</code> hasilnya, jangan <code>console.log</code> di dalamnya.</p>
<p>Baris uji di bawah fungsi sengaja memakai nilai-nilai batas (80, 70) untuk memastikan syaratmu tepat.</p>`,
        task: 'Lengkapi fungsi <code>predikat(nilai)</code> agar baris uji mencetak <code>A B C D</code>.',
        code: SISWA + '\n// Lengkapi fungsi ini: kembalikan "A", "B", "C", atau "D"\nfunction predikat(nilai) {\n  \n}\n\n// Uji fungsi (jangan diubah). Hasil yang benar: A B C D\nconsole.log(predikat(95), predikat(80), predikat(70), predikat(50));\n',
        hints: [
          'Ini persis pola <code>if / else if / else</code> dari pelajaran Kondisi, hanya saja setiap cabang memakai <code>return</code>.',
          'Urutkan dari syarat paling ketat: <code>&gt;= 90</code> dulu, lalu <code>&gt;= 80</code>, lalu <code>&gt;= 70</code>.',
          'Pakai <code>&gt;=</code>, bukan <code>&gt;</code>. Nilai 80 harus dapat B, dan 70 harus dapat C.',
        ],
        skeleton: SISWA + '\nfunction predikat(nilai) {\n  if (nilai >= ___) {\n    return "A";\n  } else if (nilai >= ___) {\n    return "___";\n  } else if (nilai >= ___) {\n    return "___";\n  } else {\n    return "___";\n  }\n}\n\nconsole.log(predikat(95), predikat(80), predikat(70), predikat(50));\n',
        solution: SISWA + PREDIKAT + '\nconsole.log(predikat(95), predikat(80), predikat(70), predikat(50));\n',
        solWhy: 'JavaScript memeriksa syarat dari atas. Untuk 80: <code>80 &gt;= 90</code> salah, <code>80 &gt;= 80</code> benar, jadi <code>return "B"</code> dan fungsi langsung berhenti. <code>return</code> mengirim huruf itu keluar, lalu <code>console.log</code> mencetak keempat hasilnya dipisah spasi.',
        check: (c) =>
          printed(c, 'A B C D')
            ? true
            : `Baris uji mencetak <code>${esc(c.logs.at(-1) ?? '(kosong)')}</code>, targetnya <code>A B C D</code>.` +
              (/undefined/.test(c.logs.at(-1) ?? '') ? ' Ada <code>undefined</code>: pastikan setiap cabang memakai <code>return</code>.' : ''),
        done: 'Fungsi predikat siap dipakai berulang kali.',
      },
      {
        title: 'Rapor 3: Rata-rata kelas',
        body: `<p>Rata-rata = jumlah semua nilai ÷ banyaknya siswa.</p>
<p>Polanya sama dengan latihan <b>Total belanja</b>: siapkan wadah <code>total</code> mulai dari 0, tambahkan nilai setiap siswa di dalam perulangan, lalu bagi dengan <code>siswa.length</code>.</p>`,
        task: 'Hitung rata-rata nilai seluruh siswa, lalu cetak dengan format <code>Rata-rata: 78.5</code>.',
        code: SISWA + '\n// Hitung rata-rata nilai seluruh siswa, lalu cetak: Rata-rata: ...\n',
        hints: [
          'Buat <code>let total = 0;</code> sebelum perulangan.',
          'Di dalam <code>for (const s of siswa)</code>, tambahkan <code>total += s.nilai;</code>',
          'Setelah perulangan: <code>total / siswa.length</code>. Pakai <code>siswa.length</code>, jangan angka 4, supaya tetap benar jika siswa bertambah.',
        ],
        skeleton: SISWA + '\nlet total = ___;\nfor (const s of siswa) {\n  total += s.___;\n}\nconst rata = total / siswa.___;\nconsole.log("Rata-rata: " + ___);\n',
        solution: SISWA + '\nlet total = 0;\nfor (const s of siswa) {\n  total += s.nilai;\n}\nconst rata = total / siswa.length;\nconsole.log("Rata-rata: " + rata);\n',
        solWhy: '<code>total</code> bertambah tiap putaran: 85, 147, 240, lalu 314. Setelah perulangan, <code>314 / 4</code> menghasilkan 78.5. Pembagian ditaruh di luar perulangan karena hanya dilakukan sekali, setelah semua nilai terkumpul.',
        check: expectLines(['Rata-rata: 78.5']),
        done: 'Rata-rata benar. Tinggal satu langkah lagi: menggabungkan semuanya.',
      },
      {
        title: 'Rapor 4: Rapor lengkap',
        body: `<p>Saatnya menyatukan semuanya dalam <b>satu perulangan</b>. Di setiap putaran kamu:</p>
<ol><li>menentukan status: <b>Lulus</b> jika nilai &gt;= 70, selain itu <b>Remedial</b>, dan menghitung jumlah yang lulus,</li><li>mencetak baris rapor memakai fungsi <code>predikat</code>,</li><li>menambahkan nilai ke <code>total</code>.</li></ol>
<p>Setelah perulangan, cetak rata-rata dan jumlah yang lulus. Fungsi <code>predikat</code> dari langkah 2 sudah disiapkan.</p>`,
        task: `Cetak rapor persis seperti ini:<pre>Andi: 85 (B) - Lulus
Budi: 62 (D) - Remedial
Citra: 93 (A) - Lulus
Dewi: 74 (C) - Lulus
Rata-rata: 78.5
Lulus: 3 dari 4</pre>`,
        code: SISWA + PREDIKAT + '\n// Cetak rapor lengkap:\n// 1. Setiap siswa: Andi: 85 (B) - Lulus   (Lulus jika nilai >= 70, selain itu Remedial)\n// 2. Rata-rata: ...\n// 3. Lulus: ... dari ...\n',
        hints: [
          'Siapkan dua wadah sebelum perulangan: <code>let total = 0;</code> dan <code>let jumlahLulus = 0;</code>',
          'Di dalam perulangan, mulai dengan <code>let status = "Remedial";</code> lalu ubah jadi "Lulus" dengan <code>if (s.nilai &gt;= 70)</code>. Di blok yang sama, tambah <code>jumlahLulus++</code>.',
          'Predikat didapat dari memanggil fungsi: <code>predikat(s.nilai)</code>. Sambung semuanya: <code>s.nama + ": " + s.nilai + " (" + predikat(s.nilai) + ") - " + status</code>',
          'Dua baris terakhir dicetak <b>setelah</b> perulangan: rata-rata dari <code>total / siswa.length</code>, dan <code>"Lulus: " + jumlahLulus + " dari " + siswa.length</code>.',
        ],
        skeleton:
          SISWA +
          PREDIKAT +
          '\nlet total = 0;\nlet jumlahLulus = 0;\n\nfor (const s of siswa) {\n  let status = "Remedial";\n  if (s.nilai >= ___) {\n    status = "___";\n    jumlahLulus++;\n  }\n  console.log(s.nama + ": " + s.nilai + " (" + ___ + ") - " + status);\n  total += ___;\n}\n\nconsole.log("Rata-rata: " + ___);\nconsole.log("Lulus: " + ___ + " dari " + ___);\n',
        solution:
          SISWA +
          PREDIKAT +
          '\nlet total = 0;\nlet jumlahLulus = 0;\n\nfor (const s of siswa) {\n  let status = "Remedial";\n  if (s.nilai >= 70) {\n    status = "Lulus";\n    jumlahLulus++;\n  }\n  console.log(s.nama + ": " + s.nilai + " (" + predikat(s.nilai) + ") - " + status);\n  total += s.nilai;\n}\n\nconsole.log("Rata-rata: " + total / siswa.length);\nconsole.log("Lulus: " + jumlahLulus + " dari " + siswa.length);\n',
        solWhy:
          'Satu perulangan mengerjakan tiga hal sekaligus untuk setiap siswa: menentukan status (nilai awal "Remedial", diganti "Lulus" jika syarat terpenuhi), mencetak baris rapor dengan memanggil <code>predikat</code>, dan menambah <code>total</code>. Rata-rata dan jumlah lulus dicetak di luar perulangan karena baru bisa dihitung setelah semua siswa diproses. Inilah inti pemrograman: memecah masalah besar jadi bagian kecil lalu menyatukannya.',
        check: expectLines(['Andi: 85 (B) - Lulus', 'Budi: 62 (D) - Remedial', 'Citra: 93 (A) - Lulus', 'Dewi: 74 (C) - Lulus', 'Rata-rata: 78.5', 'Lulus: 3 dari 4']),
        done: 'Mini project pertama selesai! Coba tambahkan siswa baru ke array dan lihat rapornya ikut berubah otomatis.',
      },
    ],
  },
  {
    project: true,
    title: 'Mini Project 2: Daftar Tugas',
    intro: 'Membuat aplikasi to-do sederhana: menambah tugas, menandai selesai, dan melihat ringkasan.',
    steps: [
      {
        title: 'To-Do 1: Simpan tugas',
        body: `<p>Aplikasi to-do menyimpan daftar tugas. Setiap tugas punya dua data: <b>judul</b> dan status <b>selesai</b> (boolean). Jadi tiap tugas cocok disimpan sebagai object, dan semuanya dalam satu array.</p>
<p>Di akhir project, programmu akan bisa mencetak:</p>
<pre>1. [x] Belajar JS
2. [x] Cuci piring
3. [ ] Baca buku
Selesai 2 dari 3 tugas</pre>`,
        task: 'Lengkapi fungsi <code>tambah(judul)</code> agar menambahkan object <code>{ judul: judul, selesai: false }</code> ke array <code>tugas</code>.',
        code: 'const tugas = [];\n\n// Lengkapi: tambahkan object { judul: judul, selesai: false } ke array tugas\nfunction tambah(judul) {\n  \n}\n\ntambah("Belajar JS");\ntambah("Cuci piring");\ntambah("Baca buku");\n\nconsole.log(tugas.length); // harus 3\nconsole.log(tugas);\n',
        hints: [
          'Menambah item ke akhir array memakai <code>push</code>, seperti di pelajaran Array.',
          'Yang di-push adalah sebuah object: <code>{ judul: judul, selesai: false }</code>. <code>judul</code> pertama adalah nama properti, yang kedua adalah isi parameter.',
        ],
        skeleton: 'const tugas = [];\n\nfunction tambah(judul) {\n  tugas.___({ judul: ___, selesai: ___ });\n}\n\ntambah("Belajar JS");\ntambah("Cuci piring");\ntambah("Baca buku");\n\nconsole.log(tugas.length);\nconsole.log(tugas);\n',
        solution: TUGAS + '\nconsole.log(tugas.length);\nconsole.log(tugas);\n',
        solWhy: 'Setiap kali <code>tambah</code> dipanggil, satu object baru dibuat dari parameter <code>judul</code> lalu di-<code>push</code> ke array. Tiga panggilan berarti tiga object, sehingga <code>tugas.length</code> bernilai 3. Semua tugas dimulai dengan <code>selesai: false</code>.',
        check: (c) =>
          !hasNum(c, 3)
            ? `<code>tugas.length</code> masih <code>${esc(c.logs[0] ?? '(kosong)')}</code>, seharusnya 3. Pastikan fungsi <code>tambah</code> memakai <code>push</code>.`
            : printed(c, "judul: 'Belajar JS', selesai: false")
              ? true
              : 'Jumlahnya sudah 3, tapi isinya belum berbentuk <code>{ judul: ..., selesai: false }</code>.',
        done: 'Tugas sudah tersimpan. Berikutnya, tampilkan dengan rapi.',
      },
      {
        title: 'To-Do 2: Tampilkan daftar',
        body: `<p>Output <code>console.log(tugas)</code> tadi kurang enak dibaca. Kita buat fungsi <code>tampilkan()</code> yang mencetak setiap tugas bernomor.</p>
<p>Di sini kita butuh <b>nomor urut</b>, jadi pakai <code>for</code> dengan indeks <code>i</code>, bukan <code>for...of</code>. Ingat: indeks mulai dari 0, sedangkan nomor untuk manusia mulai dari 1.</p>`,
        task: 'Lengkapi <code>tampilkan()</code> agar mencetak <code>1. [ ] Belajar JS</code>, <code>2. [ ] Cuci piring</code>, <code>3. [ ] Baca buku</code>.',
        code: TUGAS + '\n// Cetak setiap tugas dengan nomor: 1. [ ] Belajar JS\nfunction tampilkan() {\n  \n}\n\ntampilkan();\n',
        hints: [
          'Gunakan <code>for (let i = 0; i &lt; tugas.length; i++)</code>. Tugas ke-i diambil dengan <code>tugas[i]</code>.',
          'Nomor = <code>i + 1</code>. Bungkus dengan kurung agar dijumlah dulu sebelum disambung dengan teks: <code>(i + 1) + ". [ ] "</code>.',
          'Tanpa kurung, <code>i + 1 + ". "</code> memang benar, tapi <code>". " + i + 1</code> menghasilkan "01" karena teks + angka menjadi teks.',
        ],
        skeleton: TUGAS + '\nfunction tampilkan() {\n  for (let i = ___; i < tugas.___; i++) {\n    console.log((i + ___) + ". [ ] " + tugas[i].___);\n  }\n}\n\ntampilkan();\n',
        solution: TUGAS + '\nfunction tampilkan() {\n  for (let i = 0; i < tugas.length; i++) {\n    console.log((i + 1) + ". [ ] " + tugas[i].judul);\n  }\n}\n\ntampilkan();\n',
        solWhy: '<code>i</code> berjalan 0, 1, 2 (berhenti saat <code>i &lt; 3</code> salah). <code>tugas[i].judul</code> mengambil judul pada indeks itu, dan <code>(i + 1)</code> mengubah indeks jadi nomor urut 1, 2, 3. Kurung memastikan penjumlahan dikerjakan sebelum penyambungan teks.',
        check: expectLines(['1. [ ] Belajar JS', '2. [ ] Cuci piring', '3. [ ] Baca buku']),
        done: 'Daftar tampil rapi. Sekarang buat tugas bisa ditandai selesai.',
      },
      {
        title: 'To-Do 3: Tandai selesai',
        body: `<p>Dua perubahan:</p>
<ol><li>Fungsi baru <code>selesai(nomor)</code> mengubah properti <code>selesai</code> tugas itu menjadi <code>true</code>.</li><li><code>tampilkan()</code> menampilkan <code>[x]</code> untuk tugas yang selesai, dan <code>[ ]</code> untuk yang belum.</li></ol>
<p>Hati-hati: pengguna menyebut "tugas nomor 2", tapi di array letaknya di <b>indeks 1</b>.</p>`,
        task: 'Setelah <code>selesai(2)</code>, output harus: <code>1. [ ] Belajar JS</code>, <code>2. [x] Cuci piring</code>, <code>3. [ ] Baca buku</code>.',
        code:
          TUGAS +
          '\n// Ubah: pakai "[x]" jika tugas sudah selesai, "[ ]" jika belum\nfunction tampilkan() {\n  for (let i = 0; i < tugas.length; i++) {\n    console.log((i + 1) + ". [ ] " + tugas[i].judul);\n  }\n}\n\n// Lengkapi: tandai tugas nomor itu sebagai selesai.\n// Ingat: nomor dimulai dari 1, indeks array dimulai dari 0.\nfunction selesai(nomor) {\n  \n}\n\nselesai(2);\ntampilkan();\n',
        hints: [
          'Properti object bisa diubah dengan <code>=</code>: <code>tugas[indeks].selesai = true;</code>',
          'Indeks = nomor - 1. Jadi di dalam <code>selesai</code>: <code>tugas[nomor - 1].selesai = true;</code>',
          'Di <code>tampilkan</code>, buat <code>let tanda = "[ ]";</code> lalu ganti dengan <code>"[x]"</code> jika <code>tugas[i].selesai</code> bernilai true. Cetak <code>tanda</code> di tempat <code>[ ]</code> tadi.',
        ],
        skeleton:
          TUGAS +
          '\nfunction tampilkan() {\n  for (let i = 0; i < tugas.length; i++) {\n    let tanda = "[ ]";\n    if (tugas[i].___) {\n      tanda = "___";\n    }\n    console.log((i + 1) + ". " + ___ + " " + tugas[i].judul);\n  }\n}\n\nfunction selesai(nomor) {\n  tugas[___].selesai = ___;\n}\n\nselesai(2);\ntampilkan();\n',
        solution: TUGAS + TAMPIL + '\nselesai(2);\ntampilkan();\n',
        solWhy: '<code>selesai(2)</code> mengubah <code>tugas[1].selesai</code> menjadi true (2 - 1 = 1). Saat <code>tampilkan</code> berjalan, <code>if (tugas[i].selesai)</code> hanya benar untuk tugas itu, jadi hanya baris kedua yang mendapat <code>[x]</code>. Data berubah di satu tempat, tampilan mengikuti.',
        check: expectLines(['1. [ ] Belajar JS', '2. [x] Cuci piring', '3. [ ] Baca buku']),
        done: 'Tugas bisa ditandai. Terakhir, buat ringkasannya.',
      },
      {
        title: 'To-Do 4: Ringkasan',
        body: `<p>Fungsi terakhir, <code>ringkasan()</code>, menghitung berapa tugas yang sudah selesai, lalu mencetak <code>Selesai 2 dari 3 tugas</code>.</p>
<p>Bonus: jika semua tugas selesai, cetak juga <code>Semua tugas beres!</code>. Kode uji di bawah memanggil <code>ringkasan()</code> dua kali, sebelum dan sesudah semua tugas selesai.</p>`,
        task: `Output harus:<pre>1. [x] Belajar JS
2. [x] Cuci piring
3. [ ] Baca buku
Selesai 2 dari 3 tugas
Selesai 3 dari 3 tugas
Semua tugas beres!</pre>`,
        code:
          TUGAS +
          TAMPIL +
          '\n// Lengkapi: hitung tugas yang selesai, cetak "Selesai 2 dari 3 tugas".\n// Jika semua sudah selesai, cetak juga "Semua tugas beres!"\nfunction ringkasan() {\n  \n}\n\nselesai(2);\nselesai(1);\ntampilkan();\nringkasan();\n\nselesai(3);\nringkasan();\n',
        hints: [
          'Pola menghitung: <code>let jumlah = 0;</code> lalu putar semua tugas dan tambah 1 jika tugasnya selesai.',
          'Di dalam <code>for (const t of tugas)</code>: <code>if (t.selesai) { jumlah++; }</code>',
          'Semua selesai artinya <code>jumlah === tugas.length</code>. Taruh pengecekan ini setelah mencetak baris "Selesai ... dari ... tugas".',
        ],
        skeleton:
          TUGAS +
          TAMPIL +
          '\nfunction ringkasan() {\n  let jumlah = 0;\n  for (const t of tugas) {\n    if (t.___) {\n      jumlah++;\n    }\n  }\n  console.log("Selesai " + ___ + " dari " + ___ + " tugas");\n  if (jumlah === ___) {\n    console.log("Semua tugas beres!");\n  }\n}\n\nselesai(2);\nselesai(1);\ntampilkan();\nringkasan();\n\nselesai(3);\nringkasan();\n',
        solution:
          TUGAS +
          TAMPIL +
          '\nfunction ringkasan() {\n  let jumlah = 0;\n  for (const t of tugas) {\n    if (t.selesai) {\n      jumlah++;\n    }\n  }\n  console.log("Selesai " + jumlah + " dari " + tugas.length + " tugas");\n  if (jumlah === tugas.length) {\n    console.log("Semua tugas beres!");\n  }\n}\n\nselesai(2);\nselesai(1);\ntampilkan();\nringkasan();\n\nselesai(3);\nringkasan();\n',
        solWhy: '<code>jumlah</code> dihitung ulang dari nol setiap kali <code>ringkasan()</code> dipanggil, jadi hasilnya selalu sesuai data terbaru. Panggilan pertama menemukan 2 tugas selesai (bukan semua, jadi tidak ada pesan bonus). Setelah <code>selesai(3)</code>, panggilan kedua menemukan 3 dari 3, sehingga <code>jumlah === tugas.length</code> benar dan "Semua tugas beres!" ikut tercetak.',
        check: expectLines(['1. [x] Belajar JS', '2. [x] Cuci piring', '3. [ ] Baca buku', 'Selesai 2 dari 3 tugas', 'Selesai 3 dari 3 tugas', 'Semua tugas beres!']),
        done: 'Aplikasi to-do-mu berfungsi! Coba tambah tugas baru dengan <code>tambah("...")</code> dan lihat semuanya menyesuaikan.',
      },
    ],
  },
  {
    project: true,
    title: 'Mini Project 3: Kasir Mini',
    intro: 'Membuat program kasir: mencari menu, mengisi keranjang, menghitung total, dan mencetak struk dengan diskon.',
    steps: [
      {
        title: 'Kasir 1: Cari menu',
        body: `<p>Project terakhir: program kasir kafe. Di akhir, programmu mencetak struk seperti ini:</p>
<pre>2 x Kopi = 30000
1 x Roti = 12000
Total: 42000
Diskon: 4200
Bayar: 37800</pre>
<p>Langkah pertama: kasir mengetik <b>kode</b> menu (misal "K1"), program harus menemukan item yang cocok. Caranya: periksa menu satu per satu, dan begitu ketemu langsung <code>return</code>.</p>`,
        task: 'Lengkapi <code>cariMenu(kode)</code>: kembalikan item yang <code>kode</code>-nya cocok, atau <code>null</code> jika tidak ada.',
        code: MENU + '\n// Lengkapi: kembalikan item menu yang kodenya cocok.\n// Jika tidak ada yang cocok, kembalikan null.\nfunction cariMenu(kode) {\n  \n}\n\nconsole.log(cariMenu("T1").nama); // harus: Teh\nconsole.log(cariMenu("X9"));      // harus: null\n',
        hints: [
          'Putar menu dengan <code>for (const item of menu)</code>, lalu bandingkan <code>item.kode === kode</code>.',
          'Begitu cocok, <code>return item;</code>. <code>return</code> langsung menghentikan fungsi, jadi sisa perulangan tidak dijalankan.',
          '<code>return null;</code> ditaruh <b>setelah</b> perulangan. Baris itu hanya tercapai jika tidak ada satu pun yang cocok.',
        ],
        skeleton: MENU + '\nfunction cariMenu(kode) {\n  for (const item of ___) {\n    if (item.kode === ___) {\n      return ___;\n    }\n  }\n  return ___;\n}\n\nconsole.log(cariMenu("T1").nama);\nconsole.log(cariMenu("X9"));\n',
        solution: MENU + CARI + '\nconsole.log(cariMenu("T1").nama);\nconsole.log(cariMenu("X9"));\n',
        solWhy: 'Untuk "T1": putaran pertama "K1" tidak cocok, putaran kedua "T1" cocok, jadi item Teh dikembalikan dan fungsi berhenti. Untuk "X9": tidak ada yang cocok, perulangan selesai, lalu <code>return null</code> dijalankan. Kalau <code>return null</code> ditaruh di dalam perulangan (misal di <code>else</code>), fungsi akan berhenti di item pertama yang tidak cocok. Itu kesalahan yang sangat umum.',
        check: expectLines(['Teh', 'null']),
        done: 'Pencarian menu bekerja. Berikutnya, masukkan pesanan ke keranjang.',
      },
      {
        title: 'Kasir 2: Tambah ke keranjang',
        body: `<p>Fungsi <code>beli(kode, jumlah)</code> memakai <code>cariMenu</code> yang sudah kamu buat. Fungsi memanggil fungsi lain: begitulah program besar disusun.</p>
<p>Jika kode tidak ada, tampilkan pesan dan berhenti dengan <code>return;</code> (return tanpa nilai). Jika ada, simpan pesanan ke array <code>keranjang</code>.</p>`,
        task: 'Output harus: <code>+ 2 Kopi</code>, <code>+ 1 Roti</code>, <code>Kode X9 tidak ada di menu</code>, lalu <code>2</code>.',
        code:
          MENU +
          CARI +
          '\nconst keranjang = [];\n\n// Lengkapi beli(kode, jumlah):\n// - cari item dengan cariMenu(kode)\n// - jika hasilnya null, cetak "Kode X9 tidak ada di menu" (pakai kode yang dicari) lalu berhenti\n// - jika ada, simpan { nama, harga, jumlah } ke keranjang lalu cetak "+ 2 Kopi"\nfunction beli(kode, jumlah) {\n  \n}\n\nbeli("K1", 2);\nbeli("R1", 1);\nbeli("X9", 1);\nconsole.log(keranjang.length); // harus 2\n',
        hints: [
          'Baris pertama fungsi: <code>const item = cariMenu(kode);</code>',
          'Periksa <code>if (item === null)</code>. Di dalamnya cetak pesan, lalu <code>return;</code> supaya baris di bawahnya tidak dijalankan.',
          'Jika lolos pengecekan, <code>keranjang.push({ nama: item.nama, harga: item.harga, jumlah: jumlah });</code> lalu cetak <code>"+ " + jumlah + " " + item.nama</code>.',
        ],
        skeleton:
          MENU +
          CARI +
          '\nconst keranjang = [];\n\nfunction beli(kode, jumlah) {\n  const item = cariMenu(___);\n  if (item === ___) {\n    console.log("Kode " + kode + " tidak ada di menu");\n    return;\n  }\n  keranjang.push({ nama: item.___, harga: item.___, jumlah: ___ });\n  console.log("+ " + ___ + " " + item.nama);\n}\n\nbeli("K1", 2);\nbeli("R1", 1);\nbeli("X9", 1);\nconsole.log(keranjang.length);\n',
        solution: MENU + CARI + BELI + '\nbeli("K1", 2);\nbeli("R1", 1);\nbeli("X9", 1);\nconsole.log(keranjang.length);\n',
        solWhy: '<code>beli("X9", 1)</code> mendapat <code>null</code> dari <code>cariMenu</code>, mencetak pesan, lalu <code>return;</code> menghentikan fungsi sebelum <code>push</code>. Karena itu keranjang hanya berisi 2 pesanan. Pola "cek dulu, keluar lebih awal jika tidak valid" membuat kode tetap rapi tanpa <code>else</code> yang panjang.',
        check: expectLines(['+ 2 Kopi', '+ 1 Roti', 'Kode X9 tidak ada di menu', '2']),
        done: 'Keranjang terisi dan kode salah ditangani dengan baik.',
      },
      {
        title: 'Kasir 3: Hitung total',
        body: `<p>Total belanja = jumlah dari (harga × jumlah) untuk setiap pesanan di keranjang. Untuk keranjang ini: 2 × 15000 + 1 × 12000.</p>
<p>Kali ini fungsi <b>mengembalikan</b> totalnya dengan <code>return</code>, tidak mencetaknya, supaya nanti bisa dipakai lagi untuk menghitung diskon.</p>`,
        task: 'Lengkapi <code>hitungTotal()</code> sehingga tercetak <code>Total: 42000</code>.',
        code: MENU + CARI + BELI + '\nbeli("K1", 2);\nbeli("R1", 1);\n\n// Lengkapi: jumlahkan harga x jumlah untuk setiap isi keranjang, lalu kembalikan totalnya.\nfunction hitungTotal() {\n  \n}\n\nconsole.log("Total: " + hitungTotal()); // harus: Total: 42000\n',
        hints: [
          'Pola wadah lagi: <code>let total = 0;</code> lalu putar <code>keranjang</code>.',
          'Setiap pesanan menyumbang <code>isi.harga * isi.jumlah</code>, bukan hanya harganya.',
          'Jangan lupa <code>return total;</code> setelah perulangan. Tanpa itu tercetak <code>Total: undefined</code>.',
        ],
        skeleton: MENU + CARI + BELI + '\nbeli("K1", 2);\nbeli("R1", 1);\n\nfunction hitungTotal() {\n  let total = ___;\n  for (const isi of keranjang) {\n    total += isi.___ * isi.___;\n  }\n  return ___;\n}\n\nconsole.log("Total: " + hitungTotal());\n',
        solution: MENU + CARI + BELI + '\nbeli("K1", 2);\nbeli("R1", 1);\n' + TOTAL + '\nconsole.log("Total: " + hitungTotal());\n',
        solWhy: 'Putaran pertama menambah 15000 × 2 = 30000, putaran kedua 12000 × 1 = 12000, jadi <code>total</code> = 42000. <code>return</code> mengirim angka itu keluar, lalu disambung dengan "Total: " saat dicetak. Karena berupa nilai kembalian, angka ini bisa dipakai lagi untuk perhitungan diskon di langkah berikutnya.',
        check: (c) =>
          printed(c, 'Total: 42000')
            ? true
            : printed(c, 'Total: undefined')
              ? 'Tercetak <code>Total: undefined</code>: fungsi belum mengembalikan nilai. Tambahkan <code>return total;</code>.'
              : printed(c, 'Total: 27000')
                ? 'Totalmu 27000: sepertinya harga belum dikali jumlah. Gunakan <code>isi.harga * isi.jumlah</code>.'
                : expectLines(['Total: 42000'])(c),
        done: 'Total benar. Satu langkah lagi: struk dan diskon.',
      },
      {
        title: 'Kasir 4: Struk dan diskon',
        body: `<p>Langkah penutup! Fungsi <code>cetakStruk()</code> mencetak rincian pesanan, total, diskon, dan jumlah yang harus dibayar.</p>
<p>Aturan promo: jika total <b>&gt;= 40000</b>, pelanggan mendapat <b>diskon 10%</b>. Jika tidak, baris diskon tidak dicetak. Gunakan <code>hitungTotal()</code> yang sudah ada, jangan menghitung ulang.</p>`,
        task: `Output struk harus:<pre>2 x Kopi = 30000
1 x Roti = 12000
Total: 42000
Diskon: 4200
Bayar: 37800</pre>`,
        code:
          MENU +
          CARI +
          BELI +
          TOTAL +
          '\nbeli("K1", 2);\nbeli("R1", 1);\n\n// Lengkapi cetakStruk():\n// 1. Untuk setiap isi keranjang cetak: 2 x Kopi = 30000\n// 2. Cetak "Total: ..."\n// 3. Jika total >= 40000, diskon 10%: cetak "Diskon: ..."\n// 4. Cetak "Bayar: ..." (total dikurangi diskon)\nfunction cetakStruk() {\n  \n}\n\ncetakStruk();\n',
        hints: [
          'Bagian rincian: putar <code>keranjang</code> dan cetak <code>isi.jumlah + " x " + isi.nama + " = " + isi.harga * isi.jumlah</code>.',
          'Simpan total sekali: <code>const total = hitungTotal();</code> lalu cetak "Total: " + total.',
          'Mulai dengan <code>let diskon = 0;</code>. Jika <code>total &gt;= 40000</code>, isi <code>diskon = total * 10 / 100;</code> dan cetak barisnya.',
          'Terakhir cetak <code>"Bayar: " + (total - diskon)</code>. Kurung wajib, karena tanpa kurung teks + angka akan disambung dulu.',
        ],
        skeleton:
          MENU +
          CARI +
          BELI +
          TOTAL +
          '\nbeli("K1", 2);\nbeli("R1", 1);\n\nfunction cetakStruk() {\n  for (const isi of keranjang) {\n    console.log(isi.jumlah + " x " + isi.___ + " = " + isi.harga * ___);\n  }\n  const total = ___();\n  console.log("Total: " + total);\n\n  let diskon = 0;\n  if (total >= ___) {\n    diskon = total * ___ / 100;\n    console.log("Diskon: " + diskon);\n  }\n  console.log("Bayar: " + (total - ___));\n}\n\ncetakStruk();\n',
        solution:
          MENU +
          CARI +
          BELI +
          TOTAL +
          '\nbeli("K1", 2);\nbeli("R1", 1);\n\nfunction cetakStruk() {\n  for (const isi of keranjang) {\n    console.log(isi.jumlah + " x " + isi.nama + " = " + isi.harga * isi.jumlah);\n  }\n  const total = hitungTotal();\n  console.log("Total: " + total);\n\n  let diskon = 0;\n  if (total >= 40000) {\n    diskon = total * 10 / 100;\n    console.log("Diskon: " + diskon);\n  }\n  console.log("Bayar: " + (total - diskon));\n}\n\ncetakStruk();\n',
        solWhy:
          '<code>diskon</code> dimulai dari 0 supaya baris "Bayar" tetap benar walau tidak ada promo. Karena 42000 &gt;= 40000, diskon = 42000 × 10 / 100 = 4200, dan yang dibayar 42000 - 4200 = 37800. Perhatikan kurung di <code>(total - diskon)</code>: tanpa kurung, <code>"Bayar: " + total</code> menjadi teks lebih dulu dan pengurangannya gagal (hasilnya <code>NaN</code>). Fungsi <code>cetakStruk</code> sendiri memanggil <code>hitungTotal</code>, yang datanya diisi oleh <code>beli</code>, yang memakai <code>cariMenu</code>: empat fungsi kecil yang bekerja sama.',
        check: expectLines(['2 x Kopi = 30000', '1 x Roti = 12000', 'Total: 42000', 'Diskon: 4200', 'Bayar: 37800']),
        done: 'Program kasirmu selesai!',
      },
      {
        title: 'Semua mini project selesai!',
        body: `<p>Luar biasa. Kamu sudah membangun tiga program utuh: rapor nilai, aplikasi to-do, dan kasir. Semuanya hanya dengan dasar yang kamu pelajari: variabel, kondisi, perulangan, fungsi, array, dan object.</p>
<p>Yang lebih penting dari kodenya adalah <b>cara berpikirnya</b>: memecah masalah besar menjadi langkah kecil, menyelesaikan satu per satu, lalu menyatukannya.</p>
<p>Ide untuk dicoba sendiri di <b>Workspace</b>:</p><ul><li>Rapor: tambahkan nilai tertinggi dan terendah.</li><li>To-do: fungsi <code>hapus(nomor)</code> memakai <code>splice</code>.</li><li>Kasir: diskon bertingkat (5% di atas 30000, 10% di atas 40000).</li><li>Buat versi HTML dari salah satu project, dengan tombol dan tampilan di halaman.</li></ul>`,
        code: 'console.log("Saya sudah menyelesaikan 3 mini project!");',
      },
    ],
  },
];
