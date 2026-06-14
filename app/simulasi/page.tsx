import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calculator, Info, Car, Bike, MessageCircle, ShieldCheck, Percent, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SimulasiKalkulator from "./SimulasiKalkulator";
import { SITE_URL, WA_NUMBER } from "../lib/constants";
import { breadcrumbSchema, faqSchema } from "../lib/schema";

export const metadata: Metadata = {
  title: "Simulasi Adira Finance | Kalkulator Cicilan Gadai BPKB Mobil & Motor",
  description:
    "Simulasi Adira gadai BPKB mobil dan motor — hitung estimasi cicilan, tenor, plafon, dan bunga langsung di kalkulator. Pilih merek, model, tahun, area, dan nominal pencairan, hasil simulasi tampil seketika.",
  keywords: [
    "simulasi adira",
    "simulasi adira finance",
    "kalkulator simulasi adira",
    "simulasi kredit adira",
    "simulasi cicilan adira",
    "simulasi gadai bpkb adira",
    "simulasi pinjaman adira mobil",
    "simulasi pinjaman adira motor",
  ],
  alternates: { canonical: `${SITE_URL}/simulasi` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Simulasi Adira Finance — Kalkulator Cicilan Gadai BPKB",
    description:
      "Hitung simulasi Adira gadai BPKB mobil dan motor secara interaktif. Estimasi cicilan, tenor, dan plafon langsung tampil di layar.",
    url: `${SITE_URL}/simulasi`,
    type: "website",
    locale: "id_ID",
    siteName: "BPKB Multi Finance - Agen Resmi Adira Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulasi Adira Finance — Kalkulator Cicilan Gadai BPKB",
    description:
      "Hitung simulasi Adira gadai BPKB mobil dan motor — estimasi cicilan, tenor, dan plafon tampil seketika.",
  },
};

const FAQ_SIMULASI = [
  {
    q: "Apa itu Simulasi Adira Finance?",
    a: "Simulasi Adira Finance adalah kalkulator pra-pengajuan yang menghitung estimasi cicilan bulanan, tenor, dan plafon pinjaman gadai BPKB berdasarkan data referensi internal Adira Finance. Hasil simulasi membantu Anda merencanakan keuangan sebelum mengajukan pinjaman, tetapi bukan merupakan penawaran resmi.",
  },
  {
    q: "Apakah hasil simulasi Adira di halaman ini akurat?",
    a: "Hasil simulasi bersifat estimasi yang dihitung dari data referensi Adira Finance. Nilai cicilan, bunga, dan plafon aktual ditentukan setelah proses survei kendaraan dan verifikasi dokumen oleh tim Adira Finance. Selisih dapat terjadi tergantung kondisi kendaraan dan profil pemohon.",
  },
  {
    q: "Apa bedanya simulasi dengan pengajuan pinjaman Adira?",
    a: "Simulasi hanya menghitung estimasi cicilan tanpa pemeriksaan dokumen atau survei. Pengajuan adalah proses resmi yang melibatkan verifikasi KTP, BPKB, STNK, survei kendaraan, hingga akad kredit. Anda bisa simulasi terlebih dahulu, lalu lanjut ke pengajuan jika hasil sesuai harapan.",
  },
  {
    q: "Kenapa tahun kendaraan saya tidak muncul saat simulasi?",
    a: "Data tahun kendaraan bergantung pada kombinasi model dan area yang dipilih. Beberapa model atau area mungkin tidak memiliki data referensi yang lengkap. Jika tahun kendaraan Anda tidak tersedia, silakan hubungi kami via WhatsApp untuk simulasi manual oleh tim agen.",
  },
  {
    q: "Apa perbedaan tipe angsuran ADDB (Flat) dan ADDM (Anuitas)?",
    a: "ADDB (Angsuran Dibayar di Belakang / Flat): pokok pinjaman dan bunga dihitung dari nilai awal pinjaman, sehingga total angsuran setiap bulan tetap sama. ADDM (Angsuran Dibayar di Muka / Anuitas): bunga dihitung dari sisa pokok, dan angsuran pertama dibayarkan saat pencairan.",
  },
  {
    q: "Apa perbedaan asuransi TLO dan All Risk?",
    a: "TLO (Total Loss Only) menanggung kerugian total ketika kendaraan hilang atau rusak lebih dari 75% nilainya — premi lebih rendah. All Risk/Comprehensive menanggung semua jenis kerusakan termasuk baret, penyok, dan kecelakaan ringan — premi lebih tinggi.",
  },
  {
    q: "Apakah simulasi ini gratis dan tanpa pendaftaran?",
    a: "Ya, kalkulator simulasi Adira di halaman ini 100% gratis dan tidak memerlukan pendaftaran. Anda tidak perlu mengisi data pribadi seperti KTP atau nomor HP untuk melihat estimasi cicilan.",
  },
];

