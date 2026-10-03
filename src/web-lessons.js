// Course "Ajari Web": HTML, CSS, then JavaScript in the page (DOM, events, input).
// Step files: { 'index.html', 'style.css'?, 'script.js'? }. `check` runs INSIDE the preview iframe:
// it must be self-contained (only its `d` argument and browser globals), because its source is injected.
// d = { $, $$, text(sel), css(sel, prop), click(sel), type(sel, value), logs, src: files }

const page = (body, { css = false, js = false, title = 'Halaman Saya' } = {}) => `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <title>${title}</title>${css ? '\n  <link rel="stylesheet" href="style.css">' : ''}
</head>
<body>
${body}${js ? '\n  <script src="script.js"></script>' : ''}
</body>
</html>
`;

export const webLessons = [
  {
    title: 'Kenalan dengan HTML',
    intro: 'HTML adalah kerangka dari setiap halaman web yang pernah kamu buka.',
    steps: [
      {
        title: 'Apa itu HTML?',
        body: `<p>Halo! Di course ini kita akan membuat <b>halaman web</b> dari nol. Ada tiga bahasa yang bekerja sama, seperti membangun rumah:</p>
<ul><li><b>HTML</b>: kerangka dan ruangan (judul, paragraf, tombol, gambar).</li><li><b>CSS</b>: cat dan dekorasi (warna, ukuran, tata letak).</li><li><b>JavaScript</b>: listrik dan mesin (apa yang terjadi saat tombol diklik).</li></ul>
<p>HTML ditulis dengan <b>tag</b>, kata di dalam kurung siku seperti <code>&lt;h1&gt;</code>. Tekan <b>Jalankan</b> dan lihat hasilnya di <b>Preview</b> di bawah editor.</p>`,
        files: { 'index.html': '<h1>Halo, dunia!</h1>\n<p>Ini halaman web pertamaku.</p>\n' },
        deep: {
          lines: [
            ['<h1>Halo, dunia!</h1>', '<code>&lt;h1&gt;</code> adalah tag pembuka "heading 1", judul paling besar. Teks di tengah adalah isinya. <code>&lt;/h1&gt;</code> adalah tag penutup, ditandai garis miring <code>/</code>.'],
            ['<p>Ini halaman web pertamaku.</p>', '<code>&lt;p&gt;</code> berarti paragraf, untuk teks biasa.'],
          ],
          flow: [
            'Browser membaca HTML dari atas ke bawah.',
            'Setiap pasangan tag diubah menjadi <b>elemen</b> di halaman: sebuah judul, lalu sebuah paragraf.',
            'Tag-nya sendiri tidak terlihat. Yang tampil hanya isinya, dengan gaya bawaan browser.',
          ],
          result: 'Judul tampil besar dan tebal karena browser punya gaya bawaan untuk <code>h1</code>. Paragraf tampil di baris baru karena <code>p</code> adalah elemen <b>blok</b>: selalu memakai satu baris penuh.',
        },
        after: '<p>Itu halaman web pertamamu! Coba ubah teks di antara tag, lalu jalankan lagi.</p>',
      },
      {
        title: 'Judul dan paragrafmu',
        body: '<p>Sebuah <b>elemen</b> terdiri dari tag pembuka, isi, dan tag penutup. Lupa menutup tag adalah kesalahan yang paling sering terjadi, jadi biasakan langsung menulis pasangannya.</p>',
        task: 'Buat satu <code>&lt;h1&gt;</code> berisi namamu dan minimal <b>dua</b> paragraf <code>&lt;p&gt;</code> tentang dirimu.',
        files: { 'index.html': '<!-- Tulis judul dan paragrafmu di sini -->\n' },
        hints: [
          'Komentar HTML ditulis <code>&lt;!-- ... --&gt;</code> dan tidak tampil di halaman. Tulis kodemu di bawahnya.',
          'Judul: <code>&lt;h1&gt;Nama Kamu&lt;/h1&gt;</code>',
          'Setiap paragraf dibungkus sendiri-sendiri: <code>&lt;p&gt;...&lt;/p&gt;</code>, lalu <code>&lt;p&gt;...&lt;/p&gt;</code> lagi.',
        ],
        skeleton: { 'index.html': '<h1>___</h1>\n<p>___</p>\n<p>___</p>\n' },
        solution: { 'index.html': '<h1>Budi Santoso</h1>\n<p>Saya pelajar kelas 10.</p>\n<p>Saya suka bermain bola dan membaca komik.</p>\n' },
        solWhy: 'Setiap elemen punya tag pembuka dan penutup. <code>h1</code> dipakai untuk judul utama (biasanya hanya satu per halaman), sedangkan setiap paragraf mendapat pasangan <code>p</code> sendiri. Dua paragraf berarti dua pasang tag <code>p</code>.',
        check: (d) => {
          const h = d.$('h1');
          if (!h || !h.textContent.trim() || h.textContent.includes('___')) return 'Belum ada <code>&lt;h1&gt;</code> yang berisi namamu.';
          const ps = d.$$('p').filter((p) => p.textContent.trim() && !p.textContent.includes('___'));
          return ps.length >= 2 ? true : 'Baru ada ' + ps.length + ' paragraf berisi teks. Tambahkan sampai minimal 2.';
        },
        done: 'Bagus! Kamu sudah menulis elemen HTML sendiri.',
      },
      {
        title: 'Heading h1 sampai h6',
        body: `<p>Ada enam tingkat judul: <code>h1</code> (paling penting) sampai <code>h6</code>. Gunakan seperti daftar isi buku: <code>h1</code> judul bab, <code>h2</code> subbab, dan seterusnya.</p>
<p>Pilih tingkat berdasarkan <b>kepentingannya</b>, bukan ukurannya. Ukuran nanti bisa diatur dengan CSS.</p>`,
        files: { 'index.html': '<h1>Resep Nasi Goreng</h1>\n<h2>Bahan</h2>\n<p>Nasi, telur, kecap, bawang.</p>\n<h2>Cara Membuat</h2>\n<h3>Langkah 1</h3>\n<p>Tumis bawang sampai harum.</p>\n' },
        after: '<p>Heading membentuk kerangka isi halaman. Mesin pencari dan pembaca layar (yang dipakai teman tunanetra) memakai heading untuk memahami dan menavigasi halaman.</p>',
      },
      {
        title: 'Struktur dokumen HTML',
        body: `<p>Sejauh ini kita menulis potongan HTML. Halaman yang lengkap punya kerangka standar seperti di editor. Tidak perlu dihafal, cukup pahami bagiannya:</p>
<ul><li><code>&lt;head&gt;</code>: informasi <i>tentang</i> halaman (judul tab, pengaturan). Isinya tidak tampil di halaman.</li><li><code>&lt;body&gt;</code>: semua yang <i>tampil</i> di halaman.</li></ul>
<p>Mulai sekarang semua latihan memakai kerangka ini.</p>`,
        task: 'Ubah isi <code>&lt;title&gt;</code> menjadi <b>Profil Saya</b>, lalu tulis <code>&lt;h1&gt;</code> berisi namamu di dalam <code>&lt;body&gt;</code>.',
        files: { 'index.html': page('  <!-- isi halaman di sini -->', { title: 'Halaman Baru' }) },
        deep: {
          lines: [
            ['<!doctype html>', 'Memberi tahu browser bahwa ini dokumen HTML modern.'],
            ['<html lang="id">', 'Pembungkus seluruh halaman. <code>lang="id"</code> menandakan bahasanya Indonesia.'],
            ['<head>', 'Bagian informasi tentang halaman. Isinya tidak tampil di halaman.'],
            ['<meta charset="utf-8">', 'Supaya semua huruf dan simbol tampil benar.'],
            ['<title>Halaman Baru</title>', 'Teks yang tampil di tab browser.'],
            ['<body>', 'Semua yang tampil di halaman ditulis di sini.'],
          ],
        },
        hints: [
          '<code>&lt;title&gt;</code> ada di dalam <code>&lt;head&gt;</code>. Ganti teks "Halaman Baru" di antara tag-nya.',
          'Tulis <code>&lt;h1&gt;</code> di antara <code>&lt;body&gt;</code> dan <code>&lt;/body&gt;</code>, menggantikan komentar.',
        ],
        skeleton: { 'index.html': page('  <h1>___</h1>', { title: '___' }) },
        solution: { 'index.html': page('  <h1>Budi Santoso</h1>', { title: 'Profil Saya' }) },
        solWhy: 'Isi <code>&lt;title&gt;</code> menjadi judul tab browser, sedangkan <code>&lt;h1&gt;</code> di dalam <code>&lt;body&gt;</code> tampil di halaman. Keduanya sama-sama "judul", tapi tempatnya berbeda: satu di <code>head</code> (informasi), satu di <code>body</code> (tampilan).',
        check: (d) => {
          if (document.title.trim() !== 'Profil Saya') return 'Judul tab belum <b>Profil Saya</b>. Ubah teks di dalam <code>&lt;title&gt;</code>.';
          const h = d.$('body h1');
          return h && h.textContent.trim() && !h.textContent.includes('___') ? true : 'Judul tab sudah benar. Sekarang tulis <code>&lt;h1&gt;</code> berisi namamu di dalam <code>&lt;body&gt;</code>.';
        },
        done: 'Tepat. Sekarang kamu tahu kerangka lengkap halaman HTML.',
      },
    ],
  },
  {
    title: 'Teks, Link, dan Gambar',
    intro: 'Memperkaya halaman dengan teks penting, tautan, dan gambar.',
    steps: [
      {
        title: 'Menebalkan dan memiringkan',
        body: `<p>Di dalam paragraf, kamu bisa menandai sebagian teks:</p>
<ul><li><code>&lt;strong&gt;</code>: teks <b>penting</b> (tampil tebal).</li><li><code>&lt;em&gt;</code>: teks yang <i>ditekankan</i> (tampil miring).</li><li><code>&lt;br&gt;</code>: pindah baris. Tag ini tidak punya penutup.</li></ul>
<p>Perhatikan: tag bisa berada <b>di dalam</b> tag lain. Ini disebut <i>bersarang</i> (nesting).</p>`,
        files: { 'index.html': page('  <p>Belajar HTML itu <strong>mudah</strong> dan <em>menyenangkan</em>.</p>\n  <p>Baris pertama<br>Baris kedua</p>') },
        after: '<p>Saat bersarang, tag yang dibuka terakhir harus ditutup lebih dulu: <code>&lt;p&gt;&lt;strong&gt;...&lt;/strong&gt;&lt;/p&gt;</code>, bukan <code>&lt;p&gt;&lt;strong&gt;...&lt;/p&gt;&lt;/strong&gt;</code>.</p>',
      },
      {
        title: 'Link dengan tag a',
        body: `<p>Link dibuat dengan tag <code>&lt;a&gt;</code>. Alamat tujuannya ditulis di <b>atribut</b> <code>href</code>.</p>
<p>Atribut adalah informasi tambahan yang ditulis di dalam tag pembuka, dengan format <code>nama="nilai"</code>.</p>
<p class="muted">Catatan: di Preview, link mungkin tidak bisa dibuka karena alasan keamanan. Itu normal.</p>`,
        files: { 'index.html': page('  <p>Belajar lebih lanjut di <a href="https://developer.mozilla.org">MDN Web Docs</a>.</p>') },
        deep: {
          lines: [
            ['<a', 'Tag pembuka link ("a" dari <i>anchor</i>).'],
            ['href="https://developer.mozilla.org"', 'Atribut <code>href</code>: alamat tujuan saat link diklik.'],
            ['>MDN Web Docs</a>', 'Teks yang bisa diklik, lalu tag penutup.'],
          ],
        },
        after: '<p>Teks link tampil biru dan bergaris bawah. Itu gaya bawaan browser, yang nanti bisa kita ubah dengan CSS.</p>',
      },
      {
        title: 'Membuat link sendiri',
        body: '',
        task: 'Buat link ke <code>https://id.wikipedia.org</code> dengan teks <b>Wikipedia</b>.',
        files: { 'index.html': page('  <p>Cari informasi di sini:</p>\n  <!-- buat link di bawah ini -->') },
        hints: [
          'Link memakai tag <code>&lt;a&gt;</code> dengan atribut <code>href</code>.',
          'Bentuknya: <code>&lt;a href="ALAMAT"&gt;TEKS&lt;/a&gt;</code>',
        ],
        skeleton: { 'index.html': page('  <p>Cari informasi di sini:</p>\n  <a href="___">___</a>') },
        solution: { 'index.html': page('  <p>Cari informasi di sini:</p>\n  <a href="https://id.wikipedia.org">Wikipedia</a>') },
        solWhy: 'Atribut <code>href</code> menentukan tujuan, sedangkan teks di antara <code>&lt;a&gt;</code> dan <code>&lt;/a&gt;</code> adalah yang dilihat dan diklik pengguna.',
        check: (d) => {
          const a = d.$('a');
          if (!a) return 'Belum ada tag <code>&lt;a&gt;</code>.';
          if (!(a.getAttribute('href') || '').includes('wikipedia.org')) return 'Link sudah ada, tapi atribut <code>href</code>-nya belum mengarah ke <code>https://id.wikipedia.org</code>.';
          return a.textContent.trim() === 'Wikipedia' ? true : 'Alamatnya sudah benar. Sekarang isi teks link dengan <b>Wikipedia</b>.';
        },
        done: 'Link berhasil dibuat.',
      },
      {
        title: 'Menambahkan gambar',
        body: `<p>Gambar memakai tag <code>&lt;img&gt;</code>. Tag ini tidak punya penutup karena tidak berisi teks. Semua informasinya ada di atribut:</p>
<ul><li><code>src</code>: alamat file gambar.</li><li><code>alt</code>: deskripsi gambar. Dibacakan untuk pengguna tunanetra, dan tampil jika gambar gagal dimuat.</li><li><code>width</code>: lebar gambar (dalam piksel).</li></ul>`,
        task: 'Lengkapi gambar dengan atribut <code>alt</code> yang mendeskripsikan gambarnya, dan atur <code>width</code> menjadi <code>300</code>.',
        files: { 'index.html': page('  <h1>Pemandangan</h1>\n  <img src="https://picsum.photos/id/1018/600/400">') },
        hints: [
          'Atribut ditulis di dalam tag pembuka, dipisah spasi: <code>&lt;img src="..." alt="..."&gt;</code>',
          '<code>alt</code> berisi deskripsi singkat, misalnya "Pegunungan dan danau". <code>width="300"</code> mengatur lebarnya.',
        ],
        skeleton: { 'index.html': page('  <h1>Pemandangan</h1>\n  <img src="https://picsum.photos/id/1018/600/400" alt="___" width="___">') },
        solution: { 'index.html': page('  <h1>Pemandangan</h1>\n  <img src="https://picsum.photos/id/1018/600/400" alt="Pegunungan hijau dan danau" width="300">') },
        solWhy: 'Satu tag bisa punya banyak atribut. <code>alt</code> membuat gambar tetap bermakna bagi orang yang tidak bisa melihatnya, dan <code>width="300"</code> membuat browser menampilkan gambar selebar 300 piksel.',
        check: (d) => {
          const img = d.$('img');
          if (!img) return 'Tag <code>&lt;img&gt;</code> tidak ditemukan.';
          const alt = (img.getAttribute('alt') || '').trim();
          if (alt.length < 3 || alt.includes('___')) return 'Tambahkan atribut <code>alt</code> berisi deskripsi gambar (minimal beberapa kata).';
          return img.getAttribute('width') === '300' ? true : 'Atribut <code>alt</code> sudah ada. Sekarang tambahkan <code>width="300"</code>.';
        },
        done: 'Gambar sudah lengkap dan ramah untuk semua pengguna.',
      },
    ],
  },
  {
    title: 'Daftar dan Kelompok',
    intro: 'Menyusun isi halaman: daftar, kotak, dan elemen bersarang.',
    steps: [
      {
        title: 'Daftar ul dan ol',
        body: `<p>Dua jenis daftar:</p><ul><li><code>&lt;ul&gt;</code> (<i>unordered list</i>): daftar berpoin, urutan tidak penting.</li><li><code>&lt;ol&gt;</code> (<i>ordered list</i>): daftar bernomor, urutan penting.</li></ul>
<p>Setiap item ditulis dengan <code>&lt;li&gt;</code> (<i>list item</i>) di dalamnya.</p>`,
        files: { 'index.html': page('  <h2>Belanjaan</h2>\n  <ul>\n    <li>Telur</li>\n    <li>Susu</li>\n  </ul>\n\n  <h2>Cara menyeduh teh</h2>\n  <ol>\n    <li>Rebus air</li>\n    <li>Masukkan teh</li>\n    <li>Tunggu 3 menit</li>\n  </ol>') },
        after: '<p>Perhatikan indentasi (spasi di depan): <code>&lt;li&gt;</code> ditulis menjorok ke dalam karena berada <i>di dalam</i> <code>&lt;ul&gt;</code>. Browser tidak peduli spasi, tapi indentasi membuat kode mudah dibaca manusia.</p>',
      },
      {
        title: 'Daftar hobimu',
        body: '',
        task: 'Buat daftar berpoin (<code>&lt;ul&gt;</code>) berisi minimal <b>3</b> hobimu.',
        files: { 'index.html': page('  <h2>Hobi Saya</h2>\n  <!-- buat daftar di sini -->') },
        hints: [
          'Daftar berpoin dibuka dengan <code>&lt;ul&gt;</code> dan ditutup <code>&lt;/ul&gt;</code>.',
          'Di dalamnya, setiap hobi dibungkus <code>&lt;li&gt;...&lt;/li&gt;</code>.',
        ],
        skeleton: { 'index.html': page('  <h2>Hobi Saya</h2>\n  <ul>\n    <li>___</li>\n    <li>___</li>\n    <li>___</li>\n  </ul>') },
        solution: { 'index.html': page('  <h2>Hobi Saya</h2>\n  <ul>\n    <li>Membaca</li>\n    <li>Bersepeda</li>\n    <li>Menggambar</li>\n  </ul>') },
        solWhy: '<code>ul</code> adalah wadah daftar, dan setiap <code>li</code> adalah satu item. Browser otomatis menambahkan titik di depan setiap item.',
        check: (d) => {
          if (!d.$('ul')) return 'Belum ada <code>&lt;ul&gt;</code>.';
          const items = d.$$('ul li').filter((li) => li.textContent.trim() && !li.textContent.includes('___'));
          return items.length >= 3 ? true : 'Baru ada ' + items.length + ' item berisi teks di dalam <code>&lt;ul&gt;</code>. Tambahkan sampai 3.';
        },
        done: 'Daftar hobimu sudah jadi.',
      },
      {
        title: 'Kotak pembungkus: div',
        body: `<p><code>&lt;div&gt;</code> adalah kotak pembungkus tanpa makna khusus. Gunanya mengelompokkan beberapa elemen supaya nanti bisa diberi gaya bersama.</p>
<p>Atribut <code>class</code> memberi <b>label</b> pada elemen. Label ini nanti dipakai CSS dan JavaScript untuk menemukan elemen tersebut.</p>`,
        files: { 'index.html': page('  <div class="kartu">\n    <h2>Kucing</h2>\n    <p>Hewan peliharaan yang suka tidur.</p>\n  </div>\n\n  <div class="kartu">\n    <h2>Anjing</h2>\n    <p>Hewan peliharaan yang setia.</p>\n  </div>') },
        after: '<p>Sekarang belum terlihat beda karena <code>div</code> tidak punya gaya bawaan. Di pelajaran CSS, kita akan membuat setiap <code>.kartu</code> tampil seperti kartu sungguhan.</p>',
      },
      {
        title: 'Kartu profil',
        body: '',
        task: 'Buat <code>&lt;div class="kartu"&gt;</code> yang berisi <code>&lt;h2&gt;</code> (namamu) dan <code>&lt;p&gt;</code> (satu kalimat tentang dirimu).',
        files: { 'index.html': page('  <!-- buat kartu profil di sini -->') },
        hints: [
          'Mulai dengan kotaknya: <code>&lt;div class="kartu"&gt;</code> ... <code>&lt;/div&gt;</code>',
          'Tulis <code>&lt;h2&gt;</code> dan <code>&lt;p&gt;</code> <b>di antara</b> tag pembuka dan penutup <code>div</code>, supaya berada di dalam kartu.',
        ],
        skeleton: { 'index.html': page('  <div class="___">\n    <h2>___</h2>\n    <p>___</p>\n  </div>') },
        solution: { 'index.html': page('  <div class="kartu">\n    <h2>Budi Santoso</h2>\n    <p>Pelajar yang sedang belajar membuat website.</p>\n  </div>') },
        solWhy: '<code>h2</code> dan <code>p</code> berada di antara <code>&lt;div&gt;</code> dan <code>&lt;/div&gt;</code>, jadi keduanya adalah "anak" dari kartu itu. <code>class="kartu"</code> adalah label yang nanti dipakai CSS.',
        check: (d) => {
          if (!d.$('div.kartu')) return 'Belum ada <code>&lt;div class="kartu"&gt;</code>. Periksa ejaan nama class-nya.';
          if (!d.text('.kartu h2') || d.text('.kartu h2').includes('___')) return 'Kartu sudah ada. Tambahkan <code>&lt;h2&gt;</code> berisi namamu <b>di dalam</b> kartu.';
          return d.text('.kartu p') && !d.text('.kartu p').includes('___') ? true : 'Tambahkan <code>&lt;p&gt;</code> berisi kalimat tentang dirimu <b>di dalam</b> kartu.';
        },
        done: 'Struktur kartu sudah benar. Saatnya mempercantik dengan CSS!',
      },
    ],
  },
  {
    title: 'CSS: Memberi Gaya',
    intro: 'CSS mengatur tampilan: warna, ukuran, huruf, dan jarak.',
    steps: [
      {
        title: 'Aturan CSS pertama',
        body: `<p>Sekarang ada tab baru: <b>style.css</b>. File ini dihubungkan ke HTML lewat tag <code>&lt;link&gt;</code> di bagian <code>head</code>.</p>
<p>Setiap aturan CSS punya bentuk: <code>selector { properti: nilai; }</code>. Buka tab <b>style.css</b>, lalu jalankan.</p>`,
        files: {
          'index.html': page('  <h1>Halo, CSS!</h1>\n  <p>Paragraf ini akan berubah gaya.</p>', { css: true }),
          'style.css': 'h1 {\n  color: tomato;\n}\n\np {\n  font-size: 20px;\n}\n',
        },
        deep: {
          lines: [
            ['h1 {', '<b>Selector</b> <code>h1</code>: aturan ini berlaku untuk semua elemen <code>h1</code>. Kurung kurawal membuka daftar gaya.'],
            ['  color: tomato;', '<b>Properti</b> <code>color</code> (warna teks) diberi <b>nilai</b> <code>tomato</code>. Diakhiri titik koma.'],
            ['}', 'Menutup aturan untuk <code>h1</code>.'],
            ['p {', 'Aturan baru untuk semua paragraf.'],
            ['  font-size: 20px;', 'Ukuran huruf 20 piksel.'],
          ],
          result: 'Judul berwarna merah tomat dan paragraf lebih besar. HTML-nya tidak berubah sama sekali: CSS hanya mengatur tampilan dari luar. Inilah alasan HTML dan CSS dipisah.',
        },
        after: '<p>Coba ganti <code>tomato</code> dengan warna lain, seperti <code>royalblue</code>, <code>seagreen</code>, atau kode warna <code>#8e44ad</code>.</p>',
      },
      {
        title: 'Warna latar dan teks',
        body: '<p>Dua properti warna yang paling sering dipakai: <code>color</code> untuk warna teks, dan <code>background-color</code> untuk warna latar.</p>',
        task: 'Di <b>style.css</b>, beri warna latar pada <code>body</code> dan warna teks pada <code>h1</code>. Warnanya bebas!',
        files: {
          'index.html': page('  <h1>Halaman Berwarna</h1>\n  <p>Pilih warna favoritmu.</p>', { css: true }),
          'style.css': '/* Atur warna latar body dan warna teks h1 */\n',
        },
        hints: [
          'Buat dua aturan: satu dengan selector <code>body</code>, satu dengan selector <code>h1</code>.',
          'Untuk body: <code>background-color: lightyellow;</code>. Untuk h1: <code>color: darkgreen;</code>',
          'Jangan lupa titik dua setelah nama properti dan titik koma di akhir.',
        ],
        skeleton: {
          'index.html': page('  <h1>Halaman Berwarna</h1>\n  <p>Pilih warna favoritmu.</p>', { css: true }),
          'style.css': 'body {\n  background-color: ___;\n}\n\nh1 {\n  color: ___;\n}\n',
        },
        solution: {
          'index.html': page('  <h1>Halaman Berwarna</h1>\n  <p>Pilih warna favoritmu.</p>', { css: true }),
          'style.css': 'body {\n  background-color: lightyellow;\n}\n\nh1 {\n  color: darkgreen;\n}\n',
        },
        solWhy: 'Selector <code>body</code> menargetkan seluruh halaman, jadi latarnya ikut berubah. Selector <code>h1</code> hanya menargetkan judul. Satu file CSS bisa berisi banyak aturan.',
        check: (d) => {
          const bg = d.css('body', 'backgroundColor');
          if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') return 'Latar <code>body</code> belum berwarna. Tambahkan <code>background-color</code> pada selector <code>body</code>.';
          return d.css('h1', 'color') !== 'rgb(0, 0, 0)' ? true : 'Latar sudah berwarna. Sekarang ubah warna teks <code>h1</code> dengan properti <code>color</code>.';
        },
        done: 'Halamanmu sekarang berwarna.',
      },
      {
        title: 'Huruf dan perataan',
        body: `<p>Beberapa properti teks yang berguna:</p><ul><li><code>font-family</code>: jenis huruf.</li><li><code>font-size</code>: ukuran huruf, misalnya <code>18px</code>.</li><li><code>text-align</code>: perataan (<code>left</code>, <code>center</code>, <code>right</code>).</li><li><code>line-height</code>: jarak antarbaris.</li></ul>`,
        files: {
          'index.html': page('  <h1>Puisi Pendek</h1>\n  <p>Embun pagi menetes pelan<br>di daun yang masih tidur.</p>', { css: true }),
          'style.css': 'body {\n  font-family: Georgia, serif;\n}\n\nh1 {\n  text-align: center;\n}\n\np {\n  font-size: 18px;\n  line-height: 1.8;\n}\n',
        },
        after: '<p><code>font-family</code> boleh berisi beberapa pilihan dipisah koma. Jika huruf pertama tidak tersedia di komputer pengguna, browser mencoba pilihan berikutnya.</p>',
      },
      {
        title: 'Paragraf rapi',
        body: '',
        task: 'Atur semua paragraf agar <b>rata tengah</b> dan berukuran <b>18px</b>.',
        files: {
          'index.html': page('  <h1>Kata Mutiara</h1>\n  <p>Belajar sedikit setiap hari lebih baik daripada banyak sekali-sekali.</p>', { css: true }),
          'style.css': '/* Atur paragraf: rata tengah, ukuran 18px */\n',
        },
        hints: ['Selector-nya <code>p</code>.', 'Perataan memakai <code>text-align</code>, ukuran memakai <code>font-size</code>.'],
        skeleton: {
          'index.html': page('  <h1>Kata Mutiara</h1>\n  <p>Belajar sedikit setiap hari lebih baik daripada banyak sekali-sekali.</p>', { css: true }),
          'style.css': 'p {\n  text-align: ___;\n  font-size: ___;\n}\n',
        },
        solution: {
          'index.html': page('  <h1>Kata Mutiara</h1>\n  <p>Belajar sedikit setiap hari lebih baik daripada banyak sekali-sekali.</p>', { css: true }),
          'style.css': 'p {\n  text-align: center;\n  font-size: 18px;\n}\n',
        },
        solWhy: 'Satu aturan bisa berisi beberapa properti sekaligus. Satuan <code>px</code> (piksel) wajib ditulis menempel pada angka: <code>18px</code>, bukan <code>18 px</code> atau hanya <code>18</code>.',
        check: (d) => {
          if (d.css('p', 'textAlign') !== 'center') return 'Paragraf belum rata tengah. Gunakan <code>text-align: center;</code>';
          return d.css('p', 'fontSize') === '18px' ? true : 'Perataan sudah benar. Ukurannya belum 18px. Pastikan menulis <code>font-size: 18px;</code> (angka dan px menempel).';
        },
        done: 'Paragrafmu sekarang rapi.',
      },
    ],
  },
  {
    title: 'Class dan Selector',
    intro: 'Memberi gaya hanya pada elemen tertentu, bukan semuanya.',
    steps: [
      {
        title: 'Selector class',
        body: `<p>Selector <code>p</code> mengenai <b>semua</b> paragraf. Bagaimana jika hanya satu yang ingin diubah? Beri elemen itu <code>class</code>, lalu targetkan di CSS dengan <b>titik</b> di depan namanya.</p>
<ul><li><code>p { }</code>: semua paragraf.</li><li><code>.penting { }</code>: semua elemen dengan <code>class="penting"</code>.</li></ul>`,
        files: {
          'index.html': page('  <p>Paragraf biasa.</p>\n  <p class="penting">Paragraf ini penting!</p>\n  <p>Paragraf biasa lagi.</p>', { css: true }),
          'style.css': '.penting {\n  color: crimson;\n  font-weight: bold;\n}\n',
        },
        after: '<p>Satu class bisa dipakai di banyak elemen, dan satu elemen bisa punya beberapa class sekaligus: <code>class="penting besar"</code>.</p>',
      },
      {
        title: 'Tandai yang penting',
        body: '',
        task: 'Beri <code>class="sorot"</code> pada paragraf <b>kedua</b>, lalu di CSS buat aturan <code>.sorot</code> yang memberi warna latar dan huruf tebal (<code>font-weight: bold</code>).',
        files: {
          'index.html': page('  <p>Jadwal hari ini:</p>\n  <p>Ujian matematika jam 08.00</p>\n  <p>Istirahat jam 10.00</p>', { css: true }),
          'style.css': '/* Buat aturan .sorot di sini */\n',
        },
        hints: [
          'Di HTML, tambahkan atribut pada tag pembuka paragraf kedua: <code>&lt;p class="sorot"&gt;</code>',
          'Di CSS, selector class diawali titik: <code>.sorot { ... }</code>',
          'Isinya: <code>background-color: yellow;</code> dan <code>font-weight: bold;</code>',
        ],
        skeleton: {
          'index.html': page('  <p>Jadwal hari ini:</p>\n  <p class="___">Ujian matematika jam 08.00</p>\n  <p>Istirahat jam 10.00</p>', { css: true }),
          'style.css': '.___ {\n  background-color: ___;\n  font-weight: ___;\n}\n',
        },
        solution: {
          'index.html': page('  <p>Jadwal hari ini:</p>\n  <p class="sorot">Ujian matematika jam 08.00</p>\n  <p>Istirahat jam 10.00</p>', { css: true }),
          'style.css': '.sorot {\n  background-color: yellow;\n  font-weight: bold;\n}\n',
        },
        solWhy: 'Atribut <code>class="sorot"</code> memberi label pada paragraf kedua saja. Aturan <code>.sorot</code> di CSS hanya mengenai elemen berlabel itu, sehingga paragraf lain tetap biasa.',
        check: (d) => {
          const ps = d.$$('p');
          if (!ps[1] || !ps[1].classList.contains('sorot')) return 'Paragraf kedua belum punya <code>class="sorot"</code>.';
          if (d.$$('.sorot').length > 1) return 'Hanya paragraf kedua yang diberi class <code>sorot</code>.';
          const bg = d.css(ps[1], 'backgroundColor');
          if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') return 'Class sudah dipasang. Di CSS, beri <code>.sorot</code> warna latar dengan <code>background-color</code>. Jangan lupa titik di depan nama class.';
          return Number(d.css(ps[1], 'fontWeight')) >= 600 ? true : 'Warna latar sudah ada. Tambahkan <code>font-weight: bold;</code> pada <code>.sorot</code>.';
        },
        done: 'Hanya paragraf yang penting yang tersorot.',
      },
      {
        title: 'Efek saat kursor di atas',
        body: `<p><code>:hover</code> adalah <b>pseudo-class</b>: gaya yang aktif hanya saat kursor berada di atas elemen. <code>transition</code> membuat perubahannya halus.</p>
<p>Jalankan, lalu arahkan kursor ke tombol di Preview.</p>`,
        files: {
          'index.html': page('  <button class="tombol">Arahkan kursor ke sini</button>', { css: true }),
          'style.css': '.tombol {\n  background-color: royalblue;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  font-size: 16px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.tombol:hover {\n  background-color: darkorange;\n}\n',
        },
        after: '<p><code>.tombol:hover</code> berarti "elemen ber-class <code>tombol</code>, saat di-hover". <code>cursor: pointer</code> mengubah kursor jadi tangan, memberi tanda bahwa elemen itu bisa diklik.</p>',
      },
    ],
  },
  {
    title: 'Box Model',
    intro: 'Setiap elemen di halaman sebenarnya adalah sebuah kotak.',
    steps: [
      {
        title: 'Setiap elemen adalah kotak',
        body: `<p>Setiap elemen punya empat lapisan, dari dalam ke luar:</p>
<ol><li><b>content</b>: isinya (teks, gambar).</li><li><b>padding</b>: jarak antara isi dan bingkai (di <i>dalam</i> kotak).</li><li><b>border</b>: bingkai.</li><li><b>margin</b>: jarak antara kotak ini dan kotak lain (di <i>luar</i> kotak).</li></ol>`,
        files: {
          'index.html': page('  <div class="kotak">Saya sebuah kotak</div>\n  <div class="kotak">Saya kotak kedua</div>', { css: true }),
          'style.css': '.kotak {\n  background-color: lightblue;\n  padding: 20px;\n  border: 4px solid navy;\n  margin: 16px;\n}\n',
        },
        deep: {
          lines: [
            ['padding: 20px;', 'Ruang 20px di dalam kotak, antara teks dan bingkai. Warna latar ikut mengisi padding.'],
            ['border: 4px solid navy;', 'Bingkai setebal 4px, garis penuh (<code>solid</code>), berwarna navy. Tiga nilai sekaligus: tebal, gaya, warna.'],
            ['margin: 16px;', 'Jarak 16px di luar kotak. Margin selalu transparan.'],
          ],
          result: 'Teks tidak menempel ke bingkai karena ada padding, dan kedua kotak tidak menempel karena ada margin. Coba ubah nilainya satu per satu untuk merasakan bedanya.',
        },
        after: '<p>Cara mudah mengingat: <b>padding</b> = bantalan di dalam, <b>margin</b> = jarak di luar.</p>',
      },
      {
        title: 'Kartu yang rapi',
        body: '<p><code>border-radius</code> membulatkan sudut kotak. Semakin besar nilainya, semakin bulat.</p>',
        task: 'Buat <code>.kartu</code> punya <code>padding</code> 16px, <code>border</code> 2px solid (warna bebas), dan <code>border-radius</code> 8px.',
        files: {
          'index.html': page('  <div class="kartu">\n    <h2>Kartu Profil</h2>\n    <p>Kartu ini masih polos.</p>\n  </div>', { css: true }),
          'style.css': '.kartu {\n  /* tambahkan padding, border, dan border-radius */\n}\n',
        },
        hints: [
          'Tiga properti di dalam aturan <code>.kartu</code>: <code>padding</code>, <code>border</code>, <code>border-radius</code>.',
          '<code>border</code> menerima tiga nilai berurutan: tebal, gaya, warna. Contoh: <code>border: 2px solid gray;</code>',
        ],
        skeleton: {
          'index.html': page('  <div class="kartu">\n    <h2>Kartu Profil</h2>\n    <p>Kartu ini masih polos.</p>\n  </div>', { css: true }),
          'style.css': '.kartu {\n  padding: ___;\n  border: ___ solid ___;\n  border-radius: ___;\n}\n',
        },
        solution: {
          'index.html': page('  <div class="kartu">\n    <h2>Kartu Profil</h2>\n    <p>Kartu ini masih polos.</p>\n  </div>', { css: true }),
          'style.css': '.kartu {\n  padding: 16px;\n  border: 2px solid gray;\n  border-radius: 8px;\n}\n',
        },
        solWhy: 'Padding memberi ruang di dalam kartu, border menggambar bingkainya, dan border-radius membulatkan keempat sudut bingkai itu. Ketiganya bersama membuat sebuah <code>div</code> polos tampil seperti kartu.',
        check: (d) => {
          const k = d.$('.kartu');
          if (!k) return 'Elemen <code>.kartu</code> tidak ditemukan di HTML.';
          if (d.css(k, 'paddingTop') !== '16px') return 'Padding kartu belum 16px. Tulis <code>padding: 16px;</code>';
          if (d.css(k, 'borderTopWidth') !== '2px' || d.css(k, 'borderTopStyle') !== 'solid') return 'Padding sudah benar. Bingkainya belum 2px solid, misalnya <code>border: 2px solid gray;</code>';
          return d.css(k, 'borderTopLeftRadius') === '8px' ? true : 'Bingkai sudah benar. Tinggal <code>border-radius: 8px;</code>';
        },
        done: 'Kartumu sekarang tampil rapi.',
      },
      {
        title: 'Lebar dan posisi tengah',
        body: `<p>Secara bawaan, <code>div</code> selebar layar. Kita bisa membatasi lebarnya dengan <code>max-width</code>, lalu menaruhnya di tengah dengan <code>margin: 0 auto</code>.</p>`,
        files: {
          'index.html': page('  <div class="wadah">\n    <h1>Artikel</h1>\n    <p>Teks yang terlalu lebar sulit dibaca. Membatasi lebar membuat mata tidak lelah saat membaca baris yang panjang.</p>\n  </div>', { css: true }),
          'style.css': '.wadah {\n  max-width: 400px;\n  margin: 0 auto;\n  background-color: whitesmoke;\n  padding: 16px;\n}\n',
        },
        after: '<p><code>margin: 0 auto</code> berarti margin atas-bawah 0, kiri-kanan <code>auto</code>. Browser membagi sisa ruang kiri dan kanan sama besar, sehingga kotak berada di tengah.</p>',
      },
    ],
  },
  {
    title: 'Tata Letak dengan Flexbox',
    intro: 'Menyusun elemen berjajar dan menaruhnya tepat di tengah.',
    steps: [
      {
        title: 'Menyusun berjajar',
        body: `<p>Elemen blok seperti <code>div</code> secara bawaan bertumpuk ke bawah. <code>display: flex</code> pada <b>wadahnya</b> membuat anak-anaknya berjajar ke samping.</p>
<ul><li><code>gap</code>: jarak antar anak.</li><li><code>justify-content</code>: posisi anak di sepanjang baris (<code>flex-start</code>, <code>center</code>, <code>space-between</code>).</li></ul>`,
        files: {
          'index.html': page('  <div class="baris">\n    <div class="item">Satu</div>\n    <div class="item">Dua</div>\n    <div class="item">Tiga</div>\n  </div>', { css: true }),
          'style.css': '.baris {\n  display: flex;\n  gap: 12px;\n}\n\n.item {\n  background-color: lightgreen;\n  padding: 16px;\n}\n',
        },
        after: '<p>Coba tambahkan <code>justify-content: space-between;</code> pada <code>.baris</code> dan lihat bagaimana ketiga item menyebar.</p>',
      },
      {
        title: 'Menu navigasi',
        body: '<p>Menu di bagian atas website hampir selalu dibuat dengan flexbox.</p>',
        task: 'Buat <code>.menu</code> menyusun link-link-nya berjajar dengan jarak (<code>gap</code>) 16px.',
        files: {
          'index.html': page('  <nav class="menu">\n    <a href="#">Beranda</a>\n    <a href="#">Tentang</a>\n    <a href="#">Kontak</a>\n  </nav>', { css: true }),
          'style.css': '.menu {\n  background-color: #222;\n  padding: 12px;\n  /* buat berjajar dengan jarak 16px */\n}\n\n.menu a {\n  color: white;\n}\n',
        },
        hints: ['Aturannya dipasang pada wadah (<code>.menu</code>), bukan pada link-nya.', 'Dua properti: <code>display: flex;</code> dan <code>gap: 16px;</code>'],
        skeleton: {
          'index.html': page('  <nav class="menu">\n    <a href="#">Beranda</a>\n    <a href="#">Tentang</a>\n    <a href="#">Kontak</a>\n  </nav>', { css: true }),
          'style.css': '.menu {\n  background-color: #222;\n  padding: 12px;\n  display: ___;\n  gap: ___;\n}\n\n.menu a {\n  color: white;\n}\n',
        },
        solution: {
          'index.html': page('  <nav class="menu">\n    <a href="#">Beranda</a>\n    <a href="#">Tentang</a>\n    <a href="#">Kontak</a>\n  </nav>', { css: true }),
          'style.css': '.menu {\n  background-color: #222;\n  padding: 12px;\n  display: flex;\n  gap: 16px;\n}\n\n.menu a {\n  color: white;\n}\n',
        },
        solWhy: '<code>display: flex</code> mengubah <code>.menu</code> menjadi wadah flex, sehingga semua anaknya (link) disusun dalam satu baris. <code>gap</code> mengatur jarak di antara anak-anak itu tanpa perlu memberi margin satu per satu.',
        check: (d) => {
          if (d.css('.menu', 'display') !== 'flex') return '<code>.menu</code> belum menjadi wadah flex. Tambahkan <code>display: flex;</code>';
          return d.css('.menu', 'columnGap') === '16px' ? true : 'Sudah flex. Jaraknya belum 16px: tambahkan <code>gap: 16px;</code>';
        },
        done: 'Menu navigasimu sudah jadi.',
      },
      {
        title: 'Tepat di tengah',
        body: '<p>Menaruh sesuatu tepat di tengah dulu terkenal sulit. Dengan flexbox cukup dua properti: <code>justify-content</code> (arah mendatar) dan <code>align-items</code> (arah tegak).</p>',
        task: 'Buat tulisan di dalam <code>.wadah</code> berada tepat di tengah, mendatar dan tegak.',
        files: {
          'index.html': page('  <div class="wadah">\n    <p>Aku di tengah!</p>\n  </div>', { css: true }),
          'style.css': '.wadah {\n  height: 200px;\n  background-color: lavender;\n  /* buat isinya tepat di tengah */\n}\n',
        },
        hints: [
          'Langkah pertama selalu sama: <code>display: flex;</code> pada wadah.',
          'Tengah mendatar: <code>justify-content: center;</code>. Tengah tegak: <code>align-items: center;</code>',
        ],
        skeleton: {
          'index.html': page('  <div class="wadah">\n    <p>Aku di tengah!</p>\n  </div>', { css: true }),
          'style.css': '.wadah {\n  height: 200px;\n  background-color: lavender;\n  display: ___;\n  justify-content: ___;\n  align-items: ___;\n}\n',
        },
        solution: {
          'index.html': page('  <div class="wadah">\n    <p>Aku di tengah!</p>\n  </div>', { css: true }),
          'style.css': '.wadah {\n  height: 200px;\n  background-color: lavender;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n',
        },
        solWhy: 'Dalam wadah flex, <code>justify-content</code> mengatur posisi di arah baris (mendatar) dan <code>align-items</code> di arah sebaliknya (tegak). Karena wadahnya setinggi 200px, ada ruang tegak untuk menaruh teks di tengahnya.',
        check: (d) => {
          if (d.css('.wadah', 'display') !== 'flex') return 'Mulai dengan <code>display: flex;</code> pada <code>.wadah</code>.';
          if (d.css('.wadah', 'justifyContent') !== 'center') return 'Belum di tengah secara mendatar. Tambahkan <code>justify-content: center;</code>';
          return d.css('.wadah', 'alignItems') === 'center' ? true : 'Mendatar sudah di tengah. Untuk arah tegak, tambahkan <code>align-items: center;</code>';
        },
        done: 'Tepat di tengah! Trik ini akan sering kamu pakai.',
      },
    ],
  },
  {
    title: 'JavaScript Bertemu HTML',
    intro: 'Mengubah halaman lewat JavaScript dengan DOM.',
    steps: [
      {
        title: 'Mengubah teks lewat JavaScript',
        body: `<p>Sekarang ada tab <b>script.js</b>, dihubungkan lewat <code>&lt;script src="script.js"&gt;</code> di akhir <code>body</code>.</p>
<p>Browser mengubah HTML menjadi <b>DOM</b>: pohon objek yang bisa dibaca dan diubah oleh JavaScript. Dua alat utama:</p>
<ul><li><code>document.querySelector("selector")</code>: mencari elemen pertama yang cocok (selector-nya sama seperti di CSS).</li><li><code>elemen.textContent</code>: membaca atau mengganti teks di dalam elemen.</li></ul>`,
        files: {
          'index.html': page('  <h1>Judul asli dari HTML</h1>', { js: true }),
          'script.js': 'const judul = document.querySelector("h1");\njudul.textContent = "Diubah oleh JavaScript!";\n',
        },
        deep: {
          lines: [
            ['const judul = document.querySelector("h1");', 'Mencari elemen <code>h1</code> pertama di halaman, lalu menyimpannya di variabel <code>judul</code>. Sekarang <code>judul</code> mewakili elemen itu.'],
            ['judul.textContent = "Diubah oleh JavaScript!";', 'Mengganti teks di dalam elemen tersebut. Perubahan langsung terlihat di halaman.'],
          ],
          flow: [
            'Browser membaca HTML dan menampilkan "Judul asli dari HTML".',
            'Sampai di <code>&lt;script&gt;</code> paling bawah, browser menjalankan script.js.',
            'JavaScript menemukan <code>h1</code> lalu mengganti teksnya. Semua terjadi sangat cepat, jadi teks aslinya hampir tidak sempat terlihat.',
          ],
          result: 'Yang tampil adalah teks dari JavaScript, bukan dari HTML, karena JavaScript berjalan setelah HTML dimuat dan menimpa isinya. Script ditaruh di akhir <code>body</code> supaya semua elemen sudah ada saat dicari.',
        },
        after: '<p>Coba ganti <code>"h1"</code> dengan selector yang tidak ada, misalnya <code>"h2"</code>. Kamu akan melihat error, karena <code>querySelector</code> mengembalikan <code>null</code> jika tidak menemukan apa pun.</p>',
      },
      {
        title: 'Ganti isi pesan',
        body: '<p>Selector di <code>querySelector</code> sama persis dengan CSS: <code>"p"</code> untuk tag, <code>".nama"</code> untuk class, dan <code>"#nama"</code> untuk <b>id</b>. Id adalah label unik: satu id hanya untuk satu elemen.</p>',
        task: 'Lewat <b>script.js</b> (bukan mengedit HTML), ubah teks paragraf <code>#pesan</code> menjadi <b>Halo dari JavaScript!</b>',
        files: {
          'index.html': page('  <p id="pesan">Pesan lama</p>', { js: true }),
          'script.js': '// Cari elemen #pesan lalu ganti teksnya\n',
        },
        hints: [
          'Cari elemennya dengan selector id: <code>document.querySelector("#pesan")</code>',
          'Simpan di variabel, lalu ubah <code>.textContent</code>-nya.',
        ],
        skeleton: {
          'index.html': page('  <p id="pesan">Pesan lama</p>', { js: true }),
          'script.js': 'const pesan = document.querySelector("___");\npesan.___ = "Halo dari JavaScript!";\n',
        },
        solution: {
          'index.html': page('  <p id="pesan">Pesan lama</p>', { js: true }),
          'script.js': 'const pesan = document.querySelector("#pesan");\npesan.textContent = "Halo dari JavaScript!";\n',
        },
        solWhy: '<code>"#pesan"</code> mencari elemen dengan <code>id="pesan"</code>. Tanda pagar <code>#</code> untuk id, sama seperti titik <code>.</code> untuk class. Setelah elemen ditemukan, <code>textContent</code> mengganti isinya.',
        check: (d) => {
          if ((d.src['index.html'] || '').includes('Halo dari JavaScript')) return 'Teksnya diubah langsung di HTML. Kembalikan HTML seperti semula (klik <i>Kode awal</i>), lalu ubah lewat <b>script.js</b>.';
          if (!/querySelector|getElementById/.test(d.src['script.js'] || '')) return 'Cari elemennya di script.js dengan <code>document.querySelector("#pesan")</code>.';
          return d.text('#pesan') === 'Halo dari JavaScript!' ? true : 'Teks <code>#pesan</code> belum persis <b>Halo dari JavaScript!</b> (perhatikan huruf besar dan tanda seru).';
        },
        done: 'Kamu baru saja mengubah halaman dengan JavaScript.',
      },
      {
        title: 'Mengubah gaya dan class',
        body: `<p>JavaScript juga bisa mengubah tampilan:</p><ul><li><code>el.style.color = "red"</code>: mengubah satu gaya langsung.</li><li><code>el.classList.add("nama")</code>: menambah class, sehingga semua aturan CSS untuk class itu langsung berlaku.</li></ul>
<p>Cara kedua lebih disukai: gaya tetap ditulis di CSS, JavaScript hanya memasang atau melepas class.</p>`,
        files: {
          'index.html': page('  <p class="info">Teks ini diwarnai lewat style.</p>\n  <p class="catatan">Teks ini diberi class lewat classList.</p>', { css: true, js: true }),
          'style.css': '.tebal-biru {\n  color: royalblue;\n  font-weight: bold;\n}\n',
          'script.js': 'const info = document.querySelector(".info");\ninfo.style.color = "crimson";\n\nconst catatan = document.querySelector(".catatan");\ncatatan.classList.add("tebal-biru");\n',
        },
        after: '<p>Perhatikan: di JavaScript, nama properti CSS yang memakai tanda hubung ditulis dengan huruf besar: <code>background-color</code> menjadi <code>style.backgroundColor</code>.</p>',
      },
      {
        title: 'Menyalakan kotak',
        body: '<p>Gaya <code>.nyala</code> sudah disiapkan di style.css. Tugasmu hanya memasangnya lewat JavaScript.</p>',
        task: 'Di script.js, tambahkan class <code>nyala</code> pada elemen <code>.kotak</code> memakai <code>classList.add</code>.',
        files: {
          'index.html': page('  <div class="kotak">Lampu</div>', { css: true, js: true }),
          'style.css': '.kotak {\n  padding: 24px;\n  background-color: #444;\n  color: white;\n  text-align: center;\n}\n\n.nyala {\n  background-color: gold;\n  color: black;\n}\n',
          'script.js': '// Tambahkan class "nyala" ke .kotak\n',
        },
        hints: [
          'Cari elemennya dulu: <code>document.querySelector(".kotak")</code>',
          'Lalu <code>kotak.classList.add("nyala");</code> Perhatikan: nama class di sini <b>tanpa</b> titik.',
        ],
        skeleton: {
          'index.html': page('  <div class="kotak">Lampu</div>', { css: true, js: true }),
          'style.css': '.kotak {\n  padding: 24px;\n  background-color: #444;\n  color: white;\n  text-align: center;\n}\n\n.nyala {\n  background-color: gold;\n  color: black;\n}\n',
          'script.js': 'const kotak = document.querySelector("___");\nkotak.classList.___("___");\n',
        },
        solution: {
          'index.html': page('  <div class="kotak">Lampu</div>', { css: true, js: true }),
          'style.css': '.kotak {\n  padding: 24px;\n  background-color: #444;\n  color: white;\n  text-align: center;\n}\n\n.nyala {\n  background-color: gold;\n  color: black;\n}\n',
          'script.js': 'const kotak = document.querySelector(".kotak");\nkotak.classList.add("nyala");\n',
        },
        solWhy: '<code>querySelector(".kotak")</code> memakai titik karena itu selector CSS. Di <code>classList.add("nyala")</code> titiknya tidak dipakai, karena yang diberikan adalah <i>nama</i> class, bukan selector. Setelah class terpasang, aturan <code>.nyala</code> di CSS langsung berlaku.',
        check: (d) => {
          const k = d.$('.kotak');
          if (!k) return 'Elemen <code>.kotak</code> tidak ditemukan.';
          if (!/classList/.test(d.src['script.js'] || '')) return 'Gunakan <code>classList.add</code> di script.js.';
          return k.classList.contains('nyala') ? true : 'Class <code>nyala</code> belum terpasang. Ingat, tulis <code>classList.add("nyala")</code> tanpa titik.';
        },
        done: 'Lampu menyala! Inilah dasar dari tema gelap, menu yang terbuka, dan banyak efek lainnya.',
      },
    ],
  },
  {
    title: 'Event: Merespons Klik',
    intro: 'Membuat halaman bereaksi saat pengguna berinteraksi.',
    steps: [
      {
        title: 'addEventListener',
        body: `<p><b>Event</b> adalah kejadian: klik, ketikan, gerakan mouse. Dengan <code>addEventListener</code>, kita memberi tahu browser: "saat kejadian ini terjadi, jalankan fungsi ini".</p>
<p>Jalankan, lalu klik tombol di Preview.</p>`,
        files: {
          'index.html': page('  <button id="tombol">Klik aku</button>\n  <p id="info">Belum diklik.</p>', { js: true }),
          'script.js': 'const tombol = document.querySelector("#tombol");\nconst info = document.querySelector("#info");\n\ntombol.addEventListener("click", () => {\n  info.textContent = "Tombol diklik!";\n});\n',
        },
        deep: {
          lines: [
            ['const tombol = document.querySelector("#tombol");', 'Mengambil elemen tombol.'],
            ['tombol.addEventListener("click", () => {', 'Mendaftarkan fungsi untuk event <code>"click"</code>. Fungsi ini <b>belum</b> dijalankan sekarang, hanya disimpan.'],
            ['  info.textContent = "Tombol diklik!";', 'Isi fungsi: baru dijalankan setiap kali tombol diklik.'],
            ['});', 'Menutup fungsi, lalu menutup kurung <code>addEventListener</code>.'],
          ],
          flow: [
            'Saat halaman dimuat, script berjalan: mencari elemen dan mendaftarkan fungsi. Teks masih "Belum diklik."',
            'Browser menunggu.',
            'Saat tombol diklik, browser memanggil fungsi tadi, dan teks berubah.',
          ],
          result: 'Teks hanya berubah setelah diklik, bukan saat halaman dibuka. Inilah perbedaan penting: kode di dalam fungsi event berjalan <i>nanti</i>, saat kejadiannya terjadi.',
        },
        after: '<p>Arrow function <code>() =&gt; { ... }</code> yang kamu pelajari di course JavaScript dipakai di sini sebagai "apa yang dilakukan saat diklik".</p>',
      },
      {
        title: 'Penghitung klik',
        body: '<p>Gabungkan variabel dengan event: variabel <code>jumlah</code> menyimpan angka, dan setiap klik menambahnya lalu menampilkannya.</p>',
        task: 'Setiap kali tombol <code>#tambah</code> diklik, angka di <code>#angka</code> bertambah 1.',
        files: {
          'index.html': page('  <p>Jumlah klik: <span id="angka">0</span></p>\n  <button id="tambah">Tambah</button>', { js: true }),
          'script.js': 'const tombol = document.querySelector("#tambah");\nconst angka = document.querySelector("#angka");\nlet jumlah = 0;\n\n// Saat tombol diklik: tambah jumlah, lalu tampilkan di #angka\n',
        },
        hints: [
          'Pakai <code>tombol.addEventListener("click", () =&gt; { ... });</code>',
          'Di dalam fungsi: <code>jumlah++;</code> untuk menambah 1.',
          'Lalu tampilkan: <code>angka.textContent = jumlah;</code>',
        ],
        skeleton: {
          'index.html': page('  <p>Jumlah klik: <span id="angka">0</span></p>\n  <button id="tambah">Tambah</button>', { js: true }),
          'script.js': 'const tombol = document.querySelector("#tambah");\nconst angka = document.querySelector("#angka");\nlet jumlah = 0;\n\ntombol.addEventListener("___", () => {\n  jumlah___;\n  angka.textContent = ___;\n});\n',
        },
        solution: {
          'index.html': page('  <p>Jumlah klik: <span id="angka">0</span></p>\n  <button id="tambah">Tambah</button>', { js: true }),
          'script.js': 'const tombol = document.querySelector("#tambah");\nconst angka = document.querySelector("#angka");\nlet jumlah = 0;\n\ntombol.addEventListener("click", () => {\n  jumlah++;\n  angka.textContent = jumlah;\n});\n',
        },
        solWhy: '<code>jumlah</code> dibuat di luar fungsi, jadi nilainya bertahan di antara klik. Kalau <code>let jumlah = 0</code> ditaruh di dalam fungsi, setiap klik akan mulai dari 0 lagi dan angkanya selalu 1. Setelah ditambah, <code>textContent</code> menampilkan nilai terbarunya.',
        check: (d) => {
          if (d.text('#angka') !== '0') return 'Sebelum diklik, angkanya harus 0.';
          d.click('#tambah');
          d.click('#tambah');
          d.click('#tambah');
          const n = d.text('#angka');
          if (n === '0') return 'Guru mengklik tombol 3 kali, tapi angkanya tetap 0. Pastikan ada <code>addEventListener("click", ...)</code> yang mengubah <code>angka.textContent</code>.';
          if (n === '1') return 'Setelah 3 klik angkanya 1. Apakah <code>let jumlah = 0</code> ada di dalam fungsi? Taruh di luar supaya nilainya tidak kembali ke 0.';
          return n === '3' ? true : 'Setelah 3 klik, angkanya ' + n + '. Seharusnya 3.';
        },
        done: 'Penghitungmu bekerja. Guru sudah mengujinya dengan 3 klik.',
      },
      {
        title: 'Mode gelap',
        body: '<p><code>classList.toggle("nama")</code> memasang class jika belum ada, dan melepasnya jika sudah ada. Pas untuk tombol nyala/mati.</p>',
        task: 'Saat <code>#tema</code> diklik, pasang/lepas class <code>gelap</code> pada <code>body</code>. Gaya <code>.gelap</code> sudah disiapkan.',
        files: {
          'index.html': page('  <h1>Mode Gelap</h1>\n  <p>Klik tombol untuk berganti tema.</p>\n  <button id="tema">Ganti tema</button>', { css: true, js: true }),
          'style.css': 'body {\n  transition: background-color 0.3s;\n}\n\n.gelap {\n  background-color: #1e1e1e;\n  color: #eee;\n}\n',
          'script.js': '// Saat #tema diklik, toggle class "gelap" pada body\n',
        },
        hints: [
          'Elemen body bisa diambil langsung dengan <code>document.body</code>.',
          'Dalam fungsi klik: <code>document.body.classList.toggle("gelap");</code>',
        ],
        skeleton: {
          'index.html': page('  <h1>Mode Gelap</h1>\n  <p>Klik tombol untuk berganti tema.</p>\n  <button id="tema">Ganti tema</button>', { css: true, js: true }),
          'style.css': 'body {\n  transition: background-color 0.3s;\n}\n\n.gelap {\n  background-color: #1e1e1e;\n  color: #eee;\n}\n',
          'script.js': 'const tombol = document.querySelector("___");\n\ntombol.addEventListener("click", () => {\n  document.body.classList.___("___");\n});\n',
        },
        solution: {
          'index.html': page('  <h1>Mode Gelap</h1>\n  <p>Klik tombol untuk berganti tema.</p>\n  <button id="tema">Ganti tema</button>', { css: true, js: true }),
          'style.css': 'body {\n  transition: background-color 0.3s;\n}\n\n.gelap {\n  background-color: #1e1e1e;\n  color: #eee;\n}\n',
          'script.js': 'const tombol = document.querySelector("#tema");\n\ntombol.addEventListener("click", () => {\n  document.body.classList.toggle("gelap");\n});\n',
        },
        solWhy: 'Klik pertama: body belum punya class <code>gelap</code>, jadi <code>toggle</code> memasangnya dan halaman jadi gelap. Klik kedua: class sudah ada, jadi <code>toggle</code> melepasnya. Satu baris kode menangani dua arah.',
        check: (d) => {
          if (document.body.classList.contains('gelap')) return 'Halaman sudah gelap sebelum diklik. Class <code>gelap</code> seharusnya hanya dipasang saat tombol diklik.';
          d.click('#tema');
          if (!document.body.classList.contains('gelap')) return 'Guru mengklik tombol, tapi body belum mendapat class <code>gelap</code>.';
          d.click('#tema');
          return document.body.classList.contains('gelap') ? 'Klik pertama berhasil, tapi klik kedua tidak mengembalikan tema terang. Gunakan <code>classList.toggle</code>, bukan <code>add</code>.' : true;
        },
        done: 'Mode gelapmu bisa dinyalakan dan dimatikan.',
      },
    ],
  },
  {
    title: 'Input dari Pengguna',
    intro: 'Membaca apa yang diketik pengguna dan menanggapinya.',
    steps: [
      {
        title: 'Membaca isi input',
        body: `<p><code>&lt;input&gt;</code> adalah kotak isian. Isinya dibaca dengan properti <code>.value</code>.</p>
<p>Penting: baca <code>.value</code> <b>di dalam</b> fungsi event, supaya yang dibaca adalah isi terbaru saat tombol diklik.</p>`,
        files: {
          'index.html': page('  <input id="kota" placeholder="Nama kotamu">\n  <button id="kirim">Kirim</button>\n  <p id="hasil"></p>', { js: true }),
          'script.js': 'const input = document.querySelector("#kota");\nconst tombol = document.querySelector("#kirim");\nconst hasil = document.querySelector("#hasil");\n\ntombol.addEventListener("click", () => {\n  hasil.textContent = "Kamu tinggal di " + input.value;\n});\n',
        },
        after: '<p>Ketik nama kota di Preview, lalu klik Kirim. Atribut <code>placeholder</code> adalah teks abu-abu yang hilang saat kamu mulai mengetik.</p>',
      },
      {
        title: 'Sapaan',
        body: '',
        task: 'Saat <code>#sapa</code> diklik, tampilkan <b>Halo, (nama)!</b> di <code>#hasil</code>, memakai nama dari input <code>#nama</code>. Contoh: <code>Halo, Budi!</code>',
        files: {
          'index.html': page('  <input id="nama" placeholder="Namamu">\n  <button id="sapa">Sapa</button>\n  <p id="hasil"></p>', { js: true }),
          'script.js': 'const input = document.querySelector("#nama");\nconst tombol = document.querySelector("#sapa");\nconst hasil = document.querySelector("#hasil");\n\n// Saat tombol diklik, tampilkan "Halo, (nama)!" di #hasil\n',
        },
        hints: [
          'Pola event-nya sama: <code>tombol.addEventListener("click", () =&gt; { ... });</code>',
          'Gabungkan teks: <code>"Halo, " + input.value + "!"</code>',
          'Taruh hasilnya di <code>hasil.textContent</code>.',
        ],
        skeleton: {
          'index.html': page('  <input id="nama" placeholder="Namamu">\n  <button id="sapa">Sapa</button>\n  <p id="hasil"></p>', { js: true }),
          'script.js': 'const input = document.querySelector("#nama");\nconst tombol = document.querySelector("#sapa");\nconst hasil = document.querySelector("#hasil");\n\ntombol.addEventListener("click", () => {\n  hasil.textContent = "Halo, " + ___ + "!";\n});\n',
        },
        solution: {
          'index.html': page('  <input id="nama" placeholder="Namamu">\n  <button id="sapa">Sapa</button>\n  <p id="hasil"></p>', { js: true }),
          'script.js': 'const input = document.querySelector("#nama");\nconst tombol = document.querySelector("#sapa");\nconst hasil = document.querySelector("#hasil");\n\ntombol.addEventListener("click", () => {\n  hasil.textContent = "Halo, " + input.value + "!";\n});\n',
        },
        solWhy: '<code>input.value</code> dibaca di dalam fungsi klik, jadi isinya selalu yang terbaru. Jika dibaca di luar fungsi (saat halaman dimuat), nilainya masih kosong dan tidak akan berubah.',
        check: (d) => {
          d.type('#nama', 'Budi');
          d.click('#sapa');
          const a = d.text('#hasil');
          if (!a) return 'Guru mengetik "Budi" dan mengklik Sapa, tapi <code>#hasil</code> masih kosong.';
          if (a !== 'Halo, Budi!') return 'Guru mengetik "Budi", hasilnya belum persis <code>Halo, Budi!</code> (perhatikan koma, spasi, dan tanda seru).';
          d.type('#nama', 'Sari');
          d.click('#sapa');
          return d.text('#hasil') === 'Halo, Sari!' ? true : 'Untuk "Budi" sudah benar, tapi saat nama diganti "Sari" hasilnya tidak ikut berubah. Baca <code>input.value</code> di dalam fungsi klik.';
        },
        done: 'Sapaanmu bekerja. Guru mengujinya dengan dua nama berbeda.',
      },
      {
        title: 'Kalkulator tambah',
        body: `<p>Hati-hati: <code>.value</code> selalu berupa <b>string</b>, bahkan untuk <code>&lt;input type="number"&gt;</code>. Ingat <code>"5" + "3"</code> menghasilkan <code>"53"</code>!</p>
<p>Ubah string menjadi angka dengan <code>Number(...)</code> sebelum dijumlahkan.</p>`,
        task: 'Saat <code>#hitung</code> diklik, tampilkan <b>Hasil: (a + b)</b> di <code>#hasil</code>. Contoh: 5 dan 3 menghasilkan <code>Hasil: 8</code>.',
        files: {
          'index.html': page('  <input id="a" type="number"> +\n  <input id="b" type="number">\n  <button id="hitung">=</button>\n  <p id="hasil"></p>', { js: true }),
          'script.js': 'const a = document.querySelector("#a");\nconst b = document.querySelector("#b");\nconst tombol = document.querySelector("#hitung");\nconst hasil = document.querySelector("#hasil");\n\n// Saat diklik: jumlahkan a dan b sebagai ANGKA, tampilkan "Hasil: ..."\n',
        },
        hints: [
          'Di dalam fungsi klik, ubah dulu: <code>const x = Number(a.value);</code> dan sama untuk b.',
          'Jumlahkan <code>x + y</code>, lalu tampilkan: <code>hasil.textContent = "Hasil: " + (x + y);</code>',
          'Kurung di <code>(x + y)</code> penting. Tanpa kurung, teks "Hasil: " disambung dulu dengan x, lalu dengan y, sehingga hasilnya "Hasil: 53".',
        ],
        skeleton: {
          'index.html': page('  <input id="a" type="number"> +\n  <input id="b" type="number">\n  <button id="hitung">=</button>\n  <p id="hasil"></p>', { js: true }),
          'script.js': 'const a = document.querySelector("#a");\nconst b = document.querySelector("#b");\nconst tombol = document.querySelector("#hitung");\nconst hasil = document.querySelector("#hasil");\n\ntombol.addEventListener("click", () => {\n  const x = Number(___);\n  const y = Number(___);\n  hasil.textContent = "Hasil: " + (___);\n});\n',
        },
        solution: {
          'index.html': page('  <input id="a" type="number"> +\n  <input id="b" type="number">\n  <button id="hitung">=</button>\n  <p id="hasil"></p>', { js: true }),
          'script.js': 'const a = document.querySelector("#a");\nconst b = document.querySelector("#b");\nconst tombol = document.querySelector("#hitung");\nconst hasil = document.querySelector("#hasil");\n\ntombol.addEventListener("click", () => {\n  const x = Number(a.value);\n  const y = Number(b.value);\n  hasil.textContent = "Hasil: " + (x + y);\n});\n',
        },
        solWhy: '<code>Number("5")</code> menjadi angka 5, sehingga <code>5 + 3</code> dijumlahkan menjadi 8. Kurung di <code>"Hasil: " + (x + y)</code> memaksa penjumlahan dikerjakan dulu sebelum disambung dengan teks.',
        check: (d) => {
          d.type('#a', '5');
          d.type('#b', '3');
          d.click('#hitung');
          const r = d.text('#hasil');
          if (!r) return 'Guru mengisi 5 dan 3 lalu mengklik =, tapi <code>#hasil</code> masih kosong.';
          if (r.includes('53')) return 'Hasilnya 53! Angkanya disambung sebagai teks. Ubah dengan <code>Number(...)</code> dan beri kurung pada <code>(x + y)</code>.';
          return r === 'Hasil: 8' ? true : 'Untuk 5 dan 3, hasilnya belum persis <code>Hasil: 8</code>.';
        },
        done: 'Kalkulatormu menghitung dengan benar, dan kamu sudah menghindari jebakan "53".',
      },
    ],
  },
  {
    title: 'Membuat Elemen Baru',
    intro: 'Menambah isi halaman secara dinamis dengan JavaScript.',
    steps: [
      {
        title: 'createElement dan append',
        body: `<p>JavaScript bisa membuat elemen baru yang tidak ada di HTML:</p>
<ol><li><code>document.createElement("li")</code>: membuat elemen baru (belum tampil).</li><li>Isi teksnya dengan <code>textContent</code>.</li><li><code>wadah.append(elemen)</code>: memasukkannya ke halaman, sebagai anak terakhir dari wadah.</li></ol>`,
        files: {
          'index.html': page('  <ul id="daftar"></ul>', { js: true }),
          'script.js': 'const daftar = document.querySelector("#daftar");\nconst buah = ["Apel", "Jeruk", "Mangga"];\n\nfor (const nama of buah) {\n  const li = document.createElement("li");\n  li.textContent = nama;\n  daftar.append(li);\n}\n',
        },
        deep: {
          lines: [
            ['const daftar = document.querySelector("#daftar");', 'Mengambil <code>ul</code> yang masih kosong.'],
            ['for (const nama of buah) {', 'Memutar array: <code>nama</code> berisi "Apel", lalu "Jeruk", lalu "Mangga".'],
            ['  const li = document.createElement("li");', 'Membuat elemen <code>li</code> baru. Elemen ini belum tampil.'],
            ['  li.textContent = nama;', 'Mengisi teksnya dengan nama buah.'],
            ['  daftar.append(li);', 'Memasukkan <code>li</code> ke dalam <code>ul</code>. Baru sekarang ia tampil.'],
          ],
          result: 'HTML-nya hanya berisi <code>ul</code> kosong, tapi halaman menampilkan tiga item. Semuanya dibuat oleh JavaScript dari data array. Begitulah cara website menampilkan daftar produk, komentar, atau pesan.',
        },
        after: '<p>Tambahkan buah baru ke array, jalankan lagi, dan daftarnya ikut bertambah tanpa menyentuh HTML.</p>',
      },
      {
        title: 'Daftar belanja',
        body: '<p>Gabungkan semuanya: input, event klik, dan membuat elemen baru.</p>',
        task: 'Saat <code>#tambah</code> diklik, buat <code>li</code> baru berisi teks dari <code>#item</code> dan masukkan ke <code>#daftar</code>. Lalu kosongkan input (<code>input.value = ""</code>).',
        files: {
          'index.html': page('  <h2>Daftar Belanja</h2>\n  <input id="item" placeholder="Nama barang">\n  <button id="tambah">Tambah</button>\n  <ul id="daftar"></ul>', { js: true }),
          'script.js': 'const input = document.querySelector("#item");\nconst tombol = document.querySelector("#tambah");\nconst daftar = document.querySelector("#daftar");\n\n// Saat diklik: buat li dari isi input, masukkan ke daftar, kosongkan input\n',
        },
        hints: [
          'Semua langkah ada di dalam <code>tombol.addEventListener("click", () =&gt; { ... });</code>',
          'Urutannya: <code>createElement("li")</code>, isi <code>textContent</code> dengan <code>input.value</code>, lalu <code>daftar.append(li)</code>.',
          'Terakhir, <code>input.value = "";</code> supaya input siap diisi lagi.',
        ],
        skeleton: {
          'index.html': page('  <h2>Daftar Belanja</h2>\n  <input id="item" placeholder="Nama barang">\n  <button id="tambah">Tambah</button>\n  <ul id="daftar"></ul>', { js: true }),
          'script.js': 'const input = document.querySelector("#item");\nconst tombol = document.querySelector("#tambah");\nconst daftar = document.querySelector("#daftar");\n\ntombol.addEventListener("click", () => {\n  const li = document.createElement("___");\n  li.textContent = ___;\n  daftar.___(li);\n  input.value = ___;\n});\n',
        },
        solution: {
          'index.html': page('  <h2>Daftar Belanja</h2>\n  <input id="item" placeholder="Nama barang">\n  <button id="tambah">Tambah</button>\n  <ul id="daftar"></ul>', { js: true }),
          'script.js': 'const input = document.querySelector("#item");\nconst tombol = document.querySelector("#tambah");\nconst daftar = document.querySelector("#daftar");\n\ntombol.addEventListener("click", () => {\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  daftar.append(li);\n  input.value = "";\n});\n',
        },
        solWhy: 'Setiap klik membuat <code>li</code> yang <b>baru</b>, karena <code>createElement</code> ada di dalam fungsi klik. Kalau dibuat di luar fungsi, hanya ada satu <code>li</code> yang terus dipindahkan, sehingga daftarnya tidak pernah bertambah. Mengosongkan input setelahnya membuat pengguna bisa langsung mengetik barang berikutnya.',
        check: (d) => {
          d.type('#item', 'Susu');
          d.click('#tambah');
          let items = d.$$('#daftar li');
          if (!items.length) return 'Guru mengetik "Susu" lalu klik Tambah, tapi belum ada <code>li</code> di <code>#daftar</code>.';
          if (items[items.length - 1].textContent.trim() !== 'Susu') return 'Ada <code>li</code> baru, tapi isinya bukan teks dari input. Gunakan <code>input.value</code>.';
          if (d.$('#item').value !== '') return 'Item sudah masuk. Sekarang kosongkan input setelah menambah: <code>input.value = "";</code>';
          d.type('#item', 'Roti');
          d.click('#tambah');
          items = d.$$('#daftar li');
          return items.length === 2 ? true : 'Item pertama masuk, tapi setelah item kedua jumlahnya ' + items.length + '. Pastikan <code>createElement</code> ada di dalam fungsi klik.';
        },
        done: 'Daftar belanjamu bekerja penuh!',
      },
      {
        title: 'Selamat, kamu bisa membuat halaman web!',
        body: `<p>Kamu sudah belajar membangun halaman dari nol:</p>
<ul><li><b>HTML</b>: judul, paragraf, link, gambar, daftar, kotak.</li><li><b>CSS</b>: warna, huruf, class, box model, dan flexbox.</li><li><b>JavaScript</b>: mengubah halaman, merespons klik, membaca input, dan membuat elemen baru.</li></ul>
<p>Langkah berikutnya:</p><ul><li>Buka <b>Workspace</b> dan tekan tombol bintang untuk memuat contoh proyek HTML + CSS + JS, lalu kembangkan.</li><li>Ide proyek: halaman profil pribadi, to-do list dengan tombol hapus, kuis pilihan ganda, atau kalkulator lengkap.</li><li>Jika belum, ikuti course <b>Ajari JS</b> untuk memperdalam logika pemrograman.</li></ul>`,
        files: {
          'index.html': page('  <div class="selamat">\n    <h1>Selamat!</h1>\n    <p>Kamu menyelesaikan course Ajari Web.</p>\n  </div>', { css: true }),
          'style.css': 'body {\n  margin: 0;\n  font-family: sans-serif;\n}\n\n.selamat {\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: gold;\n}\n',
        },
      },
    ],
  },
];
