export interface BranchRegion {
  province: {
    provinceId: string;
    province: string;
  };
  district: {
    districtId: string;
    provinceId: string;
    district: string;
    kdArea?: string;
  };
  subDistrict: {
    subDistrictId: string;
    districtId: string;
    subDistrict: string;
  };
}

export interface BranchLink {
  branchId: string;
  name: string;
  slug: string;
  image: string;
}

export interface Branch {
  branchId: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  address: string;
  provinceId: string;
  districtId: string;
  subDistrictId: string;
  postalCode: string;
  telp1: string;
  telp2: string;
  telp3: string;
  fax1: string;
  fax2: string;
  fax3: string;
  latitude: string;
  longitude: string;
  gmapsLink: string;
  createdAt: string;
  updatedAt: string;
  region: BranchRegion;
  nextBranch: BranchLink;
  previousBranch: BranchLink;
}

/** Slim type for the /cabang listing page — only fields BranchCard + BranchSearch actually use.
 *  Keeps the RSC payload small; full Branch is only needed on individual branch detail pages. */
export interface BranchCardData {
  branchId: number;
  name: string;
  slug: string;
  image: string;
  address: string;
  provinceId: string;
  telp1: string;
  region: {
    province: { province: string };
    district: { district: string };
    subDistrict: { subDistrict: string };
  };
}

export interface BranchListResponse {
  code: number;
  status: string;
  data: Branch[];
}

export interface BranchDetailResponse {
  code: number;
  status: string;
  data: Branch;
}

// ── WordPress REST API Types ──────────────────────────────────────────────────

export interface WpMediaSize {
  source_url: string;
  width: number;
  height: number;
}

export interface WpMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      thumbnail?: WpMediaSize;
      medium?: WpMediaSize;
      medium_large?: WpMediaSize;
      large?: WpMediaSize;
      full?: WpMediaSize;
    };
  };
}

export interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  featured_media: number;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
  };
}
