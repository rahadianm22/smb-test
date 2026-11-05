// Latar tes: Background, Problem Statement, How we did.
// Angka UMKM berasal dari rilis Kemenko Perekonomian No. HM.4.6/103/SET.M.EKON.3/05/2021 (5 Mei 2021),
// yang mengutip Kementerian Koperasi dan UKM. Isi "How we did" hanya memuat yang benar-benar dikerjakan.
const TEMUAN = [
  ['Nomor telepon sebagai nama', 'Daftar percakapan menampilkan “+6283172813661”, sehingga pemilik sulit tahu siapa pembelinya.'],
  ['Istilah yang perlu ditebak', '“AI Aktif”, “Ambil alih chat”, “Tayang”, dan “0% terpakai” tidak menjelaskan apa yang terjadi atau apa yang harus dilakukan.'],
  ['Pembeli harus belajar perintah', 'Bot meminta pembeli mengetik “nomor dan jumlah” atau format seperti “ubah 1 jadi 10”.'],
  ['Bot menyatakan pembayaran diterima', 'Bertentangan dengan brief: konfirmasi pembayaran harus dicek pemilik. Kecuali QRIS lewat sistem pembayaran, yang memang terkonfirmasi otomatis.'],
  ['Status tidak mengikuti pilihan', 'Pesanan yang diambil di toko tetap menerima kabar “sedang dalam perjalanan”.']
];

const LANGKAH = [
  ['Membaca brief dan memilah aturannya', 'Asisten membalas chat dan mencatat pesanan. Asisten tidak menagih dan tidak memutuskan lunas. Dari sini lahir aturan desain: setiap pesan WhatsApp bertanda pengirimnya (Asisten Pintar, Bu Sari, atau sistem pembayaran).'],
  ['Membuat tiga tokoh dari persona', 'Ibu Sari (warung kopi), Pak Budi (bengkel), dan Mbak Dewi (fashion online). Ketiganya dipakai untuk menguji apakah satu layar cukup jelas bagi orang yang tidak punya waktu belajar aplikasi.'],
  ['Mencoba layar dan percakapan Sejati yang sudah berjalan', 'Hasilnya lima temuan di atas. Kerangka alurnya sudah tepat dan saya pertahankan, termasuk QRIS yang terkonfirmasi otomatis. Yang saya ubah adalah bahasa, tanda pengirim, dan siapa yang memegang keputusan untuk transfer manual.'],
  ['Merancang dua sisi sekaligus', 'Pembeli di WhatsApp dan Bu Sari di aplikasi dibuat sebagai dua HP yang saling terhubung, karena aturan “Asisten tidak menagih” hanya terbukti kalau kedua sisinya terlihat.'],
  ['Menyederhanakan untuk pengguna yang tidak melek teknologi', 'Chat Asisten menjadi percakapan Bu Sari dengan Asisten (tanya yang belum bayar, rekap, tandai menu habis). Hanya tiga tombol contoh, huruf dan tombol lebih besar, laporan dipangkas jadi tiga blok, dan status pesanan menjadi empat tahap dengan satu tombol.'],
  ['Menulis ulang bahasa dari layar yang ada', 'Tabel Baik vs Kurang memakai sepuluh kalimat asli dari layar Sejati, bukan terjemahan istilah. Setiap baris punya alasan.'],
  ['Memeriksa', 'Alur diuji otomatis dengan 104 pemeriksaan klik di tampilan desktop dan HP. Prototipe belum diuji dengan pengguna asli, jadi itu langkah berikutnya.']
];

export default function Latar() {
  return (
    <>
      <div className="page-head">
        <h1>Latar tes</h1>
        <p>Konteks, masalah yang dijawab, dan cara saya mengerjakannya.</p>
      </div>

      <section className="case" aria-labelledby="bg">
        <h2 id="bg">Background</h2>
        <p>Menurut Kementerian Koordinator Bidang Perekonomian, Indonesia memiliki sekitar 64,2 juta UMKM. Usaha ini menyumbang 61,07% PDB dan menyerap 97% tenaga kerja (rilis pers 5 Mei 2021, mengutip Kementerian Koperasi dan UKM).</p>
        <p>Brief tes ini menggambarkan pemilik usaha yang berjualan lewat WhatsApp: menerima pesanan, membalas pertanyaan, menagih, dan mencatat di buku. Pekerjaan itu dilakukan sambil melayani pembeli.</p>
        <p>Sejati SMB menjawabnya lewat dua hal. Aplikasi toko online, dan Asisten Pintar di WhatsApp yang membantu membalas chat dan mencatat pesanan. Sesuai brief, Asisten tidak menagih dan tidak memutuskan lunas.</p>
        <p className="case__callout">Tes ini meminta saya merancang alur utama, tiga layar kunci, dan bahasa layar untuk pemilik usaha yang tidak biasa memakai aplikasi.</p>
      </section>

      <section className="case case--tint" aria-labelledby="ps">
        <h2 id="ps">Problem Statement</h2>
        <p className="case__lead">Pemilik UMKM mengurus chat, pesanan, dan uang sekaligus tanpa waktu belajar aplikasi baru. Layar yang memakai istilah teknis, nomor telepon sebagai nama, dan perintah yang harus dihafal membuat mereka ragu menekan, sehingga pesanan terlambat dan pembayaran terlewat.</p>
        <p>Satu hal lagi harus jelas di setiap layar: siapa yang menyatakan pesanan sudah dibayar. QRIS dikonfirmasi sistem pembayaran, transfer manual dikonfirmasi pemilik, dan Asisten tidak pernah memutuskan.</p>
      </section>

      <section className="case" aria-labelledby="how">
        <h2 id="how">How we did</h2>

        <h3>User Research</h3>
        <p>Saya mulai dari memahami pengguna dan layar yang sudah ada, bukan dari kanvas kosong.</p>
        <ul className="case__list">
          <li><b>Membaca brief dan persona:</b> Ibu Sari, Pak Budi, Mbak Dewi.</li>
          <li><b>Mencoba tampilan Sejati yang berjalan:</b> Beranda, daftar percakapan, chat, Ringkasan, dan percakapan WhatsApp bot.</li>
        </ul>
        <p>Lima hal yang saya temukan:</p>
        <dl className="case__finds">
          {TEMUAN.map(([t, d]) => (
            <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
          ))}
        </dl>
        <p className="case__callout">Pemilik ingin jawaban yang sederhana: siapa yang pesan, berapa, sudah bayar atau belum, dan apa yang harus saya lakukan sekarang.</p>

        <h3>Ideation and Solution Exploration</h3>
        <ol className="case__steps">
          {LANGKAH.map(([t, d]) => (
            <li key={t}><b>{t}</b><span>{d}</span></li>
          ))}
        </ol>

        <h3>Yang saya pelajari</h3>
        <p>Aturan produk menentukan desain lebih dari tampilan. Begitu “siapa yang memutuskan lunas” jelas, tanda pengirim, tombol, dan urutan layar hampir menentukan dirinya sendiri. Saya juga belajar bahwa menyederhanakan berarti membuang, misalnya grafik dan tombol cepat, dan keputusan membuang itu harus selalu saya jawab dengan pertanyaan “apa yang Bu Sari lakukan berikutnya?”.</p>
      </section>
    </>
  );
}
