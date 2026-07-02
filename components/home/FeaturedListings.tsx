import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/types";
import { formatPrice, assetTypeLabel, cn } from "@/lib/utils";
import { LinkButton, ArrowRight } from "@/components/ui/Button";

interface FeaturedListingsProps {
  listings: Listing[];
}

const STATUS_BADGE: Record<string, { label: string; class: string }> = {
  available: { label: "Available", class: "bg-signal text-paper" },
  "in-contract": { label: "In Contract", class: "bg-slate text-paper" },
  sold: { label: "Sold", class: "bg-ink text-paper" },
};

function ListingCard({ listing }: { listing: Listing }) {
  const badge = STATUS_BADGE[listing.status];
  const img = listing.images[0];

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block bg-paper border border-paper-mid hover:border-brass/40 transition-all duration-300 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-harbor-800">
        {img && (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 font-bold",
              badge.class
            )}
          >
            {badge.label}
          </span>
        </div>
        {/* Asset type eyebrow */}
        <div className="absolute bottom-3 left-3">
          <span className="font-mono text-[10px] tracking-wide text-paper/80 bg-ink/60 px-2 py-1">
            {assetTypeLabel(listing.assetType)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="font-mono text-2xl font-bold text-ink mb-1">
          {formatPrice(listing.price, listing.priceUndisclosed)}
        </div>

        {/* Address */}
        <h3 className="font-display text-lg font-semibold text-ink leading-tight mb-3 group-hover:text-harbor transition-colors">
          {listing.address}
          <span className="text-slate font-normal">, {listing.neighborhood}</span>
        </h3>

        {/* Headline */}
        <p className="text-sm text-slate line-clamp-2 mb-4">{listing.headline}</p>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-paper-mid">
          {listing.capRate && (
            <Metric
              label="Cap Rate"
              value={`${listing.capRate.toFixed(2)}%`}
            />
          )}
          {listing.units && (
            <Metric label="Units" value={`${listing.units}U`} />
          )}
          {listing.buildingSF && (
            <Metric
              label="Building"
              value={`${(listing.buildingSF / 1000).toFixed(0)}K SF`}
            />
          )}
          {listing.lotSF && !listing.buildingSF && (
            <Metric
              label="Lot"
              value={`${(listing.lotSF / 1000).toFixed(0)}K SF`}
            />
          )}
        </div>
      </div>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-label text-brass mb-0.5">{label}</p>
      <p className="font-mono text-[13px] font-semibold text-ink">{value}</p>
    </div>
  );
}

export default function FeaturedListings({ listings }: FeaturedListingsProps) {
  if (!listings.length) return null;

  return (
    <section className="section bg-paper" aria-label="Featured listings">
      <div className="container-site">
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <p className="eyebrow mb-4">Exclusive Listings</p>
            <h2
              className="text-display-lg text-ink"
              style={{ fontVariationSettings: '"opsz" 56' }}
            >
              Current Opportunities
            </h2>
          </div>
          <LinkButton
            href="/listings"
            variant="ghost-ink"
            size="sm"
            className="flex-shrink-0"
            icon={<ArrowRight />}
          >
            All Listings
          </LinkButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.slice(0, 3).map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>

        {/* Off-market CTA */}
        <div className="mt-10 p-6 border border-paper-mid bg-paper-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              Most deals never reach this page.
            </p>
            <p className="text-sm text-slate mt-1">
              Join the investor list for access to off-market opportunities before they go public.
            </p>
          </div>
          <LinkButton
            href="/invest"
            variant="ghost-ink"
            size="sm"
            className="flex-shrink-0"
            icon={<ArrowRight />}
          >
            Join the Investor List
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
