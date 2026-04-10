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
