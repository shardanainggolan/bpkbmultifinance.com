import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Building2,
  Shield,
  Award,
  TrendingUp,
  BadgeCheck,
  ExternalLink,
  MapPin,
  Users,
  Car,
  Bike,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AxiFaqAccordion from "../components/agen-axi/AxiFaqAccordion";
import { WA_NUMBER, WA_MESSAGE_DEFAULT, SITE_URL } from "../lib/constants";
import { breadcrumbSchema, faqSchema } from "../lib/schema";

const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE_DEFAULT)}`;

const FAQ_TENTANG = [
  {
    q: "Apa itu Adira Finance?",
    a: "Adira Finance adalah nama dagang dari PT Adira Dinamika Multi Finance Tbk, perusahaan pembiayaan (multifinance) yang berdiri sejak 1990 dan terdaftar di Bursa Efek Indonesia dengan kode saham ADMF. Adira Finance melayani kebutuhan pembiayaan kendaraan bermotor dan kredit multiguna bagi jutaan nasabah di seluruh Indonesia.",
  },
  {
    q: "Siapa pemilik Adira Finance?",
    a: "Pemegang saham mayoritas Adira Finance adalah PT Bank Danamon Indonesia Tbk. Bank Danamon sendiri merupakan bagian dari MUFG (Mitsubishi UFJ Financial Group), grup keuangan terbesar di Jepang dan salah satu yang terbesar di dunia.",
  },
  {
    q: "Apakah Adira Finance terdaftar dan diawasi OJK?",
    a: "Ya. Adira Finance sepenuhnya terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK). Sebagai perusahaan publik yang tercatat di BEI, Adira Finance juga tunduk pada regulasi Bursa Efek Indonesia dan OJK untuk keterbukaan informasi dan tata kelola perusahaan.",
  },
  {
    q: "Berapa jumlah cabang Adira Finance di Indonesia?",
    a: "Adira Finance memiliki lebih dari 400 kantor cabang yang tersebar di seluruh provinsi Indonesia, dari Sabang hingga Merauke. Jaringan luas ini memungkinkan proses survei dan verifikasi kendaraan dilakukan di mana pun nasabah berada.",
  },
  {
    q: "Produk apa saja yang ditawarkan Adira Finance?",
    a: "Produk utama Adira Finance meliputi: Kredit Kendaraan Bermotor (KKB) untuk pembelian kendaraan baru maupun bekas, dan Kredit Multiguna Jaminan BPKB untuk pinjaman dana tunai dengan jaminan BPKB mobil atau motor. Adira Finance juga memiliki layanan asuransi melalui entitas terkait.",
  },
  {
    q: "Apakah bpkbmultifinance.id adalah website resmi Adira Finance?",
    a: "bpkbmultifinance.id adalah platform yang dikelola oleh Sharda (ID AXI: 012625001169), Agen AXI terdaftar yang bermitra resmi dengan Adira Finance. Ini bukan website resmi PT Adira Dinamika Multi Finance Tbk. Website resmi Adira Finance dapat dikunjungi di adira.co.id.",
  },
];

export const metadata: Metadata = {
  title: "Tentang Adira Finance — PT Adira Dinamika Multi Finance Tbk | Profil Perusahaan",
  description:
    "Profil lengkap PT Adira Dinamika Multi Finance Tbk (IDX: ADMF): sejarah, kepemilikan, produk, dan jaringan 400+ cabang. Perusahaan pembiayaan terdaftar OJK, bagian dari MUFG Group.",
  alternates: { canonical: `${SITE_URL}/tentang-adira-finance` },
  openGraph: {
    title: "Tentang Adira Finance — Profil PT Adira Dinamika Multi Finance Tbk",
    description:
      "Profil Adira Finance (IDX: ADMF): berdiri 1990, 400+ cabang, anak usaha Bank Danamon (MUFG Group), diawasi OJK.",
    url: `${SITE_URL}/tentang-adira-finance`,
  },
};

export default function TentangAdiraFinancePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Tentang Adira Finance", url: `${SITE_URL}/tentang-adira-finance` },
  ]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Adira Dinamika Multi Finance Tbk",
    alternateName: "Adira Finance",
    url: "https://www.adira.co.id",
    foundingDate: "1990",
    legalName: "PT Adira Dinamika Multi Finance Tbk",
    tickerSymbol: "ADMF",
    description:
      "Perusahaan pembiayaan (multifinance) terkemuka di Indonesia yang menyediakan kredit kendaraan bermotor dan kredit multiguna.",
    parentOrganization: {
      "@type": "Organization",
      name: "PT Bank Danamon Indonesia Tbk",
      url: "https://www.danamon.co.id",
      parentOrganization: {
        "@type": "Organization",
        name: "MUFG — Mitsubishi UFJ Financial Group",
        url: "https://www.mufg.jp",
      },
    },
    knowsAbout: [
      "Kredit Kendaraan Bermotor",
      "Kredit Multiguna Jaminan BPKB",
      "Gadai BPKB Mobil",
      "Gadai BPKB Motor",
    ],
  };

  const faq = faqSchema(FAQ_TENTANG);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="bg-secondary py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
              <ChevronRight size={14} />
              <span className="text-white">Tentang Adira Finance</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
                  <Building2 size={16} className="text-primary" />
                  <span className="text-primary text-sm font-semibold">
                    IDX: ADMF · Terdaftar OJK · MUFG Group
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                  Tentang{" "}
                  <span className="text-primary">Adira Finance</span>
                  <br className="hidden sm:block" />
                  PT Adira Dinamika Multi Finance Tbk
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                  Perusahaan pembiayaan terkemuka di Indonesia yang berdiri sejak{" "}
                  <strong className="text-white">1990</strong>. Terdaftar di Bursa Efek
                  Indonesia dengan kode saham{" "}
                  <strong className="text-primary">ADMF</strong>, diawasi OJK, dan beroperasi
                  di lebih dari <strong className="text-white">400 cabang</strong> di
                  seluruh Indonesia.
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                  {[
                    "Diawasi OJK",
                    "Terdaftar BEI (ADMF)",
                    "Bagian MUFG Group",
                    "Berdiri sejak 1990",
                  ].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-green-400" />{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company facts card */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-secondary font-bold text-xl mb-6 flex items-center gap-2">
                    <Building2 size={20} className="text-primary" />
                    Profil Singkat
                  </h2>
                  <div className="space-y-0">
                    {[
                      { label: "Nama Resmi", value: "PT Adira Dinamika Multi Finance Tbk" },
                      { label: "Kode Saham BEI", value: "ADMF" },
                      { label: "Didirikan", value: "1990" },
                      { label: "Pemegang Saham", value: "Bank Danamon (MUFG Group)" },
                      { label: "Jumlah Cabang", value: "400+ di seluruh Indonesia" },
                      { label: "Pengawas", value: "OJK (Otoritas Jasa Keuangan)" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
                        <span className="text-muted text-sm shrink-0">{item.label}</span>
                        <span className="text-secondary text-sm font-bold text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MENGENAL ADIRA FINANCE ───────────────────────────────── */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-8">
              Mengenal PT Adira Dinamika Multi Finance Tbk
            </h2>

            <div className="space-y-6 text-muted leading-relaxed text-base">
              <p>
                <strong className="text-secondary">Adira Finance</strong> — nama lengkapnya{" "}
                <strong className="text-secondary">PT Adira Dinamika Multi Finance Tbk</strong> —
                adalah salah satu perusahaan pembiayaan (multifinance) terbesar dan paling
                dikenal di Indonesia. Perusahaan ini berdiri pada tahun{" "}
                <strong className="text-secondary">1990</strong> dan telah melayani jutaan
                nasabah di seluruh nusantara selama lebih dari tiga dekade.
              </p>

              <p>
                Pada tahun <strong className="text-secondary">2004</strong>, Adira Finance
                melakukan penawaran umum perdana (IPO) di{" "}
                <strong className="text-secondary">Bursa Efek Indonesia</strong> dengan kode
                saham <strong className="text-secondary">ADMF</strong>. Status sebagai
                perusahaan publik membuat Adira Finance wajib tunduk pada ketentuan
                keterbukaan informasi yang ketat, sehingga kondisi keuangan dan operasionalnya
                dapat dipantau publik secara berkala.
              </p>

              <p>
                Sebagai anak perusahaan dari{" "}
                <strong className="text-secondary">PT Bank Danamon Indonesia Tbk</strong> yang
                merupakan bagian dari{" "}
                <strong className="text-secondary">
                  MUFG (Mitsubishi UFJ Financial Group)
                </strong>{" "}
                — grup keuangan terbesar di Jepang — Adira Finance memiliki fondasi permodalan
                yang sangat kuat. Dukungan dari grup keuangan sekelas MUFG menjadi salah satu
                faktor yang membuat Adira Finance mampu bertahan dan tumbuh melewati berbagai
                siklus ekonomi.
              </p>

              <p>
                Seluruh kegiatan usaha Adira Finance berada di bawah pengawasan{" "}
                <strong className="text-secondary">
                  Otoritas Jasa Keuangan (OJK)
                </strong>
                , lembaga negara yang bertugas mengawasi dan mengatur industri jasa keuangan
                di Indonesia. Ini berarti setiap produk, proses, dan penyimpanan dokumen
                nasabah — termasuk BPKB yang dijadikan jaminan — dilakukan sesuai standar
                regulasi yang berlaku.
              </p>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ─────────────────────────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-12 text-center">
              Mengapa Adira Finance Dipercaya Jutaan Nasabah
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Award,
                  title: "35+ Tahun Berpengalaman",
                  desc: "Berdiri sejak 1990, Adira Finance telah melewati berbagai siklus ekonomi dan terus bertumbuh melayani nasabah di seluruh Indonesia.",
                  bg: "bg-secondary",
                  iconColor: "text-primary",
                  textColor: "text-white",
                  subColor: "text-slate-300",
                },
                {
                  icon: Shield,
                  title: "Terdaftar & Diawasi OJK",
                  desc: "Semua produk, proses, dan penyimpanan dokumen nasabah dilakukan sesuai regulasi OJK yang berlaku. BPKB Anda tersimpan aman.",
                  bg: "bg-primary",
                  iconColor: "text-secondary",
                  textColor: "text-secondary",
                  subColor: "text-secondary/70",
                },
                {
                  icon: TrendingUp,
                  title: "Tercatat di BEI (ADMF)",
                  desc: "Sebagai perusahaan publik, kondisi keuangan dan operasional Adira Finance transparan dan dapat dipantau publik setiap saat.",
                  bg: "bg-secondary",
                  iconColor: "text-primary",
                  textColor: "text-white",
                  subColor: "text-slate-300",
                },
                {
                  icon: Users,
                  title: "Bagian dari MUFG Group",
                  desc: "Anak usaha Bank Danamon yang tergabung dalam MUFG Group, salah satu grup keuangan terbesar di dunia asal Jepang.",
                  bg: "bg-primary",
                  iconColor: "text-secondary",
                  textColor: "text-secondary",
                  subColor: "text-secondary/70",
                },
              ].map((item) => (
                <div key={item.title} className={`${item.bg} rounded-3xl p-7`}>
                  <item.icon size={28} className={`${item.iconColor} mb-5`} />
                  <h3 className={`font-bold text-lg mb-3 ${item.textColor}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${item.subColor}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUK ADIRA FINANCE ─────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4 text-center">
              Produk Layanan Adira Finance
            </h2>
            <p className="text-muted text-center mb-12 max-w-xl mx-auto">
              Dua lini produk utama yang melayani kebutuhan pembiayaan jutaan nasabah Indonesia.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Kredit Multiguna */}
              <div className="bg-white border-2 border-secondary rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Bike size={26} className="text-secondary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary bg-secondary px-2 py-0.5 rounded">Tersedia di sini</span>
                    <h3 className="font-bold text-secondary text-xl mt-1">Kredit Multiguna</h3>
                    <p className="text-muted text-sm">Jaminan BPKB Mobil & Motor</p>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Pinjaman dana tunai dengan jaminan BPKB kendaraan yang sudah lunas. Dana bisa
                  digunakan untuk berbagai keperluan — kendaraan tidak perlu dititipkan.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Motor: plafon Rp 3 juta – Rp 50 juta",
                    "Mobil: plafon Rp 20 juta – Rp 400 juta",
                    "Tenor 12–60 bulan",
                    "Proses 1–3 hari kerja",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-secondary">
                      <CheckCircle size={14} className="text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="/gadai-bpkb-mobil" className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 rounded-2xl text-sm transition-colors">
                    <Car size={16} />
                    Gadai BPKB Mobil — Hingga Rp 400 Juta
                  </Link>
                  <Link href="/gadai-bpkb-motor" className="flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary font-semibold py-3 rounded-2xl text-sm transition-colors">
                    <Bike size={16} />
                    Gadai BPKB Motor — Hingga Rp 50 Juta
                  </Link>
                </div>
              </div>

              {/* KKB */}
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-muted-light flex items-center justify-center shrink-0">
                    <Car size={26} className="text-muted" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-xl">Kredit Kendaraan Bermotor</h3>
                    <p className="text-muted text-sm">Pembelian kendaraan baru & bekas</p>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Fasilitas kredit untuk pembelian kendaraan bermotor baru maupun bekas.
                  Adira Finance adalah salah satu pemain terbesar di segmen ini di Indonesia.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Kendaraan roda dua dan roda empat",
                    "Kendaraan baru maupun bekas",
                    "Tenor fleksibel",
                    "Jaringan dealer luas",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-secondary">
                      <CheckCircle size={14} className="text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href="https://www.adira.co.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-gray-200 hover:border-secondary text-secondary font-semibold py-3 rounded-2xl text-sm transition-colors"
                >
                  Informasi di adira.co.id
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── JARINGAN CABANG ──────────────────────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                  Jaringan Nasional — 400+ Cabang
                </h2>
                <div className="space-y-5 text-muted leading-relaxed">
                  <p>
                    Dengan lebih dari <strong className="text-secondary">400 kantor cabang</strong>{" "}
                    yang tersebar di seluruh provinsi Indonesia, Adira Finance hadir di hampir
                    setiap kota besar dan kota menengah di Tanah Air.
                  </p>
                  <p>
                    Jaringan yang luas ini krusial untuk layanan gadai BPKB, karena proses
                    survei dan appraisal kendaraan dilakukan secara fisik di lokasi nasabah.
                    Semakin dekat cabang Adira Finance, semakin cepat proses survei bisa
                    dijadwalkan dan diselesaikan.
                  </p>
                  <p>
                    Setiap kantor cabang Adira Finance juga menjadi tempat penyimpanan resmi
                    dokumen BPKB nasabah selama masa pinjaman berlangsung.
                  </p>
                </div>

                <Link
                  href="/cabang"
                  className="inline-flex items-center gap-2 mt-8 bg-secondary hover:bg-secondary-dark text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
                >
                  <MapPin size={18} />
                  Temukan Cabang Adira Finance Terdekat
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "400+", label: "Kantor Cabang", icon: Building2 },
                  { value: "33", label: "Provinsi", icon: MapPin },
                  { value: "35+", label: "Tahun Pengalaman", icon: Award },
                  { value: "OJK", label: "Pengawas Resmi", icon: Shield },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-3xl p-7 text-center shadow-sm">
                    <item.icon size={24} className="text-primary mx-auto mb-3" />
                    <p className="text-secondary text-3xl font-bold">{item.value}</p>
                    <p className="text-muted text-sm mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STRUKTUR KEPEMILIKAN ─────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6 text-center">
              Struktur Kepemilikan
            </h2>
            <p className="text-muted text-center mb-12">
              Adira Finance adalah bagian dari salah satu grup keuangan terkuat di dunia.
            </p>

            <div className="flex flex-col items-center gap-4">
              {[
                {
                  name: "MUFG — Mitsubishi UFJ Financial Group",
                  desc: "Grup keuangan terbesar di Jepang, salah satu terbesar di dunia",
                  url: "https://www.mufg.jp",
                  level: 1,
                },
                {
                  name: "PT Bank Danamon Indonesia Tbk",
                  desc: "Bank umum nasional, IDX: BDMN",
                  url: "https://www.danamon.co.id",
                  level: 2,
                },
                {
                  name: "PT Adira Dinamika Multi Finance Tbk",
                  desc: "Perusahaan pembiayaan, IDX: ADMF",
                  url: "https://www.adira.co.id",
                  level: 3,
                  highlight: true,
                },
              ].map((item, i) => (
                <div key={item.name} className="w-full max-w-2xl">
                  {i > 0 && (
                    <div className="flex justify-center my-1">
                      <div className="w-0.5 h-6 bg-gray-300" />
                    </div>
                  )}
                  <div className={`rounded-2xl px-6 py-5 border ${item.highlight ? "bg-primary/10 border-primary/40" : "bg-gray-50 border-gray-200"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`font-bold ${item.highlight ? "text-secondary text-lg" : "text-secondary"}`}>
                          {item.name}
                          {item.highlight && (
                            <span className="ml-2 text-xs font-semibold bg-primary text-secondary px-2 py-0.5 rounded-full">
                              Adira Finance
                            </span>
                          )}
                        </p>
                        <p className="text-muted text-sm mt-1">{item.desc}</p>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted hover:text-secondary transition-colors"
                        aria-label={`Website ${item.name}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AXI AGENT INFO ───────────────────────────────────────── */}
        <section className="bg-muted-light py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-3">
                <BadgeCheck size={24} className="text-primary" />
                Tentang bpkbmultifinance.id
              </h2>
              <div className="space-y-4 text-muted text-sm leading-relaxed">
                <p>
                  <strong className="text-secondary">bpkbmultifinance.id</strong> adalah
                  platform yang dimiliki dan dikelola oleh{" "}
                  <strong className="text-secondary">Sharda</strong> (ID AXI: 012625001169),
                  Agen AXI terdaftar yang bermitra resmi dengan PT Adira Dinamika Multi Finance
                  Tbk.
                </p>
                <p>
                  Program <strong className="text-secondary">AXI (Adira Xtra Income)</strong>{" "}
                  adalah sistem keagenan resmi yang dikelola langsung oleh Adira Finance,
                  memungkinkan individu terdaftar untuk membantu calon nasabah mengajukan
                  pembiayaan melalui platform resmi Adira Finance.
                </p>
                <p>
                  Website ini <strong className="text-secondary">bukan website resmi</strong>{" "}
                  PT Adira Dinamika Multi Finance Tbk. Website resmi Adira Finance dapat
                  dikunjungi di{" "}
                  <a
                    href="https://www.adira.co.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary font-semibold hover:underline"
                  >
                    adira.co.id
                  </a>
                  .
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Konsultasi Pinjaman via WhatsApp
                </a>
                <a
                  href="https://www.adira.co.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gray-200 hover:border-secondary text-secondary font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  Website Resmi Adira Finance
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4 text-center">
              Pertanyaan Seputar Adira Finance
            </h2>
            <p className="text-muted text-center mb-10">
              Informasi umum yang sering ditanyakan tentang Adira Finance.
            </p>
            <AxiFaqAccordion items={FAQ_TENTANG} />
          </div>
        </section>

        {/* ── LINK KE PRODUK ───────────────────────────────────────── */}
        <section className="bg-secondary py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ajukan Pinjaman via Adira Finance
            </h2>
            <p className="text-slate-300 mb-10">
              Pilih produk yang sesuai dengan kendaraan yang Anda miliki.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/gadai-bpkb-mobil"
                className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-secondary font-bold px-8 py-4 rounded-full transition-colors shadow-lg"
              >
                <Car size={20} />
                Gadai BPKB Mobil — s/d Rp 400 Juta
              </Link>
              <Link
                href="/gadai-bpkb-motor"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                <Bike size={20} />
                Gadai BPKB Motor — s/d Rp 50 Juta
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
