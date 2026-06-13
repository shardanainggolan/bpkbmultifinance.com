import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calculator, Info } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SimulasiKalkulator from "./SimulasiKalkulator";
import { SITE_URL } from "../lib/constants";
import { breadcrumbSchema, faqSchema } from "../lib/schema";

export const metadata: Metadata = {
  title: "Kalkulator Simulasi Pinjaman Gadai BPKB Adira Finance",
  description:
    "Hitung sendiri estimasi cicilan pinjaman gadai BPKB mobil atau motor di Adira Finance. Pilih merek, model, tahun, area, dan nominal pencairan — hasil simulasi langsung tampil.",
  alternates: { canonical: `${SITE_URL}/simulasi` },
  openGraph: {
    title: "Kalkulator Simulasi Pinjaman Gadai BPKB Adira Finance",
    description:
      "Simulasikan cicilan gadai BPKB mobil atau motor secara interaktif. Pilih kendaraan, area, dan jumlah pinjaman.",
    url: `${SITE_URL}/simulasi`,
  },
};

const FAQ_SIMULASI = [
  {
    q: "Apakah hasil simulasi ini akurat?",
    a: "Hasil simulasi bersifat estimasi berdasarkan data referensi Adira Finance. Nilai cicilan, bunga, dan plafon aktual ditentukan setelah proses survei kendaraan dan verifikasi dokumen oleh tim Adira Finance.",
  },
  {
    q: "Kenapa tahun kendaraan saya tidak muncul?",
    a: "Data tahun kendaraan bergantung pada kombinasi model dan area yang dipilih. Beberapa model atau area mungkin memiliki keterbatasan data. Silakan hubungi kami via WhatsApp untuk simulasi manual.",
  },
  {
    q: "Apa perbedaan tipe angsuran Flat dan Anuitas?",
    a: "Flat (ADDB): pokok pinjaman dan bunga dihitung dari nilai awal pinjaman, sehingga angsuran setiap bulan tetap sama. Anuitas (ADDM): bunga dihitung dari sisa pokok, sehingga angsuran bunga semakin mengecil setiap bulan.",
  },
  {
    q: "Apa perbedaan asuransi TLO dan All Risk?",
    a: "TLO (Total Loss Only) menanggung kerugian total ketika kendaraan hilang atau rusak lebih dari 75% nilainya — premi lebih rendah. All Risk/Comprehensive menanggung semua jenis kerusakan termasuk baret, penyok, dan kecelakaan ringan — premi lebih tinggi.",
  },
];

export default function SimulasiPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Simulasi Pinjaman Gadai BPKB", url: `${SITE_URL}/simulasi` },
  ]);
  const faq = faqSchema(FAQ_SIMULASI);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="bg-secondary py-14 lg:py-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              <ChevronRight size={14} />
              <span className="text-white">Simulasi Pinjaman</span>
            </nav>

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
                <Calculator size={16} className="text-primary" />
                <span className="text-primary text-sm font-semibold">Kalkulator Simulasi Resmi</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
                Simulasi Pinjaman{" "}
                <span className="text-primary">Gadai BPKB</span>{" "}
                Adira Finance
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Hitung estimasi cicilan bulanan secara interaktif. Pilih kendaraan,
                area, dan jumlah pencairan — hasil simulasi langsung tampil.
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
              <div className="hidden lg:block space-y-5 sticky top-28">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Info size={17} className="text-secondary" />
                    <h2 className="font-bold text-secondary text-sm">Cara Menggunakan</h2>
                  </div>
                  <ol className="space-y-3 text-sm text-muted">
                    {[
                      "Pilih jenis kendaraan (Mobil Penumpang, Niaga, atau Motor)",
                      "Pilih area domisili kendaraan",
                      "Pilih merek dan model kendaraan",
                      "Pilih tahun kendaraan",
                      "Untuk mobil: pilih tipe angsuran dan asuransi",
                      "Masukkan nominal pinjaman yang diinginkan",
                      "Klik tombol Hitung Simulasi",
                    ].map((step, i) => (
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
                  <h3 className="font-bold text-secondary text-sm mb-3">Plafon Pinjaman</h3>
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
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="bg-white py-14 lg:py-18">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
              Pertanyaan Seputar Simulasi
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

            {/* Mobile info note */}
            <div className="lg:hidden mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-800 leading-relaxed">
              <strong>Catatan:</strong> Hasil simulasi adalah estimasi dan bukan penawaran resmi.
              Nilai aktual ditentukan setelah survei kendaraan dan verifikasi dokumen oleh tim Adira Finance.
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
