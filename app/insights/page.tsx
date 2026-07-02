import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getArticles } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Market Insights | Staten Island Commercial Real Estate",
  description:
    "Market reports, deal spotlights, and investment insights from Schneider Realty Services — Staten Island's commercial investment specialist.",
};

const CATEGORY_LABELS: Record<string, string> = {
  "market-report": "Market Report",
  insight: "Insight",
  "deal-spotlight": "Deal Spotlight",
  "industry-news": "Industry News",
};

export default async function InsightsPage() {
  const articles = await getArticles();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-20">
        <div className="container-site mb-12">
          <p className="eyebrow mb-4">Market Intelligence</p>
          <h1 className="text-display-lg text-ink" style={{ fontVariationSettings: '"opsz" 56' }}>
            Insights from the field.
          </h1>
          <p className="text-slate mt-4 max-w-lg leading-relaxed">
            Original research, deal commentary, and market analysis from the
            only broker focused exclusively on Staten Island&apos;s commercial
            investment market.
          </p>
        </div>

        <div className="container-site">
          {articles.length === 0 && (
            <p className="text-slate py-16 text-center">No articles yet — check back soon.</p>
          )}

          {/* Featured article */}
          {articles[0] && (
            <Link href={`/insights/${articles[0].slug}`} className="group block mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-paper-mid">
                {articles[0].coverImage && (
                  <div className="relative h-72 lg:h-full bg-harbor-800 overflow-hidden">
                    <Image
                      src={articles[0].coverImage.src}
                      alt={articles[0].coverImage.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}
                <div className="p-8 bg-paper flex flex-col justify-center">
                  <p className="font-mono text-[10px] text-signal tracking-[0.2em] uppercase mb-3">
                    {CATEGORY_LABELS[articles[0].category]} · {articles[0].readingTimeMinutes} min read
                  </p>
                  <h2 className="font-display text-2xl font-bold text-ink group-hover:text-harbor transition-colors mb-4 leading-tight">
                    {articles[0].title}
                  </h2>
                  <p className="text-slate leading-relaxed mb-6 line-clamp-3">{articles[0].excerpt}</p>
                  <div className="flex items-center gap-3 text-label text-slate/60">
                    <span>{articles[0].author.name}</span>
                    <span>·</span>
                    <time dateTime={articles[0].publishedDate}>{formatDate(articles[0].publishedDate)}</time>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining articles */}
          {articles.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <Link key={article._id} href={`/insights/${article.slug}`} className="group">
                  {article.coverImage && (
                    <div className="relative h-44 bg-harbor-800 overflow-hidden mb-4">
                      <Image
                        src={article.coverImage.src}
                        alt={article.coverImage.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                    </div>
                  )}
                  <p className="font-mono text-[10px] text-signal tracking-[0.2em] uppercase mb-2">
                    {CATEGORY_LABELS[article.category]} · {article.readingTimeMinutes} min
                  </p>
                  <h2 className="font-display text-lg font-semibold text-ink group-hover:text-harbor transition-colors mb-2 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate line-clamp-2 leading-relaxed mb-3">{article.excerpt}</p>
                  <div className="text-label text-slate/50">
                    <time dateTime={article.publishedDate}>{formatDate(article.publishedDate)}</time>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
