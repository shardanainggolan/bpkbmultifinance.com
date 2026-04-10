import { Zap, TrendingDown, Calendar, Shield, Car, Wallet } from "lucide-react";
import { KEUNGGULAN } from "../lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  TrendingDown,
  Calendar,
  Shield,
  Car,
  Wallet,
};

export default function KeunggulanSection() {
  return (
    <section
      id="keunggulan"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="keunggulan-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Mengapa Memilih Kami?
          </span>
          <h2
            id="keunggulan-heading"
            className="text-3xl sm:text-4xl font-bold text-secondary mb-4"
          >
            Keunggulan Gadai BPKB di{" "}
            <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
              Adira Finance
            </span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Adira Finance (PT Adira Dinamika Multi Finance Tbk) adalah perusahaan
            pembiayaan terpercaya dengan 400+ cabang di seluruh Indonesia, diawasi penuh
            oleh Otoritas Jasa Keuangan (OJK).
          </p>
        </div>

        {/* Grid keunggulan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEUNGGULAN.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={i}
                className="group relative bg-white border border-gray-100 rounded-2xl p-7 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-light group-hover:bg-primary transition-colors duration-300 mb-5">
                  {Icon && (
                    <Icon
                      size={26}
                      className="text-secondary group-hover:text-text-on-primary transition-colors duration-300"
                    />
                  )}
                </div>

                <h3 className="text-lg font-bold text-secondary mb-2">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>

                {/* Accent bar */}
                <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 bg-secondary rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-primary font-semibold text-sm mb-1">
              Terdaftar & Diawasi OJK
            </p>
            <h3 className="text-white text-xl font-bold">
              Pinjaman Aman & Terpercaya melalui Adira Finance
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Sebagai anak perusahaan Bank Danamon yang tergabung dalam MUFG Group,
              Adira Finance adalah salah satu perusahaan multifinance terbesar dan terpercaya di Indonesia.
            </p>
          </div>
          <a
            href={`https://wa.me/6285122682981?text=${encodeURIComponent("Halo saya ingin mengajukan gadai BPKB")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-primary hover:bg-primary-dark text-text-on-primary font-bold px-8 py-3.5 rounded-full transition-colors whitespace-nowrap"
          >
            Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>
  );
}
