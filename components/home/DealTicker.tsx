"use client";

import { useRef } from "react";
import type { ClosedDeal } from "@/types";
import { ASSET_TYPE_LABELS, formatPrice } from "@/lib/utils";

interface DealTickerProps {
  deals: ClosedDeal[];
}

export default function DealTicker({ deals }: DealTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate deals for seamless loop
  const loopDeals = [...deals, ...deals, ...deals];

  return (
    <div
      className="bg-ink border-t border-b border-ink-soft overflow-hidden py-3"
      aria-label="Recent closed transactions"
      role="region"
    >
      <div className="relative flex" aria-live="off">
        <div
          ref={trackRef}
          className="flex gap-0 animate-[ticker_60s_linear_infinite]"
          aria-hidden="true"
        >
          {loopDeals.map((deal, i) => (
            <TickerItem key={`${deal._id}-${i}`} deal={deal} />
          ))}
        </div>
      </div>

      {/* Screen-reader accessible version */}
      <p className="sr-only">
        Recent closings: {deals.map(d => `${d.address} — ${formatPrice(d.price, d.priceUndisclosed)}`).join("; ")}
      </p>

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes ticker {
            0%, 100% { transform: translateX(0); }
          }
        }
      `}</style>
    </div>
  );
}

function TickerItem({ deal }: { deal: ClosedDeal }) {
  return (
    <div className="flex items-center flex-shrink-0">
      {/* Deal stamp */}
      <div className="flex items-center gap-3 px-6 py-1">
        {/* SOLD marker */}
        <span
          className="font-mono text-[10px] tracking-[0.2em] text-signal border border-signal/50 px-2 py-0.5 leading-none font-bold flex-shrink-0"
          style={{ boxShadow: "inset 0 0 0 1px rgba(200,69,31,0.2)" }}
        >
          SOLD
        </span>

        {/* Address */}
        <span className="font-mono text-[12px] text-paper/80 tracking-wide uppercase flex-shrink-0">
          {deal.address}
        </span>

        {/* Dot separator */}
        <span className="text-brass/40 flex-shrink-0">·</span>

        {/* Asset type */}
        <span className="font-mono text-[11px] text-brass/70 tracking-wide flex-shrink-0">
          {ASSET_TYPE_LABELS[deal.assetType]}
        </span>

        {/* Dot separator */}
        <span className="text-brass/40 flex-shrink-0">·</span>

        {/* Price */}
        <span className="font-mono text-[12px] font-bold text-paper tracking-wide flex-shrink-0">
          {formatPrice(deal.price, deal.priceUndisclosed)}
        </span>

        {/* Year */}
        <span className="font-mono text-[11px] text-paper/30 flex-shrink-0">
          {deal.closedYear}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-harbor-600 flex-shrink-0" aria-hidden="true" />
    </div>
  );
}
