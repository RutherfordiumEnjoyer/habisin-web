# Habisin Web

| No | Nama                   | NRP        |
|----|------------------------|------------|
| 1  | Mohammad Abyan Ranuaji | 5027241106 |

---

## 1. Deskripsi Singkat
Habisin! adalah aplikasi web berbasis MERN Stack (MongoDB, Express, React, Node.js) yang bertujuan untuk mengurangi limbah makanan di lingkungan kampus (Zero Waste) sekaligus membantu mahasiswa menghemat pengeluaran. Aplikasi ini menghubungkan panitia acara atau individu yang memiliki makanan berlebih dengan mahasiswa yang membutuhkan secara real-time.

## 2. Masalah yang Diselesaikan (Problem Statement)
Di lingkungan kampus, sering terjadi dua kondisi kontradiktif:
1.  Food Waste: Banyak sisa konsumsi dari seminar, rapat organisasi, atau acara kampus yang berakhir di tempat sampah karena bingung harus dibagikan ke mana.
2.  Food Insecurity: Banyak mahasiswa yang mencari cara untuk berhemat, namun informasi mengenai makanan gratis seringkali tersebar tidak merata (hanya via mulut ke mulut atau grup WhatsApp tertutup).
3.  Lack of Information: Sulit mengetahui lokasi pasti dan ketersediaan makanan secara akurat tanpa platform terpusat.

## 3. Solusi yang Dibuat (Solution Overview)
Habisin! hadir sebagai platform sentralisasi informasi makanan gratis dengan pendekatan visual dan gamifikasi:
* Peta Interaktif: Menggunakan peta kampus kustom untuk memvisualisasikan lokasi makanan secara presisi.
* Real-time Update: Status makanan (masih ada/habis) dapat dipantau langsung.
* Gamifikasi: Sistem poin dan leaderboard untuk memotivasi "donatur" agar rajin berbagi.
* Visual & Audio Feedback: UX yang interaktif dengan notifikasi suara dan animasi halus untuk pengalaman pengguna yang lebih baik.

## 4. Tech Stack & Fitur Utama

### Tech Stack
* Frontend: React.js (Vite), Tailwind CSS, Framer Motion (Animasi).
* Backend: Express.js, Node.js.
* Database: MongoDB Atlas (Cloud).
* Authentication: JWT (JSON Web Token), Bcryptjs.
* Storage: Multer (Local storage for images).
* Other Libraries: Axios, React Hot Toast, Use-Sound.

### Fitur Utama
1.  Authentication System: Registrasi dan Login aman menggunakan enkripsi password dan token JWT.
2.  Interactive Campus Map: Penandaan lokasi makanan menggunakan peta visual kampus (bukan sekadar teks).
3.  Image Upload: Donatur wajib mengunggah foto makanan sebagai bukti validitas.
4.  Gamification (Leaderboard): Papan peringkat "Pahlawan Pangan" berdasarkan keaktifan berbagi.
5.  Dark Mode Support: Tampilan ramah mata yang menyesuaikan preferensi pengguna (otomatis tersimpan).
6.  Micro-Interactions: Efek suara (sound design), animasi kartu (staggered animation), dan skeleton loading.
7.  Responsive Design: Tampilan optimal di Desktop maupun Mobile.

## 5. Cara Menjalankan Project (Setup Instructions)

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal:

### Prasyarat
* Node.js sudah terinstall.
* Koneksi internet (untuk MongoDB Atlas).

### Langkah 1: Clone Repository
```
git clone <link-repo-github-kamu>
cd habisin-app
```
### Langkah 2: Setup Backend (Server)
Masuk ke folder server:
```
cd server
```
Install dependencies:
```
npm install
```
Buat file .env di dalam folder server dan isi dengan konfigurasi berikut:
```
PORT=5000
MONGO_URI=<koneksimongodbatlas>
JWT_SECRET=<bebas>
```
Jalankan server:
```
npm run dev
```
Pastikan muncul pesan: ✅ MongoDB Connected

### Langkah 3: Setup Frontend (Client)
Buka terminal baru, masuk ke folder client:
```
cd client
```
Install dependencies:
```
npm install
```
Jalankan aplikasi React:
```
npm run dev
```
Buka browser dan akses URL yang muncul.
