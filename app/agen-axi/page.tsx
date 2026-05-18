import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  ChevronRight,
  CheckCircle,
  Wallet,
  Award,
  TrendingUp,
  Users,
  Gift,
  Trophy,
  Target,
  Smartphone,
  Search,
  MessageCircle,
  FileText,
  Plane,
  Package,
  Bike,
  Car,
  Truck,
  IdCard,
  CreditCard,
  Phone,
  Mail,
  Network,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AxiFaqAccordion from "../components/agen-axi/AxiFaqAccordion";
import {
  AXI_HOW_IT_WORKS,
  AXI_INCOME_TYPES,
  AXI_MATRIX_LEVELS,
  AXI_FAQ_ITEMS,
  AXI_REGISTRATION_STEPS,
  getWaLinkAxi,
  SITE_URL,
} from "../lib/constants";
import { breadcrumbSchema, faqSchema } from "../lib/schema";

export const metadata: Metadata = {
  title: "Cara Daftar Agen AXI Adira Finance — Penghasilan Tambahan Resmi",
  description:
    "Bergabung jadi Agen AXI Adira Finance: dapatkan insentif penjualan, business trip ke luar negeri, business reward, dan bonus jaringan. Pendaftaran GRATIS, proses 1×24 jam.",
  keywords: [
    "agen axi adira",
    "cara daftar axi adira",
    "agen resmi adira finance",
    "penghasilan tambahan adira",
    "interaxi 2026",
  ],
  openGraph: {
    title: "Cara Daftar Agen AXI Adira Finance — Penghasilan Tambahan Resmi",
    description:
      "Bergabung jadi Agen AXI Adira Finance: insentif harian, business trip luar negeri, pendaftaran GRATIS.",
    url: `${SITE_URL}/agen-axi`,
  },
  alternates: {
    canonical: `${SITE_URL}/agen-axi`,
  },
};

const incomeIcons = [Wallet, Award, TrendingUp, Users, Network, Gift, Trophy];

const stepIcons = [Target, Smartphone, Search, Wallet];

const regIcons = [MessageCircle, FileText, CheckCircle, BadgeCheck, TrendingUp];

const matrixColors: Record<string, string> = {
  Fair: "bg-red-500",
  Good: "bg-orange-500",
  Great: "bg-yellow-400",
  Fantastic: "bg-green-400",
  Excellent: "bg-green-600",
};

const matrixTextColors: Record<string, string> = {
  Fair: "text-red-600",
  Good: "text-orange-600",
  Great: "text-yellow-600",
  Fantastic: "text-green-600",
  Excellent: "text-green-700",
};

