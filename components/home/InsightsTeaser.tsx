import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";
import { formatDate } from "@/lib/utils";
import { LinkButton, ArrowRight } from "@/components/ui/Button";

const CATEGORY_LABELS: Record<string, string> = {
  "market-report": "Market Report",
  insight: "Insight",
  "deal-spotlight": "Deal Spotlight",
  "industry-news": "Industry News",
};

interface InsightsTeaserProps {
  articles: Article[];
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block"
    >
      {/* Cover image */}
      {article.coverImage && (
        <div className="relative h-48 overflow-hidden bg-harbor-800 mb-5">
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-harbor/30" />
        </div>
      )}

      {/* Category */}
      <p className="font-mono text-[10px] tracking-[0.18em] text-signal uppercase mb-3">
        {CATEGORY_LABELS[article.category] ?? article.category} ·{" "}
        {article.readingTimeMinutes} min read
      </p>

      {/* Title */}
      <h3
        className="font-display text-xl font-semibold text-ink group-hover:text-harbor transition-colors leading-tight mb-3"
      >
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-slate line-clamp-3 leading-relaxed mb-4">
        {article.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-label text-slate/60">
        <span>{article.author.name}</span>
        <span>·</span>
        <time dateTime={article.publishedDate}>
          {formatDate(article.publishedDate)}
        </time>
      </div>
    </Link>
  );
}

export default function InsightsTeaser({ articles }: InsightsTeaserProps) {
  if (!articles.length) return null;

  return (
    <section className="section bg-paper" aria-label="Market insights">
      <div className="container-site">
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <p className="eyebrow mb-4">Market Intelligence</p>
            <h2
              className="text-display-lg text-ink"
              style={{ fontVariationSettings: '"opsz" 56' }}
            >
              Insights from the field.
            </h2>
          </div>
          <LinkButton
            href="/insights"
            variant="ghost-ink"
            size="sm"
            className="flex-shrink-0"
            icon={<ArrowRight />}
          >
            All Insights
          </LinkButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {articles.slice(0, 2).map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
