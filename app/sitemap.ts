import type { MetadataRoute } from "next";
import { getBranches } from "./lib/api";
import { SITE_URL } from "./lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const branches = await getBranches();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/cabang`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/agen-axi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const branchRoutes: MetadataRoute.Sitemap = branches.map((branch) => ({
    url: `${SITE_URL}/cabang/${branch.slug}`,
    lastModified: branch.updatedAt ? new Date(branch.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...branchRoutes];
}
