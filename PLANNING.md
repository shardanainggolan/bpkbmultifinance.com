# Planning: bpkbmultifinance.com

## Overview
Website agen pinjaman dana dengan jaminan gadai BPKB Mobil/Motor melalui Adira Finance.
Target: calon nasabah yang butuh dana cepat dengan jaminan BPKB kendaraan.

## Tech Stack
- **Next.js 16.2.2** (App Router)
- **React 19.2.4**
- **Tailwind CSS v4** (dengan `@import "tailwindcss"`)
- **TypeScript**
- **Font**: Inter (Google Fonts) - clean & modern

## Color Palette
Mengikuti branding Adira Finance:
- **Primary**: Kuning Adira `#FFDD00` (kuning khas Adira)
- **Primary Dark**: `#E6C700` (hover state)
- **Primary Light**: `#FFF4B3` (background accent)
- **Secondary**: `#1E3A5F` (navy/biru tua - trust & profesional)
- **Secondary Dark**: `#0F2440`
- **Text on Primary**: `#1A1A1A` (hitam, karena primary kuning terang)
- **Neutral**: Slate gray tones
- **Background**: White + Light gray sections

---

## Struktur Halaman (Single Page Application)

### 1. Header / Navbar
- Logo agen (sudah ada: `logo-agen-axi-adira.png`)
- Menu navigasi: Beranda | Produk | Syarat | Simulasi | Keunggulan | FAQ | Hubungi Kami
- Sticky header dengan blur backdrop
- Tombol CTA "Ajukan Sekarang" (WhatsApp link)
- Mobile: hamburger menu

### 2. Hero Section
- Headline utama: "Butuh Dana Cepat? Gadaikan BPKB Anda!"
- Sub-headline: penjelasan singkat pinjaman dana jaminan BPKB via Adira Finance
- Dua CTA button: "Ajukan Pinjaman" (WA) + "Simulasi Pinjaman"
- Background: gradient overlay pada gambar/abstract pattern
- Badge: "Proses Cepat 1-2 Hari Kerja" / "Agen Resmi Adira Finance"
- Responsive: full-width, teks center di mobile

### 3. Keunggulan / Why Choose Us (Trust Signals)
- Grid 3-4 kolom (icon + judul + deskripsi singkat):
  - Proses Cepat (1-2 hari kerja)
  - Bunga Kompetitif (mulai 0.8%/bulan)
  - Tenor Fleksibel (hingga 48 bulan)
  - BPKB Aman & Dijamin Adira
  - Pencairan Langsung ke Rekening
  - Kendaraan Tetap Digunakan
- Animasi fade-in saat scroll

### 4. Produk Pinjaman
Dua card produk utama:
#### a. Pinjaman Dana Jaminan BPKB Mobil
- Pinjaman mulai Rp 5 juta - Rp 400 juta
- Tenor: 12 - 48 bulan
- Usia kendaraan maks 15 tahun
- Keunggulan spesifik

#### b. Pinjaman Dana Jaminan BPKB Motor
- Pinjaman mulai Rp 2 juta - Rp 50 juta
- Tenor: 6 - 36 bulan
- Usia kendaraan maks 10 tahun
- Keunggulan spesifik

Setiap card ada tombol "Ajukan Sekarang"

### 5. Simulasi Pinjaman (Calculator)
- Form interaktif:
  - Jenis kendaraan (Mobil / Motor) - toggle/tab
  - Tahun kendaraan (dropdown)
  - Estimasi nilai kendaraan (input/slider)
  - Tenor pinjaman (pilihan: 12, 18, 24, 36, 48 bulan)
- Output:
  - Estimasi dana pinjaman (70-80% dari nilai kendaraan)
  - Estimasi angsuran per bulan
- Disclaimer: "Simulasi ini bersifat estimasi. Nilai aktual ditentukan setelah survei."
- CTA: "Ajukan untuk Perhitungan Pasti" (WA)

### 6. Syarat & Dokumen
Layout: 2 kolom (Syarat Pemohon | Dokumen yang Diperlukan)

