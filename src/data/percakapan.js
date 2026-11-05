// Skenario WhatsApp dari sisi pembeli. Semua data contoh.
// Jenis pesan: date, out, in (who: 'ai' | 'owner'), dengan opsi items, replies, image, voice, qris, menu.
const ORDER3 = [
  ['3× Kopi susu gula aren', 'kurang manis', 'Rp 54.000'],
  ['1× Roti bakar cokelat', null, 'Rp 18.000']
];

export const MENU = {
  Minuman: [['Kopi susu gula aren', 'Rp 18.000'], ['Kopi hitam', 'Rp 12.000'], ['Cafe latte', 'Rp 20.000'], ['Es teh manis', 'Rp 8.000'], ['Lemon tea', 'Rp 10.000']],
  Makanan: [['Roti bakar cokelat', 'Rp 18.000'], ['Pisang goreng', 'Rp 12.000'], ['Mi goreng telur', 'Rp 15.000'], ['Croissant butter', null]]
};

export const SCENES = [
  {
    id: 'wa1', title: '1 · Sapa & menu',
    note: 'Minimal pesan dan barang yang habis sudah terlihat di menu.',
    msgs: [
      { type: 'date', text: 'Hari ini' },
      { type: 'out', text: 'Halo kak, mau pesan', time: '11.02' },
      { type: 'in', who: 'ai', text: 'Halo, Kak! Aku Asisten Pintar dari Warung Kopi Bu Sari. Mau pesan apa hari ini?\n\nTulis saja seperti biasa, misalnya “2 kopi susu sama 1 roti bakar”.', time: '11.02', replies: ['Lihat menu'] },
      { type: 'out', text: 'Lihat menu', time: '11.02' },
      { type: 'in', who: 'ai', menu: true, time: '11.02' }
    ]
  },
  {
    id: 'wa2', title: '2 · Pesan pakai bahasa sendiri',
    note: 'Asisten hanya menulis perkiraan total. Angka pastinya dikirim Bu Sari.',
    msgs: [
      { type: 'out', text: '2 kopi susu gula aren sama roti bakar 1 ya kak. Kopinya kurang manis', time: '11.03' },
      {
        type: 'in', who: 'ai', time: '11.03', text: 'Siap, ini pesananmu:',
        items: [['2× Kopi susu gula aren', 'kurang manis', 'Rp 36.000'], ['1× Roti bakar cokelat', null, 'Rp 18.000']],
        total: ['Perkiraan total', 'Rp 54.000'],
        after: 'Angka pastinya dikirim Bu Sari setelah pesanan selesai.\nAda tambahan lagi?',
        replies: ['Tambah lagi', 'Ubah pesanan', 'Sudah, itu saja']
      }
    ]
  },
  {
    id: 'wa3', title: '3 · Ubah pesanan & barang habis',
    note: 'Cukup bilang “kopinya jadi 3 deh”, tanpa format khusus.',
    msgs: [
      { type: 'out', text: 'Eh kopinya jadi 3 deh', time: '11.04' },
      { type: 'in', who: 'ai', time: '11.04', text: 'Oke, kopi susu gula aren jadi 3.', items: ORDER3, total: ['Perkiraan total', 'Rp 72.000'] },
      { type: 'out', text: 'Tambah croissant 1', time: '11.05' },
      { type: 'in', who: 'ai', time: '11.05', text: 'Maaf, croissant butter lagi habis hari ini. Mau diganti yang lain?', replies: ['Pisang goreng · Rp 12.000', 'Roti bakar cokelat lagi', 'Nggak usah'] },
      { type: 'out', text: 'Nggak usah', time: '11.05' },
      { type: 'in', who: 'ai', time: '11.05', text: 'Oke, pesananmu tetap:', items: ORDER3, total: ['Perkiraan total', 'Rp 72.000'], after: 'Ada tambahan lagi?', replies: ['Tambah lagi', 'Sudah, itu saja'] }
    ]
  },
  {
    id: 'wa4', title: '4 · Ambil atau diantar',
    note: 'Pembeli memilih lewat tombol balasan, tanpa mengetik perintah.',
    msgs: [
      { type: 'out', text: 'Sudah, itu saja', time: '11.06' },
      { type: 'in', who: 'ai', time: '11.06', text: 'Mau diambil di warung atau diantar?', replies: ['Ambil di warung', 'Diantar ke alamatku'] },
      { type: 'out', text: 'Ambil di warung', time: '11.06' },
      { type: 'in', who: 'ai', time: '11.06', text: 'Mau diambil jam berapa?', replies: ['Secepatnya', 'Jam 12.00', 'Pilih jam lain'] },
      { type: 'out', text: 'Jam 12.00', time: '11.07' },
      { type: 'in', who: 'ai', time: '11.07', title: 'Pesanan #21 sudah aku catat', items: ORDER3, after: 'Diambil di warung, jam 12.00.\n\nTotal dan cara bayar akan dikirim langsung oleh Bu Sari sebentar lagi, ya.' }
    ]
  },
  {
    id: 'wa5', title: '5 · Total & cara bayar dari Bu Sari',
    note: 'Penagihan datang dari pemilik.',
    msgs: [
      { type: 'in', who: 'owner', time: '11.09', text: 'Halo Kak Dimas, totalnya Rp 72.000 ya.\nBayar ke Bank ABC 123 456 7890 a.n. Sari Wulandari, atau scan QRIS di bawah.', qris: true },
      { type: 'out', text: 'Oke kak, aku transfer dulu', time: '11.10' }
    ]
  },
  {
    id: 'wa6', title: '6 · Kirim bukti, Asisten tidak konfirmasi',
    note: 'Asisten meneruskan bukti ke Bu Sari dan jujur bahwa ia tidak bisa melihat rekening.',
    msgs: [
      { type: 'out', image: true, text: 'Sudah transfer ya kak', time: '11.12' },
      { type: 'in', who: 'ai', time: '11.12', text: 'Terima kasih, Kak! Buktinya sudah aku teruskan ke Bu Sari. Bu Sari cek dulu di rekeningnya, nanti dikabari di chat ini, ya.' },
      { type: 'out', text: 'Udah masuk belum kak?', time: '11.20' },
      { type: 'in', who: 'ai', time: '11.20', text: 'Aku tidak bisa melihat rekening, jadi yang memastikan tetap Bu Sari. Sudah aku ingatkan beliau, ya.' }
    ]
  },
  {
    id: 'wa7', title: '7 · Dikonfirmasi Bu Sari & status',
    note: 'Status mengikuti pilihan ambil di warung: “sudah siap, ambil di kasir”.',
    msgs: [
      { type: 'in', who: 'owner', time: '11.24', text: 'Pembayaran Rp 72.000 sudah kami terima. Terima kasih, Kak Dimas! Pesananmu langsung kami buat.' },
      { type: 'in', who: 'ai', time: '11.25', text: 'Pesanan #21 sedang dibuat.' },
      { type: 'in', who: 'ai', time: '11.38', text: 'Pesanan #21 sudah siap. Ambil di kasir dan sebut nama Dimas, ya.', replies: ['Lihat lokasi warung'] },
      { type: 'out', text: 'Oke kak, otw', time: '11.39' }
    ]
  },
  {
    id: 'wa8', title: '8 · Pertanyaan & keluhan',
    note: 'Asisten bilang kenapa chat disambungkan ke Bu Sari.',
    msgs: [
      { type: 'out', text: 'Kak, bisa minta sedotan kertas? Terus kemarin kopinya kemanisan', time: '11.08' },
      { type: 'in', who: 'ai', time: '11.08', text: 'Bisa, sedotan kertas sudah aku catat di pesanan #21.\n\nSoal kopi kemarin, aku sambungkan ke Bu Sari supaya dibantu langsung. Nanti beliau balas di chat ini, ya.' },
      { type: 'in', who: 'owner', time: '11.14', text: 'Maaf ya, Kak, kemarin kemanisan. Hari ini kopinya kami buat kurang manis sesuai catatanmu.' },
      { type: 'out', text: 'Siap, makasih kak', time: '11.15' }
    ]
  },
  {
    id: 'wa9', title: '9 · Saat Asisten belum paham',
    note: 'Asisten menebak dengan sopan, lalu meneruskan yang tidak bisa ia proses.',
    msgs: [
      { type: 'out', text: 'Yang kayak kemarin aja kak', time: '08.15' },
      { type: 'in', who: 'ai', time: '08.15', text: 'Aku cek dulu, ya. Kemarin kamu pesan 3 Kopi susu gula aren (kurang manis) dan 1 Roti bakar cokelat. Mau pesan yang sama?', replies: ['Ya, sama seperti kemarin', 'Bukan, lihat menu'] },
      { type: 'out', voice: true, text: 'Pesan suara · 0:12', time: '08.16' },
      { type: 'in', who: 'ai', time: '08.16', text: 'Maaf, aku belum bisa mendengar pesan suara. Boleh ditulis, ya? Pesan suaramu juga sudah aku teruskan ke Bu Sari.' }
    ]
  }
];

