// Deep-dive explanations keyed by step title (see ./lessons.js).
// lines: [code, meaning] pairs (code is plain text) | flow: execution order | result: why the output looks that way
// solWhy: explains the sample solution of a "try" step (shown with "Lihat contoh jawaban")
export const explain = {
  'if dan else': {
    lines: [
      ['const nilai = 75;', 'Membuat kotak bernama <code>nilai</code> berisi 75. Pakai <code>const</code> karena nilainya tidak kita ubah.'],
      ['if (nilai >= 70) {', 'Mengajukan pertanyaan: "apakah nilai lebih besar atau sama dengan 70?". JavaScript menghitung isi kurung menjadi <code>true</code> atau <code>false</code>. Tanda <code>{</code> membuka blok yang hanya jalan jika jawabannya <code>true</code>.'],
      ['  console.log("Lulus");', 'Isi blok <code>if</code>. Hanya dijalankan jika syarat <code>true</code>.'],
      ['} else {', 'Menutup blok <code>if</code> dan membuka blok cadangan. Blok ini hanya jalan jika syarat tadi <code>false</code>.'],
      ['  console.log("Belum lulus");', 'Isi blok <code>else</code>. Dilewati jika syarat <code>true</code>.'],
      ['}', 'Menutup blok <code>else</code>.'],
    ],
    flow: [
      '<code>nilai</code> disimpan dengan isi 75.',
      'JavaScript mengganti <code>nilai</code> dengan isinya: <code>75 &gt;= 70</code>. Hasilnya <code>true</code>.',
      'Karena <code>true</code>, program masuk ke blok <code>if</code> dan menjalankan <code>console.log("Lulus")</code>.',
      'Blok <code>else</code> dilompati seluruhnya, lalu program selesai.',
    ],
    result: 'Output <code>Lulus</code> berasal dari <code>console.log("Lulus")</code> di blok <code>if</code>, karena 75 &gt;= 70 benar. Jika <code>nilai</code> diganti 60, maka <code>60 &gt;= 70</code> bernilai <code>false</code>, dan yang jalan adalah blok <code>else</code>. <b>Hanya satu</b> dari kedua blok yang pernah dijalankan.',
  },
  'Ubah jalannya program': {
    solWhy: 'Nilai 60 membuat <code>60 &gt;= 70</code> bernilai <code>false</code>. JavaScript melompati blok <code>if</code> dan menjalankan blok <code>else</code>, sehingga yang tercetak "Belum lulus". Yang kamu ubah hanya <i>data</i>-nya, struktur program tetap sama.',
  },
  'Banyak pilihan: else if': {
    lines: [
      ['const nilai = 82;', 'Data yang akan diperiksa.'],
      ['if (nilai >= 90) {', 'Pertanyaan pertama: apakah 82 &gt;= 90? Salah, jadi blok ini dilewati.'],
      ['  console.log("A");', 'Hanya dicetak jika nilai &gt;= 90.'],
      ['} else if (nilai >= 80) {', '"Kalau tidak, coba pertanyaan berikutnya." Hanya diperiksa jika pertanyaan sebelumnya <code>false</code>. 82 &gt;= 80 benar, jadi blok ini dijalankan.'],
      ['  console.log("B");', 'Inilah yang tercetak.'],
      ['} else if (nilai >= 70) {', 'Tidak pernah diperiksa, karena sudah ada cabang di atasnya yang cocok.'],
      ['} else {', 'Cadangan: jalan hanya jika <b>semua</b> syarat di atas salah. Tidak butuh syarat.'],
    ],
    flow: [
      'Periksa <code>82 &gt;= 90</code>: <code>false</code>, lanjut ke cabang berikutnya.',
      'Periksa <code>82 &gt;= 80</code>: <code>true</code>, jalankan <code>console.log("B")</code>.',
      'Cabang <code>&gt;= 70</code> dan <code>else</code> dilewati, walaupun 82 &gt;= 70 sebenarnya juga benar.',
    ],
    result: 'Output <code>B</code>. JavaScript memeriksa dari atas dan berhenti di syarat benar <b>pertama</b>. Karena itu urutan penting: kalau <code>&gt;= 70</code> ditulis paling atas, nilai 95 pun akan dapat "C".',
  },
  'Cuaca hari ini': {
    solWhy: 'Dengan <code>suhu = 25</code>: <code>25 &gt; 30</code> salah, lanjut. <code>25 &gt; 20</code> benar, cetak "Hangat" lalu berhenti. Syarat paling ketat (<code>&gt; 30</code>) harus di atas; kalau dibalik, suhu 35 akan dianggap "Hangat" karena <code>35 &gt; 20</code> lebih dulu benar. <code>else</code> tanpa syarat menangkap sisanya (20 ke bawah), yaitu "Dingin".',
  },

  'Perulangan for': {
    lines: [
      ['for (', 'Memulai perulangan. Di dalam kurung ada tiga bagian dipisah titik koma.'],
      ['let i = 1;', '<b>Awal</b>: dijalankan sekali saja di permulaan. <code>i</code> adalah penghitung putaran, dimulai dari 1.'],
      ['i <= 5;', '<b>Syarat</b>: dicek sebelum setiap putaran. <code>true</code> berarti lanjut, <code>false</code> berarti berhenti.'],
      ['i++', '<b>Langkah</b>: dijalankan setelah setiap putaran selesai. Artinya <code>i = i + 1</code>.'],
      ['  console.log("Hitungan ke-" + i);', 'Isi perulangan. <code>"Hitungan ke-" + i</code> menyambung teks tetap dengan nilai <code>i</code> saat ini.'],
    ],
    flow: [
      'Awal: <code>i = 1</code>.',
      'Putaran 1: cek <code>1 &lt;= 5</code> benar, cetak "Hitungan ke-1", lalu <code>i</code> jadi 2.',
      'Putaran 2 sampai 4: pola sama, <code>i</code> bertambah 1 tiap putaran.',
      'Putaran 5: <code>i = 5</code>, cek benar, cetak "Hitungan ke-5", lalu <code>i</code> jadi 6.',
      'Cek <code>6 &lt;= 5</code> salah. Perulangan berhenti.',
    ],
    result: 'Ada 5 baris karena <code>i</code> bernilai 1, 2, 3, 4, 5 saat syaratnya benar. Teks "Hitungan ke-" selalu sama, sedangkan angkanya berasal dari <code>i</code> yang berubah tiap putaran. Angka 6 tidak tercetak karena syarat gagal <i>sebelum</i> isi perulangan dijalankan.',
  },
  'Hitung 1 sampai 10': {
    solWhy: 'Polanya sama dengan contoh sebelumnya, hanya batasnya diganti jadi <code>i &lt;= 10</code>. <code>console.log(i)</code> mencetak nilai <code>i</code> langsung tanpa teks tambahan, sehingga yang muncul hanya angka 1 sampai 10.',
  },
  'Perulangan while': {
    lines: [
      ['let hitung = 3;', 'Penghitung. Pakai <code>let</code> karena nilainya akan terus berkurang.'],
      ['while (hitung > 0) {', 'Selama <code>hitung &gt; 0</code> benar, ulangi isi blok. Syarat dicek <b>sebelum</b> setiap putaran.'],
      ['  console.log(hitung);', 'Mencetak nilai <code>hitung</code> saat ini.'],
      ['  hitung--; // kurangi 1', 'Mengurangi <code>hitung</code> sebanyak 1. <b>Penting</b>: tanpa baris ini, syarat tidak pernah jadi salah dan perulangan tak berhenti.'],
      ['}', 'Akhir blok. JavaScript kembali ke atas untuk mengecek syarat lagi.'],
      ['console.log("Meluncur!");', 'Berada di <i>luar</i> blok, jadi dijalankan sekali setelah perulangan selesai.'],
    ],
    flow: [
      '<code>hitung = 3</code>. Cek <code>3 &gt; 0</code> benar: cetak 3, lalu <code>hitung</code> jadi 2.',
      'Cek <code>2 &gt; 0</code> benar: cetak 2, lalu <code>hitung</code> jadi 1.',
      'Cek <code>1 &gt; 0</code> benar: cetak 1, lalu <code>hitung</code> jadi 0.',
      'Cek <code>0 &gt; 0</code> salah. Keluar dari perulangan.',
      'Cetak "Meluncur!".',
    ],
    result: 'Output <code>3, 2, 1, Meluncur!</code>. Angka berasal dari variabel <code>hitung</code> (nilainya sebelum dikurangi). Angka 0 tidak tercetak karena syarat sudah gagal. "Meluncur!" muncul paling akhir karena letaknya setelah perulangan.',
  },
  'Hitung mundur': {
    solWhy: '<code>for (let i = 5; i &gt;= 1; i--)</code> mulai dari 5, berhenti saat <code>i</code> kurang dari 1, dan <code>i--</code> mengurangi 1 tiap putaran, sehingga muncul 5, 4, 3, 2, 1. "Selesai!" ditaruh <i>di luar</i> kurung kurawal supaya tercetak sekali di akhir. Jika ditaruh di dalam, ia tercetak 5 kali.',
  },

  'Membuat dan memanggil fungsi': {
    lines: [
      ['function sapa(nama) {', 'Mendefinisikan fungsi bernama <code>sapa</code>. <code>nama</code> di dalam kurung adalah <b>parameter</b>: kotak sementara untuk bahan yang dikirim saat fungsi dipanggil. Baris ini belum menjalankan apa pun.'],
      ['  console.log("Halo, " + nama + "!");', 'Isi fungsi. Menyambung teks dengan nilai parameter <code>nama</code>.'],
      ['}', 'Akhir fungsi.'],
      ['sapa("Budi");', '<b>Memanggil</b> fungsi. <code>"Budi"</code> disebut <b>argumen</b>, nilainya masuk ke parameter <code>nama</code>.'],
      ['sapa("Sari");', 'Memanggil lagi dengan argumen berbeda.'],
    ],
    flow: [
      'JavaScript membaca definisi <code>sapa</code> dan menyimpannya. Isinya belum jalan.',
      '<code>sapa("Budi")</code>: <code>nama</code> terisi "Budi", program masuk ke isi fungsi, mencetak "Halo, Budi!", lalu kembali.',
      '<code>sapa("Sari")</code>: <code>nama</code> kini "Sari", mencetak "Halo, Sari!".',
    ],
    result: 'Ada dua baris karena fungsi dipanggil dua kali. Kata "Budi" dan "Sari" berasal dari <b>argumen</b> saat memanggil, yang masuk ke <code>nama</code>. Kalau fungsi hanya didefinisikan tanpa dipanggil, tidak ada yang tercetak.',
  },
  'Fungsi yang mengembalikan nilai': {
    solWhy: 'Saat <code>kuadrat(7)</code> dipanggil, <code>angka</code> berisi 7. <code>return angka * angka</code> menghitung 49 lalu <b>mengirimnya keluar</b>, sehingga <code>console.log(kuadrat(7))</code> sama dengan <code>console.log(49)</code>. Tanpa <code>return</code>, fungsi mengembalikan <code>undefined</code>; itu sebabnya kode awal mencetak <code>undefined</code>. Bedanya: <code>console.log</code> hanya menampilkan ke layar, sedangkan <code>return</code> memberi nilai yang bisa disimpan atau dihitung lagi.',
  },
  'Arrow function': {
    lines: [
      ['function tambah1(a, b) {', 'Fungsi biasa dengan dua parameter, <code>a</code> dan <code>b</code>.'],
      ['  return a + b;', 'Menghitung <code>a + b</code> dan mengirim hasilnya ke pemanggil.'],
      ['const tambah2 = (a, b) => a + b;', 'Arrow function. Fungsinya disimpan di variabel <code>tambah2</code>. <code>(a, b)</code> parameter, <code>=&gt;</code> dibaca "menghasilkan", dan <code>a + b</code> otomatis menjadi nilai kembalian (<code>return</code> tersirat).'],
      ['console.log(tambah1(2, 3));', 'Memanggil <code>tambah1</code> dengan 2 dan 3. Hasil kembaliannya (5) langsung dicetak.'],
      ['console.log(tambah2(2, 3));', 'Sama, tapi lewat arrow function.'],
    ],
    flow: [
      'Kedua fungsi didefinisikan dan disimpan.',
      '<code>tambah1(2, 3)</code>: <code>a = 2</code>, <code>b = 3</code>, <code>return 5</code>. Jadi <code>console.log(5)</code>.',
      '<code>tambah2(2, 3)</code>: proses sama, hasil 5.',
    ],
    result: 'Dua baris bernilai 5 karena kedua fungsi melakukan hal yang sama, hanya penulisannya berbeda. Angka 5 berasal dari <code>2 + 3</code> di dalam fungsi, dikembalikan ke luar, lalu dicetak oleh <code>console.log</code>.',
  },
  'Buat arrow function': {
    solWhy: '<code>kali(6, 7)</code>: <code>a = 6</code>, <code>b = 7</code>, <code>a * b</code> menghasilkan 42 dan otomatis dikembalikan (tanpa menulis <code>return</code>). <code>console.log</code> kemudian mencetak 42.',
  },

  'Daftar bernomor': {
    lines: [
      ['const buah = ["apel", "jeruk", "mangga"];', 'Membuat array berisi 3 item. Nomor urutnya (indeks): "apel" = 0, "jeruk" = 1, "mangga" = 2.'],
      ['console.log(buah[0]);', 'Mengambil item pada indeks 0, yaitu item pertama.'],
      ['console.log(buah.length);', '<code>length</code> adalah properti yang berisi jumlah item.'],
      ['buah.push("pisang");', 'Menambahkan "pisang" di akhir array. Array aslinya berubah. Ini boleh walau memakai <code>const</code>, sebab <code>const</code> hanya melarang mengganti kotaknya, bukan mengubah isinya.'],
      ['console.log(buah);', 'Mencetak seluruh array.'],
    ],
    flow: [
      'Array dibuat dengan 3 item.',
      'Cetak <code>buah[0]</code>: "apel".',
      'Cetak <code>buah.length</code>: 3.',
      '<code>push</code> menambah "pisang", array jadi 4 item.',
      'Cetak seluruh array yang sudah berisi 4 item.',
    ],
    result: 'Output: <code>apel</code>, <code>3</code>, lalu <code>[\'apel\', \'jeruk\', \'mangga\', \'pisang\']</code>. Angka 3 berasal dari jumlah item <i>sebelum</i> <code>push</code>. Baris terakhir sudah memuat pisang karena <code>push</code> dijalankan lebih dulu. Urutan output mengikuti urutan kode.',
  },
  'Tambah isi daftar': {
    solWhy: 'Setiap <code>push</code> menambah satu item di akhir array, jadi isi akhirnya <code>[\'nasi goreng\', \'bakso\', \'sate\']</code>. <code>console.log</code> ditaruh <i>setelah</i> kedua <code>push</code>, sehingga yang tercetak sudah lengkap. Jika ditaruh sebelum <code>push</code>, hanya "nasi goreng" yang terlihat.',
  },
  'Mengolah setiap item': {
    lines: [
      ['const angka = [1, 2, 3];', 'Array sumber.'],
      ['angka.forEach((n) => {', 'Mengambil item satu per satu. Setiap item masuk ke parameter <code>n</code> secara bergantian, dan isi fungsi dijalankan sekali per item.'],
      ['  console.log("Angka: " + n);', 'Mencetak item yang sedang dipegang <code>n</code>.'],
      ['const tambahSepuluh = angka.map((n) => n + 10);', '<code>map</code> menjalankan fungsi untuk setiap item, lalu mengumpulkan nilai kembaliannya (<code>n + 10</code>) menjadi <b>array baru</b>. Array <code>angka</code> tidak berubah.'],
      ['console.log(tambahSepuluh);', 'Mencetak array baru hasil <code>map</code>.'],
    ],
    flow: [
      '<code>forEach</code>: <code>n = 1</code> cetak "Angka: 1", lalu <code>n = 2</code>, lalu <code>n = 3</code>.',
      '<code>map</code>: 1 menjadi 11, 2 menjadi 12, 3 menjadi 13. Hasilnya <code>[11, 12, 13]</code> disimpan di <code>tambahSepuluh</code>.',
      'Cetak <code>tambahSepuluh</code>.',
    ],
    result: 'Tiga baris "Angka: ..." berasal dari <code>forEach</code> (satu baris per item). Baris terakhir <code>[11, 12, 13]</code> berasal dari <code>map</code>. <code>forEach</code> hanya "melakukan sesuatu" dan tidak menghasilkan array, sedangkan <code>map</code> menghasilkan array baru.',
  },
  'Gandakan angka': {
    solWhy: '<code>map((n) =&gt; n * 2)</code> mengubah 1 menjadi 2, 2 menjadi 4, dan seterusnya, menghasilkan <code>[2, 4, 6, 8, 10]</code>. Hasilnya ditampung di <code>dobel</code>, itulah yang dicetak. Array <code>angka</code> sendiri tetap <code>[1, 2, 3, 4, 5]</code>.',
  },

  'Data dengan label': {
    lines: [
      ['const siswa = {', 'Membuat object. Isinya pasangan <code>nama: nilai</code> yang disebut <b>properti</b>.'],
      ['  nama: "Rani",', 'Properti <code>nama</code> bernilai teks "Rani".'],
      ['  umur: 14,', 'Properti <code>umur</code> bernilai angka 14.'],
      ['  hobi: ["membaca", "menggambar"],', 'Nilai properti boleh berupa array.'],
      ['  sapa() { ... },', '<b>Method</b>: fungsi di dalam object. <code>this</code> menunjuk ke object pemiliknya (<code>siswa</code>), jadi <code>this.nama</code> berarti "Rani".'],
      ['console.log(siswa.nama);', 'Tanda titik mengambil properti <code>nama</code>.'],
      ['console.log(siswa["umur"]);', 'Cara lain: kurung siku dengan nama properti sebagai teks.'],
      ['console.log(siswa.hobi[0]);', 'Ambil properti <code>hobi</code> (sebuah array), lalu item di indeks 0.'],
      ['siswa.sapa();', 'Memanggil method, yang mencetak sapaan memakai <code>this.nama</code>.'],
    ],
    flow: [
      'Object <code>siswa</code> dibuat.',
      'Cetak <code>siswa.nama</code>: "Rani".',
      'Cetak <code>siswa["umur"]</code>: 14.',
      'Cetak <code>siswa.hobi[0]</code>: "membaca".',
      '<code>siswa.sapa()</code>: di dalamnya <code>this.nama</code> bernilai "Rani", jadi tercetak "Hai, aku Rani".',
    ],
    result: 'Empat baris output sesuai urutan kode. Setiap nilai dibaca dari properti object. Pada baris terakhir, "Rani" berasal dari <code>this.nama</code> di dalam method.',
  },
  'Buat object buku': {
    solWhy: 'Object menyimpan tiga data dalam satu tempat. <code>buku.judul</code> dan <code>buku.penulis</code> membaca nilainya, lalu template literal menyisipkannya sehingga muncul "Laskar Pelangi oleh Andrea Hirata". Kalau <code>judul</code> diubah, kalimatnya ikut berubah.',
  },
  'Array berisi object': {
    lines: [
      ['const belanja = [', 'Array yang setiap itemnya adalah sebuah object (satu barang).'],
      ['  { nama: "Buku", harga: 15000 },', 'Item pertama: object dengan properti <code>nama</code> dan <code>harga</code>.'],
      ['for (const item of belanja) {', 'Memutar array. Di setiap putaran, <code>item</code> berisi satu elemen berikutnya (sebuah object). Memakai <code>const</code> boleh karena <code>item</code> dibuat baru di tiap putaran.'],
      ['  console.log(item.nama + ": " + item.harga);', 'Mengambil properti dari object yang sedang dipegang <code>item</code> lalu menyambungnya menjadi teks. Angka yang disambung teks dengan <code>+</code> menjadi teks.'],
    ],
    flow: [
      'Putaran 1: <code>item</code> = <code>{ nama: "Buku", harga: 15000 }</code>, tercetak "Buku: 15000".',
      'Putaran 2: <code>item</code> = <code>{ nama: "Pena", harga: 5000 }</code>, tercetak "Pena: 5000".',
      'Array habis, perulangan berhenti.',
    ],
    result: 'Ada dua baris karena array berisi dua object. Teks dan angkanya berasal dari properti <code>nama</code> dan <code>harga</code> milik object yang sedang dipegang <code>item</code>.',
  },
  'Total belanja': {
    solWhy: '<code>let total = 0</code> adalah wadah penjumlah. Tiap putaran, <code>total += item.harga</code> (artinya <code>total = total + item.harga</code>): 0 + 15000 = 15000, lalu + 5000 = 20000, lalu + 120000 = 140000. <code>console.log(total)</code> ditaruh <i>di luar</i> perulangan agar tercetak sekali setelah semuanya dijumlah. Di dalam perulangan, ia tercetak tiga kali (15000, 20000, 140000).',
  },
};
