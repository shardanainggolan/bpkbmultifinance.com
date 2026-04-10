import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BranchLink } from "../lib/types";
import { getBranchImageUrl } from "../lib/api";

interface BranchNavigationProps {
  previous: BranchLink;
  next: BranchLink;
}

export default function BranchNavigation({ previous, next }: BranchNavigationProps) {
  const hasPrev = !!previous.branchId;
  const hasNext = !!next.branchId;

  if (!hasPrev && !hasNext) return null;

  return (
    <nav
      className="grid sm:grid-cols-2 gap-4"
      aria-label="Navigasi cabang sebelumnya dan berikutnya"
    >
      {/* Previous */}
      <div>
        {hasPrev ? (
          <Link
            href={`/cabang/${previous.slug}`}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-200 group"
            aria-label={`Cabang sebelumnya: ${previous.name}`}
          >
            <ChevronLeft
              size={20}
              className="text-muted group-hover:text-primary transition-colors shrink-0"
            />
            <div className="flex items-center gap-3 min-w-0">
              {previous.image && (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-secondary">
                  <Image
                    src={getBranchImageUrl(previous.image)}
                    alt={previous.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs text-muted mb-0.5">Cabang Sebelumnya</p>
                <p className="font-semibold text-secondary text-sm truncate">
                  {previous.name}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 opacity-50 cursor-not-allowed">
            <p className="text-xs text-muted">Tidak ada cabang sebelumnya</p>
          </div>
        )}
      </div>

      {/* Next */}
      <div>
        {hasNext ? (
          <Link
            href={`/cabang/${next.slug}`}
            className="flex items-center justify-end gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-200 group text-right"
            aria-label={`Cabang berikutnya: ${next.name}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="min-w-0">
                <p className="text-xs text-muted mb-0.5">Cabang Berikutnya</p>
                <p className="font-semibold text-secondary text-sm truncate">
                  {next.name}
                </p>
              </div>
              {next.image && (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-secondary">
                  <Image
                    src={getBranchImageUrl(next.image)}
                    alt={next.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              )}
            </div>
            <ChevronRight
              size={20}
              className="text-muted group-hover:text-primary transition-colors shrink-0"
            />
          </Link>
        ) : (
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 opacity-50 cursor-not-allowed text-right">
            <p className="text-xs text-muted">Tidak ada cabang berikutnya</p>
          </div>
        )}
      </div>
    </nav>
  );
}