**Syarat Pemohon:**
- WNI usia 21-55 tahun
- Memiliki penghasilan tetap / usaha
- Kendaraan atas nama sendiri / pasangan / orang tua
- BPKB asli (bukan duplikat)
- Kendaraan tidak dalam status kredit

**Dokumen:**
- KTP pemohon & pasangan
- Kartu Keluarga (KK)
- BPKB asli kendaraan
- STNK yang masih berlaku
- Slip gaji / Surat Keterangan Usaha
- Rekening koran 3 bulan terakhir (opsional)

### 7. Proses Pengajuan (Steps)
Timeline/stepper horizontal:
1. **Hubungi Kami** - Via WhatsApp/telepon, konsultasi gratis
2. **Kirim Dokumen** - Foto/scan dokumen persyaratan
3. **Survei & Verifikasi** - Tim Adira survei kendaraan (1 hari)
4. **Approval & Pencairan** - Dana cair ke rekening Anda

### 8. FAQ (Accordion)
Pertanyaan umum:
- Apa itu pinjaman dana gadai BPKB?
- Apakah kendaraan masih bisa dipakai?
- Berapa lama proses pencairan?
- Apakah BPKB aman?
- Apa bedanya dengan leasing?
- Bagaimana jika saya ingin melunasi lebih awal?
- Apakah bisa mengajukan jika STNK mati?
- Area mana saja yang dilayani?

### 9. Testimoni / Social Proof
- 3-4 testimoni singkat dari nasabah
- Nama, kota, rating bintang
- Carousel/grid di mobile

### 10. CTA Section (Call to Action)
- Full-width section dengan background gradient
- Headline: "Siap Mendapatkan Dana yang Anda Butuhkan?"
- Dua tombol: WhatsApp + Telepon
- Nomor WA dan telepon yang jelas

### 11. Footer
- Logo + deskripsi singkat perusahaan
- Link navigasi
- Info kontak (WA, telepon, email)
- Alamat kantor
- Disclaimer: "bpkbmultifinance.com adalah agen resmi Adira Finance"
- Copyright
- Badge: "Bagian dari Danamon Group & MUFG"

---

## Halaman Cabang Adira Finance

### API Backend
- **Base URL**: `https://backend.adiracabang.id`
- **Image Base URL**: `https://backend.adiracabang.id/uploads/` (atau sesuai convention)
- **List semua cabang**: `GET /api/branch` → `{ code, status, data: Branch[] }`
- **Detail cabang**: `GET /api/branch/slug/{slug}` → `{ code, status, data: Branch }`

### Type Definition (`lib/types.ts`)
```ts
interface Branch {
  branchId: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  address: string;
  provinceId: string;
  districtId: string;
  subDistrictId: string;
  postalCode: string;
  telp1: string;
  telp2: string;
  telp3: string;
  fax1: string;
  fax2: string;
  fax3: string;
  latitude: string;
  longitude: string;
  gmapsLink: string;
  region: {
    province: { provinceId: string; province: string };
    district: { districtId: string; provinceId: string; district: string };
    subDistrict: { subDistrictId: string; districtId: string; subDistrict: string };
  };
  nextBranch: { branchId: string; name: string; slug: string; image: string };
  previousBranch: { branchId: string; name: string; slug: string; image: string };
}
```

### Halaman Daftar Cabang (`/cabang`)
- **Route**: `app/cabang/page.tsx`
- **Data fetching**: Server Component, fetch dari `/api/branch`
- **Fitur**:
  - Search bar - filter cabang berdasarkan nama / kota
  - Filter dropdown by Provinsi → Kabupaten/Kota
  - Grid card cabang (3 kolom desktop, 2 tablet, 1 mobile)
  - Setiap card menampilkan: gambar, nama cabang, alamat singkat, kota, tombol "Lihat Detail"
  - Pagination atau infinite scroll jika cabang banyak
- **SEO**:
  - Title: "Daftar Cabang Adira Finance Seluruh Indonesia | bpkbmultifinance.com"
  - Description: "Temukan cabang Adira Finance terdekat di seluruh Indonesia untuk pengajuan pinjaman dana gadai BPKB mobil dan motor."

