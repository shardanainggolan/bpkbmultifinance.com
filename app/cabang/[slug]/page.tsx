import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BranchNavigation from "../../components/BranchNavigation";
import { getBranches, getBranchBySlug, getBranchImageUrl } from "../../lib/api";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "../../lib/schema";
import { SITE_URL, getWaLinkBranch } from "../../lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const branches = await getBranches();
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Cabang tidak ditemukan",
    };
  }

  const title = `Gadai BPKB Mobil & Motor di ${branch.name} | Adira Finance`;
  const description = `${branch.description}. Alamat: ${branch.address}, ${branch.region.district.district}, ${branch.region.province.province}. ${branch.telp1 ? `Telp: ${branch.telp1}.` : ""} Ajukan pinjaman dana gadai BPKB sekarang.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/cabang/${branch.slug}`,
      images: branch.image
        ? [
            {
              url: getBranchImageUrl(branch.image),
              alt: branch.name,
            },
          ]
        : [],
    },
    alternates: {
      canonical: `${SITE_URL}/cabang/${branch.slug}`,
    },
  };
}

export default async function BranchDetailPage({ params }: Props) {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) notFound();

  const faxes = [branch.fax1, branch.fax2, branch.fax3].filter(Boolean);

  const lbSchema = localBusinessSchema(branch);
  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Daftar Cabang", url: `${SITE_URL}/cabang` },
    { name: branch.name, url: `${SITE_URL}/cabang/${branch.slug}` },
  ]);

  const district = branch.region.district.district;
  const province = branch.region.province.province;

  const faqItems = [
    {
      q: `Apa itu gadai BPKB dan bagaimana cara kerjanya di ${branch.name}?`,
      a: `Gadai BPKB adalah pinjaman dana tunai dengan jaminan BPKB (Bukti Pemilikan Kendaraan Bermotor) mobil atau motor Anda. Di ${branch.name}, kendaraan tetap dapat digunakan sehari-hari selama masa pinjaman — hanya dokumen BPKB yang diserahkan sebagai agunan kepada Adira Finance.`,
    },
    {
      q: `Berapa plafon pinjaman gadai BPKB di ${branch.name}?`,
      a: `Plafon pinjaman gadai BPKB di ${branch.name} mencapai Rp 400 juta untuk BPKB mobil dan Rp 50 juta untuk BPKB motor. Besarnya plafon ditentukan berdasarkan nilai pasar kendaraan dan hasil survei kondisi kendaraan di wilayah ${district}.`,
    },
    {
      q: `Apa saja syarat dokumen gadai BPKB di ${district}?`,
      a: `Syarat gadai BPKB di ${branch.name}: KTP asli, BPKB asli kendaraan, STNK aktif, Kartu Keluarga (KK), slip gaji atau rekening koran 3 bulan terakhir, dan foto kendaraan. Semua dokumen harus atas nama pemohon atau dilengkapi surat kuasa resmi.`,
    },
    {
      q: `Berapa lama proses pencairan dana gadai BPKB di ${branch.name}?`,
      a: `Proses pencairan dana gadai BPKB di ${branch.name} membutuhkan waktu 1–2 hari kerja setelah dokumen dinyatakan lengkap dan kendaraan selesai disurvei. Survei kendaraan dilakukan langsung di lokasi Anda di wilayah ${district}.`,
    },
    {
      q: `Berapa bunga pinjaman gadai BPKB Adira Finance di ${district}?`,
      a: `Bunga pinjaman gadai BPKB Adira Finance mulai dari 0,8% per bulan (flat), dengan tenor 12–48 bulan untuk BPKB mobil dan 6–36 bulan untuk BPKB motor. Besaran bunga akhir ditentukan berdasarkan profil kredit pemohon dan nilai kendaraan yang dijaminkan.`,
    },
    {
      q: `Apakah ${branch.name} aman dan terpercaya untuk gadai BPKB?`,
      a: `${branch.name} adalah cabang resmi PT Adira Dinamika Multi Finance Tbk yang terdaftar dan diawasi oleh OJK (Otoritas Jasa Keuangan). Adira Finance telah beroperasi sejak 1990, merupakan bagian dari Bank Danamon dan MUFG Group, dan melayani jutaan nasabah di seluruh Indonesia.`,
    },
    {
      q: `Bagaimana cara mengajukan pinjaman gadai BPKB di ${branch.name}?`,
      a: `Cara mengajukan gadai BPKB di ${branch.name}: (1) Hubungi agen via WhatsApp untuk konsultasi gratis, (2) Kirimkan foto dokumen untuk pra-analisa, (3) Jadwalkan survei kendaraan di ${district}, (4) Tanda tangani perjanjian kredit, (5) Dana cair dalam 1–2 hari kerja.`,
    },
    {
      q: `Di mana lokasi dan jam operasional ${branch.name}?`,
      a: `${branch.name} berlokasi di ${branch.address}, ${district}, ${province}. Jam operasional: Senin–Jumat pukul 08.00–15.00 dan Sabtu pukul 08.00–12.00. Untuk konsultasi di luar jam kantor, hubungi agen kami via WhatsApp setiap hari.`,
    },
  ];
  const branchFaqData = faqSchema(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(branchFaqData) }}
      />
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24 overflow-x-hidden">
        {/* Header */}
        <div className="bg-secondary py-12 lg:py-16 overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
              <ChevronRight size={14} />
              <Link
                href="/cabang"
                className="hover:text-primary transition-colors"
              >
                Cabang
              </Link>
              <ChevronRight size={14} />
              <span className="text-white truncate max-w-50 sm:max-w-none">{branch.name}</span>
            </nav>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-primary text-text-on-primary text-xs font-bold px-3 py-1 rounded-full">
                {branch.region.province.province}
              </span>
              <span className="bg-white/10 text-white text-xs font-medium px-3 py-1 rounded-full">
                {branch.region.district.district}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 wrap-break-word">
              Pinjaman Gadai BPKB di{" "}
              <span className="text-primary">{branch.name}</span>
            </h1>
            <p className="text-slate-300 max-w-2xl wrap-break-word">{branch.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8 min-w-0">
              {/* Branch image */}
              {branch.image && (
                <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden bg-secondary">
                  <Image
                    src={getBranchImageUrl(branch.image)}
                    alt={`Kantor ${branch.name}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )}

              {/* Address */}
              <div className="bg-white rounded-3xl border border-gray-100 p-7 shadow-sm">
                <h2 className="text-xl font-bold text-secondary mb-5 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Alamat Lengkap
                </h2>
                <address className="not-italic text-muted space-y-1 text-sm leading-relaxed wrap-break-word">
                  <p className="font-semibold text-secondary">{branch.name}</p>
                  <p>{branch.address}</p>
                  <p>
                    Kel. {branch.region.subDistrict.subDistrict}, Kec. —,{" "}
                    {branch.region.district.district}
                  </p>
                  <p>
                    {branch.region.province.province}{" "}
                    {branch.postalCode && `${branch.postalCode}`}
                  </p>
                  <p>Indonesia</p>
                </address>
              </div>

              {/* Google Maps embed */}
              {branch.gmapsLink && (
                <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm w-full">
                  <h2 className="sr-only">Lokasi {branch.name} di Google Maps</h2>
                  <iframe
                    src={branch.gmapsLink.replace(/"+$/, "")}
                    height="400"
                    style={{ border: 0, width: "100%", display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Lokasi ${branch.name}`}
                  />
                </div>
              )}

              {/* Layanan Gadai BPKB */}
              <div className="bg-white rounded-3xl border border-gray-100 p-7 shadow-sm">
                <h2 className="text-xl font-bold text-secondary mb-3">
                  Layanan Gadai BPKB di {branch.name}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {branch.name} melayani pengajuan pinjaman dana tunai dengan
                  jaminan BPKB mobil dan motor melalui Adira Finance — proses
                  mudah, dana cair 1–2 hari kerja di wilayah {district}.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Gadai BPKB Mobil",
                      plafon: "Hingga Rp 400 Juta",
                      tenor: "12–48 Bulan",
                      desc: "Kendaraan roda empat",
                    },
                    {
                      title: "Gadai BPKB Motor",
                      plafon: "Hingga Rp 50 Juta",
                      tenor: "6–36 Bulan",
                      desc: "Kendaraan roda dua",
                    },
                  ].map((p) => (
                    <div
                      key={p.title}
                      className="bg-muted-light rounded-2xl p-5 border border-gray-100"
                    >
                      <p className="text-xs text-muted font-medium mb-1">
                        {p.desc}
                      </p>
                      <p className="font-bold text-secondary text-sm mb-3">
                        {p.title}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted">Plafon</span>
                          <span className="font-bold text-primary">
                            {p.plafon}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted">Tenor</span>
                          <span className="font-semibold text-secondary">
                            {p.tenor}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted">Bunga mulai</span>
                          <span className="font-semibold text-secondary">
                            0,8% / bulan
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted">Proses cair</span>
                          <span className="font-semibold text-secondary">
                            1–2 hari kerja
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syarat & Cara Pengajuan */}
              <div className="bg-white rounded-3xl border border-gray-100 p-7 shadow-sm">
                <h2 className="text-xl font-bold text-secondary mb-3">
                  Syarat Gadai BPKB di {district}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-5">
                  Persyaratan pengajuan gadai BPKB di{" "}
                  <strong className="text-secondary">{branch.name}</strong>{" "}
                  dirancang semudah mungkin. Siapkan dokumen berikut agar proses
                  verifikasi berjalan cepat.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "KTP asli atas nama pemohon (masih berlaku)",
                    "BPKB asli kendaraan (mobil atau motor)",
                    "STNK aktif sesuai nama pemohon",
                    "Kartu Keluarga (KK)",
                    "Slip gaji atau rekening koran 3 bulan terakhir",
                    "Foto kendaraan (tampak depan, samping, belakang)",
                    "Dokumen pendukung lain (jika diperlukan)",
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="w-5 h-5 rounded-full bg-primary text-text-on-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-secondary">{req}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="font-bold text-secondary text-base mb-4">
                  Cara Mengajukan Pinjaman
                </h3>
                <ol className="space-y-3">
                  {[
                    {
                      step: "Konsultasi Gratis",
                      desc: "Hubungi agen kami via WhatsApp untuk estimasi plafon dan konsultasi tanpa biaya.",
                    },
                    {
                      step: "Kirim Dokumen",
                      desc: "Foto dokumen persyaratan dikirim via WhatsApp untuk pra-analisa oleh tim Adira Finance.",
                    },
                    {
                      step: "Survei Kendaraan",
                      desc: `Tim Adira Finance datang ke lokasi Anda di ${district} untuk survei kendaraan.`,
                    },
                    {
                      step: "Akad & Pencairan",
                      desc: "Tanda tangani perjanjian kredit dan dana cair ke rekening Anda dalam 1–2 hari kerja.",
                    },
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-secondary text-sm">
                          {s.step}
                        </p>
                        <p className="text-muted text-xs leading-relaxed mt-0.5">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* E-E-A-T Trust Section */}
              <div className="bg-secondary rounded-3xl p-7 text-white">
                <h2 className="text-xl font-bold text-primary mb-2">
                  Mengapa Pilih Adira Finance?
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  {branch.name} adalah cabang resmi PT Adira Dinamika Multi
                  Finance Tbk — perusahaan pembiayaan terbesar di Indonesia yang
                  terdaftar dan diawasi OJK sejak 1990.
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Pengawas", value: "OJK — Otoritas Jasa Keuangan RI" },
                    { label: "Induk Usaha", value: "Bank Danamon & MUFG Group" },
                    { label: "Berdiri sejak", value: "1990 — lebih dari 30 tahun" },
                    { label: "Jaringan", value: "400+ cabang di seluruh Indonesia" },
                    { label: "Legalitas", value: "PT Adira Dinamika Multi Finance Tbk" },
                    { label: "Agen AXI Resmi", value: "Sharda — ID AXI 012625001169" },
                  ].map((t) => (
                    <div
                      key={t.label}
                      className="flex items-start justify-between gap-2 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-slate-400 text-xs">{t.label}</span>
                      <span className="text-white text-xs font-semibold text-right">
                        {t.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branch navigation */}
              <div>
                <h2 className="text-lg font-bold text-secondary mb-4">
                  Cabang Lainnya
                </h2>
                <BranchNavigation
                  previous={branch.previousBranch}
                  next={branch.nextBranch}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 min-w-0">
              {/* CTA card */}
              <div className="bg-secondary rounded-3xl p-7 text-white sticky top-24">
                <h2 className="font-bold text-xl mb-2 text-primary">
                  Ajukan Pinjaman di Sini
                </h2>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Gadaikan BPKB mobil atau motor Anda di{" "}
                  <strong className="text-white">{branch.name}</strong>. Dana
                  cair 1-2 hari kerja.
                </p>

                <a
                  href={getWaLinkBranch(branch.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-text-on-primary font-bold py-4 rounded-2xl transition-colors mb-3"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Hubungi via WhatsApp
                </a>
              </div>

              {/* Contact info card */}
              <div className="bg-muted-light rounded-3xl border border-gray-100 p-7">
                <h2 className="text-lg font-bold text-secondary mb-5">
                  Info Kontak
                </h2>
                <div className="space-y-4">
                  {faxes.length > 0 && (
                    <div>
                      <p className="text-xs text-muted font-medium uppercase tracking-wide mb-2">
                        Fax
                      </p>
                      {faxes.map((f, i) => (
                        <p key={i} className="text-secondary text-sm">
                          {f}
                        </p>
                      ))}
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted font-medium uppercase tracking-wide mb-2">
                      Jam Operasional
                    </p>
                    <p className="text-secondary text-sm font-medium">
                      Senin – Jumat: 08.00 – 15.00
                    </p>
                    <p className="text-secondary text-sm">
                      Sabtu: 08.00 – 12.00
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to list */}
              <Link
                href="/cabang"
                className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-secondary text-secondary hover:text-secondary-dark font-semibold py-3.5 rounded-2xl transition-colors text-sm"
              >
                ← Kembali ke Daftar Cabang
              </Link>
            </div>
          </div>

          {/* FAQ Section — full width below grid */}
          <div className="mt-12 pt-10 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Pertanyaan Umum Gadai BPKB di {branch.name}
            </h2>
            <p className="text-muted text-sm mb-8">
              Jawaban lengkap untuk pertanyaan yang paling sering ditanyakan
              seputar layanan gadai BPKB di {district}.
            </p>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                >
                  <h3 className="font-bold text-secondary text-sm mb-2">
                    {item.q}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
