import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  ChevronRight,
  Bike,
  Shield,
  Clock,
  Wallet,
  FileText,
  Search,
  BadgeCheck,
  MessageCircle,
  Car,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AxiFaqAccordion from "../components/agen-axi/AxiFaqAccordion";
import { WA_NUMBER, SITE_URL } from "../lib/constants";
import { breadcrumbSchema, faqSchema, financialProductMotorSchema } from "../lib/schema";

const WA_MSG = encodeURIComponent(
  "Halo, saya ingin mengajukan pinjaman gadai BPKB Motor di Adira Finance."
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const FAQ_MOTOR = [
  {
    q: "Berapa plafon pinjaman gadai BPKB motor Adira Finance?",
    a: "Plafon berkisar antara Rp 3 juta hingga Rp 50 juta. Angka pastinya ditentukan berdasarkan hasil appraisal kondisi kendaraan oleh tim Adira Finance — semakin baru dan terawat motornya, semakin besar nilai pinjaman yang bisa diperoleh.",
  },
  {
    q: "Motor berapa tahun yang bisa dijadikan jaminan BPKB?",
    a: "Motor yang bisa dijadikan jaminan adalah yang usianya tidak melebihi 10 tahun sampai dengan akhir tenor cicilan. Contoh: jika Anda mengambil tenor 36 bulan (3 tahun), motor harus berusia maksimal 7 tahun saat pengajuan.",
  },
  {
    q: "Apakah motor masih bisa dipakai setelah BPKB digadaikan?",
    a: "Ya, motor tetap bisa digunakan sehari-hari seperti biasa. Yang dijadikan jaminan hanya dokumen BPKB-nya, bukan kendaraannya. Motor tidak perlu dititipkan ke Adira Finance selama masa pinjaman berlangsung.",
  },
  {
    q: "Berapa tenor atau jangka waktu cicilan yang tersedia?",
    a: "Tenor cicilan tersedia dari 12 bulan hingga 36 bulan. Pilih sesuai kemampuan membayar — tenor lebih panjang berarti cicilan bulanan lebih ringan, tetapi total bunga yang dibayarkan selama periode pinjaman menjadi lebih besar.",
  },
  {
    q: "Berapa lama proses pencairan dana?",
    a: "Proses dari pengajuan dokumen hingga dana masuk ke rekening biasanya berlangsung 1–3 hari kerja, dihitung setelah survei kendaraan selesai dan dokumen dinyatakan lengkap oleh tim Adira Finance.",
  },
  {
    q: "Apa saja dokumen yang dibutuhkan?",
    a: "Dokumen yang diperlukan: KTP pemohon (beserta KTP pasangan jika sudah menikah), Kartu Keluarga, BPKB asli motor, STNK yang masih berlaku, dan bukti penghasilan berupa slip gaji 3 bulan terakhir atau Surat Keterangan Usaha.",
  },
  {
    q: "Apakah gadai BPKB motor di Adira Finance aman?",
    a: "Adira Finance (PT Adira Dinamika Multi Finance Tbk) adalah perusahaan publik yang terdaftar di Bursa Efek Indonesia dengan kode saham ADMF, dan sepenuhnya diawasi oleh OJK. BPKB Anda disimpan langsung di kantor cabang Adira Finance — bukan di tangan pihak perantara mana pun.",
  },
  {
    q: "Apakah bisa mengajukan jika motor atas nama orang lain?",
    a: "Umumnya motor bisa atas nama sendiri, pasangan, atau orang tua dengan dokumen pendukung yang sesuai. Untuk situasi kepemilikan yang spesifik, sebaiknya konsultasikan terlebih dahulu agar proses pengajuan bisa berjalan lancar.",
  },
];

export const metadata: Metadata = {
  title: "Gadai BPKB Motor Adira Finance — Plafon Rp 50 Juta, Proses 1–3 Hari",
  description:
    "Gadai BPKB motor di Adira Finance: plafon Rp 3–50 juta, tenor 12–36 bulan, motor tetap bisa digunakan sehari-hari. Bunga tetap mulai 1,66%/bulan, proses 1–3 hari kerja. Resmi diawasi OJK.",
  alternates: { canonical: `${SITE_URL}/gadai-bpkb-motor` },
  openGraph: {
    title: "Gadai BPKB Motor Adira Finance — Plafon Rp 50 Juta, Proses 1–3 Hari",
    description:
      "Gadai BPKB motor Adira Finance: plafon Rp 3–50 juta, motor tetap digunakan, proses 1–3 hari kerja. Diawasi OJK.",
    url: `${SITE_URL}/gadai-bpkb-motor`,
  },
};

export default function GadaiBpkbMotorPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Gadai BPKB Motor Adira Finance", url: `${SITE_URL}/gadai-bpkb-motor` },
  ]);
  const faq = faqSchema(FAQ_MOTOR);
  const product = financialProductMotorSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="bg-secondary py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              <ChevronRight size={14} />
              <span className="text-white">Gadai BPKB Motor</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
                  <Bike size={16} className="text-primary" />
                  <span className="text-primary text-sm font-semibold">
                    Kredit Multiguna Jaminan BPKB Motor
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                  Gadai BPKB Motor{" "}
                  <span className="text-primary">Adira Finance</span>{" "}
                  <br className="hidden sm:block" />
                  Dana Cair, Motor Tetap di Tangan Anda
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                  Pinjam dana tunai dengan jaminan BPKB motor. Motor tidak perlu dititipkan
                  — kendaraan tetap bisa digunakan sehari-hari selama masa pinjaman.
                  Proses cepat <strong className="text-white">1–3 hari kerja</strong>,
                  diawasi langsung oleh OJK.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-secondary font-bold px-8 py-4 rounded-full text-base transition-colors shadow-lg"
                  >
                    {WA_SVG}
                    Ajukan Sekarang via WhatsApp
                  </a>
                  <a
                    href="#spesifikasi"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-full text-base transition-colors"
                  >
                    Lihat Spesifikasi Lengkap
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                  {["Diawasi OJK", "Motor tidak dititipkan", "Bunga tetap (flat)", "Proses 1–3 hari"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-green-400" />{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick spec card */}
              <div className="lg:col-span-2 hidden lg:block">
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-secondary font-bold text-xl mb-6">Ringkasan Produk</h2>
                  <div className="space-y-0">
                    {[
                      { label: "Plafon", value: "Rp 3 juta – Rp 50 juta" },
                      { label: "Tenor", value: "12 – 36 bulan" },
                      { label: "Bunga", value: "Mulai 1,66%/bulan (flat)" },
                      { label: "Usia motor", value: "Maks. 10 thn s/d akhir tenor" },
                      { label: "Pencairan", value: "1–3 hari kerja" },
                      { label: "Status motor", value: "Tetap dapat digunakan" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between gap-4 py-3.5 border-b border-gray-50 last:border-0">
                        <span className="text-muted text-sm">{item.label}</span>
                        <span className="text-secondary text-sm font-bold text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full mt-6 bg-secondary hover:bg-secondary-dark text-white font-bold py-4 rounded-2xl transition-colors"
                  >
                    Konsultasi Gratis via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── APA ITU GADAI BPKB MOTOR ────────────────────────────── */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
              Apa Itu Gadai BPKB Motor?
            </h2>
            <div className="space-y-5 text-muted leading-relaxed text-base">
              <p>
                Gadai BPKB motor adalah fasilitas pinjaman dana tunai dari{" "}
                <strong className="text-secondary">Adira Finance</strong> yang menggunakan
                BPKB (Bukti Pemilikan Kendaraan Bermotor) motor sebagai jaminan. Dana pinjaman
                langsung ditransfer ke rekening pemohon — bukan dalam bentuk voucher atau barang,
                tapi uang tunai yang bebas digunakan untuk kebutuhan apapun: modal usaha, biaya
                pendidikan, renovasi, atau kebutuhan mendesak lainnya.
              </p>
              <p>
                Yang membedakan produk ini dari gadai konvensional:{" "}
                <strong className="text-secondary">motor tidak perlu dititipkan</strong>. Hanya
                dokumen BPKB-nya saja yang disimpan di kantor Adira Finance selama masa pinjaman.
                Motor tetap di garasi Anda dan bisa digunakan sehari-hari seperti biasa.
              </p>
              <p>
                Secara resmi, produk ini bernama{" "}
                <strong className="text-secondary">Kredit Multiguna Jaminan BPKB Motor</strong>{" "}
                dari PT Adira Dinamika Multi Finance Tbk. Terdaftar dan diawasi penuh oleh
                Otoritas Jasa Keuangan (OJK), sehingga seluruh prosesnya — termasuk penyimpanan
                dokumen BPKB — dilakukan sesuai regulasi yang berlaku di Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* ── SPESIFIKASI PRODUK ───────────────────────────────────── */}
        <section id="spesifikasi" className="bg-muted-light py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
              Spesifikasi Produk
            </h2>
            <p className="text-muted mb-10">
              Detail ketentuan Kredit Multiguna Jaminan BPKB Motor Adira Finance.
            </p>

            <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="text-left px-6 py-4 font-bold rounded-tl-3xl w-2/5">Ketentuan</th>
                    <th className="text-left px-6 py-4 font-bold rounded-tr-3xl">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Jenis Produk", value: "Kredit Multiguna Jaminan BPKB Motor" },
                    { label: "Penyelenggara", value: "PT Adira Dinamika Multi Finance Tbk (IDX: ADMF)" },
                    { label: "Plafon Minimum", value: "Rp 3.000.000" },
                    { label: "Plafon Maksimum", value: "Rp 50.000.000" },
                    { label: "Tenor", value: "12 – 36 bulan" },
                    { label: "Suku Bunga", value: "Mulai 1,66% per bulan (flat)" },
                    { label: "Usia Kendaraan", value: "Maksimal 10 tahun s/d akhir tenor" },
                    { label: "Status Kendaraan", value: "Harus sudah lunas (bukan kredit aktif)" },
                    { label: "Penggunaan Kendaraan", value: "Tetap dapat digunakan pemohon" },
                    { label: "Proses Pencairan", value: "1–3 hari kerja" },
                    { label: "Pengawas", value: "Otoritas Jasa Keuangan (OJK)" },
                  ].map((row, i) => (
                    <tr key={row.label} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="px-6 py-4 text-muted">{row.label}</td>
                      <td className="px-6 py-4 text-secondary font-semibold">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted mt-4">
              * Plafon aktual ditentukan berdasarkan hasil appraisal kendaraan oleh tim Adira Finance.
              Bunga dan ketentuan dapat berubah sesuai kebijakan yang berlaku.
            </p>
          </div>
        </section>

        {/* ── KEUNGGULAN ───────────────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4 text-center">
              Keunggulan Gadai BPKB Motor di Adira Finance
            </h2>
            <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
              Bukan sekadar soal bunga rendah — ini yang membuat produk ini jadi pilihan
              jutaan orang Indonesia.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Bike,
                  title: "Motor Tidak Dititipkan",
                  desc: "Kendaraan tetap di tangan Anda. Hanya dokumen BPKB yang dijadikan jaminan — motor bisa digunakan sehari-hari seperti biasa.",
                },
                {
                  icon: Clock,
                  title: "Proses 1–3 Hari Kerja",
                  desc: "Dari pengajuan dokumen hingga dana masuk ke rekening. Jauh lebih cepat dibanding pinjaman bank yang bisa memakan waktu berminggu-minggu.",
                },
                {
                  icon: Wallet,
                  title: "Bunga Tetap (Flat)",
                  desc: "Jumlah cicilan sama setiap bulannya dari awal hingga akhir tenor. Tidak ada kenaikan cicilan yang mengejutkan di tengah jalan.",
                },
                {
                  icon: Shield,
                  title: "BPKB Aman Tersimpan",
                  desc: "Dokumen BPKB disimpan langsung di kantor cabang Adira Finance yang terdaftar dan diawasi OJK. Bukan di tangan pihak ketiga.",
                },
                {
                  icon: FileText,
                  title: "Dokumen Tidak Banyak",
                  desc: "Cukup KTP, KK, BPKB, STNK, dan bukti penghasilan. Dokumen awal bisa dikirimkan via foto WhatsApp untuk pengecekan awal.",
                },
                {
                  icon: BadgeCheck,
                  title: "Lembaga Resmi OJK",
                  desc: "Adira Finance (IDX: ADMF) adalah perusahaan publik yang terdaftar di BEI sejak 2004 dan diawasi penuh oleh Otoritas Jasa Keuangan.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
                    <item.icon size={22} className="text-secondary" />
                  </div>
                  <h3 className="font-bold text-secondary text-lg mb-3">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SYARAT & DOKUMEN ─────────────────────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-10 text-center">
              Syarat & Dokumen Pengajuan
            </h2>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="font-bold text-secondary text-xl mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-primary" />
                  Dokumen yang Diperlukan
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "KTP pemohon (dan KTP pasangan jika sudah menikah)",
                    "Kartu Keluarga (KK)",
                    "BPKB asli motor",
                    "STNK yang masih berlaku",
                    "Slip gaji 3 bulan terakhir atau Surat Keterangan Usaha",
                  ].map((doc) => (
                    <li key={doc} className="flex items-start gap-3 text-sm text-secondary">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
                <p className="text-muted text-xs mt-5 pt-4 border-t border-gray-50">
                  Dokumen awal bisa dikirimkan via foto WhatsApp untuk pengecekan sebelum survei.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="font-bold text-secondary text-xl mb-6 flex items-center gap-2">
                  <BadgeCheck size={20} className="text-primary" />
                  Syarat Pemohon
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "WNI berusia 21 – 55 tahun",
                    "Memiliki penghasilan tetap atau usaha yang berjalan",
                    "Motor atas nama sendiri, pasangan, atau orang tua",
                    "BPKB asli (bukan duplikat atau salinan)",
                    "Motor tidak sedang dalam status kredit aktif",
                    "Domisili dapat diverifikasi sesuai KTP",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-secondary">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROSES PENGAJUAN ─────────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4 text-center">
              Cara Mengajukan Gadai BPKB Motor
            </h2>
            <p className="text-muted text-center mb-12">
              4 langkah dari konsultasi hingga dana cair ke rekening Anda.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  step: 1,
                  icon: MessageCircle,
                  title: "Hubungi Kami",
                  desc: "Konsultasi gratis via WhatsApp. Ceritakan kebutuhan dan data kendaraan Anda.",
                },
                {
                  step: 2,
                  icon: FileText,
                  title: "Kirim Dokumen",
                  desc: "Foto dokumen persyaratan dikirim via WhatsApp. Tim kami melakukan pengecekan awal.",
                },
                {
                  step: 3,
                  icon: Search,
                  title: "Survei Kendaraan",
                  desc: "Tim Adira Finance melakukan survei kondisi motor di lokasi Anda. Biasanya selesai dalam 1 hari.",
                },
                {
                  step: 4,
                  icon: Wallet,
                  title: "Dana Cair",
                  desc: "Dokumen disetujui, akad kredit ditandatangani, dan dana langsung masuk ke rekening.",
                },
              ].map((item) => (
                <div key={item.step} className="bg-white border-2 border-gray-100 rounded-3xl p-7 hover:border-primary transition-colors">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-secondary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {item.step}
                    </div>
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-secondary text-base mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-dark text-white font-bold px-10 py-5 rounded-full text-lg transition-colors shadow-xl"
              >
                {WA_SVG}
                Mulai Pengajuan via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4 text-center">
              Pertanyaan Seputar Gadai BPKB Motor
            </h2>
            <p className="text-muted text-center mb-10">
              Pertanyaan yang paling sering ditanyakan calon peminjam.
            </p>
            <AxiFaqAccordion items={FAQ_MOTOR} />
          </div>
        </section>

        {/* ── FINAL CTA + RELATED ──────────────────────────────────── */}
        <section className="bg-secondary py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap Mengajukan Pinjaman?
            </h2>
            <p className="text-slate-300 mb-8">
              Konsultasi gratis — tidak ada biaya sebelum pengajuan disetujui.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-secondary font-bold px-10 py-5 rounded-full text-lg transition-colors shadow-2xl mb-12"
            >
              {WA_SVG}
              Ajukan Gadai BPKB Motor Sekarang
            </a>

            <div className="border-t border-white/10 pt-8">
              <p className="text-slate-400 text-sm mb-4">Punya kendaraan mobil? Lihat juga:</p>
              <Link
                href="/gadai-bpkb-mobil"
                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-semibold"
              >
                Gadai BPKB Mobil Adira Finance — Plafon hingga Rp 400 Juta
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
