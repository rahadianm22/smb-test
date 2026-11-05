import Icon from '../components/Icon.jsx';

const STEPS = [
  { role: 'pembeli', who: 'Pembeli', text: 'Kirim pesanan lewat WhatsApp', where: ['chat', 'di WhatsApp'] },
  { role: 'ai', who: 'Asisten AI', text: 'Balas chat dan catat pesanan otomatis', where: ['chat', 'di WhatsApp'] },
  { role: 'kamu', who: 'Kamu', text: 'Cek pesanan, kirim total ke pembeli', where: ['phone', 'aplikasi Sejati → WA'] },
  { role: 'pembeli', who: 'Pembeli', text: 'Bayar lewat transfer atau QRIS', where: ['bank', 'bank / QRIS'] },
  { role: 'kamu', who: 'Kamu', text: 'Cek: uang sudah masuk ke rekening?', where: ['bank', 'aplikasi bank'] }
];

export default function Alur() {
  return (
    <>
      <div className="page-head">
        <h1>Alur utama: pesanan masuk, chat, bayar, laporan</h1>
        <p>Siapa melakukan apa, dan di mana, dari pembeli kirim pesan sampai uangnya tercatat di laporan.</p>
      </div>

      <ol className="flow">
        {STEPS.map((s, i) => (
          <li key={i} className={`role-${s.role}`}>
            <span className="step-no">Langkah {i + 1}</span>
            <span className="who">{s.who}</span>
            <span>{s.text}</span>
            <span className="where"><Icon name={s.where[0]} size={14} />{s.where[1]}</span>
          </li>
        ))}
      </ol>

      <div className="decision">
        <div className="role-kamu" style={{ borderWidth: 1.5, borderStyle: 'solid' }}>
          <b style={{ color: 'var(--success-text)' }}>Sudah masuk</b>
          <p>Kamu tekan “Tandai lunas” di aplikasi Sejati. Konfirmasi ke pembeli terkirim, lalu laporan harian dan bulanan langsung terisi.</p>
        </div>
        <div className="role-kamu" style={{ borderWidth: 1.5, borderStyle: 'solid' }}>
          <b style={{ color: 'var(--danger-text)' }}>Belum masuk</b>
          <p>Kamu kirim pengingat ke pembeli dari aplikasi. Asisten hanya menyiapkan contoh pesannya, lalu kamu tunggu pembayaran berikutnya.</p>
        </div>
      </div>

      <div className="rule">
        <Icon name="shield" size={32} stroke="var(--blue-800)" />
        <p><b>Aturan penting:</b> Asisten AI hanya membalas chat dan mencatat pesanan. <b>Menagih dan memastikan uang sudah masuk selalu kamu sendiri</b>, supaya tidak ada pesanan dianggap lunas padahal belum.</p>
      </div>
    </>
  );
}
