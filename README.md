# Sejati SMB · Prototipe

Prototipe tes UI/UX Sejati SMB, dibuat dengan Vite dan React memakai token Natuna.

| Halaman | Isi |
|---|---|
| `#` Prototipe | Dua HP yang saling terhubung: Rina di WhatsApp dan Bu Sari di aplikasi Sejati. Ikuti petunjuk 1 sampai 6. |
| `#whatsapp` | 9 potongan percakapan pembeli, ditambah perbandingan dengan contoh bot |
| `#alur` | Alur utama: siapa melakukan apa, dan di mana |
| `#bahasa` | Tabel bahasa Baik vs Kurang |

Aturan produk yang dijaga: **Asisten AI tidak menagih dan tidak mengonfirmasi pembayaran.** Penagihan dan cek uang masuk selalu dilakukan Bu Sari.

## Menjalankan di komputer

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev        # buka http://localhost:5173
npm run build      # hasil statis di folder dist/
npm run preview    # cek hasil build di http://localhost:4173
```

## Upload ke GitHub

```bash
git init
git add .
git commit -m "Prototipe Sejati SMB"
git branch -M main
git remote add origin https://github.com/<username>/sejati-smb-prototipe.git
git push -u origin main
```

Buat repo kosong di GitHub dulu (tanpa README) supaya `git push` tidak bentrok.

## Live di Vercel

1. Masuk ke [vercel.com](https://vercel.com) dengan akun GitHub.
2. **Add New → Project**, pilih repo `sejati-smb-prototipe`, lalu **Import**.
3. Vercel mengenali Vite sendiri. Biarkan pengaturan bawaan: build `npm run build`, output `dist`.
4. Tekan **Deploy**. Setiap `git push` ke `main` akan memperbarui situs secara otomatis.

Tidak perlu `vercel.json`. Halaman memakai alamat `#...`, jadi refresh di halaman mana pun tetap jalan.

## Struktur

```
src/
  styles/tokens.css    token Natuna: primitif lalu semantik
  styles/global.css    komponen dan tata letak (tampilan HP di bawah 920px)
  pages/Prototipe.jsx  alur dua HP (useReducer, langkah 0 sampai 6)
  pages/Percakapan.jsx menampilkan skenario dari data/percakapan.js
  data/percakapan.js   isi chat WhatsApp, mudah diubah tanpa menyentuh tampilan
```

Data contoh: nama pembeli, angka uang, menu, harga, dan nomor rekening dibuat untuk tes, bukan data asli.
