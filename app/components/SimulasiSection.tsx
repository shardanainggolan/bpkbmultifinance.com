"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, X, Maximize2 } from "lucide-react";
import { getWaLink } from "../lib/constants";

function TableLightbox({ onClose }: { onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [onClose]);

  const zoomIn = useCallback(() => setScale((s) => Math.min(s + 0.5, 4)), []);
  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);
  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Mouse drag
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale === 1) return;
      e.preventDefault();
      setDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, px: position.x, py: position.y };
    },
    [scale, position]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setPosition({
          x: dragStart.current.px + (clientX - dragStart.current.x),
          y: dragStart.current.py + (clientY - dragStart.current.y),
        });
      });
    },
    [dragging]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  // Touch pinch-to-zoom
  const lastTouchDist = useRef<number | null>(null);
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastTouchDist.current !== null) {
          const delta = dist - lastTouchDist.current;
          if (rafId.current !== null) cancelAnimationFrame(rafId.current);
          rafId.current = requestAnimationFrame(() => {
            setScale((s) => Math.min(Math.max(s + delta * 0.01, 1), 4));
          });
        }
        lastTouchDist.current = dist;
      }
    },
    []
  );
  const onTouchEnd = useCallback(() => {
    lastTouchDist.current = null;
  }, []);

  // Wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => {
      const next = e.deltaY < 0 ? Math.min(s + 0.25, 4) : Math.max(s - 0.25, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Tabel simulasi pinjaman gadai BPKB"
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={zoomOut}
          disabled={scale <= 1}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 disabled:opacity-30 text-white flex items-center justify-center transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={resetZoom}
          className="h-10 px-4 rounded-full bg-white/20 hover:bg-white/40 text-white text-sm font-mono transition-colors"
          aria-label="Reset zoom"
        >
          {Math.round(scale * 100)}%
        </button>
        <button
          onClick={zoomIn}
          disabled={scale >= 4}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 disabled:opacity-30 text-white flex items-center justify-center transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-red-500 text-white flex items-center justify-center transition-colors ml-1"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>
      </div>

      {/* Zoom hint */}
      {scale === 1 && (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs pointer-events-none select-none">
          Scroll atau pinch untuk zoom · Klik di luar untuk tutup
        </p>
      )}

      {/* Image container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
        style={{ cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default" }}
      >
        <div
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: dragging ? "none" : "transform 0.2s ease",
          }}
          className="relative"
        >
          <Image
            src="/images/table-referenstatif.webp"
            alt="Tabel simulasi referensi pinjaman gadai BPKB Adira Finance"
            width={1200}
            height={900}
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
            draggable={false}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function SimulasiSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      id="simulasi"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="simulasi-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Tabel Simulasi
          </span>
          <h2
            id="simulasi-heading"
            className="text-3xl sm:text-4xl font-bold text-secondary mb-4"
          >
            Simulasi Pinjaman{" "}
            <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
              Gadai BPKB
            </span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Tabel referensi simulasi angsuran pinjaman dana gadai BPKB melalui
            Adira Finance. Klik gambar untuk memperbesar.
          </p>
        </div>

        {/* Table image — clickable */}
        <div className="flex justify-center">
          <div className="relative group w-full max-w-4xl">
            <button
              onClick={() => setLightboxOpen(true)}
              className="relative block w-full rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-primary shadow-md hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
              aria-label="Klik untuk memperbesar tabel simulasi pinjaman"
            >
              <Image
                src="/images/table-referenstatif.webp"
                alt="Tabel simulasi referensi angsuran pinjaman gadai BPKB Adira Finance"
                width={1200}
                height={900}
                className="w-full h-auto object-contain"
                priority
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3 shadow-xl">
                  <Maximize2 size={22} className="text-secondary" />
                  <span className="font-bold text-secondary">Klik untuk perbesar</span>
                </div>
              </div>
            </button>

            {/* Zoom hint badge */}
            <div className="absolute top-4 right-4 bg-primary text-text-on-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow pointer-events-none">
              <ZoomIn size={13} />
              Klik untuk zoom
            </div>
          </div>
        </div>

        {/* Disclaimer + CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 bg-muted-light rounded-2xl px-7 py-6 border border-gray-100">
          <p className="text-muted text-sm leading-relaxed max-w-xl">
            <strong className="text-secondary">Catatan:</strong> Tabel di atas bersifat
            referensi. Nilai pinjaman dan angsuran aktual ditentukan setelah survei
            kendaraan oleh tim Adira Finance.
          </p>
          <a
            href={getWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold px-6 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Ajukan via WhatsApp
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && <TableLightbox onClose={() => setLightboxOpen(false)} />}
    </section>
  );
}
