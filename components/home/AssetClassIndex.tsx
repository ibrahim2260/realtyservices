"use client";

import { useState } from "react";
import Link from "next/link";
import type { AssetType } from "@/types";
import { CLOSED_DEALS } from "@/data/closedDeals";
import { ASSET_TYPE_LABELS, formatPrice } from "@/lib/utils";

interface AssetClassDef {
  type: AssetType;
  description: string;
}

const ASSET_CLASSES: AssetClassDef[] = [
  { type: "multifamily", description: "Walk-up buildings, elevator apartments, 2–50+ units across all SI corridors." },
  { type: "mixed-use", description: "Retail-plus-residential combinations — the borough's most common income property." },
  { type: "retail", description: "Single-tenant NNN, multi-tenant strip, anchor-adjacent in-line space." },
  { type: "land", description: "Development sites, assemblages, infill parcels — every zoning designation." },
  { type: "industrial", description: "Warehouse, flex, auto-related, manufacturing — North Shore waterfront corridors." },
  { type: "office", description: "Professional office from small-suite buildings to 5-story assets near the ferry." },
  { type: "shopping-center", description: "Anchored and unanchored strip centers along Richmond Ave, Hylan Blvd, and Arthur Kill Rd." },
  { type: "hotel", description: "Limited-service hotels, motels, and branded flag conversions — ferry-market demand drivers." },
  { type: "sro", description: "Single-room-occupancy buildings — regulatory expertise is the differentiator here." },
  { type: "retail-condo", description: "Ground-floor retail condominiums in mixed-use buildings — a growing SI asset class." },
  { type: "conversion", description: "Office-to-residential, industrial-to-loft, adaptive reuse of underutilized assets." },
  { type: "note-sale", description: "Performing and non-performing note portfolios, distressed loan sales." },
  { type: "partnership-interest", description: "Partial interests, equity buy-outs, LLC membership transfers." },
  { type: "imd", description: "Interim Multiple Dwellings — complex regulatory status, deep expertise required." },
];

export default function AssetClassIndex() {
  const [hoveredType, setHoveredType] = useState<AssetType | null>(null);

  const representativeDeal = hoveredType
    ? CLOSED_DEALS.find((d) => d.assetType === hoveredType)
    : null;

  const hoveredDef = hoveredType
    ? ASSET_CLASSES.find((a) => a.type === hoveredType)
    : null;

  return (
    <section className="section bg-paper" aria-label="Asset classes we serve">
      <div className="container-site">

        {/* Top header row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 mb-12 items-end">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Every Asset Class</p>
            <h2
              className="text-display-lg text-ink"
              style={{ fontVariationSettings: '"opsz" 56' }}
            >
              No deal type
              <br />is out of scope.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-slate leading-relaxed max-w-lg">
              27 years in a single market means we&apos;ve closed in every asset
              category Staten Island offers — including the complex ones most
              brokers avoid.
            </p>

            {/* Inline hover preview — lives in the header row, right column */}
            <div
              className="mt-6 h-14 transition-all duration-200"
              aria-live="polite"
              aria-atomic="true"
            >
              {hoveredDef ? (
                <div className="flex items-start gap-3">
                  <span className="w-0.5 self-stretch bg-signal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] text-signal tracking-[0.16em] uppercase mb-1">
                      {ASSET_TYPE_LABELS[hoveredType!]}
                      {representativeDeal && (
                        <span className="text-brass/60 ml-3">
                          · e.g. {representativeDeal.address} · {formatPrice(representativeDeal.price, representativeDeal.priceUndisclosed)}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-slate leading-snug">{hoveredDef.description}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate/40 italic mt-1">Hover any asset class →</p>
              )}
            </div>
          </div>
        </div>

        {/* 2-column asset class grid — fills the full width cleanly */}
        <div className="border-t border-paper-mid">
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2"
          >
            {ASSET_CLASSES.map((asset, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={asset.type}
                  className={[
                    "border-b border-paper-mid",
                    isLeft ? "sm:border-r" : "",
                  ].join(" ")}
                >
                  <Link
                    href={`/listings?assetType=${asset.type}`}
                    className="group flex items-center justify-between px-0 sm:px-5 py-4 gap-4 w-full hover:bg-paper-dark transition-colors duration-150"
                    onMouseEnter={() => setHoveredType(asset.type)}
                    onMouseLeave={() => setHoveredType(null)}
                    onFocus={() => setHoveredType(asset.type)}
                    onBlur={() => setHoveredType(null)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-[11px] text-slate/30 w-5 flex-shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base font-medium text-ink group-hover:text-harbor transition-colors truncate">
                        {ASSET_TYPE_LABELS[asset.type]}
                      </span>
                    </div>

                    <svg
                      className="w-3.5 h-3.5 text-signal opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </section>
  );
}
