import { CheckCircle, FileText, User } from "lucide-react";
import {
  SYARAT_PEMOHON,
  DOKUMEN_MOBIL,
  DOKUMEN_MOTOR,
} from "../lib/constants";

export default function SyaratSection() {
  return (
    <section
      id="syarat"
      className="py-20 lg:py-28 bg-muted-light"
      aria-labelledby="syarat-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Persyaratan
          </span>
          <h2
            id="syarat-heading"
            className="text-3xl sm:text-4xl font-bold text-secondary mb-4"
          >
            Syarat & Dokumen Pinjaman{" "}
            <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
              Gadai BPKB
            </span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Persyaratan pengajuan pinjaman dana gadai BPKB melalui Adira Finance.
            Dokumen mudah dan proses tidak berbelit-belit.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Syarat pemohon */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                <User size={22} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary">Syarat Pemohon</h3>
            </div>
            <ul className="space-y-4">
              {SYARAT_PEMOHON.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  <span className="text-muted text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dokumen */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {/* Dokumen Mobil */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                  <FileText size={22} className="text-text-on-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted">Dokumen</p>
                  <h3 className="text-lg font-bold text-secondary">BPKB Mobil</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {DOKUMEN_MOBIL.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-secondary text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-muted text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dokumen Motor */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                  <FileText size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted">Dokumen</p>
                  <h3 className="text-lg font-bold text-secondary">BPKB Motor</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {DOKUMEN_MOTOR.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-secondary text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-muted text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>

              {/* Keterangan dokumen motor lebih sedikit */}
              <div className="mt-6 bg-primary-light rounded-xl p-4">
                <p className="text-secondary text-xs font-medium">
                  💡 Dokumen BPKB Motor lebih sedikit dan proses sama cepatnya
                  dengan BPKB Mobil.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 bg-secondary rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-semibold mb-1">
              Tidak yakin dengan kelengkapan dokumen Anda?
            </p>
            <p className="text-slate-300 text-sm">
              Konsultasikan terlebih dahulu dengan agen kami secara gratis via WhatsApp.
              Kami siap membantu memastikan persyaratan Anda sebelum pengajuan.
            </p>
          </div>
          <a
            href={`https://wa.me/6285122682981?text=${encodeURIComponent("Halo saya ingin mengajukan gadai BPKB")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-primary hover:bg-primary-dark text-text-on-primary font-bold px-6 py-3 rounded-full transition-colors"
          >
            Konsultasi Dokumen
          </a>
        </div>
      </div>
    </section>
  );
}