### Halaman Detail Cabang (`/cabang/[slug]`)
- **Route**: `app/cabang/[slug]/page.tsx`
- **Data fetching**: Server Component, fetch dari `/api/branch/slug/{slug}`
- **Dynamic Metadata**: `generateMetadata()` per cabang untuk SEO
- **Konten halaman**:
  1. **Breadcrumb**: Beranda > Cabang > [Nama Cabang]
  2. **Header cabang**: Nama cabang, badge provinsi/kota
  3. **Gambar cabang**: `next/image` dari API
  4. **Info kontak**: Telepon 1/2/3, Fax (yang tidak kosong saja)
  5. **Alamat lengkap**: Alamat + kecamatan + kota + provinsi + kode pos
  6. **Google Maps embed**: Iframe dari `gmapsLink`
  7. **CTA section**: "Ajukan Pinjaman di Cabang [Nama]" → WhatsApp dengan pesan otomatis menyebut cabang
  8. **Navigasi cabang**: Tombol Previous / Next branch (jika ada)
  9. **Info produk ringkas**: Ringkasan produk BPKB Mobil & Motor (reuse dari homepage)
- **SEO per cabang**:
  - Title: "Gadai BPKB di [Nama Cabang] | Pinjaman Dana Adira Finance"
  - Description: "[Description dari API]. Alamat: [address], [kota]."
  - Structured data (LocalBusiness JSON-LD)

### Navigasi
- Tambah menu "Cabang" di Navbar (link ke `/cabang`)
- Di homepage, tambah section "Temukan Cabang Terdekat" sebelum CTA section
  - Preview 3-4 cabang populer
  - Tombol "Lihat Semua Cabang"

---

## Struktur File

```
app/
├── layout.tsx                    # Root layout (font, metadata, Organization JSON-LD)
├── globals.css                   # Tailwind imports + custom CSS variables
├── page.tsx                      # Homepage (semua section + schema markup)
├── sitemap.ts                    # Dynamic sitemap (homepage + semua cabang)
├── robots.ts                     # robots.txt config
├── cabang/
│   ├── page.tsx                  # Daftar semua cabang
│   └── [slug]/
│       └── page.tsx              # Detail cabang (dynamic route + LocalBusiness schema)
├── components/
│   ├── Navbar.tsx                # Sticky navbar + mobile menu
│   ├── HeroSection.tsx           # Hero banner
│   ├── KeunggulanSection.tsx     # Why choose us / advantages
│   ├── ProdukSection.tsx         # Produk BPKB Mobil & Motor
│   ├── SimulasiSection.tsx       # Kalkulator simulasi pinjaman
│   ├── SyaratSection.tsx         # Syarat & dokumen
│   ├── ProsesSection.tsx         # Steps pengajuan
│   ├── FAQSection.tsx            # Accordion FAQ + FAQPage schema
│   ├── TestimoniSection.tsx      # Testimoni nasabah
│   ├── TentangAdiraSection.tsx   # Entity strengthening: profil Adira Finance
│   ├── CabangPreviewSection.tsx  # Preview cabang di homepage
│   ├── CTASection.tsx            # Call to action
│   ├── Footer.tsx                # Footer + disclaimer
│   ├── BranchCard.tsx            # Card cabang (reusable)
│   ├── BranchSearch.tsx          # Search & filter cabang (client component)
│   └── BranchNavigation.tsx      # Navigasi prev/next cabang
├── lib/
│   ├── constants.ts              # WhatsApp number, phone, data FAQ, testimoni
│   ├── types.ts                  # TypeScript interfaces (Branch, dll)
│   ├── api.ts                    # API fetch functions (getBranches, getBranchBySlug)
│   └── schema.ts                 # JSON-LD schema generators (Organization, FinancialProduct, LocalBusiness, FAQ, Breadcrumb)
public/
├── images/
│   ├── logo-agen-axi-adira.png  # (sudah ada)
│   ├── hero-bg.webp              # Hero background (placeholder/gradient)
│   └── og-image.jpg              # Open Graph image
```

---

## SEO Strategy: Entity-First Approach

