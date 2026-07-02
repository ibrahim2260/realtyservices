import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LinkButton, ArrowRight } from "@/components/ui/Button";
import { getArticleBySlug, getArticles } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedDate,
      authors: [article.author.name],
      images: article.coverImage ? [{ url: article.coverImage.src }] : [],
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  "market-report": "Market Report",
  insight: "Insight",
  "deal-spotlight": "Deal Spotlight",
  "industry-news": "Industry News",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedDate,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Schneider Realty Services",
      url: "https://schneiderrealty.com",
    },
  };

  // Parse simple markdown headings and paragraphs
  const sections = article.body.split("\n\n").filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content" className="pt-24">
        {/* Breadcrumb */}
        <div className="container-site py-4">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-ink">Insights</Link>
            <span>/</span>
            <span className="text-ink truncate max-w-xs">{article.title}</span>
          </nav>
        </div>

        {/* Cover */}
        {article.coverImage && (
          <div className="relative h-[40vh] max-h-[480px] bg-harbor-800">
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
        )}

        {/* Article */}
        <div className="container-site max-w-4xl py-12">
          {/* Category */}
          <p className="font-mono text-[10px] text-signal tracking-[0.2em] uppercase mb-4">
            {CATEGORY_LABELS[article.category]} · {article.readingTimeMinutes} min read
          </p>

          {/* Title */}
          <h1
            className="text-display-lg text-ink mb-4 leading-tight"
            style={{ fontVariationSettings: '"opsz" 56' }}
          >
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-paper-mid">
            <div>
              <p className="text-sm font-semibold text-ink">{article.author.name}</p>
              <time dateTime={article.publishedDate} className="text-xs text-slate">
                {formatDate(article.publishedDate)}
              </time>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-slate leading-relaxed mb-10 italic border-l-2 border-brass pl-5">
            {article.excerpt}
          </p>

          {/* Body — render simple markdown */}
          <div className="space-y-6">
            {sections.map((section, i) => {
              if (section.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-display text-2xl font-semibold text-ink mt-10 mb-2">
                    {section.replace(/^## /, "")}
                  </h2>
                );
              }
              if (section.startsWith("---")) {
                return <hr key={i} className="border-paper-mid my-8" />;
              }
              if (section.startsWith("*") && section.endsWith("*")) {
                return (
                  <p key={i} className="text-sm text-slate/60 italic leading-relaxed border-l border-paper-mid pl-4">
                    {section.replace(/^\*/, "").replace(/\*$/, "")}
                  </p>
                );
              }
              return (
                <p key={i} className="text-slate leading-relaxed">
                  {section}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-harbor parcel-texture text-paper">
            <p className="eyebrow text-harbor-300 mb-3">Ready to Act on This?</p>
            <p className="font-display text-xl font-semibold mb-4">
              Get a confidential valuation of your property.
            </p>
            <LinkButton href="/sell" variant="signal" size="md" icon={<ArrowRight />}>
              Request a Valuation
            </LinkButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
