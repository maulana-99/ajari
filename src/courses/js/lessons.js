// Lesson content. Each step: explain (read + run the example) or try (small guided task).
// check(ctx) returns true, or a friendly string telling what is still missing.
// ctx = { code, logs: string[], error }. Checks judge the result, not exact spelling (see ../check.js).
// `done` may be a function (ctx) => string to comment on how the task was solved.
import { code as has, hasNum, lines, loose, nums, printed } from '../check.js';

const out = (c) => c.logs.join('\n');
// Values assigned in declarations like `const nama = "Rani"` or `let umur = 14`.
const declaredValues = (c) =>
  [...c.code.matchAll(/\b(?:const|let|var)\s+\w+\s*=\s*(?:["'`]([^"'`]*)["'`]|(-?\d+(?:\.\d+)?))/g)]
    .map((m) => m[1] ?? m[2])
    .filter((v) => v && v.trim());

export const lessons = [
  {
    title: 'Halo, JavaScript!',
    intro: 'Kita mulai dari yang paling dasar: membuat komputer menulis sesuatu.',
    steps: [
      {
        title: 'Kenalan dulu',
        body: `<p>Halo! Aku akan menemanimu belajar <b>JavaScript</b>, bahasa yang dipakai untuk membuat website jadi interaktif: tombol yang bisa diklik, game, sampai aplikasi.</p>
<p>Tidak perlu terburu-buru. Setiap langkah kecil, dan kamu boleh mengubah kode sesukamu. Tidak ada nilai, tidak ada salah-benar yang menakutkan.</p>
<p>Di sebelah kiri ada editor dengan satu baris kode. Tekan <b>Jalankan</b> (atau <kbd>Ctrl</kbd>+<kbd>Enter</kbd>) dan lihat apa yang terjadi.</p>`,
        code: 'console.log("Halo, dunia!");',
        after: `<p>Berhasil! Kamu baru saja menjalankan program pertamamu.</p>
<ul><li><code>console.log(...)</code> artinya "tuliskan ke layar output".</li><li>Teks harus dibungkus tanda kutip <code>"..."</code>. Teks seperti ini disebut <b>string</b>.</li><li>Titik koma <code>;</code> menandai akhir sebuah perintah.</li></ul>`,
      },
      {
        title: 'Giliranmu: perkenalkan diri',
        body: '<p>Sekarang coba ubah sendiri. Komputer akan menulis apa pun yang kamu taruh di dalam <code>console.log</code>.</p>',
        task: 'Ganti tanda <code>...</code> dengan namamu, lalu jalankan.',
        code: '// Ganti titik-titik dengan namamu\nconsole.log("Halo, nama saya ...");',
        solution: 'console.log("Halo, nama saya Budi");',
        check: (c) => (out(c) && !out(c).includes('...') ? true : 'Masih ada tanda titik-titik. Gantikan dengan namamu ya.'),
        done: 'Bagus! Sekarang programmu bicara dengan namamu.',
      },
      {
        title: 'Urutan dan komentar',
        body: `<p>Program dibaca dari <b>atas ke bawah</b>, satu baris demi satu baris. Baris yang diawali <code>//</code> adalah <b>komentar</b>: catatan untuk manusia yang diabaikan komputer.</p>`,
        task: 'Cetak minimal <b>3 baris</b> tentang dirimu (misal hobi, kota, makanan favorit) dan tulis <b>satu komentar</b> dengan <code>//</code>.',
        code: '// Ceritakan tentang dirimu\n',
        solution: '// Tentang saya\nconsole.log("Hobi saya membaca");\nconsole.log("Saya tinggal di Bandung");\nconsole.log("Makanan favorit: bakso");',
        check: (c) => {
          if (c.logs.length < 3) return `Baru ${c.logs.length} baris tercetak. Tambahkan sampai 3 baris.`;
          if (!/\/\/|\/\*/.test(c.code)) return 'Tiga baris sudah ada. Tinggal tambahkan satu komentar dengan <code>//</code>.';
          return true;
        },
        done: 'Mantap. Kamu sudah paham urutan eksekusi dan komentar.',
      },
    ],
  },
  {
    title: 'Variabel',
    intro: 'Variabel adalah kotak berlabel untuk menyimpan nilai.',
    steps: [
      {
        title: 'Kotak penyimpanan dengan let',
        body: `<p>Bayangkan sebuah kotak dengan label <code>umur</code>. Di dalamnya kita simpan angka. Kotak itu bisa kita isi ulang kapan saja.</p>
<p>Di JavaScript kita membuat kotak dengan kata kunci <code>let</code>. Perhatikan kode di kiri: nilainya diganti di tengah jalan.</p>`,
        code: 'let umur = 12;\nconsole.log(umur);\n\numur = 13;\nconsole.log(umur);',
        after: '<p>Awalnya <code>umur</code> berisi 12, lalu kita isi ulang jadi 13. Tanda <code>=</code> di sini artinya "simpan ke dalam", bukan "sama dengan" seperti di matematika.</p>',
      },
      {
        title: 'Nilai tetap dengan const',
        body: `<p>Kalau nilainya tidak akan berubah, pakai <code>const</code>. Ini seperti kotak yang digembok setelah diisi.</p>
<p>Eksperimen: hapus tanda <code>//</code> di baris terakhir lalu jalankan. Kamu akan melihat sebuah <b>error</b>. Jangan takut, error adalah cara komputer memberi tahu apa yang kurang pas.</p>`,
        code: 'const nama = "Sari";\nconsole.log(nama);\n\n// nama = "Budi";',
        after: '<p>Aman. Sekarang coba hapus <code>//</code> di baris terakhir dan jalankan lagi untuk melihat error-nya.</p>',
      },
      {
        title: 'Buat variabelmu sendiri',
        body: '<p>Aturan nama variabel: tanpa spasi, tidak diawali angka, dan huruf besar/kecil dianggap berbeda (<code>kota</code> dan <code>Kota</code> adalah dua kotak berbeda).</p>',
        task: 'Buat variabel <code>const kota</code> berisi nama kotamu, lalu cetak dengan <code>console.log(kota)</code>.',
        code: '// buat variabel kota di sini\n',
        solution: 'const kota = "Jakarta";\nconsole.log(kota);',
        check: (c) => {
          if (!has(c, /\b(const|let|var)\s+kota\b/i)) return 'Belum ada variabel bernama <code>kota</code>. Coba <code>const kota = "...";</code>';
          if (!c.logs.length) return 'Variabel sudah dibuat. Sekarang cetak isinya dengan <code>console.log(kota);</code>';
          const val = /\bkota\s*=\s*["'`]([^"'`]*)["'`]/i.exec(c.code)?.[1];
          if (has(c, /console\.log\([^)"'`]*\bkota\b/i) || (val && printed(c, val))) return true;
          return 'Variabel sudah dibuat, tapi isinya belum tercetak. Coba <code>console.log(kota);</code>';
        },
        done: 'Tepat! Perhatikan: <code>kota</code> tanpa kutip berarti "isi kotak", sedangkan <code>"kota"</code> dengan kutip hanyalah teks.',
      },
      {
        title: 'Menyisipkan variabel ke dalam teks',
        body: `<p>Menggabungkan teks dan variabel paling rapi pakai <b>template literal</b>: teks dibungkus tanda backtick (<code>\`</code>) dan variabel disisipkan dengan <code>\${...}</code>.</p>`,
        code: 'const nama = "Dina";\nconst hobi = "membaca";\nconsole.log(`Halo, saya ${nama} dan hobi saya ${hobi}`);',
        after: '<p>Ubah isi <code>nama</code> dan <code>hobi</code>, lalu jalankan lagi. Kalimatnya ikut berubah otomatis. Itulah gunanya variabel.</p>',
      },
      {
        title: 'Latihan template literal',
        body: '<p>Backtick ada di sebelah kiri angka <kbd>1</kbd> pada keyboard.</p>',
        task: 'Buat dua variabel (misal <code>nama</code> dan <code>umur</code>) lalu cetak satu kalimat memakai template literal yang menyisipkan <b>keduanya</b>.',
        code: '',
        solution: 'const nama = "Rani";\nconst umur = 14;\nconsole.log(`Saya ${nama}, umur ${umur} tahun`);',
        check: (c) => {
          if (!c.logs.length) return 'Belum ada yang tercetak. Tampilkan kalimatmu dengan <code>console.log(...)</code>.';
          const shown = declaredValues(c).filter((v) => printed(c, v));
          return shown.length >= 2 ? true : 'Buat dua variabel (misal <code>nama</code> dan <code>umur</code>), lalu tampilkan <b>keduanya</b> dalam satu kalimat.';
        },
        done: (c) =>
          /`[^`]*\$\{/.test(c.code)
            ? 'Keren! Template literal akan sering kamu pakai.'
            : 'Kalimatnya sudah tampil dengan benar! Kamu menyambung teks dengan <code>+</code>, itu juga sah. Coba juga versi template literal (backtick dan <code>${...}</code>), karena lebih mudah dibaca.',
      },
    ],
  },
  {
    title: 'Tipe Data',
    intro: 'Nilai di JavaScript punya jenis. Mengenali jenisnya membantu kita menghindari kebingungan.',
    steps: [
      {
        title: 'Tiga tipe dasar',
        body: `<p>Tiga tipe yang paling sering ditemui:</p>
<ul><li><b>string</b>: teks, ditulis dengan kutip.</li><li><b>number</b>: angka, tanpa kutip.</li><li><b>boolean</b>: hanya <code>true</code> atau <code>false</code>.</li></ul>
<p>Kata <code>typeof</code> memberi tahu tipe sebuah nilai. Jalankan contoh di kiri.</p>`,
        code: 'console.log(typeof "halo");\nconsole.log(typeof 42);\nconsole.log(typeof true);\n\n// "42" dengan kutip adalah teks, bukan angka\nconsole.log(typeof "42");',
        after: '<p>Perhatikan baris terakhir: <code>"42"</code> memakai kutip, jadi tipenya <b>string</b> walaupun isinya angka.</p>',
      },
      {
        title: 'Periksa tipe nilaimu',
        body: '',
        task: 'Buat tiga variabel: satu berisi string, satu number, satu boolean. Cetak <code>typeof</code> dari masing-masing.',
        code: '',
        solution: 'const judul = "Belajar JS";\nconst jumlah = 10;\nconst selesai = false;\nconsole.log(typeof judul);\nconsole.log(typeof jumlah);\nconsole.log(typeof selesai);',
        check: (c) => {
          const miss = ['string', 'number', 'boolean'].filter((t) => !printed(c, t));
          return miss.length ? `Belum muncul tipe: ${miss.join(', ')}. Pastikan kamu mencetak <code>typeof</code> untuk ketiga variabel.` : true;
        },
        done: 'Benar. Sekarang kamu bisa memeriksa tipe nilai apa saja.',
      },
      {
        title: 'Kosong itu ada dua macam',
        body: '<p><code>undefined</code> artinya "belum diisi". <code>null</code> artinya "sengaja dikosongkan". Awalnya terlihat sama, tapi maknanya beda.</p>',
        code: 'let belumDiisi;\nconsole.log(belumDiisi);\n\nconst sengajaKosong = null;\nconsole.log(sengajaKosong);',
        after: '<p>Variabel yang dibuat tanpa nilai otomatis berisi <code>undefined</code>. Kalau kamu melihat <code>undefined</code> di hasil, biasanya ada yang lupa diisi.</p>',
      },
    ],
  },
  {
    title: 'Operator',
    intro: 'Operator adalah simbol untuk menghitung dan membandingkan.',
    steps: [
      {
        title: 'Berhitung',
        body: '<p>Operator matematika: <code>+</code> tambah, <code>-</code> kurang, <code>*</code> kali, <code>/</code> bagi, <code>%</code> sisa bagi, <code>**</code> pangkat. Coba jalankan, lalu ubah angkanya.</p>',
        code: 'console.log(10 + 5);\nconsole.log(10 - 5);\nconsole.log(10 * 5);\nconsole.log(10 / 5);\nconsole.log(10 % 3); // sisa bagi\nconsole.log(2 ** 3); // 2 pangkat 3',
        after: '<p><code>%</code> terlihat aneh di awal, tapi berguna, misalnya untuk mengecek bilangan ganjil/genap: <code>angka % 2</code> bernilai 0 jika genap.</p>',
      },
      {
        title: 'Hitung persegi panjang',
        body: '',
        task: 'Sebuah persegi panjang punya <code>panjang = 8</code> dan <code>lebar = 5</code>. Simpan di variabel, lalu cetak <b>luasnya</b> dan <b>kelilingnya</b>.',
        code: 'const panjang = 8;\nconst lebar = 5;\n',
        solution: 'const panjang = 8;\nconst lebar = 5;\nconsole.log(panjang * lebar);\nconsole.log(2 * (panjang + lebar));',
        check: (c) => {
          if (!hasNum(c, 40)) return 'Luas belum muncul. Luas = panjang * lebar, hasilnya harus 40.';
          if (!hasNum(c, 26)) return 'Luas sudah benar (40). Sekarang keliling: 2 * (panjang + lebar) = 26.';
          return true;
        },
        done: 'Tepat! Kurung <code>( )</code> mengatur urutan hitungan, sama seperti di matematika.',
      },
      {
        title: 'Membandingkan',
        body: `<p>Perbandingan menghasilkan <b>boolean</b>: <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, dan untuk sama dengan gunakan <code>===</code> (tiga sama dengan).</p>
<p>Jalankan dan perhatikan hasil tiap baris, terutama dua baris terakhir.</p>`,
        code: 'console.log(5 > 3);\nconsole.log(5 === "5"); // angka vs teks\nconsole.log(5 == "5");  // pembanding longgar\nconsole.log("5" + 3);   // string + angka',
        after: `<p>Dua hal penting:</p><ul><li><code>===</code> ketat (tipe harus sama), <code>==</code> longgar dan bisa mengejutkan. Biasakan pakai <code>===</code>.</li><li><code>"5" + 3</code> menjadi <code>"53"</code>: jika salah satunya teks, <code>+</code> menyambung teks.</li></ul>`,
      },
      {
        title: 'Cek umur',
        body: '',
        task: 'Buat variabel <code>umur</code> berisi 20 dan cetak hasil <code>umur &gt;= 17</code>. Lalu ubah umur menjadi 15 dan lihat hasilnya berubah.',
        code: '',
        solution: 'const umur = 20;\nconsole.log(umur >= 17);',
        check: (c) =>
          has(c, />=|<=|>|<|===|!==|==/) && (printed(c, 'true') || printed(c, 'false'))
            ? true
            : 'Cetak hasil perbandingan, misalnya <code>console.log(umur >= 17);</code>. Hasilnya harus true atau false.',
        done: 'Bagus! Perbandingan inilah bahan utama untuk membuat keputusan, yang kita pelajari berikutnya.',
      },
    ],
  },
  {
    title: 'Kondisi',
    intro: 'Membuat program mengambil keputusan.',
    steps: [
      {
        title: 'if dan else',
        body: '<p>Program bisa memilih jalan. Format: <code>if (syarat) { ... } else { ... }</code>. Blok di dalam <code>{ }</code> hanya jalan jika syaratnya <code>true</code>.</p>',
        code: 'const nilai = 75;\n\nif (nilai >= 70) {\n  console.log("Lulus");\n} else {\n  console.log("Belum lulus");\n}',
        after: '<p>Karena 75 &gt;= 70 bernilai true, blok <code>if</code> yang jalan. Blok <code>else</code> dilewati.</p>',
      },
      {
        title: 'Ubah jalannya program',
        body: '',
        task: 'Ubah nilai supaya yang tercetak adalah <b>Belum lulus</b>.',
        code: 'const nilai = 75;\n\nif (nilai >= 70) {\n  console.log("Lulus");\n} else {\n  console.log("Belum lulus");\n}',
        solution: 'const nilai = 60;\n\nif (nilai >= 70) {\n  console.log("Lulus");\n} else {\n  console.log("Belum lulus");\n}',
        check: (c) => (printed(c, 'belum lulus') ? true : 'Yang tercetak masih "' + out(c).trim() + '". Coba kecilkan nilainya.'),
        done: 'Betul. Kode yang sama menghasilkan keluaran berbeda tergantung datanya.',
      },
      {
        title: 'Banyak pilihan: else if',
        body: '<p>Untuk lebih dari dua pilihan, sambung dengan <code>else if</code>. JavaScript memeriksa dari atas dan berhenti di syarat pertama yang benar.</p>',
        code: 'const nilai = 82;\n\nif (nilai >= 90) {\n  console.log("A");\n} else if (nilai >= 80) {\n  console.log("B");\n} else if (nilai >= 70) {\n  console.log("C");\n} else {\n  console.log("D");\n}',
        after: '<p>Coba ganti nilai dengan 95, 71, dan 40 untuk melihat tiap cabang.</p>',
      },
      {
        title: 'Cuaca hari ini',
        body: '',
        task: 'Untuk <code>suhu</code>: lebih dari 30 cetak "Panas", lebih dari 20 cetak "Hangat", selain itu "Dingin". Dengan <code>suhu = 25</code> hasilnya harus "Hangat".',
        code: 'const suhu = 25;\n\n// tulis if / else if / else di sini\n',
        solution: 'const suhu = 25;\n\nif (suhu > 30) {\n  console.log("Panas");\n} else if (suhu > 20) {\n  console.log("Hangat");\n} else {\n  console.log("Dingin");\n}',
        check: (c) => {
          const ok = printed(c, 'hangat') && !printed(c, 'panas') && !printed(c, 'dingin');
          return ok ? true : 'Hasil saat ini: "' + out(c).trim() + '". Dengan suhu 25 seharusnya hanya "Hangat" yang tercetak.';
        },
        done: 'Sempurna. Kamu sudah bisa membuat program yang memilih.',
      },
    ],
  },
  {
    title: 'Perulangan',
    intro: 'Mengulang pekerjaan tanpa menulis ulang kode.',
    steps: [
      {
        title: 'Perulangan for',
        body: `<p>Kalau ingin mencetak 5 baris, menulis <code>console.log</code> 5 kali itu melelahkan. Pakai <code>for</code>:</p>
<ul><li><code>let i = 1</code>: titik awal.</li><li><code>i &lt;= 5</code>: lanjut selama syarat ini benar.</li><li><code>i++</code>: setelah tiap putaran, tambah <code>i</code> sebanyak 1.</li></ul>`,
        code: 'for (let i = 1; i <= 5; i++) {\n  console.log("Hitungan ke-" + i);\n}',
        after: '<p>Ubah <code>5</code> menjadi <code>10</code> dan jalankan lagi.</p>',
      },
      {
        title: 'Hitung 1 sampai 10',
        body: '',
        task: 'Gunakan perulangan <code>for</code> untuk mencetak angka 1 sampai 10, satu angka per baris.',
        code: '',
        solution: 'for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}',
        check: (c) => {
          if (!has(c, /\b(for|while)\b|\.forEach\(/)) return 'Gunakan perulangan <code>for</code>, jangan menulis console.log satu per satu.';
          return nums(c).join(',') === '1,2,3,4,5,6,7,8,9,10' ? true : 'Hasil saat ini: ' + c.logs.join(', ') + '. Targetnya angka 1 sampai 10.';
        },
        done: 'Hebat! Variabel <code>i</code> otomatis berubah di setiap putaran.',
      },
      {
        title: 'Perulangan while',
        body: '<p><code>while</code> mengulang selama syarat benar. Cocok jika kita tidak tahu berapa kali harus mengulang. Hati-hati: pastikan ada yang membuat syaratnya akhirnya jadi salah, kalau tidak, perulangan tak pernah berhenti (kami akan menghentikannya paksa setelah 3 detik).</p>',
        code: 'let hitung = 3;\n\nwhile (hitung > 0) {\n  console.log(hitung);\n  hitung--; // kurangi 1\n}\n\nconsole.log("Meluncur!");',
        after: '<p>Coba hapus baris <code>hitung--;</code> dan jalankan untuk melihat apa yang terjadi saat perulangan tak berhenti.</p>',
      },
      {
        title: 'Hitung mundur',
        body: '',
        task: 'Cetak 5, 4, 3, 2, 1 (satu per baris), lalu terakhir cetak "Selesai!".',
        code: '',
        solution: 'for (let i = 5; i >= 1; i--) {\n  console.log(i);\n}\nconsole.log("Selesai!");',
        check: (c) =>
          nums(c).join(',') === '5,4,3,2,1' && loose(lines(c).at(-1) ?? '').includes('selesai')
            ? true
            : 'Hasil saat ini: ' + c.logs.join(', ') + '. Targetnya 5, 4, 3, 2, 1, lalu Selesai! di baris terakhir.',
        done: 'Selesai! Kamu sudah menguasai dua jenis perulangan.',
      },
    ],
  },
  {
    title: 'Fungsi',
    intro: 'Membungkus langkah-langkah agar bisa dipakai berulang kali.',
    steps: [
      {
        title: 'Membuat dan memanggil fungsi',
        body: '<p>Fungsi seperti resep: ditulis sekali, dipakai kapan saja. Bahan-bahannya disebut <b>parameter</b>. Menjalankan resepnya disebut <b>memanggil</b> fungsi.</p>',
        code: 'function sapa(nama) {\n  console.log("Halo, " + nama + "!");\n}\n\nsapa("Budi");\nsapa("Sari");',
        after: '<p>Fungsi ditulis sekali, dipanggil dua kali dengan nilai berbeda. Tanpa dipanggil, isi fungsi tidak jalan.</p>',
      },
      {
        title: 'Fungsi yang mengembalikan nilai',
        body: '<p><code>return</code> mengirim hasil keluar dari fungsi supaya bisa dipakai di tempat lain.</p>',
        task: 'Lengkapi fungsi <code>kuadrat</code> agar mengembalikan angka dikali dirinya sendiri. <code>kuadrat(7)</code> harus menghasilkan 49.',
        code: 'function kuadrat(angka) {\n  // tulis return di sini\n}\n\nconsole.log(kuadrat(7));',
        solution: 'function kuadrat(angka) {\n  return angka * angka;\n}\n\nconsole.log(kuadrat(7));',
        check: (c) =>
          hasNum(c, 49)
            ? true
            : printed(c, 'undefined')
              ? 'Hasilnya <code>undefined</code> karena fungsi belum mengembalikan apa pun. Tambahkan <code>return</code>.'
              : 'Hasil saat ini ' + (out(c).trim() || '(kosong)') + ', targetnya 49.',
        done: 'Tepat! Fungsi tanpa <code>return</code> menghasilkan <code>undefined</code>.',
      },
      {
        title: 'Arrow function',
        body: '<p>Ada cara penulisan lebih ringkas, disebut <b>arrow function</b>. Kedua fungsi di bawah melakukan hal yang sama.</p>',
        code: 'function tambah1(a, b) {\n  return a + b;\n}\n\nconst tambah2 = (a, b) => a + b;\n\nconsole.log(tambah1(2, 3));\nconsole.log(tambah2(2, 3));',
        after: '<p>Jika isi fungsi hanya satu ekspresi, <code>return</code> dan kurung kurawal boleh dihilangkan.</p>',
      },
      {
        title: 'Buat arrow function',
        body: '',
        task: 'Buat arrow function bernama <code>kali</code> yang menerima dua angka dan mengembalikan hasil kalinya. Cetak <code>kali(6, 7)</code>.',
        code: '',
        solution: 'const kali = (a, b) => a * b;\nconsole.log(kali(6, 7));',
        check: (c) =>
          !has(c, /=>/)
            ? 'Hasilnya boleh benar, tapi tugas ini melatih arrow function. Buat fungsinya dengan tanda panah <code>=></code>.'
            : hasNum(c, 42)
              ? true
              : 'Hasil saat ini ' + (out(c).trim() || '(kosong)') + ', targetnya 42.',
        done: 'Keren, kamu sudah bisa menulis fungsi dengan dua gaya.',
      },
    ],
  },
  {
    title: 'Array',
    intro: 'Menyimpan banyak nilai dalam satu daftar.',
    steps: [
      {
        title: 'Daftar bernomor',
        body: '<p>Array adalah daftar yang ditulis dalam <code>[ ]</code>. Setiap isi punya nomor urut (<b>indeks</b>) yang <b>dimulai dari 0</b>, bukan 1.</p>',
        code: 'const buah = ["apel", "jeruk", "mangga"];\n\nconsole.log(buah[0]);    // item pertama\nconsole.log(buah.length); // jumlah item\n\nbuah.push("pisang");      // tambah di akhir\nconsole.log(buah);',
        after: '<p>Indeks mulai dari 0, jadi <code>buah[0]</code> adalah "apel". Item terakhir selalu <code>buah[buah.length - 1]</code>.</p>',
      },
      {
        title: 'Tambah isi daftar',
        body: '',
        task: 'Tambahkan dua makanan favoritmu ke array dengan <code>push</code>, lalu cetak seluruh array.',
        code: 'const makanan = ["nasi goreng"];\n',
        solution: 'const makanan = ["nasi goreng"];\nmakanan.push("bakso");\nmakanan.push("sate");\nconsole.log(makanan);',
        check: (c) => {
          if (!has(c, /\.push\(/)) return 'Gunakan <code>makanan.push("...")</code> untuk menambah item.';
          const arr = lines(c).find((l) => /^\s*\[.*\]\s*$/.test(l));
          const count = arr ? arr.split(',').length : 0;
          return count >= 3 || nums(c).some((n) => n >= 3) ? true : 'Array harus berisi 3 item atau lebih. Tambahkan dua item dengan <code>push</code>, lalu cetak array-nya.';
        },
        done: 'Bagus. <code>push</code> menambah ke akhir daftar.',
      },
      {
        title: 'Mengolah setiap item',
        body: `<p>Dua alat favorit untuk array:</p><ul><li><code>forEach</code>: lakukan sesuatu untuk <i>setiap</i> item.</li><li><code>map</code>: ubah setiap item dan hasilkan array <i>baru</i>.</li></ul>`,
        code: 'const angka = [1, 2, 3];\n\nangka.forEach((n) => {\n  console.log("Angka: " + n);\n});\n\nconst tambahSepuluh = angka.map((n) => n + 10);\nconsole.log(tambahSepuluh);',
        after: '<p><code>map</code> tidak mengubah array asal. Ia membuat array baru berisi hasilnya.</p>',
      },
      {
        title: 'Gandakan angka',
        body: '',
        task: 'Gunakan <code>map</code> untuk membuat array baru berisi setiap angka dikali 2, lalu cetak. Hasilnya <code>[2, 4, 6, 8, 10]</code>.',
        code: 'const angka = [1, 2, 3, 4, 5];\n',
        solution: 'const angka = [1, 2, 3, 4, 5];\nconst dobel = angka.map((n) => n * 2);\nconsole.log(dobel);',
        check: (c) =>
          printed(c, '[2, 4, 6, 8, 10]')
            ? true
            : 'Hasil saat ini ' + (out(c).trim() || '(kosong)') + '. Targetnya [2, 4, 6, 8, 10]. Pastikan kamu mencetak array hasil <code>map</code>.',
        done: 'Luar biasa! <code>map</code> adalah salah satu fitur yang paling sering dipakai pengembang JavaScript.',
      },
    ],
  },
  {
    title: 'Object',
    intro: 'Mengelompokkan data yang saling berhubungan.',
    steps: [
      {
        title: 'Data dengan label',
        body: '<p>Array menyimpan daftar berdasarkan nomor. <b>Object</b> menyimpan data berdasarkan <b>nama</b> (properti), cocok untuk menggambarkan satu benda, misalnya seorang siswa.</p>',
        code: 'const siswa = {\n  nama: "Rani",\n  umur: 14,\n  hobi: ["membaca", "menggambar"],\n  sapa() {\n    console.log("Hai, aku " + this.nama);\n  },\n};\n\nconsole.log(siswa.nama);\nconsole.log(siswa["umur"]);\nconsole.log(siswa.hobi[0]);\nsiswa.sapa();',
        after: '<p>Properti diakses dengan titik: <code>siswa.nama</code>. Fungsi di dalam object disebut <b>method</b>, dan <code>this</code> menunjuk ke object itu sendiri.</p>',
      },
      {
        title: 'Buat object buku',
        body: '',
        task: 'Buat object <code>buku</code> dengan properti <code>judul</code>, <code>penulis</code>, dan <code>halaman</code>. Lalu cetak kalimat seperti "Laskar Pelangi oleh Andrea Hirata".',
        code: '',
        solution: 'const buku = {\n  judul: "Laskar Pelangi",\n  penulis: "Andrea Hirata",\n  halaman: 529,\n};\nconsole.log(`${buku.judul} oleh ${buku.penulis}`);',
        check: (c) => {
          if (!has(c, /\b(const|let|var)\s+buku\s*=\s*\{/i)) return 'Buat dulu object-nya: <code>const buku = { ... };</code>';
          for (const p of ['judul', 'penulis', 'halaman'])
            if (!has(c, new RegExp('\\b' + p + '\\s*:', 'i'))) return 'Object belum punya properti <code>' + p + '</code>.';
          if (!c.logs.length) return 'Object sudah lengkap. Sekarang cetak kalimatnya dengan <code>console.log(...)</code>.';
          const val = (p) => new RegExp(p + '\\s*:\\s*["\'`]([^"\'`]+)', 'i').exec(c.code)?.[1];
          if (val('judul') && !printed(c, val('judul'))) return 'Judul buku belum tampil di kalimat. Ambil dengan <code>buku.judul</code>.';
          if (val('penulis') && !printed(c, val('penulis'))) return 'Judul sudah tampil. Tambahkan penulisnya dengan <code>buku.penulis</code>.';
          return true;
        },
        done: 'Mantap! Hampir semua data di dunia nyata (user, produk, pesan) berbentuk object.',
      },
      {
        title: 'Array berisi object',
        body: '<p>Gabungan paling umum: array yang berisi banyak object, seperti daftar belanja. Kita bisa memutarnya dengan <code>for...of</code>.</p>',
        code: 'const belanja = [\n  { nama: "Buku", harga: 15000 },\n  { nama: "Pena", harga: 5000 },\n];\n\nfor (const item of belanja) {\n  console.log(item.nama + ": " + item.harga);\n}',
        after: '<p><code>for...of</code> mengambil satu item per putaran, tanpa perlu mengurus indeks.</p>',
      },
      {
        title: 'Total belanja',
        body: '',
        task: 'Hitung total harga seluruh barang di <code>belanja</code> lalu cetak. Total yang benar adalah 140000.',
        code: 'const belanja = [\n  { nama: "Buku", harga: 15000 },\n  { nama: "Pena", harga: 5000 },\n  { nama: "Tas", harga: 120000 },\n];\n',
        solution: 'const belanja = [\n  { nama: "Buku", harga: 15000 },\n  { nama: "Pena", harga: 5000 },\n  { nama: "Tas", harga: 120000 },\n];\n\nlet total = 0;\nfor (const item of belanja) {\n  total += item.harga;\n}\nconsole.log(total);',
        check: (c) => (hasNum(c, 140000) ? true : 'Hasil saat ini: ' + (out(c) || '(kosong)') + '. Totalnya harus 140000.'),
        done: 'Kamu berhasil menggabungkan array, object, dan perulangan.',
      },
      {
        title: 'Selamat, kamu sudah punya dasarnya!',
        body: `<p>Kamu sudah mempelajari variabel, tipe data, operator, kondisi, perulangan, fungsi, array, dan object. Itu fondasi JavaScript yang sebenarnya.</p>
<p>Saran langkah berikutnya:</p><ul><li>Tekan <b>Lanjut</b> untuk mengerjakan <b>3 mini project</b>: Rapor Nilai Kelas, Daftar Tugas, dan Kasir Mini. Di sana kamu menggabungkan semua yang sudah dipelajari.</li><li>Buka halaman <b>Workspace</b> untuk membuat proyek sendiri, termasuk halaman HTML dengan JavaScript.</li><li>Ulangi pelajaran mana pun yang masih terasa kurang. Kodemu tersimpan otomatis.</li><li>Topik lanjutan: DOM, event, async/await, dan fetch.</li></ul>`,
        code: 'console.log("Terima kasih sudah belajar!");',
      },
    ],
  },
];