### Tantangan Domain
Domain `bpkbmultifinance.com` **tidak mengandung kata "adira"**. Di era post-March 2026 Core Update,
Google tidak lagi bergantung pada exact-match domain. Yang menentukan ranking adalah:
- **Entity clarity** — Seberapa jelas Google memahami hubungan website dengan entitas "Adira Finance"
- **Topical authority** — Seberapa lengkap website membahas topik "gadai BPKB Adira Finance"
- **E-E-A-T signals** — Experience, Expertise, Authoritativeness, Trustworthiness

### Referensi SEO yang Digunakan
- **Koray's Framework** (Koray Tugberk Gubur) — Semantic SEO & Topical Authority methodology
- **Google March 2026 Core Update** (rollout 27 Mar - 8 Apr 2026) — E-E-A-T diperkuat, entity understanding diperdalam, AI content farms turun 60-80%
- **Entity-Based SEO 2026** — Google Knowledge Graph, schema markup, entity association

---

### A. Structured Data / Schema Markup (JSON-LD)

Implementasi di `layout.tsx` dan per-halaman:

#### 1. Organization Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BPKB Multi Finance - Agen Resmi Adira Finance",
  "url": "https://bpkbmultifinance.com",
  "logo": "https://bpkbmultifinance.com/images/logo-agen-axi-adira.png",
  "description": "Agen resmi Adira Finance untuk pinjaman dana dengan jaminan gadai BPKB mobil dan motor di seluruh Indonesia.",
  "telephone": "+6285122682981",
  "sameAs": [
    "https://www.adira.co.id",
    "https://id.wikipedia.org/wiki/Adira_Dinamika_Multi_Finance"
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "Adira Dinamika Multi Finance",
    "url": "https://www.adira.co.id",
    "sameAs": [
      "https://www.adira.co.id",
      "https://id.wikipedia.org/wiki/Adira_Dinamika_Multi_Finance",
      "https://www.idx.co.id/id/perusahaan-tercatat/profil-perusahaan-tercatat/?kodeEmiten=ADMF"
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "Bank Danamon Indonesia",
      "sameAs": "https://www.danamon.co.id"
    }
  },
  "knowsAbout": [
    "Pinjaman Dana Gadai BPKB",
    "Kredit Multiguna Adira Finance",
    "Gadai BPKB Mobil",
    "Gadai BPKB Motor",
    "Pembiayaan Multiguna"
  ]
}
```

#### 2. FinancialProduct Schema (Produk Section)
```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Pinjaman Dana Gadai BPKB Mobil - Adira Finance",
  "provider": {
    "@type": "Organization",
    "name": "Adira Dinamika Multi Finance",
    "url": "https://www.adira.co.id"
  },
  "description": "Pinjaman dana tunai dengan jaminan BPKB mobil melalui Adira Finance. Plafon hingga Rp 400 juta, tenor 12-48 bulan.",
  "category": "Kredit Multiguna",
  "amount": {
    "@type": "MonetaryAmount",
    "currency": "IDR",
    "minValue": 5000000,
    "maxValue": 400000000
  }
}
```

#### 3. LocalBusiness Schema (Per Cabang)
```json
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "[Nama Cabang]",
  "image": "[URL gambar cabang]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[alamat]",
    "addressLocality": "[kota]",
    "addressRegion": "[provinsi]",
    "postalCode": "[kode pos]",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[lat]",
    "longitude": "[lng]"
  },
  "telephone": "[telp1]",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Adira Dinamika Multi Finance",
    "url": "https://www.adira.co.id"
  }
}
```

#### 4. FAQPage Schema (FAQ Section)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apa itu pinjaman gadai BPKB Adira Finance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pinjaman gadai BPKB Adira Finance adalah..."
      }
    }
  ]
}
```

#### 5. BreadcrumbList Schema (Semua halaman)
Untuk navigasi di SERP: Beranda > Cabang > [Nama Cabang]

---

### B. Entity Association Strategy (Menguatkan Entitas "Adira Finance")

**Prinsip**: Meskipun domain tidak mengandung "adira", Google Knowledge Graph
bisa memahami hubungan entitas melalui:

