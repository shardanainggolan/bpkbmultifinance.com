import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BranchSearch from "../components/BranchSearch";
import { getBranches } from "../lib/api";
import { breadcrumbSchema } from "../lib/schema";
import { SITE_URL } from "../lib/constants";

export const metadata: Metadata = {
  title: "Daftar Cabang Adira Finance Seluruh Indonesia",
  description:
    "Temukan cabang Adira Finance terdekat di seluruh Indonesia untuk pengajuan pinjaman dana gadai BPKB mobil dan motor. Lebih dari 400 cabang siap melayani Anda.",
  openGraph: {
    title: "Daftar Cabang Adira Finance Seluruh Indonesia | BPKB Multi Finance",
    description:
      "Temukan cabang Adira Finance terdekat di seluruh Indonesia untuk pengajuan pinjaman dana gadai BPKB.",
    url: `${SITE_URL}/cabang`,
  },
  alternates: {
    canonical: `${SITE_URL}/cabang`,
  },
};

export default async function CabangPage() {
  const branches = await getBranches();

  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Daftar Cabang Adira Finance", url: `${SITE_URL}/cabang` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />

      <main className="flex-1 pt-20 lg:pt-24">
        {/* Page header */}
        <section className="bg-secondary py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-sm text-slate-400 mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
              <ChevronRight size={14} />
              <span className="text-white">Daftar Cabang</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Daftar Cabang{" "}
              <span className="text-primary">Adira Finance</span>{" "}
              Seluruh Indonesia
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Temukan cabang Adira Finance terdekat untuk mengajukan pinjaman dana
              gadai BPKB mobil atau motor. Tersedia {branches.length > 0 ? `${branches.length}+` : "ratusan"} cabang
              di seluruh Indonesia.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { value: `${branches.length > 0 ? branches.length + "+" : "400+"}`, label: "Cabang" },
                { value: "33", label: "Provinsi" },
                { value: "1-2 Hari", label: "Proses Cair" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-primary font-bold">{s.value}</span>
                  <span className="text-slate-300 text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branch list */}
        <section className="py-14 bg-muted-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {branches.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted text-lg">
                  Data cabang sedang dimuat. Silakan coba lagi.
                </p>
              </div>
            ) : (
              <BranchSearch branches={branches} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
