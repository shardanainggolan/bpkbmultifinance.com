import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, ExternalLink, BadgeCheck } from "lucide-react";
import { NAV_LINKS, WA_NUMBER, WA_MESSAGE_DEFAULT } from "../lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary-dark text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* AXI Agent Info Bar */}
        <div className="border-b border-white/10 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <BadgeCheck size={20} className="text-text-on-primary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  Dikelola oleh Agen AXI Terdaftar Adira Finance
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Nama: <strong className="text-slate-200">Sharda</strong>
                  <span className="mx-2 text-white/20">·</span>
                  ID AXI: <strong className="text-slate-200">012625001169</strong>
                </p>
              </div>
            </div>
            <a
              href="https://www.dicicilaja.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="dicicilaja.com"
              className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/images/dicicilaja.webp"
                alt="dicicilaja.com"
                width={120}
                height={36}
                className="object-contain"
                style={{ height: "2.25rem", width: "auto" }}
              />
            </a>
          </div>
        </div>

        {/* Main footer */}
        <div className="py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5 bg-white rounded-2xl px-4 py-2.5 hover:bg-white/90 transition-colors">
              <Image
                src="/images/logo-agen-axi-adira.png"
                alt="BPKB Multi Finance - Agen Resmi Adira Finance"
                width={240}
                height={70}
                className="object-contain"
                style={{ height: "4rem", width: "auto" }}
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-5">
              <strong className="text-white">bpkbmultifinance.id</strong> adalah
              website milik dan dikelola oleh Agen AXI terdaftar
              di <strong className="text-white">Adira Finance</strong> (PT Adira
              Dinamika Multi Finance Tbk), untuk layanan pinjaman dana dengan
              jaminan gadai BPKB mobil dan motor di seluruh Indonesia.
            </p>

            {/* AXI badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 mb-5">
              <BadgeCheck size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-white text-xs font-semibold">Agen AXI Resmi Adira Finance</p>
                <p className="text-slate-400 text-xs">ID: 012625001169 · Nama: Sharda</p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE_DEFAULT)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors text-sm"
              >
                <MessageCircle size={16} className="text-primary shrink-0" />
                Chat WhatsApp
              </a>
              <div className="flex items-start gap-3 text-slate-300 text-sm">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Indonesia</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-5">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-primary transition-colors text-sm flex items-center gap-1.5"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Adira Finance links */}
          <div>
            <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-5">
              Adira Finance
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Website Resmi Adira Finance", href: "https://www.adira.co.id" },
                { label: "Kredit Multiguna Adira", href: "https://www.adira.co.id/produk/metalink/Kredit-Multiguna-Jasa" },
                { label: "Profil Adira Finance (Wikipedia)", href: "https://id.wikipedia.org/wiki/Adira_Dinamika_Multi_Finance" },
                { label: "Saham ADMF di BEI", href: "https://www.idx.co.id/id/perusahaan-tercatat/profil-perusahaan-tercatat/?kodeEmiten=ADMF" },
                { label: "OJK - Pengawas Keuangan", href: "https://www.ojk.go.id" },
              ].map((l, i) => (
                <li key={i}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-primary transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <span>{l.label}</span>
                    <ExternalLink
                      size={12}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="text-slate-400 text-xs space-y-1.5">
              <p>© {year} bpkbmultifinance.id. Hak cipta dilindungi undang-undang.</p>
              <p>
                <strong className="text-slate-300">Disclaimer:</strong>{" "}
                Website ini dimiliki dan dikelola oleh Sharda (ID AXI: 012625001169),
                Agen AXI terdaftar yang bermitra dengan Adira Finance. Website ini bukan
                merupakan website resmi PT Adira Dinamika Multi Finance Tbk.
                Adira Finance adalah merek dagang terdaftar.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://www.dicicilaja.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="dicicilaja.com"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/images/dicicilaja.webp"
                  alt="dicicilaja.com"
                  width={100}
                  height={30}
                  className="object-contain"
                  style={{ height: "2rem", width: "auto" }}
                />
              </a>
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2">
                <span className="text-xs text-slate-300">Powered by</span>
                <a
                  href="https://www.adira.co.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs font-bold hover:underline"
                >
                  Adira Finance
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
