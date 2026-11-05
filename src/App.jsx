import { useEffect, useState } from 'react';
import Prototipe from './pages/Prototipe.jsx';
import Percakapan from './pages/Percakapan.jsx';
import Alur from './pages/Alur.jsx';
import Bahasa from './pages/Bahasa.jsx';

// Router hash sederhana (#whatsapp, #alur, #bahasa): tidak perlu rewrite di Vercel,
// refresh di halaman mana pun tetap jalan, dan aman dipakai di pratinjau artifact.
const ROUTES = [
  { path: '', label: 'Prototipe', title: 'Prototipe', Page: Prototipe },
  { path: 'whatsapp', label: 'WhatsApp', title: 'Percakapan WhatsApp', Page: Percakapan },
  { path: 'alur', label: 'Alur', title: 'Alur utama', Page: Alur },
  { path: 'bahasa', label: 'Bahasa', title: 'Bahasa Baik vs Kurang', Page: Bahasa }
];

function currentPath() {
  // Alamat lama #/whatsapp tetap dikenali.
  const p = window.location.hash.replace(/^#\/?/, '');
  return ROUTES.some((r) => r.path === p) ? p : '';
}

export default function App() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onHash = () => {
      setPath(currentPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const route = ROUTES.find((r) => r.path === path);

  useEffect(() => {
    document.title = `${route.title} · Sejati SMB`;
  }, [route]);

  const { Page } = route;
  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="#">
            <b>Sejati SMB</b>
            <span>Tes UI/UX · prototipe</span>
          </a>
          <nav className="site-nav" aria-label="Halaman">
            {ROUTES.map((r) => (
              <a key={r.path} href={`#${r.path}`} aria-current={r.path === path ? 'page' : undefined}>
                {r.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Page />
      </main>
      <footer className="site-footer">
        Data contoh: nama pembeli, angka uang, menu, harga, nomor rekening, dan nama sistem pembayaran (ABC Pay) dibuat untuk tes, bukan data asli Sejati SMB.
      </footer>
    </>
  );
}
