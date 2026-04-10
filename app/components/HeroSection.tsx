import Link from "next/link";
import { getWaLink } from "../lib/constants";
import { Shield, Clock, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-24"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-secondary via-secondary to-secondary-dark" />

      {/* Yellow accent shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-40 w-64 h-64 rounded-full bg-primary blur-2xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary opacity-5 blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,221,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,221,0,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 mb-6">
              <Shield size={14} className="text-primary" />
              <span className="text-primary text-sm font-semibold">
                Agen Resmi Adira Finance
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6"
            >
              Butuh Dana Cepat?{" "}
              <span className="text-primary">Gadaikan BPKB</span> Anda di{" "}
              <span className="text-primary">Adira Finance</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
              Pinjaman dana tunai dengan jaminan BPKB mobil atau motor melalui{" "}
              <strong className="text-white">Adira Finance</strong> — perusahaan
              pembiayaan terpercaya diawasi OJK. Proses mudah, dana cair{" "}
              <strong className="text-primary">1-2 hari kerja</strong>.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Clock size={16} className="text-primary" />
                <span className="text-sm font-medium">Proses 1-2 Hari Kerja</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Shield size={16} className="text-primary" />
                <span className="text-sm font-medium">Diawasi OJK</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                <span className="text-sm font-medium">400+ Cabang Indonesia</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-text-on-primary font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Ajukan Pinjaman Sekarang
              </a>
              <Link
                href="/#simulasi"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200"
              >
                Simulasi Pinjaman
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right: Stats card */}
          <div className="lg:flex justify-end hidden">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-sm space-y-6">
              <h2 className="text-white font-bold text-xl text-center">
                Keunggulan Gadai BPKB<br />Adira Finance
              </h2>

              <div className="space-y-4">
                {[
                  { label: "Plafon Pinjaman", value: "Hingga Rp 400 Juta", sub: "BPKB Mobil" },
                  { label: "Plafon Pinjaman", value: "Hingga Rp 50 Juta", sub: "BPKB Motor" },
                  { label: "Tenor Cicilan", value: "Hingga 48 Bulan", sub: "Fleksibel sesuai kebutuhan" },
                  { label: "Proses Pencairan", value: "1-2 Hari Kerja", sub: "Cepat & transparan" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-slate-300 text-xs">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.sub}</p>
                    </div>
                    <p className="text-primary font-bold text-right">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-4 text-center">
                <p className="text-slate-300 text-sm">
                  Bagian dari{" "}
                  <strong className="text-white">Bank Danamon</strong> &{" "}
                  <strong className="text-white">MUFG Group</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="lg:hidden mt-10 grid grid-cols-2 gap-3">
          {[
            { value: "Rp 400 Jt", label: "Maks. BPKB Mobil" },
            { value: "Rp 50 Jt", label: "Maks. BPKB Motor" },
            { value: "48 Bulan", label: "Tenor Maks." },
            { value: "1-2 Hari", label: "Proses Cair" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-center"
            >
              <p className="text-primary font-bold text-xl">{s.value}</p>
              <p className="text-slate-300 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
