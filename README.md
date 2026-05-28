# Email Sorter PRO — GitHub Pages PWA

Paket ini siap deploy ke GitHub Pages dan bisa di-install lewat Chrome sebagai aplikasi.

## Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `email-sorter-pro`.
2. Upload semua isi folder ini ke repository:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - folder `icons/`
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Klik **Save**.
6. Buka URL GitHub Pages yang muncul.

## Cara install jadi aplikasi Chrome

1. Buka URL GitHub Pages di Chrome.
2. Tekan menu Chrome `⋮`.
3. Pilih **Add to Home screen** atau **Install app**.
4. Buka aplikasinya sekali saat internet aktif agar cache offline tersimpan.
5. Setelah itu aplikasi bisa dibuka offline.

## Catatan penting

- Input email via `.xls`, `.xlsx`, atau `.csv`.
- Parser Excel memakai SheetJS dari CDN dan akan dicache oleh Service Worker setelah dibuka online pertama kali.
- Data sesi disimpan di `localStorage` perangkat.
- Export hasil dalam format `.csv`.
