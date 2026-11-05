// Pasangan kalimat diambil dari layar dan chat Sejati SMB yang sudah ada (kolom Kurang),
// lalu ditulis ulang untuk Bu Sari dan pembelinya (kolom Baik).
const ROWS = [
  ['Daftar Percakapan', '+6283172813661', 'Rina · 0831-7281-3661', 'Bu Sari mengenali pembeli dari nama, bukan dari nomor.'],
  ['Label di daftar chat', 'AI Aktif', 'Dibalas Asisten', 'Menjelaskan siapa yang sedang membalas, tanpa singkatan.'],
  ['Tombol di dalam chat', 'Ambil alih chat', 'Balas sendiri', 'Kata kerja yang ia lakukan. “Ambil alih” terdengar seperti merebut.'],
  ['Catatan setelah diambil alih', 'Alasan diserahkan ke orang: Diambil alih anggota tim.', 'Kamu yang membalas chat ini sejak 10.05. Asisten diam dulu.', 'Menyebut kamu dan jamnya, lalu apa akibatnya.'],
  ['Pesan menu di WhatsApp', 'Untuk memesan, ketik *nomor* dan jumlah (mis. "1 2" = 2 porsi item nomor 1)', 'Tulis saja seperti biasa, misalnya “2 kopi susu sama 1 roti bakar”.', 'Pembeli tidak perlu belajar format. Asisten yang membaca.'],
  ['Kartu Beranda', '1 pesanan menunggu pembayaran · Pelanggan belum membayar. Tidak perlu diproses dulu.', 'Rina belum bayar Rp 28.000. Jangan dibuat dulu, ya.', 'Ada nama, angka, dan satu hal yang harus dilakukan.'],
  ['Konfirmasi ABC Pay', 'Status pembayaran: berhasil', 'Uang Rp 54.000 dari Rina sudah masuk lewat QRIS.', 'Bu Sari langsung tahu boleh membuat pesanan tanpa cek rekening.'],
  ['Status toko di atas', 'Tayang · Asisten dimatikan', 'Toko buka. Asisten sedang libur, chat kamu balas sendiri.', '“Tayang” istilah media. Akibatnya bagi Bu Sari harus tertulis.'],
  ['Kuota di Ringkasan', '0 dari 300 balasan terpakai · 0% terpakai', 'Asisten masih bisa membalas 300 chat sampai 12 Nov.', 'Yang ia perlu tahu sisa dan batas waktunya, bukan persentase.'],
  ['Ringkasan kosong', 'Belum ada aktivitas di periode ini.', 'Belum ada pesanan semalam. Bagikan link tokomu supaya pembeli mulai chat.', 'Layar kosong memberi langkah berikutnya.']
];

export default function Bahasa() {
  return (
    <>
      <div className="page-head">
        <h1>Bahasa: Baik vs Kurang</h1>
        <p>Sepuluh kalimat dari layar dan chat Sejati SMB yang sudah ada, ditulis ulang untuk Bu Sari yang membaca sambil melayani pembeli.</p>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th scope="col">Di mana</th><th scope="col">Kurang</th><th scope="col">Baik</th><th scope="col">Kenapa</th></tr>
          </thead>
          <tbody>
            {ROWS.map(([where, bad, good, why]) => (
              <tr key={where}>
                <td data-label="Di mana">{where}</td>
                <td data-label="Kurang" className="bad">{bad}</td>
                <td data-label="Baik" className="good">{good}</td>
                <td data-label="Kenapa">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="why">
        <b>Kenapa bahasa penting bagi UMKM</b>
        <p>Bu Sari membaca layar sambil membuat kopi, jadi setiap kalimat harus langsung menyebut siapa, berapa, dan apa yang perlu ia lakukan; kalimat yang perlu ditebak membuat pesanan tertunda atau uang terlewat.</p>
      </div>
    </>
  );
}
