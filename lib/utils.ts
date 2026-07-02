import type { AssetType, Neighborhood } from "@/types";

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatPrice(
  price: number,
  undisclosed?: boolean
): string {
  if (undisclosed) return "Price Undisclosed";
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (price >= 1_000) {
    return `$${(price / 1_000).toFixed(0)}K`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

export function formatPriceFull(
  price: number,
  undisclosed?: boolean
): string {
  if (undisclosed) return "Price Undisclosed";
  return `$${price.toLocaleString("en-US")}`;
}

export function formatSF(sf: number): string {
  return `${sf.toLocaleString("en-US")} SF`;
}

export function formatCapRate(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatYear(iso: string): string {
  return new Date(iso).getFullYear().toString();
}

export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

// ─── Asset Type Labels ────────────────────────────────────────────────────────

export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  multifamily: "Multifamily",
  "mixed-use": "Mixed-Use",
  retail: "Retail",
  office: "Office",
  land: "Land / Development",
  industrial: "Industrial / Warehouse",
  hotel: "Hotel",
  "shopping-center": "Shopping Center",
  sro: "SRO",
  imd: "IMD",
  "retail-condo": "Retail Condo",
  "note-sale": "Note / Loan Sale",
  "partnership-interest": "Partnership Interest",
  conversion: "Conversion",
};

export const ASSET_TYPES_ORDERED: AssetType[] = [
  "multifamily",
  "mixed-use",
  "retail",
  "land",
  "industrial",
  "office",
  "shopping-center",
  "hotel",
  "retail-condo",
  "sro",
  "imd",
  "conversion",
  "note-sale",
  "partnership-interest",
];

export function assetTypeLabel(type: AssetType): string {
  return ASSET_TYPE_LABELS[type] ?? type;
}

// ─── Status Labels ────────────────────────────────────────────────────────────

export const STATUS_LABELS = {
  available: "Available",
  "in-contract": "In Contract",
  sold: "Sold",
} as const;

// ─── Neighborhood Groupings ───────────────────────────────────────────────────

export const NEIGHBORHOODS_NORTH: Neighborhood[] = [
  "St. George",
  "New Brighton",
  "Tompkinsville",
  "Stapleton",
  "Mariners Harbor",
  "Port Richmond",
];

export const NEIGHBORHOODS_MID: Neighborhood[] = [
  "Westerleigh",
  "Castleton Corners",
  "Bulls Head",
  "New Dorp",
  "Grasmere",
  "Eltingville",
  "Great Kills",
];

export const NEIGHBORHOODS_SOUTH: Neighborhood[] = [
  "Rossville",
  "Richmond Valley",
  "Annadale",
  "Huguenot",
  "Woodrow",
  "Pleasant Plains",
  "Tottenville",
];

// ─── Slug ─────────────────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Class Name Merging ───────────────────────────────────────────────────────

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ─── Number Count-Up (for animations) ────────────────────────────────────────

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ─── Validation Helpers ───────────────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^[\d\s\-\(\)\+]{10,}$/.test(phone);
}

// ─── URL / Search Params ──────────────────────────────────────────────────────

export function buildSearchParams(
  params: Record<string, string | number | undefined>
): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  }
  return sp.toString();
}