#### 1. Co-occurrence & Entity Salience
Setiap halaman harus menyebut "Adira Finance" secara natural dan kontekstual:
- **H1 Homepage**: "Pinjaman Dana Gadai BPKB Mobil & Motor — Adira Finance"
- **H2 sections** mengandung "Adira Finance" minimal 3-4 kali di seluruh halaman
- Bukan keyword stuffing — gunakan variasi natural:
  - "Adira Finance" (nama resmi)
  - "Adira Dinamika Multi Finance" (nama lengkap PT)
  - "Adira" (singkatan natural)
  - "pembiayaan Adira" (kontekstual)

#### 2. Entity-Attribute-Value (EAV) Coverage — Koray's Framework
Setiap section harus cover EAV triplets tentang Adira Finance:

| Entity | Attribute | Value |
|--------|-----------|-------|
| Adira Finance | jenis perusahaan | perusahaan pembiayaan (multifinance) |
| Adira Finance | induk perusahaan | Bank Danamon, MUFG Group |
| Adira Finance | didirikan | 1990 |
| Adira Finance | kode saham | ADMF (BEI) |
| Adira Finance | produk utama | kredit multiguna, pembiayaan kendaraan |
| Adira Finance | jumlah cabang | 400+ cabang seluruh Indonesia |
| Adira Finance | pengawas | OJK (Otoritas Jasa Keuangan) |
| Gadai BPKB Mobil | plafon pinjaman | Rp 5 juta - Rp 400 juta |
| Gadai BPKB Mobil | tenor | 12 - 48 bulan |
| Gadai BPKB Motor | plafon pinjaman | Rp 2 juta - Rp 50 juta |
| Gadai BPKB Motor | tenor | 6 - 36 bulan |
| bpkbmultifinance.com | hubungan | agen resmi Adira Finance |

#### 3. Explicit Entity Linking di Konten
- Teks di homepage: "bpkbmultifinance.com adalah **agen resmi Adira Finance** (PT Adira Dinamika Multi Finance Tbk), perusahaan pembiayaan yang terdaftar dan diawasi oleh **OJK** serta merupakan anak perusahaan **Bank Danamon** yang tergabung dalam **MUFG Group**, grup finansial terbesar di Jepang."
- Ini menciptakan entity chain: bpkbmultifinance → Adira Finance → Bank Danamon → MUFG Group → OJK
- Google akan memahami entitas ini saling terkait

#### 4. Dedicated "Tentang Adira Finance" Content Block
Di homepage (di atas footer atau di section tersendiri):
- Paragraf 200-300 kata tentang Adira Finance sebagai perusahaan
- Sejarah singkat, regulasi OJK, jumlah cabang
- Memperkuat topical relevance halaman terhadap query "adira finance"

---

### C. Semantic SEO — Koray's Framework Implementation

#### 1. Topical Map (Hub & Spoke Architecture)
```
HUB: Homepage (bpkbmultifinance.com)
  └── Topik: Pinjaman Dana Gadai BPKB Adira Finance
      ├── SPOKE: /cabang (Daftar Cabang Adira Finance)
      │   └── SPOKE: /cabang/[slug] (Detail per cabang)
      ├── SPOKE: /#produk (Produk BPKB Mobil & Motor)
      ├── SPOKE: /#simulasi (Simulasi Pinjaman)
      ├── SPOKE: /#syarat (Syarat & Dokumen)
      └── SPOKE: /#faq (FAQ)
```

#### 2. Question H2 Format + 40-Word Extractive Answers
Setiap H2 di FAQ dan section lain menggunakan format pertanyaan:
```
H2: "Berapa plafon pinjaman gadai BPKB mobil di Adira Finance?"
Answer (≤40 kata): "Plafon pinjaman gadai BPKB mobil di Adira Finance
berkisar antara Rp 5 juta hingga Rp 400 juta, tergantung nilai kendaraan,
tahun produksi, dan kondisi mobil. Pencairan dana membutuhkan waktu 1-2
hari kerja setelah proses survei."
```

#### 3. Internal Linking Strategy
- Setiap halaman cabang link ke homepage dengan anchor text deskriptif:
  "pinjaman gadai BPKB Adira Finance"
- Homepage link ke halaman cabang: "Cabang Adira Finance di [Kota]"
- Breadcrumb sebagai structural internal link
- Anchor text TIDAK generic ("klik di sini") — selalu mengandung entitas

