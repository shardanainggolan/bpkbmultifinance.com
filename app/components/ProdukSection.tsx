import { Car, CheckCircle, ChevronRight } from "lucide-react";
import { PRODUK, getWaLink } from "../lib/constants";
import { financialProductMobilSchema, financialProductMotorSchema } from "../lib/schema";

export default function ProdukSection() {
  return (
    <section
      id="produk"
      className="py-20 lg:py-28 bg-muted-light"
      aria-labelledby="produk-heading"
    >
      {/* JSON-LD for Financial Products */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductMobilSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductMotorSchema()),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Produk Pinjaman
          </span>
          <h2
            id="produk-heading"
            className="text-3xl sm:text-4xl font-bold text-secondary mb-4"
          >
            Kredit Multiguna{" "}
            <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
              Adira Finance
            </span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Tersedia dua produk pinjaman dana tunai dengan jaminan BPKB melalui Adira Finance.
            Pilih sesuai jenis kendaraan yang Anda miliki.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PRODUK.map((produk, i) => {
            const waMsg = produk.type === "mobil"
              ? "Halo, saya ingin informasi pinjaman dana gadai BPKB Mobil di Adira Finance."
              : "Halo, saya ingin informasi pinjaman dana gadai BPKB Motor di Adira Finance.";

            return (
              <article
                key={i}
                className={`relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border ${
                  i === 0 ? "border-secondary" : "border-gray-100"
                }`}
              >
                {/* Badge popular */}
                {i === 0 && (
                  <div className="absolute top-4 right-4 bg-primary text-text-on-primary text-xs font-bold px-3 py-1 rounded-full">
                    Terlaris
                  </div>
                )}

                {/* Header card */}
                <div
                  className={`px-8 pt-8 pb-6 ${
                    i === 0
                      ? "bg-gradient-to-br from-secondary to-secondary-dark"
                      : "bg-gradient-to-br from-slate-600 to-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <Car size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm">{produk.subtitle}</p>
                      <h3 className="text-white font-bold text-xl">{produk.title}</h3>
                    </div>
                  </div>
                  <div className="bg-primary/20 border border-primary/30 rounded-xl px-5 py-3 inline-block">
                    <p className="text-slate-300 text-xs mb-0.5">Plafon Pinjaman</p>
                    <p className="text-primary font-bold text-2xl">{produk.highlight}</p>
                  </div>
                </div>

                {/* Body card */}
                <div className="px-8 py-6">
                  <p className="text-muted text-sm leading-relaxed mb-6">{produk.desc}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-7">
                    {produk.features.map((f, j) => (
                      <div key={j} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-primary shrink-0" />
                          <span className="text-sm text-muted">{f.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-secondary">
                          {f.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={getWaLink(waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold transition-all duration-200 ${
                      i === 0
                        ? "bg-secondary hover:bg-secondary-dark text-white"
                        : "bg-primary hover:bg-primary-dark text-text-on-primary"
                    }`}
                  >
                    Ajukan {produk.title}
                    <ChevronRight size={18} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted mt-8 max-w-2xl mx-auto">
          * Nilai pinjaman bersifat estimasi dan akan ditentukan berdasarkan hasil appraisal kendaraan
          oleh tim Adira Finance. Syarat dan ketentuan berlaku.
        </p>
      </div>
    </section>
  );
}
