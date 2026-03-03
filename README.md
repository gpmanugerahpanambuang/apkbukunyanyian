# Aplikasi Pembaca Lagu

Aplikasi web modern untuk membaca dan mengelola koleksi lagu rohani dalam format digital. Aplikasi ini dirancang dengan antarmuka yang elegan, tema gelap dengan aksen hijau tua, dan animasi yang halus untuk pengalaman pengguna yang optimal.

## 🎵 Fitur Utama

- **Pembacaan Direktori Otomatis**: Membaca folder buku lagu dan file lagu secara otomatis
- **Navigasi Intuitif**: Antarmuka satu panel dengan navigasi yang mudah digunakan
- **Pencarian Lagu**: Fitur pencarian untuk menemukan lagu dengan cepat
- **Animasi Keren**: Transisi halus dan efek hover yang menarik
- **Tema Gelap**: Desain elegan dengan warna hijau tua dan hijau soft
- **Responsif**: Tampilan optimal di berbagai ukuran layar

## 📁 Struktur Proyek

```
windsurf-project/
├── index.html              # Halaman utama aplikasi
├── styles.css              # File CSS dengan tema dan animasi
├── script.js               # Logika JavaScript aplikasi
├── README.md               # Dokumentasi proyek
└── Kidung Jemaat/          # Contoh folder buku lagu
    ├── 1 - Haleluya, Pujilah.txt
    ├── 2 - Puji Syukur pada Allah.txt
    ├── 3 - Allah yang Mahakuasa.txt
    ├── 4 - Kasih Karunia.txt
    └── 5 - Sungguh Indah.txt
```

## 🎨 Desain & Tema

### Warna Utama
- **Hijau Tua (Primary)**: `#064e3b` - Warna dominan untuk header dan elemen penting
- **Hijau Sekunder**: `#047857` - Warna untuk tombol dan interaksi
- **Hijau Aksen**: `#10b981` - Warna untuk highlight dan efek hover
- **Background Gelap**: `#111827` - Background utama dengan gradien
- **Card Background**: `#1f2937` - Background untuk kartu buku dan lagu

### Animasi
- **Fade In**: Animasi muncul untuk kartu buku dan lagu
- **Hover Effect**: Efek mengangkat dan scale saat hover
- **Shimmer Effect**: Efek cahaya bergerak saat hover
- **Floating Icons**: Animasi mengambang untuk ikon
- **Loading Spinner**: Animasi loading yang smooth

## 🚀 Cara Penggunaan

### 1. Menjalankan Aplikasi
- Buka file `index.html` di browser modern (Chrome, Firefox, Edge, Safari)
- Aplikasi akan langsung menampilkan koleksi buku lagu yang tersedia

### 2. Menambah Buku Lagu Baru
- Buat folder baru di direktori proyek dengan nama buku lagu (contoh: "KJ", "NP", "PKJ")
- Tambahkan file lagu dalam format `.txt` dengan naming convention: `Nomor - Judul.txt`

### 3. Format File Lagu
File lagu harus dalam format `.txt` dengan struktur:
```
Judul Lagu

Bait 1:
Lirik bait pertama...

Bait 2:
Lirik bait kedua...

Bait 3:
Lirik bait ketiga...
```

### 4. Navigasi
- **Halaman Utama**: Menampilkan semua buku lagu yang tersedia
- **Halaman Buku**: Menampilkan daftar lagu dalam buku yang dipilih
- **Halaman Lagu**: Menampilkan lirik lengkap lagu yang dipilih
- **Breadcrumb**: Navigasi cepat untuk kembali ke halaman sebelumnya

## 🔧 Teknologi yang Digunakan

### Frontend
- **HTML5**: Struktur halaman semantik
- **Tailwind CSS**: Framework CSS untuk styling cepat
- **Font Awesome**: Ikon untuk UI elements
- **Alpine.js**: Framework JavaScript reaktif (ringan)

### Fitur Modern
- **File System Access API**: Untuk browser modern (Chrome 86+)
- **CSS Grid & Flexbox**: Layout responsif
- **CSS Animations**: Transisi dan efek visual
- **ES6+**: JavaScript modern dengan class dan async/await

## 📱 Kompatibilitas Browser

### Browser yang Didukung:
- ✅ Chrome 86+ (Full support dengan File System Access API)
- ✅ Firefox 90+ (Partial support)
- ✅ Edge 86+ (Full support)
- ✅ Safari 14+ (Partial support)

### Fallback:
Untuk browser yang tidak mendukung File System Access API, aplikasi akan menggunakan data simulasi yang sudah disediakan.

## 🎯 Fitur yang Akan Datang

- [ ] Upload file lagu melalui drag & drop
- [ ] Mode presentasi untuk ibadah
- [ ] Pencarian dengan filter lanjutan
- [ ] Bookmark lagu favorit
- [ ] Export/Import koleksi lagu
- [ ] Mode offline dengan Service Worker
- [ ] Multi-bahasa support

## 🛠️ Pengembangan

### Struktur Kode
- **SongReaderApp**: Class utama untuk mengelola aplikasi
- **FileSystemHandler**: Class untuk handle file system operations
- **Modular CSS**: Organisasi styles dengan CSS variables
- **Event-driven**: Arsitektur berbasis event untuk interaksi

### Best Practices
- Clean code dengan komentar yang jelas
- Error handling yang komprehensif
- Responsive design untuk semua device
- Accessibility compliance (ARIA labels)
- Performance optimization dengan lazy loading

## 📄 Lisensi

Proyek ini bersifat open source dan dapat digunakan secara gratis untuk keperluan ibadah dan pelayanan.

## 🙏 Tujuan Proyek

Aplikasi ini dibuat dengan tujuan:
- Memudahkan jemaat mengakses lagu-lagu rohani
- Modernisasi koleksi lagu konvensional ke format digital
- Memberikan pengalaman pengguna yang menyenangkan
- Mendukung kegiatan ibadah dan pelayanan gereja

---

**Dibuat dengan ❤️ untuk kemuliaan Tuhan**
