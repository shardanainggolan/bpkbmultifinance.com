import { Branch, BranchListResponse, BranchDetailResponse } from "./types";
import { API_BASE_URL } from "./constants";

const API_KEY = "cc9796f293972e92fb38e9e04c2687210e0e82c45cae973c4bba9ea55afc601c";

const API_HEADERS: HeadersInit = {
  "x-api-key": API_KEY,
  "Content-Type": "application/json",
};

export async function getBranches(): Promise<Branch[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/branch`, {
      headers: API_HEADERS,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json: BranchListResponse = await res.json();
    if (json.code !== 200 || !Array.isArray(json.data)) return [];
    return json.data;
  } catch {
    return [];
  }
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/branch/slug/${slug}`, {
      headers: API_HEADERS,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json: BranchDetailResponse = await res.json();
    if (json.code !== 200 || !json.data) return null;
    return json.data;
  } catch {
    return null;
  }
}

export function getBranchImageUrl(image: string): string {
  if (!image) return "/images/placeholder-branch.webp";
  if (image.startsWith("http")) return image;
  return `https://backend.bpkbmultifinance.id/uploads/branches/${image}`;
}

// ── Nearby branches (Haversine) ───────────────────────────────────────────────

export interface NearbyBranch {
  branchId: number;
  name: string;
  slug: string;
  image: string;
  district: string;
  province: string;
  distanceKm: number;
}

function parseCoord(s: string | null | undefined): number | null {
  if (!s) return null;
  const n = parseFloat(s);
  if (!Number.isFinite(n) || n === 0) return null;
  return n;
}

// Great-circle distance in km between two lat/lng points.
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function getNearbyBranches(
  current: Branch,
  all: Branch[],
  limit = 3,
): NearbyBranch[] {
  const lat = parseCoord(current.latitude);
  const lng = parseCoord(current.longitude);
  if (lat === null || lng === null) return [];

  return all
    .filter((b) => b.branchId !== current.branchId)
    .map((b): NearbyBranch | null => {
      const bLat = parseCoord(b.latitude);
      const bLng = parseCoord(b.longitude);
      if (bLat === null || bLng === null) return null;
      return {
        branchId: b.branchId,
        name: b.name,
        slug: b.slug,
        image: b.image,
        district: b.region.district.district,
        province: b.region.province.province,
        distanceKm: haversineKm(lat, lng, bLat, bLng),
      };
    })
    .filter((b): b is NearbyBranch => b !== null)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}