export const COMPARE = [
  ['Bot mengirim QRIS dan menyebut pembayaran akan terkonfirmasi otomatis.', 'Total dan cara bayar dikirim Bu Sari dari aplikasi. Asisten hanya bilang totalnya akan menyusul.'],
  ['Konfirmasi “pembayaran sudah kami terima” dikirim oleh bot.', 'Hanya Bu Sari yang mengonfirmasi, setelah cek rekening.'],
  ['Pembeli mengetik perintah: checkout, hapus 2, kosongkan, pickup, delivery.', 'Tombol balasan berbahasa sehari-hari: “Sudah, itu saja”, “Ambil di warung”.'],
  ['Mengubah jumlah memakai format tertentu, misalnya “dirty latte ubah 1 jadi 10”.', 'Pembeli cukup bilang “kopinya jadi 3 deh”.'],
  ['Minimal pembelian baru muncul setelah checkout.', 'Minimal pesan ditulis di menu sejak awal.'],
  ['Stok “perlu dikonfirmasi” tampil bersama harga.', 'Label “Habis hari ini”, lalu Asisten menawarkan pengganti.'],
  ['Pesanan diambil di toko juga menerima status “sedang dalam perjalanan”.', 'Status mengikuti pilihan: “sudah siap, ambil di kasir”.'],
  ['Nomor pesanan “ORD-6309cc5d”, sapaan “Anda”.', '“Pesanan #21”, sapaan “Kak” dan “kamu”.'],
  ['“Saya sambungkan ke admin” muncul tanpa keterangan kenapa.', 'Asisten bilang kenapa, dan Bu Sari membalas di chat yang sama.'],
  ['Pesan dari bot dan dari admin terlihat sama.', 'Setiap pesan diberi tanda pengirim: Asisten Pintar atau Bu Sari.']
];