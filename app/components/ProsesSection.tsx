import {
  MessageCircle,
  FileText,
  Search,
  CheckCircle,
} from "lucide-react";
import { PROSES_STEPS, getWaLink } from "../lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageCircle,
  FileText,
  Search,
  CheckCircle,
};

export default function ProsesSection() {
  return (
    <section
      id="proses"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="proses-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Cara Pengajuan
          </span>
          <h2
            id="proses-heading"
            className="text-3xl sm:text-4xl font-bold text-secondary mb-4"
          >
            Proses Pengajuan{" "}
            <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
              Mudah & Cepat
            </span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Hanya 4 langkah untuk mendapatkan dana pinjaman gadai BPKB melalui
            Adira Finance. Tanpa proses berbelit-belit, dana cair 1-2 hari kerja.
          </p>
        </div>

        {/* Desktop: horizontal steps */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />

            <div className="grid grid-cols-4 gap-6">
              {PROSES_STEPS.map((step, i) => {
                const Icon = iconMap[step.icon];
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    {/* Icon circle */}
                    <div className="relative z-10 mb-6">
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${
                          i % 2 === 0
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {Icon && (
                          <Icon
                            size={32}
                            className={
                              i % 2 === 0
                                ? "text-text-on-primary"
                                : "text-primary"
                            }
                          />
                        )}
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-primary text-xs font-bold">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-secondary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical steps */}
        <div className="lg:hidden space-y-0">
          {PROSES_STEPS.map((step, i) => {
            const Icon = iconMap[step.icon];
            const isLast = i === PROSES_STEPS.length - 1;
            return (
              <div key={i} className="flex gap-5">
                {/* Left: icon + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      i % 2 === 0 ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        size={22}
                        className={
                          i % 2 === 0 ? "text-text-on-primary" : "text-primary"
                        }
                      />
                    )}
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 to-secondary/20 my-2 min-h-8" />
                  )}
                </div>

                {/* Right: content */}
                <div className={`flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                      Langkah {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted mb-6 text-lg">
            Siap memulai proses pengajuan pinjaman gadai BPKB?
          </p>
          <a
            href={getWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-dark text-white font-bold px-10 py-4 rounded-full text-lg transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Mulai Pengajuan via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