---

### D. Homepage Metadata (Optimized)

```ts
export const metadata: Metadata = {
  title: "Pinjaman Dana Cepat Gadai BPKB Mobil & Motor | Adira Finance",
  description: "Ajukan pinjaman dana tunai dengan jaminan gadai BPKB mobil atau motor di Adira Finance. Proses cepat 1-2 hari kerja, bunga kompetitif, tenor hingga 48 bulan. Agen resmi Adira Finance.",
  keywords: "gadai bpkb, pinjaman bpkb, gadai bpkb mobil, gadai bpkb motor, adira finance, kredit multiguna adira, pinjaman dana cepat, jaminan bpkb",
  openGraph: {
    title: "Pinjaman Dana Gadai BPKB Mobil & Motor - Adira Finance",
    description: "Butuh dana cepat? Gadaikan BPKB mobil atau motor Anda di Adira Finance. Agen resmi, proses mudah, dana cair 1-2 hari kerja.",
    url: "https://bpkbmultifinance.com",
    siteName: "BPKB Multi Finance - Agen Resmi Adira Finance",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://bpkbmultifinance.com"
  },
  robots: {
    index: true,
    follow: true
  }
};
```

### E. Per-Cabang Dynamic Metadata
```ts
// app/cabang/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const branch = await getBranchBySlug(params.slug);
  return {
    title: `Gadai BPKB Mobil & Motor di ${branch.name} | Adira Finance`,
    description: `${branch.description}. Alamat: ${branch.address}, ${branch.region.district.district}, ${branch.region.province.province}. Hubungi ${branch.telp1}.`,
    openGraph: {
      title: `Pinjaman Gadai BPKB - ${branch.name}`,
      description: branch.description,
      images: [{ url: `https://backend.adiracabang.id/uploads/${branch.image}` }]
    },
    alternates: {
      canonical: `https://bpkbmultifinance.com/cabang/${branch.slug}`
    }
  };
}
```

---

### F. Google March 2026 Core Update Compliance

Update ini (rollout 27 Mar - 8 Apr 2026) memperkuat:

| Signal | Implementasi di bpkbmultifinance.com |
|--------|--------------------------------------|
| **E-E-A-T** | Tunjukkan pengalaman nyata: testimoni real, foto cabang real, nomor telepon aktif |
| **First-hand Experience** | Konten ditulis dari perspektif agen yang benar-benar memproses pinjaman |
| **Entity Understanding** | Schema markup Organization + sameAs ke adira.co.id + Wikipedia |
| **Content-Schema Alignment** | Schema harus match dengan konten visible di halaman |
| **Anti AI-Spam** | Konten harus spesifik, bukan generic — sebut angka, lokasi, proses real |
| **Helpful Content** | Setiap section menjawab pertanyaan spesifik pengguna |
| **Structured Data for AI Overviews** | FAQPage + FinancialProduct schema agar muncul di AI Overview |

---

### G. Technical SEO

#### Metadata per Halaman
| Halaman | Title | H1 |
|---------|-------|-----|
| Homepage | Pinjaman Dana Cepat Gadai BPKB Mobil & Motor \| Adira Finance | Pinjaman Dana Gadai BPKB Mobil & Motor — Adira Finance |
| /cabang | Daftar Cabang Adira Finance Seluruh Indonesia | Cabang Adira Finance di Seluruh Indonesia |
| /cabang/[slug] | Gadai BPKB di [Nama Cabang] \| Adira Finance | Pinjaman Gadai BPKB di [Nama Cabang] |

#### robots.txt & Sitemap
- `robots.txt` — allow semua, point ke sitemap
- `sitemap.xml` — generate dynamic (semua halaman + semua cabang)
- Implementasi via Next.js `app/sitemap.ts` dan `app/robots.ts`

#### Performance (Core Web Vitals)
- Semua gambar: `next/image` (WebP, lazy load, responsive sizes)
- Font: `next/font/google` (Inter) — zero layout shift
- Minimal client JS: hanya SimulasiSection, BranchSearch, Navbar mobile
- Sisanya Server Components

---

### H. Konten Homepage: Urutan Section dengan SEO Intent

| # | Section | SEO Purpose |
|---|---------|-------------|
| 1 | Navbar | Brand identity + navigasi |
| 2 | Hero | H1 + primary keyword + entity "Adira Finance" |
| 3 | Keunggulan | EAV coverage: atribut produk Adira |
| 4 | Produk | FinancialProduct schema + keyword targeting |
| 5 | Simulasi | Interactive content = engagement signal |
| 6 | Syarat | Menjawab informational query |
| 7 | Proses | Step-by-step = HowTo potential |
| 8 | FAQ | FAQPage schema + long-tail keyword targeting |
| 9 | Testimoni | E-E-A-T: social proof + experience |
| 10 | Tentang Adira | **Entity strengthening**: full EAV about Adira Finance |
| 11 | Cabang Preview | Internal linking ke spoke pages |
| 12 | CTA | Conversion |
| 13 | Footer | Entity info + trust signals + disclaimer |

---

## Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1 > h2 > h3)
- ARIA labels pada interactive elements
- Focus states pada semua interactive elements
- Contrast ratio memenuhi WCAG AA

---

## Responsive Breakpoints
- **Mobile** (< 640px): Single column, stacked layout, hamburger menu
- **Tablet** (640px - 1024px): 2-column grids
- **Desktop** (> 1024px): Full layout, 3-4 column grids, horizontal stepper

---

## External Dependencies (Tambahan)
- **lucide-react** - Icon library (lightweight, tree-shakeable)
- Tidak perlu library animasi berat - cukup CSS transitions + Tailwind

---

## Urutan Implementasi

### Phase 1: Foundation
1. Setup `globals.css` (color palette, custom properties)
2. Setup `lib/constants.ts` (data kontak, FAQ, testimoni)
3. Setup `lib/schema.ts` (JSON-LD schema generators)
4. Setup `layout.tsx` (metadata, font, Organization JSON-LD)

### Phase 2: Core Sections
5. `Navbar.tsx` - Header + mobile menu
6. `HeroSection.tsx` - Hero banner (H1 dengan entity "Adira Finance")
7. `KeunggulanSection.tsx` - Trust signals + EAV attributes
8. `ProdukSection.tsx` - Produk cards + FinancialProduct schema

### Phase 3: Interactive & Info
9. `SimulasiSection.tsx` - Calculator (client component)
10. `SyaratSection.tsx` - Requirements
11. `ProsesSection.tsx` - Steps timeline

### Phase 4: Social Proof & Entity Strengthening
12. `FAQSection.tsx` - Accordion + FAQPage schema (Question H2 + 40-word answers)
13. `TestimoniSection.tsx` - Testimonials (E-E-A-T signals)
14. `TentangAdiraSection.tsx` - Entity strengthening: profil lengkap Adira Finance
15. `CTASection.tsx` - Final CTA
16. `Footer.tsx` - Footer + entity disclaimer

### Phase 5: Halaman Cabang
17. `lib/types.ts` - TypeScript interfaces (Branch, API response)
18. `lib/api.ts` - API fetch functions (`getBranches`, `getBranchBySlug`)
19. `BranchCard.tsx` - Reusable card component
20. `BranchSearch.tsx` - Search & filter (client component)
21. `cabang/page.tsx` - Halaman daftar cabang
22. `cabang/[slug]/page.tsx` - Detail cabang + `generateMetadata()` + LocalBusiness schema
23. `BranchNavigation.tsx` - Navigasi prev/next
24. `CabangPreviewSection.tsx` - Preview cabang di homepage

### Phase 6: SEO & Assembly
25. `app/sitemap.ts` - Dynamic sitemap (homepage + semua cabang)
26. `app/robots.ts` - robots.txt
27. Assemble semua sections di `page.tsx`
28. Fine-tune responsive design + test viewport
29. Lighthouse audit (Performance + SEO score)

---

## Catatan Penting
- Nomor WhatsApp & telepon perlu dikonfirmasi oleh pemilik website
- Untuk sementara gunakan placeholder: `6285122682981`
- Semua angka pinjaman & bunga bersifat estimasi marketing, bukan angka pasti
- Disclaimer harus jelas bahwa ini adalah website agen, bukan website resmi Adira
