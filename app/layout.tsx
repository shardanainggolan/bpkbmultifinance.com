import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { organizationSchema, websiteSchema } from "./lib/schema";
import { SITE_URL, SITE_NAME, WA_NUMBER, WA_MESSAGE_DEFAULT } from "./lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pinjaman Dana Cepat Gadai BPKB Mobil & Motor | Adira Finance",
    template: "%s | Adira Finance - BPKB Multi Finance",
  },
  description:
    "Ajukan pinjaman dana tunai dengan jaminan gadai BPKB mobil atau motor di Adira Finance. Proses cepat 1-2 hari kerja, bunga kompetitif, tenor fleksibel hingga 48 bulan. Agen resmi Adira Finance.",
  keywords: [
    "gadai bpkb",
    "pinjaman bpkb",
    "gadai bpkb mobil",
    "gadai bpkb motor",
    "adira finance",
    "kredit multiguna adira",
    "pinjaman dana cepat",
    "jaminan bpkb",
    "dana tunai bpkb",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    title: "Pinjaman Dana Gadai BPKB Mobil & Motor - Adira Finance",
    description:
      "Butuh dana cepat? Gadaikan BPKB mobil atau motor Anda di Adira Finance. Agen resmi, proses mudah, dana cair 1-2 hari kerja.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BPKB Multi Finance - Agen Resmi Adira Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gadai BPKB Mobil & Motor | Adira Finance",
    description:
      "Pinjaman dana cepat dengan jaminan BPKB mobil atau motor. Proses 1-2 hari kerja. Agen resmi Adira Finance.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* Preconnect untuk domain gambar cabang — mengurangi latency LCP pada halaman cabang */}
        <link rel="preconnect" href="https://backend.adiracabang.id" />
        <link rel="dns-prefetch" href="https://backend.adiracabang.id" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        {/* WhatsApp floating button — tampil di semua halaman */}
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
      </body>
    </html>
  );
}
