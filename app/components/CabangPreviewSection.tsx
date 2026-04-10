import Link from "next/link";
import { MapPin, ChevronRight, Building2 } from "lucide-react";
import { Branch } from "../lib/types";
import BranchCard from "./BranchCard";

interface CabangPreviewSectionProps {
  branches: Branch[];
}

export default function CabangPreviewSection({ branches }: CabangPreviewSectionProps) {
  // Show first 3 branches as preview
  const preview = branches.slice(0, 3);

  return (
    <section
      id="cabang"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="cabang-preview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block bg-primary-light text-secondary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Jaringan Cabang
            </span>
            <h2
              id="cabang-preview-heading"
              className="text-3xl sm:text-4xl font-bold text-secondary"
            >
              Temukan Cabang{" "}
              <span className="text-primary" style={{ WebkitTextFillColor: "unset" }}>
                Adira Finance
              </span>{" "}
              Terdekat
            </h2>
            <p className="text-muted mt-3 max-w-xl">
              Adira Finance memiliki 400+ cabang di seluruh Indonesia. Ajukan
              pinjaman gadai BPKB di cabang terdekat Anda.
            </p>
          </div>
          <Link
            href="/cabang"
            className="flex items-center gap-2 text-secondary hover:text-secondary-dark font-semibold transition-colors whitespace-nowrap shrink-0 group"
            aria-label="Lihat semua cabang Adira Finance"
          >
            Lihat Semua Cabang
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {preview.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {preview.map((branch) => (
              <BranchCard key={branch.branchId} branch={branch} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted-light rounded-3xl mb-10">
            <Building2 size={48} className="text-muted mx-auto mb-4" />
            <p className="text-muted">Data cabang sedang dimuat...</p>
          </div>
        )}

        {/* CTA to full list */}
        <div className="text-center">
          <Link
            href="/cabang"
            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-dark text-white font-bold px-8 py-4 rounded-full transition-colors"
          >
            <MapPin size={18} />
            Lihat Semua {branches.length > 0 ? `${branches.length}+ ` : ""}Cabang Adira Finance
          </Link>
        </div>
      </div>
    </section>
  );
}
