const ROWS = [
  ['Dashboard', 'Beranda', 'Menu bawah'],
  ['Incoming order', 'Pesanan baru', 'Beranda, pemberitahuan'],
  ['Status: Unpaid / Pending', 'Belum dibayar', 'Label di kartu pesanan'],
  ['Verifikasi pembayaran', 'Cek uang masuk', 'Chat Asisten'],
  ['Paid / Settled', 'Lunas', 'Label status, tombol “Tandai lunas”'],
  ['Revenue / Omzet bruto', 'Uang masuk', 'Beranda, Laporan'],
  ['Inventory / SKU', 'Stok barang', 'Menu stok'],
  ['Low stock alert', 'Stok tinggal sedikit', 'Pengingat di Beranda'],
  ['AI Chatbot / Auto-reply', 'Asisten Pintar', 'Menu dan layar chat'],
  ['Sync failed (Error 500)', 'Belum tersimpan. Coba lagi, ya', 'Pesan saat gagal']
];

export default function Bahasa() {
  return (
    <>
      <div className="page-head">
        <h1>Bahasa: Baik vs Kurang</h1>
        <p>Sepuluh istilah aplikasi, ditulis ulang dengan kata yang dipakai pemilik usaha sehari-hari.</p>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th scope="col">No.</th><th scope="col">Kurang: istilah teknis</th><th scope="col">Baik: bahasa sehari-hari</th><th scope="col">Dipakai di</th></tr>
          </thead>
          <tbody>
            {ROWS.map(([bad, good, where], i) => (
              <tr key={bad}>
                <td data-label="No.">{String(i + 1).padStart(2, '0')}</td>
                <td data-label="Kurang" className="bad">{bad}</td>
                <td data-label="Baik" className="good">{good}</td>
                <td data-label="Dipakai di">{where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="why">
        <b>Kenapa bahasa penting bagi UMKM</b>
        <p>Pemilik usaha memakai aplikasi di sela kerja, jadi kata yang sudah mereka pakai sehari-hari membuat mereka langsung paham harus berbuat apa: tidak salah tekan, tidak takut mencoba, dan tidak perlu bertanya ke orang lain.</p>
      </div>
    </>
  );
}
