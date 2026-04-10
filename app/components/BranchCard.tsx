import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight } from "lucide-react";
import { Branch } from "../lib/types";
import { getBranchImageUrl } from "../lib/api";

interface BranchCardProps {
  branch: Branch;
}

export default function BranchCard({ branch }: BranchCardProps) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-secondary overflow-hidden">
        <Image
          src={getBranchImageUrl(branch.image)}
          alt={`Cabang Adira Finance ${branch.name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Province badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-text-on-primary text-xs font-bold px-3 py-1 rounded-full">
            {branch.region.province.province}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-secondary text-base leading-snug mb-2 group-hover:text-secondary-dark">
          {branch.name}
        </h3>

        <div className="flex items-start gap-2 text-muted text-sm mb-1">
          <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
          <span className="leading-relaxed line-clamp-2">{branch.address}</span>
        </div>

        <p className="text-xs text-muted mb-4">
          {branch.region.subDistrict.subDistrict},{" "}
          {branch.region.district.district}
        </p>

        {branch.telp1 && (
          <p className="text-sm text-secondary font-medium mb-4">
            📞 {branch.telp1}
          </p>
        )}

        <div className="mt-auto">
          <Link
            href={`/cabang/${branch.slug}`}
            className="flex items-center justify-between w-full bg-secondary hover:bg-secondary-dark text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors group"
          >
            <span>Lihat Detail & Ajukan</span>
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
