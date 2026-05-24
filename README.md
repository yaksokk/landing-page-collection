# 🌐 Landing Page Premium Build with AI Tools

> **landing page siap pakai** 

---

## 📦 Apa yang Ada di Proyek Ini?

Koleksi **landing page production-ready** dengan fitur bilingual Indonesia/Inggris yang kini dipisahkan secara modular:

| Folder | Nama | Kategori | Tema |
|---|---|---|---|
| `personal/` | Kuroko Tetsuya | Portofolio personal | Dark navy |

---

## 🔍 Penjelasan Setiap File

### `shared/translation-api.js`
> **Otak sistem terjemahan. Ubah konfigurasi di sini untuk semua halaman.**

File ini mengelola bagaimana terjemahan bekerja. Ada dua mode yang bisa dipilih:

- **Mode `manual`** — Menggunakan teks terjemahan yang sudah ditulis di `translations.js`. Cepat, tidak butuh internet.
- **Mode `api`** — Menggunakan layanan terjemahan gratis di internet (MyMemory atau LibreTranslate). Teks di halaman akan **otomatis diterjemahkan** setiap kali dimuat, tanpa perlu mengubah file terjemahan secara manual.

**Cara mengubah mode:**
```javascript
// Buka: shared/translation-api.js
// Cari baris ini dan ubah sesuai kebutuhan:

const TRANSLATION_CONFIG = {
  mode: 'api',             // ← Ubah ke 'manual' untuk mematikan API
  activeApi: 'mymemory',   // ← Pilih: 'mymemory' atau 'libretranslate'
  sourceLang: 'id',        // ← Bahasa teks asli di HTML
  targetLang: 'en',        // ← Bahasa target terjemahan
  ...
};
```

---

### `[nama-halaman]/translations.js`
> **Terjemahan cadangan. Tetap aktif saat API mati atau mode manual.**

beberapa halaman punya file ini. Isinya adalah pasangan key-teks dalam dua bahasa (ID dan EN). Contoh:

```javascript
window.manualTranslations = {
  id: {
    nav_home: "Beranda",
    hero_title: "Bersama Kita Jaga Bumi",
    ...
  },
  en: {
    nav_home: "Home",
    hero_title: "Together We Protect Earth",
    ...
  }
};
```

---


## 🚀 Cara Menjalankan

Tidak perlu instalasi, tidak perlu Node.js, tidak perlu server.

drag & drop file `index.html` ke browser favorit Anda. Selesai.

---

## ✏️ Tips Kustomisasi

**Ganti warna brand:**
```css
/* Di style.css, cari bagian :root */
:root {
  --accent: #EF4444; /* Ganti dengan warna brand Anda */
}
```

---

## ⚙️ Teknologi yang Digunakan

| Teknologi | Keterangan |
|---|---|
| **HTML5** | Semantik, accessible, `data-i18n` attribute untuk terjemahan |
| **CSS3** | Custom properties, keyframe animations, grid & flexbox |
| **Tailwind CSS** | Via CDN — utility classes untuk layout responsif |
| **Vanilla JavaScript** | Zero framework — pure JS yang ringan dan cepat |
| **Font Awesome 6** | ikon |
| **Google Fonts** | Inter, Playfair Display, Merriweather, Space Grotesk, Bebas Neue |

---

## 📋 Checklist Kualitas

- [x] Fully responsive — mobile, tablet, desktop
- [x] Terjemahan (Tidak Semua)
- [x] Satu konfigurasi di satu tempat untuk semua halaman
- [x] Zero Lorem Ipsum — semua copy realistis dan profesional
- [x] Zero inline style & inline script di HTML
- [x] Semua animasi scroll, counter, dan interaksi tetap berjalan

---

<div align="center">

**Dibangun dengan sepenuh hati.**
*Semoga proyek ini memudahkan pekerjaan Anda.*

</div>
