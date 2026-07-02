"use client";

import { cn } from "@/lib/utils";
import type { AssetType, ListingStatus } from "@/types";
import { ASSET_TYPE_LABELS } from "@/lib/utils";

interface DealStampProps {
  address: string;
  assetType: AssetType;
  price?: number;
  priceUndisclosed?: boolean;
  status?: ListingStatus | "sold";
  year?: number;
  units?: number;
  sf?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  rotation?: number;
}

const SIZE_CLASSES = {
  sm: "text-[10px] px-3 py-2 gap-1",
  md: "text-[11px] px-4 py-3 gap-1.5",
  lg: "text-[13px] px-5 py-4 gap-2",
};

function formatStampPrice(price: number, undisclosed?: boolean): string {
  if (undisclosed) return "PRICE UNDISCLOSED";
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(price / 1_000).toFixed(0)}K`;
}

export default function DealStamp({
  address,
  assetType,
  price,
  priceUndisclosed,
  status = "sold",
  year,
  units,
  sf,
  className,
  size = "md",
  rotation,
}: DealStampProps) {
  const isSold = status === "sold";
  const isAvailable = status === "available";

  const typeLabel = ASSET_TYPE_LABELS[assetType];
  const sizeDetail = units
    ? `${units}U`
    : sf
    ? `${(sf / 1000).toFixed(0)}K SF`
    : null;

  const detailLine = [typeLabel, sizeDetail].filter(Boolean).join(" · ");

  const colorClass = isSold
    ? "deal-stamp-sold"
    : isAvailable
    ? "deal-stamp-available"
    : "deal-stamp-contract";

  return (
    <div
      className={cn(
        "deal-stamp font-mono",
        colorClass,
        SIZE_CLASSES[size],
        className
      )}
      style={rotation !== undefined ? { transform: `rotate(${rotation}deg)` } : undefined}
      role="article"
      aria-label={`${status === "sold" ? "Sold" : "Listing"}: ${address}`}
    >
      {/* Status badge */}
      <span className="text-label tracking-[0.18em] opacity-90">
        {isSold ? "SOLD" : isAvailable ? "AVAILABLE" : "IN CONTRACT"}
        {year ? ` · ${year}` : ""}
      </span>

      {/* Address */}
      <span className="font-semibold leading-tight uppercase tracking-[0.04em]">
        {address}
      </span>

      {/* Asset type + size */}
      {detailLine && (
        <span className="opacity-70 tracking-[0.03em]">{detailLine}</span>
      )}

      {/* Price */}
      {(price !== undefined || priceUndisclosed) && (
        <span className="font-bold tracking-[0.02em]">
          {formatStampPrice(price ?? 0, priceUndisclosed)}
        </span>
      )}
    </div>
  );
}
