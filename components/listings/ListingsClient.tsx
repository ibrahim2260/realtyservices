"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Listing, AssetType, ListingStatus } from "@/types";
import {
  formatPrice,
  assetTypeLabel,
  ASSET_TYPES_ORDERED,
  cn,
} from "@/lib/utils";
import { LinkButton, ArrowRight } from "@/components/ui/Button";

interface Props {
  listings: Listing[];
}

type ViewMode = "grid" | "list";

const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $1M", min: 0, max: 1_000_000 },
  { label: "$1M – $3M", min: 1_000_000, max: 3_000_000 },
  { label: "$3M – $7M", min: 3_000_000, max: 7_000_000 },
  { label: "$7M+", min: 7_000_000, max: Infinity },
];

const STATUS_LABELS: Record<ListingStatus, string> = {
  available: "Available",
  "in-contract": "In Contract",
  sold: "Sold",
};

const STATUS_BADGE: Record<ListingStatus, string> = {
  available: "bg-signal text-paper",
  "in-contract": "bg-slate text-paper",
  sold: "bg-ink text-paper",
};

export default function ListingsClient({ listings }: Props) {
  const [assetType, setAssetType] = useState<AssetType | "">("");
  const [status, setStatus] = useState<ListingStatus | "">("");
  const [priceRangeIdx, setPriceRangeIdx] = useState(0);
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceRangeIdx];
    return listings.filter((l) => {
      if (assetType && l.assetType !== assetType) return false;
      if (status && l.status !== status) return false;
      if (l.price < range.min || l.price > range.max) return false;
      return true;
    });
  }, [listings, assetType, status, priceRangeIdx]);

  return (
    <div className="container-site">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-paper-mid items-center">
        {/* Asset type */}
        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value as AssetType | "")}
          className="px-3 py-2 border border-paper-mid bg-paper text-sm text-ink focus:outline-none focus:border-harbor"
          aria-label="Filter by asset type"
        >
          <option value="">All Asset Types</option>
          {ASSET_TYPES_ORDERED.map((t) => (
            <option key={t} value={t}>{assetTypeLabel(t)}</option>
          ))}
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ListingStatus | "")}
          className="px-3 py-2 border border-paper-mid bg-paper text-sm text-ink focus:outline-none focus:border-harbor"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {(Object.entries(STATUS_LABELS) as [ListingStatus, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        {/* Price range */}
        <select
          value={priceRangeIdx}
          onChange={(e) => setPriceRangeIdx(Number(e.target.value))}
          className="px-3 py-2 border border-paper-mid bg-paper text-sm text-ink focus:outline-none focus:border-harbor"
          aria-label="Filter by price range"
        >
          {PRICE_RANGES.map((r, i) => (
            <option key={i} value={i}>{r.label}</option>
          ))}
        </select>

        {/* Reset */}
        {(assetType || status || priceRangeIdx > 0) && (
          <button
            onClick={() => { setAssetType(""); setStatus(""); setPriceRangeIdx(0); }}
            className="text-sm text-signal hover:underline"
          >
            Clear filters
          </button>
        )}

        {/* Result count */}
        <span className="font-mono text-xs text-slate ml-auto">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"}
        </span>

        {/* View toggle */}
        <div className="flex border border-paper-mid">
          <button
            onClick={() => setView("grid")}
            className={cn("px-3 py-2 text-xs font-mono", view === "grid" ? "bg-ink text-paper" : "text-slate hover:text-ink")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
          >
            ⊞ Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={cn("px-3 py-2 text-xs font-mono border-l border-paper-mid", view === "list" ? "bg-ink text-paper" : "text-slate hover:text-ink")}
            aria-label="List view"
            aria-pressed={view === "list"}
          >
            ≡ List
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-ink mb-3">No listings match these filters.</p>
          <p className="text-slate mb-6">Most inventory comes through off-market before appearing publicly.</p>
          <LinkButton href="/invest" variant="signal" size="md" icon={<ArrowRight />}>
            Join the Investor List
          </LinkButton>
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && filtered.length > 0 && (
        <div className="space-y-0 divide-y divide-paper-mid border border-paper-mid">
          {filtered.map((listing) => (
            <ListingRow key={listing._id} listing={listing} />
          ))}
        </div>
      )}

      {/* Off-market CTA */}
      {filtered.length > 0 && (
        <div className="mt-12 p-6 bg-harbor text-paper flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-semibold">Looking for off-market inventory?</p>
            <p className="text-paper/60 text-sm mt-1">
              Join the investor list — we alert pre-qualified buyers before properties hit the market.
            </p>
          </div>
          <LinkButton href="/invest" variant="ghost" size="sm" className="flex-shrink-0" icon={<ArrowRight />}>
            Join the Investor List
          </LinkButton>
        </div>
      )}
    </div>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  const img = listing.images[0];
  const badge = STATUS_BADGE[listing.status];

  return (
    <Link href={`/listings/${listing.slug}`} className="group block bg-paper border border-paper-mid hover:border-brass/40 transition-all duration-300 hover:shadow-lg">
      <div className="relative h-52 overflow-hidden bg-harbor-800">
        {img && (
          <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
        )}
        <div className="absolute top-3 left-3">
          <span className={cn("font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 font-bold", badge)}>
            {STATUS_LABELS[listing.status]}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="font-mono text-[10px] tracking-wide text-paper/80 bg-ink/60 px-2 py-1">
            {assetTypeLabel(listing.assetType)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="font-mono text-2xl font-bold text-ink mb-1">{formatPrice(listing.price, listing.priceUndisclosed)}</div>
        <h3 className="font-display text-base font-semibold text-ink leading-tight mb-3 group-hover:text-harbor transition-colors">
          {listing.address}<span className="text-slate font-normal">, {listing.neighborhood}</span>
        </h3>
        <p className="text-sm text-slate line-clamp-2 mb-4">{listing.headline}</p>
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-paper-mid">
          {listing.capRate && <Metric label="Cap Rate" value={`${listing.capRate.toFixed(2)}%`} />}
          {listing.units && <Metric label="Units" value={`${listing.units}U`} />}
          {listing.buildingSF && <Metric label="SF" value={`${(listing.buildingSF / 1000).toFixed(0)}K`} />}
          {listing.lotSF && !listing.buildingSF && <Metric label="Lot SF" value={`${(listing.lotSF / 1000).toFixed(0)}K`} />}
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

function ListingRow({ listing }: { listing: Listing }) {
  const img = listing.images[0];
  return (
    <Link href={`/listings/${listing.slug}`} className="group flex gap-4 p-4 hover:bg-paper-dark transition-colors">
      {img && (
        <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden bg-harbor-800">
          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="96px" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] text-signal tracking-wide uppercase mb-1">
              {assetTypeLabel(listing.assetType)} · {listing.neighborhood}
            </p>
            <h3 className="font-display font-semibold text-ink group-hover:text-harbor transition-colors">{listing.address}</h3>
            <p className="text-sm text-slate line-clamp-1 mt-1">{listing.headline}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-mono font-bold text-ink text-lg">{formatPrice(listing.price, listing.priceUndisclosed)}</p>
            <span className={cn("inline-block font-mono text-[10px] tracking-wide px-2 py-0.5 mt-1 uppercase", STATUS_BADGE[listing.status])}>
              {STATUS_LABELS[listing.status]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
