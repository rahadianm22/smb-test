import { useEffect, useReducer, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';

/*
  Prototipe dua HP. Aksi di satu HP mengubah HP lainnya.
  step: 0 pesan · 1 catat · 2 bayar · 3 cek · 4 bisa dibatalkan · 5 lihat laporan · 6 selesai
  Aturan produk: Asisten AI tidak menagih dan tidak mengonfirmasi pembayaran.
*/
const GUIDE = [
  { who: 'wa', label: 'HP pembeli', text: 'Rina memesan lewat WhatsApp. Tekan tombol kirim yang ditandai.' },
  { who: 'app', label: 'HP Bu Sari', text: 'Asisten AI sudah membalas dan mencatat. Buka pesanan Rina, lalu tekan “Kirim total ke Rina”.' },
  { who: 'wa', label: 'HP pembeli', text: 'Total dan rekening Bank ABC sudah sampai. Tekan “Kirim foto bukti transfer”.' },
  { who: 'app', label: 'HP Bu Sari', text: 'Bukti masuk, tapi AI tidak bilang lunas. Cek rekening, centang dua hal, lalu tandai lunas.' },
  { who: 'app', label: 'HP Bu Sari', text: 'Masih bisa dibatalkan 5 detik. Setelah itu konfirmasi terkirim ke Rina.' },
  { who: 'app', label: 'HP Bu Sari', text: 'Konfirmasi sudah sampai ke Rina. Buka Laporan untuk melihat uangnya tercatat.' },
  { who: 'app', label: 'Selesai', text: 'Uang Rina sudah tercatat di laporan hari ini. Tekan Ulangi untuk mencoba lagi.' }
];

const REMINDER = 'Halo Kak Rina, transfernya belum masuk di rekening kami. Boleh dicek lagi ya, totalnya Rp 54.000. Terima kasih!';

const initial = { step: 0, screen: 'beranda', typing: false, a: false, b: false, draft: false, reminded: false, snack: false };

function reducer(s, act) {
  switch (act.type) {
    case 'sendOrder': return { ...s, step: 1, typing: true };
    case 'typed': return { ...s, typing: false };
    case 'screen': return { ...s, screen: act.screen, step: act.screen === 'laporan' && s.step === 5 ? 6 : s.step };
    case 'sendTotal': return { ...s, step: 2 };
    case 'sendProof': return { ...s, step: 3, typing: true, a: false, b: false, draft: false };
    case 'toggle': return { ...s, [act.key]: !s[act.key] };
    case 'openDraft': return { ...s, draft: true };
    case 'closeDraft': return { ...s, draft: false };
    case 'sendReminder': return { ...s, draft: false, reminded: true };
    case 'markPaid': return s.a && s.b ? { ...s, step: 4, snack: true } : s;
    case 'confirmSent': return s.step === 4 ? { ...s, step: 5, snack: false } : s;
    case 'undo': return { ...s, step: 3, snack: false, a: false, b: false };
    case 'reset': return initial;
    default: return s;
  }
}

// Pesan yang terlihat di WhatsApp pembeli, diturunkan dari state.
function waMessages(s) {
  const m = [];
  const t1 = s.typing && s.step === 1;
  const t3 = s.typing && s.step === 3;
  if (s.step >= 1) m.push({ out: true, text: 'Kak, pesan 2 kopi susu gula aren + 1 roti bakar cokelat ya. Ambil jam 10.', time: '09.58' });
  if (s.step >= 1 && !t1) m.push({ who: 'ai', text: 'Siap, Kak Rina! Pesanannya:\n2× Kopi susu gula aren\n1× Roti bakar cokelat\nTotalnya dikirim Bu Sari sebentar lagi, ya.', time: '09.58' });
  if (s.step >= 2) m.push({ who: 'owner', text: 'Totalnya Rp 54.000 ya, Kak. Transfer ke Bank ABC 123 456 7890 a.n. Sari Wulandari, atau scan QRIS di kasir.', time: '10.12' });
  if (s.step >= 3) m.push({ out: true, image: true, text: 'Udah transfer ya kak, ini buktinya', time: '10.15' });
  if (s.step >= 3 && !t3) m.push({ who: 'ai', text: 'Terima kasih, Kak! Bu Sari cek dulu pembayarannya, nanti dikabari, ya.', time: '10.15' });
  if (s.reminded) m.push({ who: 'owner', text: REMINDER, time: '10.17' });
  if (s.step >= 5) m.push({ who: 'owner', text: 'Pembayaran Rp 54.000 sudah kami terima. Terima kasih, Kak Rina!', time: '10.18' });
  return m;
}

function WaPhone({ s, dispatch }) {
  const body = useRef(null);
  const msgs = waMessages(s);
  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs.length, s.typing]);

  return (
    <div className="phone">
      <div className="wa-header">
        <span className="avatar" aria-hidden="true">S</span>
        <div><b>Warung Kopi Bu Sari</b><span>Akun bisnis · dibantu Asisten Pintar</span></div>
      </div>
      <div className="wa-body" ref={body} aria-live="polite">
        <span className="chip-date">Hari ini</span>
        {msgs.length === 0 && <p className="note" style={{ textAlign: 'center' }}>Belum ada pesan. Rina akan memesan dari sini.</p>}
        {msgs.map((m, i) => (
          <div key={i} className={`msg${m.out ? ' msg--out' : ''}`}>
            <div className={`bubble ${m.out ? 'bubble--out' : 'bubble--in'}`} style={m.image ? { width: 220 } : undefined}>
              {m.image && <div className="placeholder" style={{ height: 72 }}><Icon name="image" size={18} />Foto bukti transfer</div>}
              <span style={{ whiteSpace: 'pre-line' }}>{m.text}</span>
              <span className="bubble__meta">
                {!m.out && <span className={m.who === 'ai' ? 'from-ai' : 'from-owner'}>{m.who === 'ai' ? 'Asisten Pintar' : 'Bu Sari'}</span>}
                <span>{m.time}</span>
              </span>
            </div>
          </div>
        ))}
        {s.typing && <div className="bubble bubble--in" style={{ alignSelf: 'flex-start', color: 'var(--text-secondary)' }}>Sedang mengetik…</div>}
      </div>
      <div className="composer">
        {s.step === 0 && (
          <>
            <div className="composer__draft">Kak, pesan 2 kopi susu gula aren + 1 roti bakar cokelat ya. Ambil jam 10.</div>
            <button type="button" className="icon-btn btn--wa is-target" aria-label="Kirim pesan" onClick={() => dispatch({ type: 'sendOrder' })}>
              <Icon name="send" stroke="#fff" />
            </button>
          </>
        )}
        {s.step === 2 && (
          <button type="button" className="btn btn--wa btn--block is-target" onClick={() => dispatch({ type: 'sendProof' })}>
            <Icon name="image" stroke="#fff" />Kirim foto bukti transfer
          </button>
        )}
        {s.step !== 0 && s.step !== 2 && <div className="composer__idle">Ketik pesan</div>}
      </div>
    </div>
  );
}

