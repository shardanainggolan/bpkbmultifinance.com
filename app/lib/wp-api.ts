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

// WordPress `wptexturize()` converts typographic characters (hyphen → en-dash,
// straight quotes → smart quotes, ...) and the REST API returns them as
// numeric HTML entities (&#8211;, &#8217;, etc). React renders them as
// literal text, so we must decode before display.
export function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  return text
    // Decimal numeric entities: &#8211; → –
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    // Hex numeric entities: &#x2013; → –
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    // Named entities (order matters: &amp; last so it doesn't double-decode)
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&copy;/g, "©")
    .replace(/&reg;/g, "®")
    .replace(/&trade;/g, "™")
    .replace(/&amp;/g, "&");
}

// Normalize a post coming from WP REST API so display-ready fields contain
// real characters instead of HTML entities. Keeps `content.rendered` untouched
// because it's injected via dangerouslySetInnerHTML and the browser decodes it.
function normalizePost(post: WpPost): WpPost {
  return {
    ...post,
    title: { ...post.title, rendered: decodeHtmlEntities(post.title.rendered) },
    excerpt: { ...post.excerpt, rendered: decodeHtmlEntities(post.excerpt.rendered) },
  };
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
    const raw: WpPost[] = await res.json();
    const posts = raw.map(normalizePost);
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
    return posts[0] ? normalizePost(posts[0]) : null;
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
    const raw: WpPost[] = await res.json();
    return raw.map(normalizePost);
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
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadTime(html: string): number {
  const wordCount = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
