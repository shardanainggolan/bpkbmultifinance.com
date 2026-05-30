import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getArticles, getPostImage, formatDate, stripHtml } from "../lib/wp-api";
import { SITE_URL } from "../lib/constants";
import { breadcrumbSchema } from "../lib/schema";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Artikel Seputar Gadai BPKB & Keuangan | BPKB Multi Finance",
  description:
    "Baca artikel informatif seputar gadai BPKB, tips pinjaman dana, dan panduan keuangan dari Adira Finance. Informasi terpercaya untuk bantu Anda mengambil keputusan finansial yang tepat.",
  openGraph: {
    title: "Artikel Seputar Gadai BPKB & Keuangan | BPKB Multi Finance",
    description:
      "Baca artikel informatif seputar gadai BPKB, tips pinjaman dana, dan panduan keuangan dari Adira Finance.",
    url: `${SITE_URL}/artikel`,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${SITE_URL}/artikel` },
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ArtikelPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const { posts, totalPages, total } = await getArticles(currentPage);

  const breadcrumb = breadcrumbSchema([
    { name: "Beranda", url: SITE_URL },
    { name: "Artikel", url: `${SITE_URL}/artikel` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />
      <main className="min-h-screen bg-white pt-24 lg:pt-28">
        {/* Page header */}
        <section className="bg-secondary py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Artikel & Tips Keuangan
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Artikel Seputar Gadai BPKB & Keuangan
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Tips pinjaman dana, panduan gadai BPKB, dan informasi produk keuangan yang
              ditulis oleh tim Adira Finance.
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-secondary transition-colors">
              Beranda
            </Link>
            <ChevronRight size={14} />
            <span className="text-secondary font-medium">Artikel</span>
          </nav>
        </div>

        {/* Content area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
          {posts.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-muted-light rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen size={36} className="text-muted" />
              </div>
              <h2 className="text-xl font-semibold text-secondary mb-3">
                Belum ada artikel
              </h2>
              <p className="text-muted max-w-md mx-auto leading-relaxed">
                Artikel seputar gadai BPKB dan keuangan akan segera tersedia. Kunjungi
                halaman ini kembali dalam waktu dekat.
              </p>
              <Link
                href="/"
                className="inline-block mt-8 bg-secondary text-white px-7 py-3 rounded-full font-semibold hover:bg-secondary-dark transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          ) : (
            <>
              {/* Article count */}
              <p className="text-sm text-muted mb-7">
                {total} artikel tersedia
                {totalPages > 1 && ` · halaman ${currentPage} dari ${totalPages}`}
              </p>

              {/* Article grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {posts.map((post) => {
                  const img =
                    getPostImage(post, "medium_large") ?? getPostImage(post, "medium");
                  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 150);

                  return (
                    <article
                      key={post.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-secondary hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      {/* Thumbnail */}
                      <Link
                        href={`/artikel/${post.slug}`}
                        className="block overflow-hidden bg-muted-light"
                        style={{ aspectRatio: "16/9" }}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {img ? (
                          <Image
                            src={img.url}
                            alt={img.alt || post.title.rendered}
                            width={img.width}
                            height={img.height}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen size={32} className="text-muted/30" />
                          </div>
                        )}
                      </Link>

                      {/* Card body */}
                      <div className="p-6 flex flex-col flex-1">
                        <time
                          dateTime={post.date}
                          className="text-xs text-muted mb-3 block"
                        >
                          {formatDate(post.date)}
                        </time>

                        <Link href={`/artikel/${post.slug}`}>
                          <h2 className="text-secondary font-bold text-lg leading-snug mb-3 group-hover:text-secondary-light transition-colors line-clamp-2">
                            {post.title.rendered}
                          </h2>
                        </Link>

                        <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1">
                          {excerpt}
                        </p>

                        <Link
                          href={`/artikel/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm mt-5 hover:gap-3 transition-all"
                        >
                          Baca Selengkapnya
                          <ChevronRight size={15} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Navigasi halaman artikel"
                  className="flex items-center justify-center gap-3 mt-14"
                >
                  {currentPage > 1 && (
                    <Link
                      href={
                        currentPage - 1 === 1 ? "/artikel" : `/artikel?page=${currentPage - 1}`
                      }
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-secondary font-medium text-sm hover:border-secondary hover:bg-muted-light transition-colors"
                    >
                      <ChevronLeft size={15} />
                      Sebelumnya
                    </Link>
                  )}
                  <span className="text-sm text-muted px-2">
                    {currentPage} / {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/artikel?page=${currentPage + 1}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-secondary font-medium text-sm hover:border-secondary hover:bg-muted-light transition-colors"
                    >
                      Selanjutnya
                      <ChevronRight size={15} />
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
