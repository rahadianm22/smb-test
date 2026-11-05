import Icon from '../components/Icon.jsx';
import { COMPARE, MENU, SCENES } from '../data/percakapan.js';

// Tombol balasan di sini adalah gambaran tampilan WhatsApp, bukan kontrol halaman ini,
// jadi ditulis sebagai teks biasa (bukan <button>) supaya tidak ada tombol mati.
function Reply({ label }) {
  return <div className="reply">{label}</div>;
}

function Items({ rows, total }) {
  return (
    <div className="items">
      {rows.map(([name, note, price]) => (
        <div className="items__row" key={name}>
          <span>{name}{note && <small>{note}</small>}</span>
          <span style={{ flex: 'none' }}>{price}</span>
        </div>
      ))}
      {total && <div className="items__total"><span>{total[0]}</span><span>{total[1]}</span></div>}
    </div>
  );
}

function Menu() {
  return (
    <>
      <b>Menu hari ini</b>
      {Object.entries(MENU).map(([group, list]) => (
        <div className="items" key={group}>
          <b style={{ color: 'var(--text-secondary)' }}>{group}</b>
          {list.map(([name, price]) => (
            <div className="items__row" key={name}>
              <span style={price ? undefined : { color: 'var(--text-muted)' }}>{name}</span>
              {price ? <span>{price}</span> : <span className="badge" style={{ background: 'var(--danger-bg)', color: 'var(--danger-text)', fontSize: 12 }}>Habis hari ini</span>}
            </div>
          ))}
        </div>
      ))}
      <div className="note" style={{ padding: '8px 10px', borderRadius: 8, background: 'var(--bg-canvas)' }}>Minimal pesan Rp 10.000. Buka jam 07.00–21.00.</div>
    </>
  );
}

function Message({ m }) {
  if (m.type === 'date') return <span className="chip-date">{m.text}</span>;
  if (m.type === 'out') {
    return (
      <div className="msg msg--out">
        <div className="bubble bubble--out" style={m.image ? { width: 220 } : undefined}>
          {m.image && <div className="placeholder" style={{ height: 72 }}>[Foto bukti transfer]</div>}
          <span style={m.voice ? { display: 'flex', gap: 8, alignItems: 'center' } : undefined}>
            {m.voice && <Icon name="mic" size={18} stroke="var(--success-fill)" />}
            {m.text}
          </span>
          <span className="bubble__meta"><span>{m.time}</span></span>
        </div>
      </div>
    );
  }
  const bubble = (
    <div className="bubble bubble--in">
      {m.title && <b>{m.title}</b>}
      {m.menu && <Menu />}
      {m.text && <span style={{ whiteSpace: 'pre-line' }}>{m.text}</span>}
      {m.items && <Items rows={m.items} total={m.total} />}
      {m.qris && <div className="placeholder" style={{ width: 200, height: 200, alignSelf: 'center' }}>[Gambar QRIS toko]</div>}
      {m.after && <span style={{ whiteSpace: 'pre-line' }}>{m.after}</span>}
      <span className="bubble__meta">
        <span className={m.who === 'ai' ? 'from-ai' : 'from-owner'}>{m.who === 'ai' ? 'Asisten Pintar' : 'Bu Sari'}</span>
        <span>{m.time}</span>
      </span>
    </div>
  );
  if (!m.replies && !m.menu && !m.items && !m.qris) return <div className="msg">{bubble}</div>;
  return (
    <div className="msg">
      <div className="msg-group">
        {bubble}
        {(m.replies || []).map((r) => <Reply key={r} label={r} />)}
      </div>
    </div>
  );
}

export default function Percakapan() {
  return (
    <>
      <div className="page-head">
        <h1>Percakapan pembeli di WhatsApp</h1>
        <p>Sembilan potongan chat dari sisi pembeli. Asisten Pintar membalas dan mencatat, tapi tidak pernah menagih atau mengonfirmasi pembayaran. Itu selalu dilakukan Bu Sari.</p>
      </div>

      <div className="scenes">
        {SCENES.map((sc) => (
          <article className="scene" key={sc.id} id={sc.id}>
            <h2>{sc.title}</h2>
            <p>{sc.note}</p>
            <div className="phone phone--auto">
              <div className="wa-header">
                <span className="avatar" aria-hidden="true">S</span>
                <div><b>Warung Kopi Bu Sari</b><span>Akun bisnis · dibantu Asisten Pintar</span></div>
              </div>
              <div className="wa-body">
                {sc.msgs.map((m, i) => <Message m={m} key={i} />)}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="compare" aria-labelledby="banding">
        <h2 id="banding">Yang saya pertahankan dan yang saya sesuaikan</h2>
        <table className="table">
          <thead><tr><th scope="col">Di alur yang ada</th><th scope="col">Di usulan ini</th></tr></thead>
          <tbody>
            {COMPARE.map(([a, b]) => (
              <tr key={a}><td data-label="Di alur yang ada">{a}</td><td data-label="Di usulan ini">{b}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}