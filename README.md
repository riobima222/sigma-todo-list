# ✨ Sigma To-Do List

Sigma To-Do List adalah aplikasi manajemen tugas yang memungkinkan pengguna untuk mengatur tugas mereka dengan mudah. Dengan fitur yang sederhana namun powerful, Anda dapat mengelola tugas harian Anda dengan lebih efektif! 🚀

Lihat Aplikasi : [Sigma-Todolist](https://sigma-todolist.vercel.app/)

## 🌟 Fitur Aplikasi

- 👤 **Registrasi dan Login:** Pengguna dapat mendaftar dan masuk untuk menggunakan aplikasi.
- 📝 **Tambah Tugas:** Pengguna dapat menambahkan tugas baru.
- ✅ **Checklist Tugas:** Tugas yang selesai dapat ditandai sebagai selesai dan dipindahkan ke daftar checklist.
- 🗑️ **Hapus Tugas:** Tugas dapat dihapus dari daftar tugas atau daftar checklist.

## 🛠️ Teknologi Utama

- ⚛️ **[Next.js](https://nextjs.org/) (App Router):** Framework React untuk membangun aplikasi web.
- 🔥 **[Firebase](https://firebase.google.com/):** Backend untuk autentikasi, database, dan lainnya.
- 🎨 **[Tailwind CSS](https://tailwindcss.com/):** Library CSS untuk styling.
- 🔐 **[NextAuth.js](https://next-auth.js.org/):** Untuk autentikasi pengguna.

## 🚀 Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini secara lokal.

### ⚙️ Prasyarat

Pastikan Anda sudah menginstal:

- 🟢 [Node.js](https://nodejs.org/) versi terbaru.
- 🟡 [Git](https://git-scm.com/).
- 🔵 Akun [Firebase](https://firebase.google.com/) untuk konfigurasi backend.

### 📦 Langkah Instalasi

1. **Clone repositori ini:**

   ```bash
   git clone https://github.com/username/sigma-todolist.git
   cd sigma-todolist
Instal dependensi:

bash
Copy code
npm install
Konfigurasi Firebase:

🔧 Buat proyek di Firebase Console.

Aktifkan Cloud Firestore untuk menyimpan data tugas.
Buat file .env.local di root folder proyek dan tambahkan konfigurasi Firebase Anda:


```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```
Konfigurasi NextAuth:
🔑 Tambahkan secret key untuk NextAuth di file .env.local:

```bash
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```
Sesuaikan provider autentikasi di file NextAuth jika diperlukan.

Jalankan aplikasi:

bash
Copy code
npm run dev
Akses aplikasi di browser:

🌐 Buka http://localhost:3000 di browser Anda.

💡 Dibuat Oleh : Patrio Bimasuci. 💻✨

Semoga Bermanfaat ! 😊






