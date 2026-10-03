// Progressive hints per "try" step, keyed by step title (see lessons.js).
// hints go from concept reminder to concrete steps; skeleton is the last level:
// code with ___ blanks the learner fills in. After that only the full solution remains.
export const hints = {
  'Giliranmu: perkenalkan diri': {
    hints: [
      'Semua yang ada di dalam tanda kutip dicetak apa adanya. Jadi yang perlu kamu ubah hanya isi di antara kutip.',
      'Hapus tiga titik <code>...</code> setelah kata "saya", lalu ketik namamu di situ. Jangan hapus tanda kutip, kurung, atau titik komanya.',
    ],
    skeleton: 'console.log("Halo, nama saya ___");',
  },
  'Urutan dan komentar': {
    hints: [
      'Satu <code>console.log</code> menghasilkan satu baris output. Untuk 3 baris, kamu butuh 3 perintah.',
      'Komentar adalah baris yang diawali <code>//</code>. Isinya bebas, komputer mengabaikannya.',
      'Susunannya: satu baris komentar, lalu tiga baris <code>console.log("...");</code>, masing-masing di baris baru.',
    ],
    skeleton: '// ___\nconsole.log("___");\nconsole.log("___");\nconsole.log("___");',
  },
  'Buat variabelmu sendiri': {
    hints: [
      'Membuat variabel butuh tiga bagian: kata kunci (<code>const</code>), nama (<code>kota</code>), dan nilai setelah tanda <code>=</code>.',
      'Nama kota adalah teks, jadi nilainya harus dibungkus tanda kutip.',
      'Setelah dibuat, cetak isinya: tulis nama variabelnya <b>tanpa</b> kutip di dalam <code>console.log( )</code>.',
    ],
    skeleton: 'const kota = "___";\nconsole.log(___);',
  },
  'Latihan template literal': {
    hints: [
      'Template literal memakai backtick <code>`</code>, bukan kutip biasa. Tombolnya di kiri angka <kbd>1</kbd>.',
      'Buat dulu dua variabel dengan <code>const</code>, misalnya <code>nama</code> (teks) dan <code>umur</code> (angka).',
      'Di dalam backtick, sisipkan variabel dengan <code>${namaVariabel}</code>. Tanda dolar dan kurung kurawalnya wajib.',
    ],
    skeleton: 'const nama = "___";\nconst umur = ___;\nconsole.log(`Saya ${___}, umur ${___} tahun`);',
  },
  'Periksa tipe nilaimu': {
    hints: [
      'string pakai kutip (<code>"halo"</code>), number adalah angka tanpa kutip (<code>10</code>), boolean hanya <code>true</code> atau <code>false</code> tanpa kutip.',
      'Buat tiga variabel dengan nama berbeda, satu untuk setiap tipe.',
      '<code>typeof</code> ditulis sebelum nilai: <code>typeof namaVariabel</code>. Bungkus dengan <code>console.log( )</code> agar hasilnya terlihat.',
    ],
    skeleton: 'const teks = ___;\nconst angka = ___;\nconst benar = ___;\n\nconsole.log(typeof teks);\nconsole.log(typeof ___);\nconsole.log(typeof ___);',
  },
  'Hitung persegi panjang': {
    hints: [
      'Variabel bisa dipakai dalam hitungan seperti angka biasa: <code>panjang * lebar</code> sama dengan <code>8 * 5</code>.',
      'Rumusnya: luas = panjang × lebar, keliling = 2 × (panjang + lebar). Di JavaScript, tanda kali ditulis <code>*</code>.',
      'Kurung itu penting: <code>2 * panjang + lebar</code> hasilnya 21 (salah), sedangkan <code>2 * (panjang + lebar)</code> hasilnya 26.',
    ],
    skeleton: 'const panjang = 8;\nconst lebar = 5;\n\nconsole.log(panjang ___ lebar);\nconsole.log(2 * (___ + ___));',
  },
  'Cek umur': {
    hints: [
      'Perbandingan menghasilkan <code>true</code> atau <code>false</code>. <code>&gt;=</code> artinya "lebih besar atau sama dengan".',
      'Buat variabel <code>umur</code> dulu, lalu tulis perbandingannya langsung di dalam <code>console.log( )</code>.',
    ],
    skeleton: 'const umur = ___;\nconsole.log(umur ___ 17);',
  },
  'Ubah jalannya program': {
    hints: [
      'Blok <code>else</code> hanya jalan jika syarat <code>nilai &gt;= 70</code> bernilai <code>false</code>.',
      'Kamu tidak perlu mengubah <code>if</code>/<code>else</code>-nya. Cukup ganti angka di baris pertama.',
      'Angka berapa yang membuat <code>nilai &gt;= 70</code> salah? Semua angka di bawah 70.',
    ],
  },
  'Cuaca hari ini': {
    hints: [
      'Ada tiga kemungkinan (Panas, Hangat, Dingin), jadi kamu butuh <code>if</code>, <code>else if</code>, dan <code>else</code>.',
      'Urutkan dari syarat paling ketat: periksa <code>&gt; 30</code> dulu, baru <code>&gt; 20</code>. <code>else</code> menangkap sisanya.',
      'Setiap cabang berisi satu <code>console.log</code> dengan teks yang sesuai.',
    ],
    skeleton: 'const suhu = 25;\n\nif (suhu > ___) {\n  console.log("___");\n} else if (suhu > ___) {\n  console.log("___");\n} else {\n  console.log("___");\n}',
  },
  'Hitung 1 sampai 10': {
    hints: [
      'Perulangan <code>for</code> punya tiga bagian di dalam kurung: mulai dari mana, sampai kapan, dan langkahnya.',
      'Mulai: <code>let i = 1</code>. Sampai: <code>i &lt;= 10</code>. Langkah: <code>i++</code>. Pisahkan dengan titik koma.',
      'Di dalam kurung kurawal cukup satu baris: <code>console.log(i);</code>',
    ],
    skeleton: 'for (let i = ___; i <= ___; i++) {\n  console.log(___);\n}',
  },
  'Hitung mundur': {
    hints: [
      'Hitung mundur berarti penghitung mulai dari angka besar lalu berkurang.',
      'Mulai dari <code>i = 5</code>, lanjut selama <code>i &gt;= 1</code>, dan langkahnya <code>i--</code> (kurangi 1).',
      '"Selesai!" hanya dicetak sekali, jadi tulis <b>setelah</b> kurung kurawal penutup perulangan.',
    ],
    skeleton: 'for (let i = ___; i >= ___; i--) {\n  console.log(i);\n}\nconsole.log("___");',
  },
  'Fungsi yang mengembalikan nilai': {
    hints: [
      'Kuadrat artinya angka dikali dirinya sendiri: 7 × 7 = 49.',
      'Angka yang dikirim saat memanggil tersimpan di parameter <code>angka</code>. Pakai nama itu di dalam fungsi.',
      '<code>return</code> mengirim hasil keluar dari fungsi. Tanpa <code>return</code>, hasilnya <code>undefined</code>.',
    ],
    skeleton: 'function kuadrat(angka) {\n  return ___ * ___;\n}\n\nconsole.log(kuadrat(7));',
  },
  'Buat arrow function': {
    hints: [
      'Bentuk arrow function: <code>const nama = (parameter) =&gt; hasil;</code>',
      'Fungsi ini butuh dua parameter, misalnya <code>a</code> dan <code>b</code>, dipisah koma.',
      'Hasilnya <code>a * b</code>. Karena hanya satu ekspresi, tidak perlu menulis <code>return</code>.',
    ],
    skeleton: 'const kali = (___, ___) => ___ * ___;\nconsole.log(kali(6, 7));',
  },
  'Tambah isi daftar': {
    hints: [
      '<code>push</code> adalah method array untuk menambah item di akhir daftar.',
      'Cara pakainya: <code>namaArray.push(itemBaru)</code>. Ulangi sekali lagi untuk item kedua.',
      'Cetak array <b>setelah</b> kedua <code>push</code>, supaya isinya sudah lengkap.',
    ],
    skeleton: 'const makanan = ["nasi goreng"];\nmakanan.push("___");\nmakanan.push("___");\nconsole.log(makanan);',
  },
  'Gandakan angka': {
    hints: [
      '<code>map</code> menjalankan fungsi untuk setiap item lalu mengumpulkan hasilnya menjadi array baru.',
      'Fungsi di dalam <code>map</code> menerima satu item (misal <code>n</code>) dan mengembalikan nilai barunya: <code>(n) =&gt; ...</code>',
      'Simpan hasil <code>map</code> ke variabel baru, lalu cetak variabel itu, bukan <code>angka</code>.',
    ],
    skeleton: 'const angka = [1, 2, 3, 4, 5];\nconst dobel = angka.map((n) => ___);\nconsole.log(___);',
  },
  'Buat object buku': {
    hints: [
      'Object ditulis dengan kurung kurawal berisi pasangan <code>nama: nilai</code>, dipisah koma.',
      'Tiga properti yang dibutuhkan: <code>judul</code> (teks), <code>penulis</code> (teks), <code>halaman</code> (angka).',
      'Ambil nilainya dengan titik, misalnya <code>buku.judul</code>, lalu gabungkan dengan template literal.',
    ],
    skeleton: 'const buku = {\n  judul: "___",\n  penulis: "___",\n  halaman: ___,\n};\nconsole.log(`${buku.___} oleh ${buku.___}`);',
  },
  'Total belanja': {
    hints: [
      'Untuk menjumlahkan banyak angka, kamu butuh wadah yang mulai dari 0 lalu ditambah sedikit demi sedikit.',
      'Buat <code>let total = 0;</code> <b>sebelum</b> perulangan. Pakai <code>let</code> karena nilainya akan berubah.',
      'Di dalam <code>for (const item of belanja)</code>, tambahkan harganya: <code>total += item.harga;</code>',
      'Cetak <code>total</code> <b>setelah</b> perulangan selesai, supaya tercetak sekali dengan nilai akhirnya.',
    ],
    skeleton: 'const belanja = [\n  { nama: "Buku", harga: 15000 },\n  { nama: "Pena", harga: 5000 },\n  { nama: "Tas", harga: 120000 },\n];\n\nlet total = ___;\nfor (const item of belanja) {\n  total += item.___;\n}\nconsole.log(___);',
  },
};
