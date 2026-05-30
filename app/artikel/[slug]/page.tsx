import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, BookOpen } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ShareButtons from "../../components/artikel/ShareButtons";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
  getPostImage,
  formatDate,
  stripHtml,
  estimateReadTime,
} from "../../lib/wp-api";
import { SITE_URL, getWaLink } from "../../lib/constants";
import { breadcrumbSchema } from "../../lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);
  if (!post) return { title: "Artikel tidak ditemukan" };

  const title = `${post.title.rendered} | BPKB Multi Finance`;
  const description = stripHtml(post.excerpt.rendered).slice(0, 160);
  const img = getPostImage(post, "full") ?? getPostImage(post, "medium_large");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/artikel/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: img
        ? [{ url: img.url, alt: img.alt, width: img.width, height: img.height }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: img ? [img.url] : [],
    },
    alternates: { canonical: `${SITE_URL}/artikel/${slug}` },
  };
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;

  const post = await getArticleBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedArticles(post.id, 3);

  const heroImg = getPostImage(post, "full") ?? getPostImage(post, "medium_large");
  const readTime = estimateReadTime(post.content.rendered);
  const pageUrl = `${SITE_URL}/artikel/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.rendered,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
    datePublished: post.date,
    dateModified: post.modified,
    url: pageUrl,
    image: heroImg ? [heroImg.url] : undefined,
    publisher: {
      "@type": "Organization",
      name: "BPKB Multi Finance - Agen Resmi Adira Finance",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo-agen-axi-adira.png`,
      },
    },
    author: {
      "@type": "Person",
      name: "Tim BPKB Multi Finance",
      affiliation: {
        "@type": "Organization",
        name: "PT Adira Dinamika Multi Finance Tbk",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Artikel", url: `${SITE_URL}/artikel` },
    { name: post.title.rendered, url: pageUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />
      <main className="min-h-screen bg-white pt-24 lg:pt-28">
        {/* Hero image */}
        {heroImg && (
          <div className="w-full overflow-hidden bg-muted-light" style={{ maxHeight: "480px" }}>
            <Image
              src={heroImg.url}
              alt={heroImg.alt || post.title.rendered}
              width={heroImg.width}
              height={heroImg.height}
              className="w-full object-cover object-center"
              style={{ maxHeight: "480px" }}
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Article wrapper */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-sm text-muted mb-8"
          >
            <Link href="/" className="hover:text-secondary transition-colors">
              Beranda
            </Link>
            <ChevronRight size={13} />
            <Link href="/artikel" className="hover:text-secondary transition-colors">
              Artikel
            </Link>
            <ChevronRight size={13} />
            <span className="text-secondary font-medium line-clamp-1">
              {post.title.rendered}
            </span>
          </nav>

          {/* Article header */}
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary leading-tight mb-5">
              {post.title.rendered}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} />
                {readTime} menit baca
              </span>
            </div>
          </header>

          {/* Content */}
          <article
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Share + CTA */}
          <div className="mt-10 pt-8 border-t border-gray-100 space-y-6">
            <ShareButtons url={pageUrl} title={post.title.rendered} />

            {/* Soft CTA */}
            <div className="bg-secondary rounded-2xl p-6">
              <p className="text-white font-semibold mb-1">
                Butuh dana cepat dengan jaminan BPKB?
              </p>
              <p className="text-slate-300 text-sm mb-4">
                Adira Finance memproses pengajuan gadai BPKB dalam 1–3 hari kerja.
              </p>
              <a
                href={getWaLink("Halo, saya ingin mengajukan pinjaman gadai BPKB di Adira Finance.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-text-on-primary font-bold px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Ajukan via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section className="bg-muted-light py-14 mt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-secondary">Artikel Lainnya</h2>
                <Link
                  href="/artikel"
                  className="text-sm font-semibold text-secondary hover:text-secondary-dark transition-colors flex items-center gap-1"
                >
                  Semua Artikel <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => {
                  const img =
                    getPostImage(rel, "medium_large") ?? getPostImage(rel, "medium");
                  return (
                    <article
                      key={rel.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-secondary hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      <Link
                        href={`/artikel/${rel.slug}`}
                        className="block overflow-hidden bg-muted-light"
                        style={{ aspectRatio: "16/9" }}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {img ? (
                          <Image
                            src={img.url}
                            alt={img.alt || rel.title.rendered}
                            width={img.width}
                            height={img.height}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen size={24} className="text-muted/30" />
                          </div>
                        )}
                      </Link>

                      <div className="p-5 flex flex-col flex-1">
                        <time
                          dateTime={rel.date}
                          className="text-xs text-muted mb-2 block"
                        >
                          {formatDate(rel.date)}
                        </time>
                        <Link href={`/artikel/${rel.slug}`}>
                          <h3 className="text-secondary font-semibold leading-snug line-clamp-2 group-hover:text-secondary-light transition-colors">
                            {rel.title.rendered}
                          </h3>
                        </Link>
                        <Link
                          href={`/artikel/${rel.slug}`}
                          className="inline-flex items-center gap-1 text-secondary text-sm font-semibold mt-auto pt-4 hover:gap-2.5 transition-all"
                        >
                          Baca <ChevronRight size={14} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