function Beranda({ s, dispatch }) {
  const paid = s.step >= 4;
  const pending = s.step >= 1 && s.step <= 3;
  const goChat = () => dispatch({ type: 'screen', screen: 'chat' });
  let first;
  if (s.step === 1) first = { kind: 'order', icon: 'receipt', title: 'Pesanan baru dari Rina', sub: 'Rp 54.000 · kirim totalnya', btn: 'Buka' };
  else if (s.step === 2) first = { kind: 'wallet', icon: 'wallet', title: 'Menunggu bayar dari Rina', sub: 'Rp 54.000 · total sudah dikirim' };
  else if (s.step === 3) first = { kind: 'wallet', icon: 'wallet', title: 'Rina kirim bukti transfer', sub: 'Rp 54.000 · cek dulu uangnya', btn: 'Cek uang' };
  else first = { kind: 'order', icon: 'receipt', title: 'Pesanan baru dari Pak Joko', sub: '2 kopi susu, 1 roti bakar' };
  const rows = [first, { kind: 'box', icon: 'box', title: 'Gula aren tinggal 3 bungkus', sub: 'Tambah stok sebelum habis' }];

  return (
    <div className="app-screen">
      <div className="greet"><span>Kamis, 5 November</span><h2>Halo, Bu Sari</h2></div>
      <section className="money" aria-label="Uang masuk hari ini">
        <div><div className="money__label">Uang masuk hari ini</div><div className="money__big">{paid ? 'Rp 1.299.000' : 'Rp 1.245.000'}</div></div>
        <div className="money__grid">
          <div><b>{paid ? '19' : '18'} pesanan</b><span>sudah lunas</span></div>
          <div><b>{pending ? 'Rp 239.000' : 'Rp 185.000'}</b><span>belum dibayar ({pending ? 4 : 3})</span></div>
        </div>
      </section>
      <section>
        <h3 style={{ marginBottom: 8 }}>Perlu kamu cek</h3>
        <div className="list">
          {rows.map((r) => (
            <div className="row" key={r.title}>
              <span className={`tile tile--${r.kind}`}><Icon name={r.icon} /></span>
              <div className="row__text"><b>{r.title}</b><span>{r.sub}</span></div>
              {r.btn && <button type="button" className="btn btn--primary is-target" onClick={goChat}>{r.btn}</button>}
            </div>
          ))}
        </div>
      </section>
      <div className="status-ai">
        <span className="dot" />
        <span><b>Asisten Pintar aktif di WhatsApp</b><span>Membalas pembeli, mencatat pesanan</span></span>
      </div>
    </div>
  );
}

