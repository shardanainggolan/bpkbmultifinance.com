import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import KeunggulanSection from "./components/KeunggulanSection";
import ProdukSection from "./components/ProdukSection";
import SimulasiSection from "./components/SimulasiSection";
import SyaratSection from "./components/SyaratSection";
import ProsesSection from "./components/ProsesSection";
import FAQSection from "./components/FAQSection";
import TestimoniSection from "./components/TestimoniSection";
import TentangAdiraSection from "./components/TentangAdiraSection";
import CabangPreviewSection from "./components/CabangPreviewSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { getBranches } from "./lib/api";
import { WA_NUMBER, WA_MESSAGE_DEFAULT, SITE_URL } from "./lib/constants";
import { webPageSchema } from "./lib/schema";

// Homepage-specific metadata — overrides the layout default for this page only.
// Title: "Adira Finance" immediately after the primary keyword for entity association.
export const metadata: Metadata = {
  title: {
    // absolute bypasses the template from layout.tsx — prevents double "| Adira Finance" suffix
    absolute: "Gadai BPKB Adira Finance — Agen Resmi Pinjaman Dana Cepat",
  },
  description:
    "Agen resmi Adira Finance (PT Adira Dinamika Multi Finance Tbk) untuk pinjaman dana gadai BPKB mobil hingga Rp 400 juta dan motor hingga Rp 50 juta. Diawasi OJK, proses 1–3 hari kerja, bunga tetap mulai 1,66%/bulan.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Gadai BPKB Adira Finance — Agen Resmi Pinjaman Dana Cepat",
    description:
      "Agen resmi Adira Finance untuk pinjaman dana gadai BPKB mobil & motor. Diawasi OJK, plafon hingga Rp 400 juta, proses 1–3 hari kerja.",
    url: SITE_URL,
  },
};

export default async function HomePage() {
  const branches = await getBranches();

  return (
    <>
      {/* WebPage JSON-LD — links this page to the Adira Finance entity for Google Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema()) }}
      />
      <Navbar />

      <main>
        <HeroSection />
        <KeunggulanSection />
        <ProdukSection />
        <SimulasiSection />
        <SyaratSection />
        <ProsesSection />
        <FAQSection />
        <TestimoniSection />
        <TentangAdiraSection />
        <CabangPreviewSection branches={branches} />
        <CTASection />
      </main>

      <Footer />

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE_DEFAULT)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-2xl wa-float transition-colors"
        aria-label="Chat WhatsApp - Ajukan pinjaman gadai BPKB Adira Finance"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}
