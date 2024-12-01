# AI Video Dashboard

Aplikasi dashboard untuk monitoring keselamatan kerja menggunakan deteksi AI pada video stream secara real-time.

## Fitur Utama

- **Live View**: Monitoring kamera secara real-time dengan deteksi AI untuk PPE (Personal Protective Equipment)
- **Dashboard**: Visualisasi data dan statistik keselamatan kerja
- **Video Recording**: Rekaman video dengan timestamp untuk review
- **Accident Reports**: Laporan dan analisis insiden keselamatan
- **Settings**: Konfigurasi sistem dan pengaturan kamera

## Teknologi yang Digunakan

- React 18
- TypeScript
- Material UI
- Recharts untuk visualisasi data
- React Router untuk navigasi

## Cara Menjalankan Aplikasi

1. Clone repository ini
```bash
git clone https://github.com/gifadev/dashboard-ai-ppe
```

2. Install dependencies
```bash
npm install
```

3. Jalankan aplikasi
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Aplikasi

- `/src/components`: Komponen React yang dapat digunakan kembali
- `/src/pages`: Halaman-halaman utama aplikasi
- `/src/assets`: Aset statis seperti gambar dan ikon
- `/src/utils`: Fungsi-fungsi utilitas

## Konfigurasi Kamera

Aplikasi ini mendukung integrasi dengan kamera IP atau webcam. Untuk menambahkan kamera:

1. Buka file konfigurasi kamera di `src/pages/LiveView.tsx`
2. Tambahkan URL stream kamera pada array `sampleCameras`
3. Pastikan URL stream dapat diakses dari jaringan yang sama

## Deployment

Aplikasi ini dapat di-deploy menggunakan Netlify:

1. Push kode ke repository GitHub
2. Hubungkan repository dengan Netlify
3. Netlify akan otomatis men-deploy aplikasi