function Chat({ s, dispatch }) {
  const ready = s.a && s.b;
  const [draftText, setDraftText] = useState(REMINDER);
  const chatRef = useRef(null);
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [s.step, s.draft, s.reminded]);

  return (
    <>
      <div className="app-header">
        <span className="avatar" style={{ width: 44, height: 44, background: 'var(--bg-brand-subtle)', color: 'var(--blue-800)' }}><Icon name="chat" size={22} /></span>
        <div><b>Asisten Pintar</b><span>Aktif di WhatsApp</span></div>
      </div>
      <div className="chat" ref={chatRef}>
        {s.step === 0 && <p className="note">Belum ada pesanan baru. Asisten akan memberi tahu kamu di sini.</p>}
        {s.step === 1 && (
          <div className="ai-card">
            <p>Ada pesanan baru dari <b>Rina</b> di WhatsApp. Sudah aku balas dan catat:</p>
            <div className="items" style={{ border: '1px solid var(--border-default)', borderRadius: 12, padding: 12 }}>
              <div className="items__row"><span>2× Kopi susu gula aren</span><span>Rp 36.000</span></div>
              <div className="items__row"><span>1× Roti bakar cokelat</span><span>Rp 18.000</span></div>
              <div className="items__total"><span>Total</span><span>Rp 54.000</span></div>
            </div>
            <button type="button" className="btn btn--primary btn--block is-target" onClick={() => dispatch({ type: 'sendTotal' })}>Kirim total ke Rina</button>
            <span className="note">Total dan rekening Bank ABC terkirim ke WhatsApp Rina. Aku tidak menagih.</span>
          </div>
        )}
        {s.step >= 2 && (
          <div className="ai-card" style={{ width: 'min(320px, 100%)' }}>
            <p>Pesanan Rina sudah aku catat. Total <b>Rp 54.000</b>.</p>
            <span className="note" style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="check" size={16} stroke="var(--success-fill)" width={2.6} />Totalnya sudah kamu kirim ke Rina · 10.12</span>
          </div>
        )}
        {s.step === 2 && <div className="info">Menunggu Rina membayar. Aku kabari kalau ada pesan baru.</div>}
        {s.step === 3 && (
          <div className="ai-card ai-card--plain">
            <span className="note" style={{ fontWeight: 700 }}>Pesan Rina di WhatsApp</span>
            <p>“Udah transfer ya kak, ini buktinya”</p>
            <div className="placeholder" style={{ height: 56 }}><Icon name="image" size={18} />Foto bukti transfer</div>
          </div>
        )}
        {s.step === 3 && !s.draft && (
          <div className="ai-card">
            <div className="warn">Bukti transfer bisa palsu. Cek dulu di aplikasi Bank ABC-mu:</div>
            <label className="check"><input type="checkbox" checked={s.a} onChange={() => dispatch({ type: 'toggle', key: 'a' })} />Ada uang masuk Rp 54.000</label>
            <label className="check"><input type="checkbox" checked={s.b} onChange={() => dispatch({ type: 'toggle', key: 'b' })} />Nama pengirim: Rina</label>
            <button type="button" className={`btn btn--success btn--block${ready ? ' is-target' : ''}`} disabled={!ready} onClick={() => dispatch({ type: 'markPaid' })}>
              {ready ? 'Sudah masuk, tandai lunas' : 'Centang dua hal di atas dulu'}
            </button>
            <button type="button" className="btn btn--outline btn--block" onClick={() => dispatch({ type: 'openDraft' })}>Belum masuk, ingatkan Rina</button>
            {s.reminded && <span className="note">Pengingat sudah kamu kirim ke Rina.</span>}
          </div>
        )}
        {s.step === 3 && s.draft && (
          <div className="ai-card">
            <p>Contoh pesan untuk Rina. <b>Kamu yang kirim</b>, ya:</p>
            <div className="field">
              <label htmlFor="draf">Isi pesan, bisa kamu ubah</label>
              <textarea id="draf" rows={4} value={draftText} onChange={(e) => setDraftText(e.target.value)} />
            </div>
            <button type="button" className="btn btn--primary btn--block" disabled={!draftText.trim()} onClick={() => dispatch({ type: 'sendReminder' })}>Kirim ke Rina</button>
            <button type="button" className="btn btn--ghost" style={{ alignSelf: 'flex-start' }} onClick={() => dispatch({ type: 'closeDraft' })}>Ternyata sudah masuk? Cek lagi</button>
          </div>
        )}
        {s.step >= 4 && (
          <>
            <div className="me">Sudah masuk, tandai lunas</div>
            <div className="ai-card" style={{ width: 'min(320px, 100%)' }}>
              <span className="badge badge--success"><Icon name="check" size={14} width={2.6} />Lunas</span>
              <p>{s.step === 4 ? 'Pesanan Rina sudah lunas. Konfirmasi ke Rina terkirim sebentar lagi.' : 'Pesanan Rina sudah lunas dan konfirmasinya sudah terkirim ke Rina.'}</p>
              <button type="button" className={`btn btn--ghost${s.step === 5 ? ' is-target' : ''}`} style={{ alignSelf: 'flex-start' }} onClick={() => dispatch({ type: 'screen', screen: 'laporan' })}>Lihat laporan</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Laporan({ s }) {
  const paid = s.step >= 4;
  const pending = s.step >= 1 && s.step <= 3;
  const bars = [['07', 210], ['09', 260], ['11', 140], ['13', 175], ['15', 150], ['17', 190], ['19', 120]];
  return (
    <div className="app-screen">
      <h2>Laporan · Hari ini</h2>
      {paid && <div className="success-banner"><Icon name="check" size={18} width={2.6} />Pesanan Rina Rp 54.000 sudah tercatat.</div>}
      <section className="report-card" aria-label="Uang masuk hari ini">
        <span className="note">Uang masuk hari ini</span>
        <span className="money__big">{paid ? 'Rp 1.299.000' : 'Rp 1.245.000'}</span>
        <span className="note">{paid ? 19 : 18} pesanan lunas</span>
        <div className="bars" role="img" aria-label="Uang masuk per jam, paling ramai jam 09.00">
          {bars.map(([h, v]) => (
            <div className="bars__col" key={h}>
              <div className={`bars__bar${v === 260 ? ' bars__bar--top' : ''}`} style={{ height: Math.round((v / 260) * 72) }} />
              <span>{h}</span>
            </div>
          ))}
        </div>
        <div className="info">Paling ramai jam 09.00. Siapkan bahan sebelum jam sibuk pagi.</div>
      </section>
      <div className="unpaid">
        <span>Belum dibayar ({pending ? 4 : 3} pesanan)</span>
        <b>{pending ? 'Rp 239.000' : 'Rp 185.000'}</b>
      </div>
    </div>
  );
}

function AppPhone({ s, dispatch }) {
  const tabs = [['beranda', 'Beranda', 'home'], ['chat', 'Asisten', 'chat'], ['laporan', 'Laporan', 'chart']];
  return (
    <div className="phone">
      {s.screen === 'beranda' && <Beranda s={s} dispatch={dispatch} />}
      {s.screen === 'chat' && <Chat s={s} dispatch={dispatch} />}
      {s.screen === 'laporan' && <Laporan s={s} />}
      {s.snack && (
        <div className="snackbar" role="status">
          <span>Ditandai lunas. Konfirmasi dikirim 5 detik lagi</span>
          <button type="button" onClick={() => dispatch({ type: 'undo' })}>Batalkan</button>
        </div>
      )}
      <nav className="app-nav" aria-label="Menu aplikasi">
        {tabs.map(([key, label, icon]) => (
          <button
            key={key}
            type="button"
            aria-current={s.screen === key ? 'page' : undefined}
            className={key === 'laporan' && s.step === 5 && s.screen !== 'laporan' ? 'is-target' : undefined}
            onClick={() => dispatch({ type: 'screen', screen: key })}
          >
            <Icon name={icon} size={24} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function Prototipe() {
  const [s, dispatch] = useReducer(reducer, initial);
  const g = GUIDE[s.step];
  const [view, setView] = useState('wa');

  // Di layar kecil, tampilkan HP yang sedang diminta petunjuk.
  useEffect(() => { setView(g.who); }, [s.step, g.who]);

  useEffect(() => {
    if (!s.typing) return undefined;
    const t = setTimeout(() => dispatch({ type: 'typed' }), 900);
    return () => clearTimeout(t);
  }, [s.typing]);

  useEffect(() => {
    if (s.step !== 4) return undefined;
    // Konfirmasi ke pembeli baru dikirim setelah jendela "Batalkan" 5 detik lewat.
    const t = setTimeout(() => dispatch({ type: 'confirmSent' }), 5000);
    return () => clearTimeout(t);
  }, [s.step]);

  return (
    <>
      <div className="page-head">
        <h1>Dari chat pembeli sampai laporan</h1>
        <p>Rina memesan di WhatsApp, Asisten AI membalas dan mencatat, Bu Sari yang menagih dan mengecek uang masuk. Ikuti petunjuk, tombol yang perlu ditekan diberi lingkaran oranye.</p>
      </div>

      <div className="guide" role="status" aria-live="polite">
        <div className="guide__num">
          <b>{s.step >= 6 ? '✓' : s.step + 1}</b>
          <span>{s.step >= 6 ? 'selesai' : 'dari 6'}</span>
        </div>
        <div className="guide__text">
          <span className="guide__who">{g.label}</span>
          <span className="guide__msg">{g.text}</span>
        </div>
        <button type="button" className="btn" onClick={() => dispatch({ type: 'reset' })}>Ulangi</button>
      </div>

      <div className="switcher" role="group" aria-label="Pilih HP">
        <button type="button" aria-pressed={view === 'wa'} onClick={() => setView('wa')}>HP Rina · WhatsApp</button>
        <button type="button" aria-pressed={view === 'app'} onClick={() => setView('app')}>HP Bu Sari · aplikasi</button>
      </div>

      <div className="phones">
        <section className="phone-col" data-hidden={view !== 'wa'} aria-label="HP Rina, di WhatsApp">
          <span className="phone-label"><Icon name="chat" size={16} stroke="var(--success-fill)" />HP Rina (pembeli) · di WhatsApp</span>
          <WaPhone s={s} dispatch={dispatch} />
        </section>
        <section className="phone-col" data-hidden={view !== 'app'} aria-label="HP Bu Sari, di aplikasi Sejati">
          <span className="phone-label"><Icon name="phone" size={16} stroke="var(--blue-800)" />HP Bu Sari · di aplikasi Sejati</span>
          <AppPhone s={s} dispatch={dispatch} />
        </section>
      </div>
    </>
  );
}
