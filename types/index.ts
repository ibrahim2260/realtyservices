// ─── Core Domain Types ────────────────────────────────────────────────────────

export type AssetType =
  | "multifamily"
  | "mixed-use"
  | "retail"
  | "office"
  | "land"
  | "industrial"
  | "hotel"
  | "shopping-center"
  | "sro"
  | "imd"
  | "retail-condo"
  | "note-sale"
  | "partnership-interest"
  | "conversion";

export type ListingStatus = "available" | "in-contract" | "sold";

export type Neighborhood =
  | "St. George"
  | "Stapleton"
  | "New Brighton"
  | "Tompkinsville"
  | "Mariners Harbor"
  | "Port Richmond"
  | "Eltingville"
  | "Great Kills"
  | "New Dorp"
  | "Rossville"
  | "Tottenville"
  | "Grasmere"
  | "Westerleigh"
  | "Castleton Corners"
  | "Bulls Head"
  | "Richmond Valley"
  | "Annadale"
  | "Huguenot"
  | "Woodrow"
  | "Pleasant Plains";

// ─── Listing ─────────────────────────────────────────────────────────────────

export interface Listing {
  _id: string;
  slug: string;
  status: ListingStatus;
  address: string;
  neighborhood: Neighborhood;
  borough: "Staten Island";
  state: "NY";
  zip: string;
  assetType: AssetType;
  price: number;
  priceUndisclosed?: boolean;

  /** SF of building or lot */
  buildingSF?: number;
  lotSF?: number;
  /** Residential units */
  units?: number;
  /** Commercial stories */
  stories?: number;
  /** Year built */
  yearBuilt?: number;
  /** Net operating income */
  noi?: number;
  /** Capitalization rate */
  capRate?: number;
  /** Gross rent multiplier */
  grm?: number;
  /** Zoning designation */
  zoning?: string;
  /** Block / lot from tax map */
  blockLot?: string;

  headline: string;
  description: string;
  highlights?: string[];

  /** Placeholder images — swap with real photography */
  images: PlaceholderImage[];
  omUrl?: string; /** offering memorandum — gated download */

  lat: number;
  lng: number;

  listedDate: string; /** ISO date */
  brokerName: string;
  brokerPhone: string;

  isFeatured?: boolean;
}

// ─── Closed Deal ─────────────────────────────────────────────────────────────

export interface ClosedDeal {
  _id: string;
  address: string;
  neighborhood: Neighborhood;
  assetType: AssetType;
  price: number;
  priceUndisclosed?: boolean;
  closedYear: number;
  closedMonth?: number;
  units?: number;
  buildingSF?: number;
  lotSF?: number;
  capRate?: number;
  representedSide?: "seller" | "buyer" | "both";
  notes?: string;
  lat: number;
  lng: number;
}

// ─── Team Member ─────────────────────────────────────────────────────────────

export interface TeamMember {
  _id: string;
  slug: string;
  name: string;
  title: string;
  licenseType: "broker" | "salesperson";
  licenseNumber?: string;
  bio: string;
  highlights?: string[];
  phone?: string;
  email?: string;
  linkedinUrl?: string;
  photo?: PlaceholderImage;
  featured: boolean;
}

// ─── Article ─────────────────────────────────────────────────────────────────

export interface Article {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string; /** plain text for mock; rich text in Sanity */
  publishedDate: string; /** ISO date */
  category: "market-report" | "insight" | "deal-spotlight" | "industry-news";
  coverImage?: PlaceholderImage;
  author: {
    name: string;
    slug: string;
  };
  readingTimeMinutes: number;
}

// ─── Lead (CRM record written by forms) ──────────────────────────────────────

export interface Lead {
  _type: "lead";
  source: "valuation" | "investor" | "inquiry" | "contact";
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  propertyAddress?: string;
  assetTypes?: AssetType[];
  priceMin?: number;
  priceMax?: number;
  timeframe?: string;
  listingSlug?: string;
  status: "new" | "contacted" | "qualified" | "closed";
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export interface PlaceholderImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** lqip blur placeholder data URI */
  blurDataURL?: string;
}

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  type: "listing" | "closed";
}

// ─── API Response Shapes ──────────────────────────────────────────────────────

export interface ApiSuccess<T = void> {
  ok: true;
  data?: T;
  message?: string;
}

export interface ApiError {
  ok: false;
  error: string;
}

export type ApiResponse<T = void> = ApiSuccess<T> | ApiError;

// ─── Form Schemas (mirrors Zod schemas in /lib/schemas.ts) ───────────────────

export interface ValuationFormData {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  assetType: AssetType;
  approximateSize?: string;
  timeframe: "immediate" | "3-months" | "6-months" | "exploring";
  message?: string;
  honeypot?: string;
}

export interface InvestorFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  assetTypes: AssetType[];
  priceMin: number;
  priceMax: number;
  message?: string;
  honeypot?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  listingAddress: string;
  listingSlug: string;
  message: string;
  requestOM?: boolean;
  honeypot?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  honeypot?: string;
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export interface ListingFilters {
  assetType?: AssetType | "";
  status?: ListingStatus | "";
  priceMin?: number;
  priceMax?: number;
  neighborhood?: Neighborhood | "";
  minUnits?: number;
  maxUnits?: number;
}

export interface TrackRecordFilters {
  assetType?: AssetType | "";
  year?: number | "";
}
