import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InquiryPanel from "@/components/listings/InquiryPanel";
import { getListingBySlug, getListings } from "@/lib/sanity";
import { formatPriceFull, formatSF, assetTypeLabel } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: `${listing.address} | ${assetTypeLabel(listing.assetType)}`,
    description: listing.headline,
    openGraph: {
      title: `${listing.address} — ${formatPriceFull(listing.price)}`,
      description: listing.headline,
      images: listing.images[0] ? [{ url: listing.images[0].src }] : [],
    },
  };
}

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  available: { label: "Available", cls: "bg-signal text-paper" },
  "in-contract": { label: "In Contract", cls: "bg-slate text-paper" },
  sold: { label: "Sold", cls: "bg-ink text-paper" },
};

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const badge = STATUS_BADGE[listing.status];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.headline,
    description: listing.description,
    url: `https://schneiderrealty.com/listings/${listing.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: "Staten Island",
      addressRegion: "NY",
      postalCode: listing.zip,
      addressCountry: "US",
    },
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
    },
    broker: {
      "@type": "RealEstateAgent",
      name: listing.brokerName,
      telephone: listing.brokerPhone,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content" className="pt-24">
        {/* Breadcrumb */}
        <div className="container-site py-4">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-ink">Listings</Link>
            <span>/</span>
            <span className="text-ink">{listing.address}</span>
          </nav>
        </div>

        {/* Hero image */}
        <div className="relative h-[50vh] max-h-[600px] bg-harbor-800">
          {listing.images[0] && (
            <Image
              src={listing.images[0].src}
              alt={listing.images[0].alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-site pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={`font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 font-bold ${badge.cls}`}>
                {badge.label}
              </span>
              <span className="font-mono text-[10px] tracking-wide text-paper/80 bg-ink/50 px-2 py-1">
                {assetTypeLabel(listing.assetType)}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-paper">
              {listing.address}, {listing.neighborhood}, SI {listing.zip}
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="container-site py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left — details */}
            <div className="lg:col-span-7">
              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <p className="font-mono text-4xl font-bold text-ink">
                  {formatPriceFull(listing.price, listing.priceUndisclosed)}
                </p>
                {listing.blockLot && (
                  <span className="font-mono text-xs text-slate">{listing.blockLot}</span>
                )}
              </div>

              {/* Headline */}
              <h2 className="font-display text-xl font-semibold text-ink mb-6 leading-tight">
                {listing.headline}
              </h2>

              {/* Key Metrics Table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-6 bg-paper-dark border border-paper-mid">
                {listing.capRate && <KVRow label="Cap Rate" value={`${listing.capRate.toFixed(2)}%`} />}
                {listing.noi && <KVRow label="NOI" value={`$${listing.noi.toLocaleString()}`} />}
                {listing.grm && <KVRow label="GRM" value={listing.grm.toFixed(1)} />}
                {listing.units && <KVRow label="Units" value={String(listing.units)} />}
                {listing.buildingSF && <KVRow label="Building SF" value={formatSF(listing.buildingSF)} />}
                {listing.lotSF && <KVRow label="Lot SF" value={formatSF(listing.lotSF)} />}
                {listing.stories && <KVRow label="Stories" value={String(listing.stories)} />}
                {listing.yearBuilt && <KVRow label="Year Built" value={String(listing.yearBuilt)} />}
                {listing.zoning && <KVRow label="Zoning" value={listing.zoning} />}
              </div>

              {/* Description */}
              <div className="prose prose-slate max-w-none mb-8">
                <h3 className="font-display text-lg font-semibold text-ink mb-3">Property Overview</h3>
                <p className="text-slate leading-relaxed">{listing.description}</p>
              </div>

              {/* Highlights */}
              {listing.highlights && listing.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display text-lg font-semibold text-ink mb-4">Investment Highlights</h3>
                  <ul className="space-y-2" role="list">
                    {listing.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-signal mt-1 flex-shrink-0" aria-hidden="true">→</span>
                        <span className="text-slate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Location */}
              <div className="border border-paper-mid p-6 bg-paper-dark">
                <h3 className="font-display font-semibold text-ink mb-3">Location</h3>
                <p className="font-mono text-sm text-slate">
                  {listing.address}, {listing.neighborhood}, Staten Island, NY {listing.zip}
                </p>
                <p className="text-sm text-slate/60 mt-2">
                  Coordinates: {listing.lat.toFixed(4)}°N, {listing.lng.toFixed(4)}°W
                </p>
                {/* Mapbox embed goes here — SWAP POINT */}
                <div className="mt-4 h-48 bg-harbor-800 flex items-center justify-center">
                  <p className="font-mono text-xs text-paper/30">
                    MAP — Set NEXT_PUBLIC_MAPBOX_TOKEN to enable
                  </p>
                </div>
              </div>
            </div>

            {/* Right — inquiry panel */}
            <div className="lg:col-span-5">
              <InquiryPanel listing={listing} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function KVRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-label text-brass mb-1">{label}</p>
      <p className="font-mono text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
