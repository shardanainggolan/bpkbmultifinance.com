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
  return `https://backend.adiracabang.id/uploads/branches/${image}`;
}
