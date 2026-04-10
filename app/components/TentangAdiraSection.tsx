import { ExternalLink, Shield, Award, Building2, TrendingUp } from "lucide-react";

export default function TentangAdiraSection() {
  return (
    <section
      id="tentang-adira"
      className="py-20 lg:py-28 bg-muted-light"
      aria-labelledby="tentang-adira-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: text content */}
          <div>
            <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-5">
              Tentang Adira Finance
            </span>
            <h2
              id="tentang-adira-heading"
              className="text-3xl sm:text-4xl font-bold text-secondary mb-6"
            >
              Mengenal{" "}
              <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
                PT Adira Dinamika Multi Finance Tbk
              </span>
            </h2>

            {/* EAV-structured content — entity entity entity */}
            <div className="prose prose-sm max-w-none space-y-4 text-muted leading-relaxed">
              <p>
                <strong className="text-secondary">Adira Finance</strong> (nama lengkap:{" "}
                <strong className="text-secondary">
                  PT Adira Dinamika Multi Finance Tbk
                </strong>
                ) adalah perusahaan pembiayaan (multifinance) terkemuka di Indonesia yang
                didirikan pada tahun <strong className="text-secondary">1990</strong>. Adira
                Finance terdaftar di Bursa Efek Indonesia (BEI) dengan kode saham{" "}
                <strong className="text-secondary">ADMF</strong>.
              </p>

              <p>
                Sebagai anak perusahaan dari{" "}
                <strong className="text-secondary">Bank Danamon Indonesia</strong> yang
                merupakan bagian dari{" "}
                <strong className="text-secondary">
                  MUFG (Mitsubishi UFJ Financial Group)
                </strong>{" "}
                — grup finansial terbesar di Jepang — Adira Finance memiliki fondasi
                keuangan yang sangat kuat dan terpercaya.
              </p>

              <p>
                Adira Finance beroperasi di lebih dari{" "}
                <strong className="text-secondary">400 cabang</strong> yang tersebar di
                seluruh Indonesia, melayani berbagai kebutuhan pembiayaan masyarakat mulai
                dari pembiayaan kendaraan bermotor hingga{" "}
                <strong className="text-secondary">
                  Kredit Multiguna (pinjaman dana gadai BPKB)
                </strong>
                .
              </p>

              <p>
                Seluruh kegiatan usaha Adira Finance diawasi penuh oleh{" "}
                <strong className="text-secondary">
                  Otoritas Jasa Keuangan (OJK)
                </strong>
                , sehingga nasabah dapat yakin bahwa setiap transaksi dan penyimpanan
                dokumen BPKB dilakukan sesuai regulasi yang berlaku dan terjamin
                keamanannya.
              </p>

              <p>
                <strong className="text-secondary">bpkbmultifinance.com</strong> adalah
                platform agen resmi yang membantu calon nasabah mengakses layanan{" "}
                <strong className="text-secondary">
                  Kredit Multiguna Jasa Adira Finance
                </strong>{" "}
                dengan lebih mudah — dari konsultasi, pengumpulan dokumen, hingga proses
                pengajuan pinjaman dana gadai BPKB mobil atau motor.
              </p>
            </div>

            <a
              href="https://www.adira.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-secondary font-semibold hover:text-secondary-dark transition-colors text-sm"
              aria-label="Kunjungi website resmi Adira Finance"
            >
              Kunjungi Website Resmi Adira Finance
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Right: entity facts */}
          <div className="space-y-5">
            {/* Company facts card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-primary" />
                Profil Perusahaan
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Nama Resmi", value: "PT Adira Dinamika Multi Finance Tbk" },
                  { label: "Kode Saham BEI", value: "ADMF" },
                  { label: "Didirikan", value: "1990" },
                  { label: "Induk Perusahaan", value: "Bank Danamon (MUFG Group)" },
                  { label: "Jumlah Cabang", value: "400+ di seluruh Indonesia" },
                  { label: "Pengawas", value: "Otoritas Jasa Keuangan (OJK)" },
                  { label: "Produk Gadai", value: "Kredit Multiguna Jaminan BPKB" },
                ].map((fact, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-muted text-sm shrink-0">{fact.label}</span>
                    <span className="text-secondary text-sm font-semibold text-right">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: "Terdaftar OJK", color: "bg-secondary" },
                { icon: Award, label: "30+ Tahun Berpengalaman", color: "bg-primary" },
                { icon: TrendingUp, label: "Tbk di BEI", color: "bg-secondary" },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className={`${b.color} rounded-2xl p-5 flex flex-col items-center text-center gap-3`}
                  >
                    <Icon
                      size={24}
                      className={b.color === "bg-primary" ? "text-text-on-primary" : "text-primary"}
                    />
                    <span
                      className={`text-xs font-semibold leading-snug ${
                        b.color === "bg-primary" ? "text-text-on-primary" : "text-white"
                      }`}
                    >
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
