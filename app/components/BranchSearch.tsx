"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { Branch } from "../lib/types";
import BranchCard from "./BranchCard";

interface BranchSearchProps {
  branches: Branch[];
}

export default function BranchSearch({ branches }: BranchSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  // Build unique provinces
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

  const clearFilters = () => {
    setQuery("");
    setSelectedProvince("");
  };

  const hasFilters = query || selectedProvince;

  return (
    <div>
      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search input */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari cabang, kota, atau alamat..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-secondary placeholder:text-slate-400"
            aria-label="Cari cabang Adira Finance"
          />
        </div>

        {/* Province filter */}
        <div className="relative sm:w-64">
          <Filter
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full appearance-none pl-10 pr-10 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-secondary"
            aria-label="Filter berdasarkan provinsi"
          >
            <option value="">Semua Provinsi</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
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
          <strong className="text-secondary">{filtered.length}</strong> dari{" "}
          {branches.length} cabang Adira Finance
        </p>
        {hasFilters && filtered.length === 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Tampilkan semua
          </button>
        )}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-secondary mb-2">
            Cabang tidak ditemukan
          </h3>
          <p className="text-muted mb-6">
            Tidak ada cabang Adira Finance yang sesuai dengan pencarian "
            {query || selectedProvince}".
          </p>
          <button
            onClick={clearFilters}
            className="bg-primary hover:bg-primary-dark text-text-on-primary font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Lihat Semua Cabang
          </button>
        </div>
      )}

      {/* Grid results */}
      {filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((branch) => (
            <BranchCard key={branch.branchId} branch={branch} />
          ))}
        </div>
      )}
    </div>
  );
}
