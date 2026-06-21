import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight, Navigation } from "lucide-react";
import { NearbyBranch, getBranchImageUrl } from "../lib/api";

interface NearbyBranchesProps {
  branches: NearbyBranch[];
  currentName: string;
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

export default function NearbyBranches({ branches, currentName }: NearbyBranchesProps) {
  if (branches.length === 0) return null;

  return (
    <nav aria-label="Cabang Adira Finance terdekat">
      <div className="flex items-start gap-2 mb-1">
        <Navigation size={18} className="text-primary shrink-0 mt-1" />
        <h2 className="text-lg font-bold text-secondary">
          Cabang Adira Finance Terdekat
        </h2>
      </div>
      <p className="text-muted text-sm mb-5 pl-7">
        Cabang resmi lainnya di sekitar {currentName}, diurutkan berdasarkan jarak.
      </p>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((b) => (
          <li key={b.branchId}>
            <Link
              href={`/cabang/${b.slug}`}
              className="group h-full bg-white rounded-2xl border border-gray-100 hover:border-secondary hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-16/9 bg-secondary overflow-hidden">
                {b.image && (
                  <Image
                    src={getBranchImageUrl(b.image)}
                    alt={`Kantor ${b.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <span
                  className="absolute top-2 right-2 inline-flex items-center gap-1 bg-primary text-text-on-primary text-[11px] font-bold px-2 py-1 rounded-full shadow-md"
                  title={`Jarak garis lurus dari ${currentName}`}
                >
                  <Navigation size={10} />
                  {formatDistance(b.distanceKm)}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-secondary text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-secondary-light transition-colors">
                  {b.name}
                </h3>
                <p className="flex items-center gap-1 text-muted text-xs mb-3">
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{b.district}</span>
                </p>
                <span className="inline-flex items-center gap-1 text-secondary text-xs font-semibold mt-auto group-hover:gap-2 transition-all">
                  Lihat cabang <ChevronRight size={12} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
