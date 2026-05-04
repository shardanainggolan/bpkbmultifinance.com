"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

export interface BranchMapPin {
  branchId: number;
  name: string;
  slug: string;
  address: string;
  latitude: string;
  longitude: string;
  district: string;
  province: string;
}

interface Props {
  pins: BranchMapPin[];
}

export default function BranchMapLeaflet({ pins }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accuracyCircleRef = useRef<any>(null);
  const locateFnRef = useRef<(() => void) | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let isMounted = true;

    import("leaflet").then(({ default: L }) => {
      if (!isMounted || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: [-2.5, 118],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });
      mapRef.current = map;

      // Enable scroll zoom after first map click (avoids accidental zoom while scrolling page)
      map.once("click", () => map.scrollWheelZoom.enable());

      // CartoDB Voyager — modern colorful tiles, no API key required
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // ── Branch markers ───────────────────────────────────────────────────
      const normalIcon = L.divIcon({
        className: "",
        html: `<div style="width:10px;height:10px;background:#ffdd00;border:2px solid #1e3a5f;border-radius:50%;box-shadow:0 1px 4px rgba(30,58,95,0.45)"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        popupAnchor: [0, -8],
      });

      const hoverIcon = L.divIcon({
        className: "",
        html: `<div style="width:16px;height:16px;background:#ffdd00;border:2.5px solid #1e3a5f;border-radius:50%;box-shadow:0 3px 10px rgba(30,58,95,0.55)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -11],
      });

      const validLatLngs: [number, number][] = [];

      pins.forEach((pin) => {
        const lat = parseFloat(pin.latitude);
        const lng = parseFloat(pin.longitude);
        if (isNaN(lat) || isNaN(lng)) return;
        validLatLngs.push([lat, lng]);

        const marker = L.marker([lat, lng], { icon: normalIcon });

        marker.bindPopup(
          `<div style="min-width:210px;font-family:system-ui,-apple-system,sans-serif;">
            <div style="font-size:10px;color:#94a3b8;margin-bottom:3px;text-transform:uppercase;letter-spacing:.6px;font-weight:500;">${pin.district}&nbsp;·&nbsp;${pin.province}</div>
            <div style="font-size:13px;font-weight:700;color:#1e3a5f;margin-bottom:6px;line-height:1.35;">${pin.name}</div>
            <div style="font-size:11px;color:#64748b;margin-bottom:12px;line-height:1.6;">${pin.address}</div>
            <a href="/cabang/${pin.slug}"
               style="display:block;text-align:center;background:#1e3a5f;color:white;padding:8px 0;border-radius:8px;font-size:11px;font-weight:600;text-decoration:none;">
              Lihat Detail &amp; Ajukan &rarr;
            </a>
          </div>`,
          { maxWidth: 250, className: "branch-popup" }
        );

        marker.on("mouseover", () => {
          marker.setIcon(hoverIcon);
          marker.openPopup();
        });
        marker.on("mouseout", () => marker.setIcon(normalIcon));

        marker.addTo(map);
      });

      // Fit all branch markers into view
      if (validLatLngs.length > 0) {
        try {
          map.fitBounds(L.latLngBounds(validLatLngs), {
            padding: [40, 40],
            maxZoom: 7,
          });
        } catch {
          map.setView([-2.5, 118], 5);
        }
      }

      // ── Geolocation ──────────────────────────────────────────────────────
      const locateUser = () => {
        if (!navigator.geolocation) return;
        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (!isMounted) return;
            setIsLocating(false);

            const { latitude, longitude, accuracy } = pos.coords;

            // Remove previous user position layers
            if (userMarkerRef.current) {
              map.removeLayer(userMarkerRef.current);
              userMarkerRef.current = null;
            }
            if (accuracyCircleRef.current) {
              map.removeLayer(accuracyCircleRef.current);
              accuracyCircleRef.current = null;
            }

            // Accuracy radius circle
            accuracyCircleRef.current = L.circle([latitude, longitude], {
              radius: accuracy,
              color: "#3b82f6",
              fillColor: "#3b82f6",
              fillOpacity: 0.12,
              weight: 1.5,
              opacity: 0.5,
            }).addTo(map);

            // Pulsing blue dot for user position
            const userIcon = L.divIcon({
              className: "",
              html: `<div style="position:relative;width:18px;height:18px">
                <div style="position:absolute;inset:-6px;border-radius:50%;background:rgba(59,130,246,0.22);animation:pulse-user 2s ease-out infinite"></div>
                <div style="position:absolute;inset:0;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(59,130,246,0.55)"></div>
              </div>`,
              iconSize: [18, 18],
              iconAnchor: [9, 9],
              popupAnchor: [0, -12],
            });

            userMarkerRef.current = L.marker([latitude, longitude], {
              icon: userIcon,
              zIndexOffset: 1000,
            })
              .bindPopup(
                `<div style="font-family:system-ui,sans-serif;padding:2px">
                  <div style="font-weight:700;color:#1e3a5f;margin-bottom:4px;font-size:13px">&#128205; Lokasi Anda</div>
                  <div style="color:#64748b;font-size:11px">Akurasi: &plusmn;${Math.round(accuracy)} meter</div>
                </div>`,
                { maxWidth: 180 }
              )
              .addTo(map);

            userMarkerRef.current.openPopup();
            // Smooth zoom-in to user location
            map.setView([latitude, longitude], 13, { animate: true, duration: 1.2 });
          },
          () => {
            // User denied permission or geolocation unavailable — fail silently
            if (!isMounted) return;
            setIsLocating(false);
          },
          { timeout: 10000, maximumAge: 60000 }
        );
      };

      locateFnRef.current = locateUser;
      // Auto-detect location as soon as map is ready
      locateUser();
    });

    return () => {
      isMounted = false;
      locateFnRef.current = null;
      userMarkerRef.current = null;
      accuracyCircleRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative h-full w-full">
      {/* Leaflet map container */}
      <div ref={containerRef} className="h-full w-full" />

      {/* Locate Me button — top-right, above Leaflet controls */}
      <button
        onClick={() => locateFnRef.current?.()}
        disabled={isLocating}
        className="absolute top-3 right-3 z-1001 w-10 h-10 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
        title={isLocating ? "Mendeteksi lokasi..." : "Temukan Lokasi Saya"}
        aria-label="Temukan lokasi saya di peta"
      >
        {isLocating ? (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        )}
      </button>
    </div>
  );
}
