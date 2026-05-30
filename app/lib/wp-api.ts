import { WpPost, WpMedia, WpMediaSize } from "./types";

const WP_API = process.env.CMS_API_URL!;
const WP_API_KEY = process.env.WP_API_KEY;
const WP_CAT_ID = 26;
const WP_PER_PAGE = 12;

function wpHeaders(): HeadersInit {
  return WP_API_KEY ? { "x-api-key": WP_API_KEY } : {};
}

async function wpFetch(path: string, revalidate = 3600): Promise<Response> {
  return fetch(`${WP_API}${path}`, {
    headers: wpHeaders(),
    next: { revalidate },
  });
}

export async function getArticles(page = 1): Promise<{
  posts: WpPost[];
  totalPages: number;
  total: number;
}> {
  try {
    const res = await wpFetch(
      `/posts?categories=${WP_CAT_ID}&page=${page}&per_page=${WP_PER_PAGE}&_embed=wp:featuredmedia`
    );
    if (!res.ok) return { posts: [], totalPages: 0, total: 0 };
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "0", 10);
    const total = parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
    const posts: WpPost[] = await res.json();
    return { posts, totalPages, total };
  } catch {
    return { posts: [], totalPages: 0, total: 0 };
  }
}

export async function getAllArticleSlugs(): Promise<string[]> {
  try {
    const res = await wpFetch(
      `/posts?categories=${WP_CAT_ID}&per_page=100&_fields=slug`
    );
    if (!res.ok) return [];
    const posts: { slug: string }[] = await res.json();
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<WpPost | null> {
  try {
    const res = await wpFetch(
      `/posts?slug=${encodeURIComponent(slug)}&categories=${WP_CAT_ID}&_embed=wp:featuredmedia`
    );
    if (!res.ok) return null;
    const posts: WpPost[] = await res.json();
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedArticles(
  excludeId: number,
  limit = 3
): Promise<WpPost[]> {
  try {
    const res = await wpFetch(
      `/posts?categories=${WP_CAT_ID}&exclude=${excludeId}&per_page=${limit}&_embed=wp:featuredmedia`
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

type ImageSize = "thumbnail" | "medium" | "medium_large" | "large" | "full";

export function getPostImage(
  post: WpPost,
  size: ImageSize = "medium_large"
): { url: string; alt: string; width: number; height: number } | null {
  const media: WpMedia | undefined =
    post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;

  const sized: WpMediaSize | undefined = media.media_details?.sizes?.[size];
  if (sized) {
    return {
      url: sized.source_url,
      alt: media.alt_text || "",
      width: sized.width,
      height: sized.height,
    };
  }

  // Fallback to next available size
  const fallbackOrder: ImageSize[] = ["full", "medium_large", "large", "medium", "thumbnail"];
  for (const s of fallbackOrder) {
    const f = media.media_details?.sizes?.[s];
    if (f) {
      return { url: f.source_url, alt: media.alt_text || "", width: f.width, height: f.height };
    }
  }

  return {
    url: media.source_url,
    alt: media.alt_text || "",
    width: media.media_details?.width ?? 800,
    height: media.media_details?.height ?? 600,
  };
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadTime(html: string): number {
  const wordCount = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
