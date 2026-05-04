import { Star } from "lucide-react";
import { TESTIMONI } from "../lib/constants";

export default function TestimoniSection() {
  return (
    <section
      id="testimoni"
      className="py-20 lg:py-28 bg-white overflow-hidden"
      aria-labelledby="testimoni-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Testimoni Nasabah
          </span>
          <h2
            id="testimoni-heading"
            className="text-3xl sm:text-4xl font-bold text-secondary mb-4"
          >
            Apa Kata Mereka yang{" "}
            <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
              Sudah Pinjam
            </span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Ribuan nasabah telah mendapatkan pinjaman dana gadai BPKB melalui
            Adira Finance dengan proses yang mudah dan cepat.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONI.map((t, i) => (
            <article
              key={i}
              className="bg-muted-light rounded-3xl p-7 border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-300 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-5 right-6 text-5xl text-primary/20 font-serif leading-none select-none">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={16}
                    className={
                      si < t.rating
                        ? "text-primary fill-primary"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-secondary text-sm leading-relaxed mb-5 relative z-10">
                "{t.text}"
              </p>

              {/* User info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-secondary text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.kota}</p>
                </div>
                <span className="text-xs bg-primary-light text-secondary font-medium px-3 py-1 rounded-full">
                  {t.pinjaman}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Social proof numbers */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { number: "10.000+", label: "Nasabah Puas" },
            { number: "400+", label: "Cabang Adira Finance" },
            { number: "30+ Tahun", label: "Pengalaman Adira" },
            { number: "1-3 Hari", label: "Proses Pencairan" },
          ].map((s, i) => (
            <div key={i} className="text-center py-6 px-4 bg-secondary rounded-2xl">
              <p className="text-primary text-2xl font-bold mb-1">{s.number}</p>
              <p className="text-slate-300 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
