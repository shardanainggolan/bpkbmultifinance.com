import type { MetadataRoute } from "next";
import { getBranches } from "./lib/api";
import { getAllArticleSlugs } from "./lib/wp-api";
import { SITE_URL } from "./lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [branches, articleSlugs] = await Promise.all([
    getBranches(),
    getAllArticleSlugs(),
  ]);

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
    {
      url: `${SITE_URL}/gadai-bpkb-mobil`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/gadai-bpkb-motor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tentang-adira-finance`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/simulasi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/artikel`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const branchRoutes: MetadataRoute.Sitemap = branches.map((branch) => ({
    url: `${SITE_URL}/cabang/${branch.slug}`,
    lastModified: branch.updatedAt ? new Date(branch.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${SITE_URL}/artikel/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...branchRoutes, ...articleRoutes];
}