const STEP_GUIDE = [
  "Pilih jenis kendaraan (Mobil Penumpang, Mobil Niaga, atau Sepeda Motor)",
  "Pilih area domisili kendaraan",
  "Pilih merek dan model kendaraan",
  "Pilih tahun kendaraan",
  "Untuk mobil: pilih tipe angsuran (ADDB/ADDM) dan tipe asuransi (TLO/All Risk)",
  "Klik tombol Hitung Simulasi — sistem otomatis menampilkan plafon maksimal",
  "Atur nominal pencairan dan klik Hitung Ulang jika ingin nominal berbeda",
];

export default function SimulasiPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Simulasi Adira Finance", url: `${SITE_URL}/simulasi` },
  ]);
  const faq = faqSchema(FAQ_SIMULASI);

  // WebApplication schema — kalkulator interaktif
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_URL}/simulasi#kalkulator`,
    name: "Kalkulator Simulasi Adira Finance",
    alternateName: ["Simulasi Adira", "Simulasi Kredit Adira", "Simulasi Cicilan Adira Finance"],
    url: `${SITE_URL}/simulasi`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "id-ID",
    description:
      "Kalkulator simulasi pinjaman gadai BPKB Adira Finance untuk menghitung estimasi cicilan bulanan, tenor, dan plafon pinjaman mobil dan motor.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
    isAccessibleForFree: true,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  // HowTo schema — cara menggunakan kalkulator simulasi
  const howToSchemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cara Melakukan Simulasi Adira Finance Gadai BPKB",
    description:
      "Langkah-langkah menghitung estimasi cicilan gadai BPKB mobil atau motor menggunakan kalkulator Simulasi Adira Finance.",
    totalTime: "PT2M",
    tool: { "@type": "HowToTool", name: "Kalkulator Simulasi Adira Finance" },
    step: STEP_GUIDE.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Langkah ${i + 1}`,
      text,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchemaData) }} />
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="bg-secondary py-14 lg:py-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              <ChevronRight size={14} />
              <span className="text-white">Simulasi Adira Finance</span>
            </nav>

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
                <Calculator size={16} className="text-primary" />
                <span className="text-primary text-sm font-semibold">Kalkulator Simulasi Resmi</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
                Simulasi <span className="text-primary">Adira Finance</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-200 mt-3">
                  Kalkulator Cicilan Gadai BPKB Mobil & Motor
                </span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Hitung simulasi Adira gadai BPKB mobil atau motor secara interaktif.
                Pilih kendaraan, area, dan jumlah pencairan — estimasi cicilan,
                tenor, dan plafon tampil seketika tanpa perlu mendaftar.
              </p>
            </div>
          </div>
        </section>

        {/* ── Kalkulator ───────────────────────────────────────────── */}
        <section className="bg-muted-light py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 items-start">

              {/* Form */}
              <div className="lg:col-span-2">
                <SimulasiKalkulator />
              </div>

              {/* Sidebar info */}
              <aside className="hidden lg:block space-y-5 sticky top-28">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Info size={17} className="text-secondary" />
                    <h2 className="font-bold text-secondary text-sm">Cara Menggunakan Kalkulator</h2>
                  </div>
                  <ol className="space-y-3 text-sm text-muted">
                    {STEP_GUIDE.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-secondary/5 border border-secondary/10 rounded-3xl p-6">
                  <h2 className="font-bold text-secondary text-sm mb-3">Plafon Pinjaman Adira</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">BPKB Mobil</span>
                      <span className="font-bold text-secondary">Rp 20 jt – 400 jt</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">BPKB Motor</span>
                      <span className="font-bold text-secondary">Rp 3 jt – 50 jt</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">Tenor</span>
                      <span className="font-bold text-secondary">12 – 60 bulan</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">Bunga mulai</span>
                      <span className="font-bold text-secondary">1,66%/bulan</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 text-xs text-amber-800 leading-relaxed">
                  <strong>Catatan:</strong> Hasil simulasi adalah estimasi dan bukan penawaran resmi.
                  Nilai aktual ditentukan setelah survei kendaraan dan verifikasi dokumen oleh tim Adira Finance.
                </div>
              </aside>
            </div>

            {/* Mobile-only versions of sidebar info */}
            <div className="lg:hidden mt-6 space-y-5">
              <div className="bg-secondary/5 border border-secondary/10 rounded-3xl p-6">
                <h2 className="font-bold text-secondary text-sm mb-3">Plafon Pinjaman Adira</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div>
                    <p className="text-muted text-xs">BPKB Mobil</p>
                    <p className="font-bold text-secondary">Rp 20 jt – 400 jt</p>
                  </div>
                  <div>
                    <p className="text-muted text-xs">BPKB Motor</p>
                    <p className="font-bold text-secondary">Rp 3 jt – 50 jt</p>
                  </div>
                  <div>
                    <p className="text-muted text-xs">Tenor</p>
                    <p className="font-bold text-secondary">12 – 60 bulan</p>
                  </div>
                  <div>
                    <p className="text-muted text-xs">Bunga mulai</p>
                    <p className="font-bold text-secondary">1,66%/bulan</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-800 leading-relaxed">
                <strong>Catatan:</strong> Hasil simulasi adalah estimasi dan bukan penawaran resmi.
                Nilai aktual ditentukan setelah survei kendaraan dan verifikasi dokumen oleh tim Adira Finance.
              </div>
            </div>
          </div>
        </section>

        {/* ── Tentang Simulasi Adira (informational) ──────────────── */}
        <section className="bg-white py-14 lg:py-18">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary mb-5">
              Tentang Simulasi Adira Finance
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                <strong className="text-secondary">Simulasi Adira</strong> adalah
                proses perhitungan pra-pengajuan yang memperkirakan besaran
                cicilan bulanan, total bunga, dan plafon pinjaman gadai BPKB
                berdasarkan data referensi internal Adira Finance. Tujuan
                simulasi adalah membantu Anda <em>merencanakan keuangan</em>
                sebelum benar-benar mengajukan pinjaman.
              </p>
              <p>
                Kalkulator di halaman ini terhubung ke sistem perhitungan
                Adira Finance, sehingga hasil simulasi yang ditampilkan
                mencerminkan estimasi resmi berdasarkan kombinasi
                jenis kendaraan, merek, model, tahun, area domisili, dan
                nominal pencairan yang Anda pilih.
              </p>
              <p>
                Perlu dipahami: hasil simulasi <strong>bukan penawaran resmi</strong>
                dan bukan jaminan persetujuan. Plafon, bunga, dan cicilan
                aktual ditentukan setelah survei kondisi kendaraan dan
                verifikasi dokumen oleh tim Adira Finance.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-secondary mt-12 mb-5">
              Komponen yang Dihitung dalam Simulasi Adira
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                {
                  Icon: Percent,
                  title: "Bunga dan Suku Bunga Efektif",
                  desc: "Adira Finance menggunakan bunga tetap (fixed rate). Simulasi menampilkan flat rate per bulan dan effective rate tahunan agar Anda paham total biaya.",
                },
                {
                  Icon: Clock,
                  title: "Tenor Pinjaman",
                  desc: "Pilihan tenor 12, 18, 24, 36, 48, sampai 60 bulan. Tenor lebih panjang berarti cicilan bulanan lebih kecil, namun total bunga lebih besar.",
                },
                {
                  Icon: Calculator,
                  title: "Plafon (Pencairan)",
                  desc: "Nilai dana yang dicairkan ke rekening Anda. Plafon maksimal dihitung dari nilai appraisal kendaraan, umumnya 70–80% nilai pasar.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Asuransi & Biaya Lainnya",
                  desc: "Termasuk premi asuransi TLO atau All Risk, biaya administrasi, dan provisi. Semua ini sudah masuk dalam perhitungan angsuran bulanan di simulasi.",
                },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="bg-muted-light rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-secondary">{title}</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Setelah Simulasi: Pengajuan (transactional) ────────── */}
        <section className="bg-muted-light py-14 lg:py-18">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-secondary mb-3">
                Setelah Simulasi, Lanjutkan ke Pengajuan
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Sudah dapat estimasi cicilan dari Simulasi Adira? Pelajari
                detail produk gadai BPKB atau langsung konsultasi gratis
                dengan agen resmi kami.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Link
                href="/gadai-bpkb-mobil"
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm p-7 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-4">
                  <Car size={22} />
                </div>
                <h3 className="font-bold text-secondary text-lg mb-2">
                  Gadai BPKB Mobil Adira
                </h3>
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  Plafon Rp 20 jt – 400 jt, tenor sampai 60 bulan. Pelajari
                  syarat, dokumen, dan proses pengajuan lengkap.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                  Lihat Produk Mobil
                  <ChevronRight size={14} />
                </span>
              </Link>

              <Link
                href="/gadai-bpkb-motor"
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm p-7 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-4">
                  <Bike size={22} />
                </div>
                <h3 className="font-bold text-secondary text-lg mb-2">
                  Gadai BPKB Motor Adira
                </h3>
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  Plafon Rp 3 jt – 50 jt, tenor sampai 36 bulan. Solusi
                  pinjaman cepat dengan jaminan BPKB motor.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                  Lihat Produk Motor
                  <ChevronRight size={14} />
                </span>
              </Link>
            </div>

            <div className="mt-8 bg-secondary rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Konsultasi Gratis Hasil Simulasi
              </h3>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                Tanyakan detail hasil Simulasi Adira Anda ke agen resmi AXI.
                Tidak ada biaya konsultasi, tidak ada paksaan.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya sudah mencoba simulasi Adira di website. Boleh dibantu untuk pengajuan?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-secondary font-bold px-7 py-4 rounded-full shadow-md transition-colors"
              >
                <MessageCircle size={18} />
                Hubungi via WhatsApp
              </a>
              <p className="text-xs text-slate-400 mt-4">
                Dilayani oleh Sharda — Agen AXI resmi (ID 012625001169) Adira Finance
              </p>
            </div>

            <p className="text-center text-sm text-muted mt-8">
              Lihat juga:{" "}
              <Link href="/tentang-adira-finance" className="text-secondary font-semibold hover:text-primary transition-colors">
                Tentang Adira Finance
              </Link>
              {" · "}
              <Link href="/cabang" className="text-secondary font-semibold hover:text-primary transition-colors">
                Cabang Adira Finance
              </Link>
              {" · "}
              <Link href="/artikel" className="text-secondary font-semibold hover:text-primary transition-colors">
                Artikel Edukasi
              </Link>
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="bg-white py-14 lg:py-18">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
              FAQ Simulasi Adira Finance
            </h2>
            <div className="space-y-4">
              {FAQ_SIMULASI.map((item) => (
                <details key={item.q} className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-secondary text-sm">
                    {item.q}
                    <ChevronRight size={18} className="shrink-0 mt-0.5 text-muted group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
