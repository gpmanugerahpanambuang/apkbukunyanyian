# Cara Penggunaan Aplikasi Pembaca Lagu

## 📁 Struktur Folder yang Diperlukan

Aplikasi ini dirancang untuk membaca lagu dari folder `DB-Lagu` yang harus Anda buat secara manual. Struktur folder yang benar adalah:

```
DB-Lagu/
├── Kidung Jemaat/
│   ├── KJ No 001 - Haleluya, Pujilah.txt
│   ├── KJ No 002 - Puji Syukur pada Allah.txt
│   ├── KJ No 003 - Judul Lagu Lainnya.txt
│   └── ... (lagu lainnya)
├── Pelengkap Kidung Jemaat/
│   ├── PKJ No 001 - Allah yang Ternyata.txt
│   ├── PKJ No 002 - Judul Lagu Lainnya.txt
│   └── ... (lagu lainnya)
├── Buku Lagu Lainnya/
│   ├── PREFIX No 001 - Judul Lagu.txt
│   └── ... (lagu lainnya)
└── ... (buku lagu lainnya)
```

## 📝 Format File Lagu

Setiap file lagu harus mengikuti format penamaan:
```
PREFIX No XXX - Judul Lagu.txt
```

Contoh:
- `KJ No 001 - Haleluya, Pujilah.txt`
- `PKJ No 001 - Allah yang Ternyata.txt`
- `NP No 045 - Bagai Rajawali.txt`

### Format Isi File Lagu

Isi file lagu harus menggunakan format dengan label yang diawali tanda bintang (*):

```
*Reff
Lirik reffain di sini...
Baris kedua reffain...

*1
Lirik bait pertama di sini...
Baris kedua bait pertama...

*2
Lirik bait kedua di sini...
Baris kedua bait kedua...

*3
Lirik bait ketiga di sini...
Baris kedua bait ketiga...

*Reff
Lirik reffain ulang...
```

**Label yang Didukung:**
- `*Reff` - Untuk bagian reffain
- `*1`, `*2`, `*3`, dst - Untuk bait-bait
- `*Bridge` - Untuk bridge (jika ada)
- `*Outro` - Untuk outro (jika ada)

## 🚀 Cara Menjalankan Aplikasi

### Opsi 1: Menggunakan File System Access API (Chrome/Edge Modern)

1. Buka `index.html` di browser Chrome atau Edge versi terbaru
2. Aplikasi akan meminta izin untuk mengakses folder
3. Pilih folder yang mengandung folder `DB-Lagu`
4. Aplikasi akan langsung membaca semua buku lagu dan file lagu

### Opsi 2: Menggunakan Server Lokal

1. Jalankan server lokal:
   ```bash
   node server.js
   ```
2. Buka `http://localhost:8000` di browser
3. Aplikasi akan menggunakan data sample yang sudah disediakan

## 📂 Cara Menambah Lagu Baru

### 1. Menambah Buku Lagu Baru

1. Buat folder baru di dalam `DB-Lagu`
2. Beri nama folder sesuai nama buku lagu (contoh: "NKB", "NP", "KIDUNG")
3. Aplikasi akan otomatis mendeteksi folder baru

### 2. Menambah Lagu Baru

1. Buat file `.txt` baru di folder buku lagu yang sesuai
2. Ikuti format penamaan: `PREFIX No XXX - Judul Lagu.txt`
3. Isi file dengan format lirik yang benar
4. Aplikasi akan otomatis membaca file baru

### 3. Contoh Penambahan Lagu

**Menambah lagu di Kidung Jemaat:**
```
DB-Lagu/Kidung Jemaat/KJ No 003 - Allah Mahakuasa.txt
```

**Isi file:**
```
*1
Allah yang Mahakuasa
Pencipta langit dan bumi
Kau yang mengatur segalanya
Dengan hikmat-Mu yang agung

*Reff
Puji Tuhan, puji Tuhan
Sungguh besar kuasa-Mu
Puji Tuhan, puji Tuhan
Kasih-Mu selamanya

*2
Kau yang menjaga umat-Mu
Dengan kasih setia-Mu
Kau yang memberi kehidupan
Pada semua makhluk-Mu
```

## 🔍 Cara Pencarian

1. **Pencarian Buku Lagu**: Ketik nama buku lagu di search bar
2. **Pencarian Lagu**: Setelah masuk ke buku lagu, ketik nomor atau judul lagu
3. **Pencarian Real-time**: Hasil pencarian muncul saat Anda mengetik

## 🎨 Tips Penggunaan

- **Format Konsisten**: Pastikan semua file menggunakan format yang sama
- **Nomor Urut**: Gunakan nomor urut yang konsisten (001, 002, 003)
- **Judul Jelas**: Beri judul lagu yang jelas dan mudah dicari
- **Backup**: Selalu backup folder `DB-Lagu` secara berkala

## 🛠️ Troubleshooting

### Lagu Tidak Muncul
1. Pastikan file berformat `.txt`
2. Periksa format penamaan file
3. Pastikan file berada di dalam folder yang benar

### Format Lirik Tidak Benar
1. Pastikan label diawali dengan `*`
2. Pastikan tidak ada spasi antara `*` dan label
3. Periksa format parsing di JavaScript

### Aplikasi Tidak Bisa Membaca Folder
1. Gunakan browser Chrome/Edge versi terbaru
2. Pastikan folder `DB-Lagu` ada di direktori yang benar
3. Coba restart aplikasi

## 📱 Kompatibilitas

- **Chrome 86+**: Full support dengan File System Access API
- **Edge 86+**: Full support dengan File System Access API  
- **Firefox**: Partial support (fallback mode)
- **Safari**: Partial support (fallback mode)

---

**Selamat menggunakan aplikasi pembaca lagu! 🎵**
