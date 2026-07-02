"use client";

import { useState, useMemo } from "react";
import type { ClosedDeal, AssetType } from "@/types";
import DealStamp from "@/components/ui/DealStamp";
import { ASSET_TYPE_LABELS, ASSET_TYPES_ORDERED, formatPrice } from "@/lib/utils";

interface Props {
  deals: ClosedDeal[];
}

const YEARS = [2021, 2022, 2023, 2024, 2025];

export default function TrackRecordClient({ deals }: Props) {
  const [assetType, setAssetType] = useState<AssetType | "">("");
  const [year, setYear] = useState<number | "">("");

  const filtered = useMemo(() => {
    return deals.filter((d) => {
      if (assetType && d.assetType !== assetType) return false;
      if (year && d.closedYear !== year) return false;
      return true;
    });
  }, [deals, assetType, year]);

  const totalVolume = useMemo(
    () => filtered.reduce((s, d) => s + (d.priceUndisclosed ? 0 : d.price), 0),
    [filtered]
  );

  return (
    <div className="container-site">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-paper-mid items-center">
        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value as AssetType | "")}
          className="px-3 py-2 border border-paper-mid bg-paper text-sm text-ink focus:outline-none focus:border-harbor"
          aria-label="Filter by asset type"
        >
          <option value="">All Asset Types</option>
          {ASSET_TYPES_ORDERED.map((t) => (
            <option key={t} value={t}>{ASSET_TYPE_LABELS[t]}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
          className="px-3 py-2 border border-paper-mid bg-paper text-sm text-ink focus:outline-none focus:border-harbor"
          aria-label="Filter by year"
        >
          <option value="">All Years</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {(assetType || year) && (
          <button onClick={() => { setAssetType(""); setYear(""); }} className="text-sm text-signal hover:underline">
            Clear filters
          </button>
        )}

        {/* Live aggregate */}
        <div className="ml-auto flex items-center gap-6 font-mono text-xs text-slate">
          <span>{filtered.length} deals shown</span>
          {totalVolume > 0 && (
            <span className="text-ink font-semibold">{formatPrice(totalVolume)} total volume</span>
          )}
        </div>
      </div>

      {/* Deal stamp grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-slate py-16">No closed deals match these filters.</p>
      ) : (
        <div className="flex flex-wrap gap-4 items-start">
          {filtered.map((deal, i) => {
            const rotations = [1.5, -2, 0.8, -1.2, 2.2, -0.5, 1.8, -0.8, 0.4, -1.6, 2.5, -0.3, 1.1, -1.8, 0.6];
            return (
              <DealStamp
                key={deal._id}
                address={deal.address}
                assetType={deal.assetType}
                price={deal.price}
                priceUndisclosed={deal.priceUndisclosed}
                status="sold"
                year={deal.closedYear}
                units={deal.units}
                sf={deal.buildingSF}
                size="sm"
                rotation={rotations[i % rotations.length]}
              />
            );
          })}
        </div>
      )}

      {/* Note on completeness */}
      <div className="mt-12 pt-8 border-t border-paper-mid">
        <p className="font-mono text-xs text-slate/50 max-w-xl">
          This archive represents a sample of closed transactions. The full
          record spans 27 years and 1,000+ individual commercial closings.
          Some transaction prices are confidential per client request.
        </p>
      </div>
    </div>
  );
}
