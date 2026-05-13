"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { BranchCardData } from "../lib/types";
import BranchCard from "./BranchCard";

const PAGE_SIZE = 24;

/** Smart page range: e.g. [1, '…', 5, 6, 7, '…', 20] */
function getPaginationRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

interface BranchSearchProps {
  branches: BranchCardData[];
}

export default function BranchSearch({ branches }: BranchSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedProvince]);

  const provinces = useMemo(() => {
    const map = new Map<string, string>();
    branches.forEach((b) => {
      map.set(b.provinceId, b.region.province.province);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([id, name]) => ({ id, name }));
  }, [branches]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return branches.filter((b) => {
      const matchQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.region.district.district.toLowerCase().includes(q) ||
        b.region.province.province.toLowerCase().includes(q);
      const matchProvince = !selectedProvince || b.provinceId === selectedProvince;
      return matchQuery && matchProvince;
    });
  }, [branches, query, selectedProvince]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hasFilters = query || selectedProvince;

  const clearFilters = () => {
    setQuery("");
    setSelectedProvince("");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll back to the top of the search section smoothly
    document.getElementById("branch-list-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Anchor for scroll-to-top on page change */}
      <div id="branch-list-top" />

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari cabang, kota, atau alamat..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-secondary placeholder:text-slate-400"
            aria-label="Cari cabang Adira Finance"
          />
        </div>

        <div className="relative sm:w-64">
          <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full appearance-none pl-10 pr-10 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-secondary"
            aria-label="Filter berdasarkan provinsi"
          >
            <option value="">Semua Provinsi</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-gray-200 text-muted hover:text-secondary hover:border-secondary transition-colors text-sm font-medium bg-white"
            aria-label="Hapus semua filter"
          >
            <X size={16} />
            Reset
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted text-sm">
          Menampilkan{" "}
          <strong className="text-secondary">
            {filtered.length === 0
              ? 0
              : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)}`}
          </strong>{" "}
          dari <strong className="text-secondary">{filtered.length}</strong> cabang
          {hasFilters ? " yang sesuai" : " Adira Finance"}
        </p>
        {hasFilters && filtered.length === 0 && (
          <button onClick={clearFilters} className="text-sm text-primary font-semibold hover:underline">
            Tampilkan semua
          </button>
        )}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-secondary mb-2">Cabang tidak ditemukan</h3>
          <p className="text-muted mb-6">
            Tidak ada cabang Adira Finance yang sesuai dengan pencarian &ldquo;{query || selectedProvince}&rdquo;.
          </p>
          <button
            onClick={clearFilters}
            className="bg-primary hover:bg-primary-dark text-text-on-primary font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Lihat Semua Cabang
          </button>
        </div>
      )}

      {/* Grid — only renders current page (PAGE_SIZE cards), not all 400+ */}
      {paginated.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((branch) => (
            <BranchCard key={branch.branchId} branch={branch} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-1.5 mt-12"
          aria-label="Navigasi halaman cabang"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-muted hover:border-secondary hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft size={16} />
          </button>

          {getPaginationRange(currentPage, totalPages).map((page, i) =>
            page === "…" ? (
              <span
                key={`ellipsis-${i}`}
                className="flex items-center justify-center w-9 h-9 text-slate-400 text-sm select-none"
              >
                ···
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`flex items-center justify-center w-9 h-9 rounded-xl border text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "bg-secondary border-secondary text-white"
                    : "border-gray-200 bg-white text-secondary hover:border-secondary"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-muted hover:border-secondary hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </div>
  );
}