export default function AgenAxiPage() {
  const WA_LINK = getWaLinkAxi();

  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Agen AXI Adira Finance", url: `${SITE_URL}/agen-axi` },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Program Agen AXI Adira Finance (InterAXI 2026)",
    provider: {
      "@type": "Organization",
      name: "PT Adira Dinamika Multi Finance Tbk",
      url: "https://www.adira.co.id",
    },
    serviceType: "Agency Recruitment Program",
    areaServed: "Indonesia",
    description:
      "Program keagenan resmi untuk menjadi perpanjangan tangan Adira Finance dalam menjual produk pembiayaan kendaraan dan kredit multiguna.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
      description: "Pendaftaran GRATIS tahun pertama",
    },
  };

  const faq = faqSchema(AXI_FAQ_ITEMS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24">
        {/* ── SECTION 1: HERO ─────────────────────────────────────── */}
        <section className="bg-secondary py-16 lg:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-sm text-slate-400 mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
              <ChevronRight size={14} />
              <span className="text-white">Agen AXI</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-3">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
                  <BadgeCheck size={16} className="text-primary" />
                  <span className="text-primary text-sm font-semibold">
                    Program Resmi Adira Finance — InterAXI 2026
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Jadi{" "}
                  <span className="text-primary">Agen AXI</span>{" "}
                  Adira Finance,{" "}
                  <br className="hidden sm:block" />
                  Raih Penghasilan Tanpa Batas
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                  Bergabung dengan program{" "}
                  <strong className="text-white">InterAXI 2026</strong> — sistem
                  keagenan terintegrasi PT Adira Dinamika Multi Finance Tbk.
                  Pendaftaran{" "}
                  <strong className="text-primary">GRATIS</strong>, dapatkan
                  insentif harian, bulanan, hingga business trip ke luar negeri.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-secondary font-bold px-8 py-4 rounded-full text-base transition-colors shadow-lg"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Daftar Sekarang via WhatsApp
                  </a>
                  <a
                    href="#cara-kerja"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-full text-base transition-colors"
                  >
                    Pelajari Selengkapnya
                    <ChevronRight size={18} />
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-green-400" />
                    Diawasi OJK
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-green-400" />
                    Bagian dari MUFG Group
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-green-400" />
                    ID Agen: 012625001169
                  </span>
                </div>
              </div>

              {/* Hero visual */}
              <div className="lg:col-span-2 flex flex-col items-center gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm">
                  <Link href="/" className="block mb-5">
                    <Image
                      src="/images/logo-agen-axi-adira.png"
                      alt="Agen AXI Adira Finance"
                      width={240}
                      height={70}
                      className="object-contain mx-auto"
                      style={{ height: "3.5rem", width: "auto" }}
                    />
                  </Link>
                  <div className="space-y-3">
                    {[
                      { label: "Insentif Pribadi", value: "Harian", color: "bg-green-100 text-green-700" },
                      { label: "Business Trip", value: "Eropa · Umroh · Asia", color: "bg-blue-100 text-blue-700" },
                      { label: "Pendaftaran", value: "GRATIS", color: "bg-primary/20 text-secondary" },
                      { label: "Proses ID AXI", value: "1×24 Jam", color: "bg-purple-100 text-purple-700" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                      >
                        <span className="text-secondary text-sm font-medium">{item.label}</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.color}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  {[
                    { value: "7", label: "Sumber Penghasilan" },
                    { value: "5", label: "Level Matrix" },
                    { value: "6", label: "Destinasi Business Trip" },
                    { value: "400+", label: "Cabang Nasional" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
                      <p className="text-primary text-2xl font-bold">{s.value}</p>
                      <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: APA ITU AXI ──────────────────────────────── */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                Apa Itu{" "}
                <span className="text-primary bg-secondary rounded-lg px-2">Agen AXI</span>?
              </h2>
              <div className="space-y-4 text-left text-muted text-base leading-relaxed">
                <p>
                  <strong className="text-secondary">AXI (Adira Xtra Income)</strong> adalah sistem
                  keagenan resmi dari PT Adira Dinamika Multi Finance Tbk untuk memperluas jaringan
                  penjualan produk pembiayaan ke seluruh lapisan masyarakat Indonesia.
                </p>
                <p>
                  <strong className="text-secondary">InterAXI</strong> adalah sistem marketing
                  terintegrasi dimana selain melakukan penjualan pribadi, AXI juga dapat merekrut
                  dan membina jaringan Rekan Bisnis (RB 1–10) dan mendapatkan insentif dari
                  penjualan mereka.
                </p>
                <p>
                  Sebagai AXI, Anda menjadi{" "}
                  <strong className="text-secondary">perpanjangan tangan resmi Adira Finance</strong>{" "}
                  untuk menawarkan produk pembiayaan kendaraan dan kredit multiguna kepada calon
                  nasabah — dengan dukungan penuh dari sistem dan tim Adira Finance.
                </p>
              </div>
            </div>

            {/* 3 Pillar Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: BadgeCheck,
                  title: "Status Resmi",
                  desc: "Mendapat ID AXI resmi dari Adira Finance, tercatat dalam sistem nasional.",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: Users,
                  title: "Pekerja Lepas Fleksibel",
                  desc: "Bisa sebagai individu atau badan hukum. Atur jadwal sendiri, kerja dari mana saja.",
                  color: "bg-green-50 text-green-600",
                },
                {
                  icon: Network,
                  title: "Jaringan Tanpa Batas",
                  desc: "Rekrut Rekan Bisnis (RB 1–10) dan dapatkan insentif dari seluruh jaringan Anda.",
                  color: "bg-primary/10 text-secondary",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-5`}>
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-bold text-secondary text-lg mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: SIAPA BISA JADI AXI ─────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                Siapa Saja Bisa Jadi Agen AXI
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Kesempatan terbuka untuk seluruh lapisan masyarakat yang ingin:
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                {
                  emoji: "💰",
                  title: "Kebebasan Financial",
                  desc: "Tambahan penghasilan tanpa batas, dari insentif harian hingga bonus 3 tahunan.",
                },
                {
                  emoji: "⏰",
                  title: "Kebebasan Waktu",
                  desc: "Atur sendiri jam kerja, tidak ada jam kantor. Kerja dari rumah atau di mana saja.",
                },
                {
                  emoji: "📚",
                  title: "Mengembangkan Diri",
                  desc: "AXI Training rutin setiap Selasa & Jumat. Mentor senior siap membimbing Anda.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-7 shadow-sm text-center"
                >
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <h3 className="font-bold text-secondary text-lg mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Target audience */}
            <div className="bg-white rounded-3xl p-8 shadow-sm max-w-3xl mx-auto">
              <h3 className="font-bold text-secondary text-xl mb-6 text-center">
                Cocok untuk Anda yang…
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Ibu rumah tangga yang ingin penghasilan dari rumah",
                  "Karyawan yang mencari side income tambahan",
                  "Pengusaha yang ingin diversifikasi sumber penghasilan",
                  "Mahasiswa yang ingin financial freedom sejak muda",
                  "Punya jaringan atau networking yang luas",
                  "Siapapun yang mau belajar dan berkembang bersama Adira Finance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: CARA KERJA ───────────────────────────────── */}
        <section id="cara-kerja" className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                Cara Kerja Agen AXI — Hanya 4 Langkah
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Proses sederhana dari prospek hingga insentif cair ke rekening Anda.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {AXI_HOW_IT_WORKS.map((item, i) => {
                const Icon = stepIcons[i];
                return (
                  <div key={item.step} className="relative">
                    <div className="bg-white border-2 border-gray-100 rounded-3xl p-7 h-full hover:border-primary hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-2xl bg-secondary text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {item.step}
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-secondary" />
                        </div>
                      </div>
                      <h3 className="font-bold text-secondary text-lg mb-3">{item.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    {/* Connector — desktop only */}
                    {i < AXI_HOW_IT_WORKS.length - 1 && (
                      <div className="hidden lg:flex absolute top-12 -right-4 z-10 w-8 items-center justify-center">
                        <ChevronRight size={20} className="text-primary" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: 7 SUMBER PENGHASILAN ────────────────────── */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                7 Sumber Penghasilan Sebagai Agen AXI
              </h2>
              <p className="text-slate-300 text-lg max-w-xl mx-auto">
                Bukan sekadar komisi sekali — AXI memberikan{" "}
                <strong className="text-primary">multiple income streams</strong>
              </p>
            </div>

            {/* Highlight callout */}
            <div className="bg-primary/10 border border-primary/30 rounded-3xl px-6 py-5 mb-10 max-w-3xl mx-auto text-center">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-primary">Contoh Insentif Pribadi:</strong> Motor &lt; Rp 10jt
                = <span className="text-primary font-bold">Rp 400.000/unit</span>. Mobil tenor 35–36
                bulan = <span className="text-primary font-bold">4,88% × pencairan</span>. Pinjaman
                Rp 100jt → Insentif{" "}
                <span className="text-primary font-bold">Rp 4.880.000/unit!</span>
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {AXI_INCOME_TYPES.map((item, i) => {
                const Icon = incomeIcons[i];
                return (
                  <div
                    key={item.id}
                    className="bg-white/10 border border-white/15 rounded-3xl p-6 hover:bg-white/15 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <span className="text-primary text-xs font-bold bg-primary/20 px-3 py-1 rounded-full">
                        {item.frequency}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-base mb-2">{item.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.source}</p>
                  </div>
                );
              })}

              {/* Padding card to complete grid on large screens */}
              <div className="hidden lg:flex items-center justify-center bg-primary/5 border border-primary/20 rounded-3xl p-6">
                <div className="text-center">
                  <p className="text-primary text-4xl font-bold mb-2">7×</p>
                  <p className="text-slate-300 text-sm">Sumber penghasilan aktif & pasif</p>
                </div>
              </div>
            </div>

            {/* Mid-page CTA */}
            <div className="mt-12 text-center">
              <a
                href={getWaLinkAxi()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-secondary font-bold px-8 py-4 rounded-full text-base transition-colors shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Saya Tertarik — Hubungi Sekarang
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: 3 BENEFIT UTAMA ──────────────────────────── */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                Lebih dari Sekadar Insentif
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                AXI memberikan tiga kategori reward yang terus meningkat seiring pencapaian Anda.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  icon: Wallet,
                  emoji: "💵",
                  title: "INSENTIF",
                  subtitle: "Harian · Bulanan · Tahunan",
                  desc: "Penghasilan dari penjualan pribadi dan jaringan Rekan Bisnis Anda. Dibayar harian, bulanan, hingga 3 tahunan.",
                  bg: "bg-green-50",
                  border: "border-green-200",
                  icon_bg: "bg-green-100 text-green-600",
                },
                {
                  icon: Plane,
                  emoji: "✈️",
                  title: "BUSINESS TRIP",
                  subtitle: "Destinasi 2026",
                  desc: "Eropa Timur (Budapest–Praha), Umroh, Hongkong, Thailand, Kazakhstan, Singapore — semua dibayar Adira Finance!",
                  bg: "bg-blue-50",
                  border: "border-blue-200",
                  icon_bg: "bg-blue-100 text-blue-600",
                },
                {
                  icon: Package,
                  emoji: "🎁",
                  title: "BUSINESS REWARD",
                  subtitle: "Level Fair → Excellent",
                  desc: "Hadiah berupa barang berkualitas. Semakin tinggi level Matrix Anda, semakin besar poin reward yang diraih.",
                  bg: "bg-purple-50",
                  border: "border-purple-200",
                  icon_bg: "bg-purple-100 text-purple-600",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`${item.bg} border ${item.border} rounded-3xl p-8 text-center hover:shadow-md transition-shadow`}
                >
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${item.icon_bg} mb-5`}>
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-bold text-secondary text-2xl mb-1">{item.title}</h3>
                  <p className="text-muted text-xs font-semibold uppercase tracking-wide mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: PRODUK PEMBIAYAAN ────────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                Produk Pembiayaan Adira Finance
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                3 kategori produk yang bisa Anda tawarkan sebagai Agen AXI kepada calon nasabah.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Bike,
                  title: "Motor",
                  subtitle: "Kredit Multiguna Jaminan BPKB Motor",
                  features: [
                    "Usia kendaraan hingga 12 tahun sampai akhir tenor",
                    "Plafon mulai dari Rp 3 juta",
                    "Proses cepat 1–3 hari kerja",
                  ],
                  highlight: "Mulai Rp 3 Juta",
                },
                {
                  icon: Car,
                  title: "Mobil",
                  subtitle: "Kredit Multiguna Jaminan BPKB Mobil",
                  features: [
                    "Usia kendaraan hingga 20 tahun sampai akhir tenor",
                    "Plafon Rp 20 juta – Rp 400 juta",
                    "Insentif terbesar ada di produk ini",
                  ],
                  highlight: "Hingga Rp 400 Juta",
                },
                {
                  icon: Truck,
                  title: "Commercial",
                  subtitle: "Pembiayaan Kendaraan Niaga",
                  features: [
                    "Mobil Pickup: hingga 10 tahun tenor",
                    "Truck (AO/RO): hingga 10 tahun tenor",
                    "Truck nasabah baru: hingga 8 tahun tenor",
                  ],
                  highlight: "Kendaraan Niaga",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
                    <item.icon size={24} className="text-secondary" />
                  </div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-secondary text-xl">{item.title}</h3>
                      <p className="text-muted text-xs mt-0.5">{item.subtitle}</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-secondary text-center px-2 py-1 rounded-lg shrink-0">
                      {item.highlight}
                    </span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center text-muted text-xs mt-6">
              * Plafon dan ketentuan dapat berubah sesuai kebijakan Adira Finance yang berlaku.
            </p>
          </div>
        </section>

        {/* ── SECTION 8: MATRIX AXI ───────────────────────────────── */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                5 Level Matrix AXI
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Semakin tinggi level Anda, semakin besar benefit yang didapat.{" "}
                <strong className="text-secondary">Level dihitung per 3 bulan.</strong>
              </p>
            </div>

            {/* Progress bar visual */}
            <div className="flex rounded-2xl overflow-hidden mb-10 max-w-3xl mx-auto h-10">
              {[
                { label: "Fair", color: "bg-red-500" },
                { label: "Good", color: "bg-orange-500" },
                { label: "Great", color: "bg-yellow-400" },
                { label: "Fantastic", color: "bg-green-400" },
                { label: "Excellent", color: "bg-green-600" },
              ].map((lvl) => (
                <div
                  key={lvl.label}
                  className={`flex-1 ${lvl.color} flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">{lvl.label}</span>
                </div>
              ))}
            </div>

            {/* Responsive table */}
            <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="text-left px-6 py-4 font-bold rounded-tl-3xl">Level</th>
                    <th className="text-left px-6 py-4 font-bold">Plafon per 3 Bulan</th>
                    <th className="text-left px-6 py-4 font-bold">Unit per 3 Bulan</th>
                    <th className="text-left px-6 py-4 font-bold rounded-tr-3xl">Faktor Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {AXI_MATRIX_LEVELS.map((lvl, i) => (
                    <tr
                      key={lvl.level}
                      className={`border-t border-gray-100 ${
                        lvl.highlight ? "bg-primary/5" : i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`font-bold ${matrixTextColors[lvl.level]} ${
                            lvl.highlight ? "text-base" : ""
                          }`}
                        >
                          {lvl.highlight && "⭐ "}
                          {lvl.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-secondary">{lvl.phRange}</td>
                      <td className="px-6 py-4 text-secondary">{lvl.units}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-bold px-3 py-1 rounded-full text-xs ${
                            lvl.level === "Excellent"
                              ? "bg-green-100 text-green-700"
                              : lvl.level === "Fantastic"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {lvl.multiplier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Excellent callout */}
            <div className="bg-green-50 border border-green-200 rounded-3xl px-7 py-5 max-w-3xl mx-auto">
              <p className="text-green-800 text-sm leading-relaxed">
                <strong>Level Excellent dapat:</strong> 15% Insentif Grup + Rp 300rb/bulan Bonus
                Tahunan + 2× Business Reward — dan berkesempatan mendapat Business Trip ke luar negeri!
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 9: SIMULASI PENGHASILAN ─────────────────────── */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Simulasi Penghasilan Bulanan
              </h2>
              <p className="text-slate-300 text-lg max-w-xl mx-auto">
                Ilustrasi konkret berdasarkan data insentif resmi InterAXI 2026.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Scenario 1 */}
              <div className="bg-white rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <TrendingUp size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-lg">AXI Aktif Pemula</h3>
                    <p className="text-muted text-xs">Penjualan pribadi saja</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "5 unit Motor (Rp 10–15jt) × Rp 500.000", value: "Rp 2.500.000" },
                    { label: "1 unit Mobil (Rp 100jt, tenor 35–36 bln)", value: "Rp 4.880.000" },
                    { label: "Insentif Apresiasi (jika ≥ 8 unit)", value: "Bonus tambahan" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-muted">{row.label}</span>
                      <span className="font-semibold text-secondary shrink-0">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="font-bold text-secondary">Estimasi total:</span>
                  <span className="text-xl font-bold text-green-600">~Rp 7.380.000</span>
                </div>
                <p className="text-muted text-xs mt-1">per bulan</p>
              </div>

              {/* Scenario 2 */}
              <div className="bg-white rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Users size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-lg">AXI dengan Jaringan</h3>
                    <p className="text-muted text-xs">Penjualan pribadi + Rekan Bisnis</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Penjualan pribadi (sama seperti di atas)", value: "Rp 7.380.000" },
                    { label: "3 RB 1 × 5 unit motor × Rp 70.000", value: "Rp 1.050.000" },
                    { label: "Insentif Group (jika level Excellent)", value: "~15% × insentif RB1" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-muted">{row.label}</span>
                      <span className="font-semibold text-secondary shrink-0">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="font-bold text-secondary">Estimasi total:</span>
                  <span className="text-xl font-bold text-green-600">&gt;Rp 10.000.000</span>
                </div>
                <p className="text-muted text-xs mt-1">per bulan</p>
              </div>
            </div>

            <p className="text-center text-slate-400 text-xs mt-8 max-w-xl mx-auto">
              * Simulasi di atas adalah ilustrasi. Pendapatan aktual dapat bervariasi tergantung
              performa penjualan dan ketentuan Adira Finance yang berlaku.
            </p>

            {/* Mid-page CTA */}
            <div className="mt-10 text-center">
              <a
                href={getWaLinkAxi()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-secondary font-bold px-8 py-4 rounded-full text-base transition-colors shadow-lg"
              >
                Saya Ingin Mulai Earning — Daftar Sekarang
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 10: PERSYARATAN ──────────────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                Syarat Daftar Sangat Mudah
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Hanya butuh 4 dokumen, semuanya bisa difoto pakai HP.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { icon: IdCard, label: "KTP", desc: "Kartu Tanda Penduduk yang masih berlaku" },
                { icon: CreditCard, label: "Rekening Bank Aktif", desc: "Untuk transfer insentif langsung ke Anda" },
                { icon: Phone, label: "Nomor Telepon Aktif", desc: "Untuk koordinasi dan komunikasi tim" },
                { icon: Mail, label: "Email Aktif", desc: "Untuk login dan terima ID AXI di Dicicilaja.com" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-3xl p-7 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={26} className="text-secondary" />
                  </div>
                  <h3 className="font-bold text-secondary text-lg mb-2">{item.label}</h3>
                  <p className="text-muted text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Free registration highlight */}
            <div className="bg-primary rounded-3xl px-8 py-7 max-w-2xl mx-auto text-center shadow-lg">
              <p className="text-secondary text-2xl font-bold mb-2">🎉 Biaya Pendaftaran GRATIS!</p>
              <p className="text-secondary/80 text-sm">
                Gratis untuk tahun pertama. Annual Fee hanya{" "}
                <strong>Rp 120.000/tahun</strong> mulai tahun kedua — lebih murah dari biaya makan
                siang sebulan.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 11: CARA MENDAFTAR ───────────────────────────── */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                5 Langkah Daftar Jadi Agen AXI
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Proses mudah, cepat, dan sepenuhnya dipandu oleh tim kami.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                {/* Vertical connector */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 z-0" />

                <div className="space-y-6 relative z-10">
                  {AXI_REGISTRATION_STEPS.map((item, i) => {
                    const Icon = regIcons[i];
                    return (
                      <div key={item.step} className="flex gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                          {item.step}
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl px-6 py-5 flex-1 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon size={16} className="text-primary shrink-0" />
                            <h3 className="font-bold text-secondary text-base">{item.title}</h3>
                          </div>
                          <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <a
                  href={getWaLinkAxi()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-secondary hover:bg-secondary-dark text-white font-bold px-10 py-5 rounded-full text-lg transition-colors shadow-xl"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Mulai Daftar Sekarang — WhatsApp 0851-2268-2981
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 12: FAQ ──────────────────────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                Pertanyaan yang Sering Ditanyakan
              </h2>
              <p className="text-muted text-lg">
                Jawaban lengkap seputar program Agen AXI Adira Finance.
              </p>
            </div>
            <AxiFaqAccordion items={AXI_FAQ_ITEMS} />
          </div>
        </section>

        {/* ── SECTION 13: FINAL CTA ────────────────────────────────── */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Siap Memulai{" "}
              <span className="text-primary">Perjalanan Anda?</span>
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
              Bergabung sekarang juga dengan ribuan Agen AXI Adira Finance di seluruh Indonesia.
              Pendaftaran GRATIS, tanpa biaya tersembunyi.
            </p>

            <a
              href={getWaLinkAxi()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-secondary font-bold px-10 py-5 rounded-full text-lg transition-colors shadow-2xl mb-10"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              💬 Daftar Sekarang via WhatsApp
            </a>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {[
                "Pendaftaran GRATIS",
                "Resmi PT Adira Dinamika Multi Finance Tbk",
                "Diawasi OJK",
                "Proses 1×24 Jam",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle size={16} className="text-green-400 shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-slate-500 text-xs mt-12 leading-relaxed max-w-xl mx-auto">
              bpkbmultifinance.id adalah platform Agen AXI resmi yang dikelola oleh Sharda (ID Agen:
              012625001169). Program AXI adalah program resmi PT Adira Dinamika Multi Finance Tbk
              (IDX: ADMF), terdaftar dan diawasi oleh OJK. Penghasilan yang ditampilkan adalah
              ilustrasi dan dapat bervariasi tergantung performa individu.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
