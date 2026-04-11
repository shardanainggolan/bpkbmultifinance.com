"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

const GA_ID = "G-W2DGM9VS90";

// Type declaration untuk window.gtag agar TypeScript tidak error
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetOrDate: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  /**
   * Kirim event page_view setiap kali pathname berubah.
   * Diperlukan karena Next.js App Router menggunakan client-side navigation
   * (RSC prefetch) — GA tidak mendeteksi perubahan halaman secara otomatis.
   *
   * initial load → gtag('config', ...) TIDAK mengirim page_view (send_page_view: false)
   * initial + setiap navigasi → useEffect ini yang mengirim page_view
   */
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
        send_to: GA_ID,
      });
    }
  }, [pathname]);

  return (
    <>
      {/**
       * strategy="afterInteractive":
       * - Script dimuat SETELAH halaman hydrated & interaktif
       * - Tidak memblokir FCP, LCP, maupun TBT
       * - Tetap berjalan di semua halaman (via root layout)
       */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: false,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
