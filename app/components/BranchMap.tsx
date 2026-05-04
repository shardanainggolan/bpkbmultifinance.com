"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Map } from "lucide-react";
import type { BranchMapPin } from "./BranchMapLeaflet";

// Leaflet is client-only and heavyweight — load it only when map enters the viewport
const BranchMapLeaflet = dynamic(() => import("./BranchMapLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-muted">Memuat peta...</p>
      </div>
    </div>
  ),
});

interface Props {
  pins: BranchMapPin[];
}

export default function BranchMap({ pins }: Props) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Defer Leaflet load until map section is 300px from entering the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-16 bg-white border-b border-gray-100 isolate"
      aria-label="Peta sebaran cabang Adira Finance"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary bg-primary px-3 py-1.5 rounded-full mb-3">
              <MapPin size={12} />
              Peta Interaktif
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary leading-tight">
              Sebaran Cabang Adira Finance{" "}
              <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
                di Indonesia
              </span>
            </h2>
            <p className="text-muted text-sm mt-1.5">
              {pins.length} cabang aktif tersebar dari Sabang sampai Merauke
            </p>
          </div>
          <p className="text-xs text-muted italic hidden sm:block">
            Hover atau klik titik untuk melihat detail cabang
          </p>
        </div>

        {/* Map container */}
        <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-slate-50">
          {shouldLoad ? (
            <BranchMapLeaflet pins={pins} />
          ) : (
            // Static placeholder — renders instantly, zero JS
            <div className="h-full w-full flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <Map size={40} className="text-slate-300 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Peta akan dimuat otomatis</p>
              </div>
            </div>
          )}

          {/* Scroll-zoom hint — desktop only, mobile uses pinch-to-zoom */}
          {shouldLoad && (
            <div
              className="hidden sm:block absolute bottom-4 left-1/2 -translate-x-1/2 z-1000 pointer-events-none"
              aria-hidden="true"
            >
              <span className="bg-secondary/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                Klik peta untuk aktifkan zoom scroll
              </span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-secondary shadow-sm shrink-0" />
            <span className="text-xs text-muted">Cabang Adira Finance</span>
          </div>
          <span className="text-slate-200 hidden sm:block">|</span>
          <p className="text-xs text-muted">
            Gunakan tombol +/− atau pinch untuk zoom
          </p>
          <span className="text-slate-200 hidden sm:block">|</span>
          <p className="text-xs text-muted hidden sm:block">
            Data: {pins.length} titik lokasi aktif
          </p>
        </div>
      </div>
    </section>
  );
}
