import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InvestorForm from "@/components/forms/InvestorForm";
import { getFeaturedListings } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, assetTypeLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Invest in Staten Island Commercial Real Estate",
  description:
    "Join the Schneider Realty Services investor list for access to off-market commercial opportunities in Staten Island — multifamily, retail, land, industrial, and more.",
};

export default async function InvestPage() {
  const listings = await getFeaturedListings();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        {/* Hero */}
        <div className="bg-harbor parcel-texture py-20">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="eyebrow text-harbor-300 mb-5">For Investors & Buyers</p>
              <h1
                className="text-display-xl text-paper mb-6"
                style={{ fontVariationSettings: '"opsz" 72' }}
              >
                The best deals never
                <br />
                reach the listing portals.
              </h1>
              <p className="text-paper/60 text-xl leading-relaxed max-w-xl">
                Our investor list gives pre-qualified buyers first access to
                off-market Staten Island commercial properties — before they go
                public, if they go public at all.
              </p>
            </div>
          </div>
        </div>

        {/* Why off-market */}
        <div className="section bg-paper">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="eyebrow mb-4">Off-Market Access</p>
                <h2
                  className="text-display-md text-ink mb-6"
                  style={{ fontVariationSettings: '"opsz" 36' }}
                >
                  What the investor list is.
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      title: "Pre-Market Notification",
                      body: "When owners approach us for a confidential valuation, we match them to qualified buyers before proceeding to public marketing — if the owner agrees.",
                    },
                    {
                      title: "Curated, Not Broadcast",
                      body: "We don't blast emails. We match opportunities to buyers whose criteria fit — asset type, price range, geography. One relevant deal beats ten irrelevant ones.",
                    },
                    {
                      title: "27 Years of Deal Flow",
                      body: "The investor list isn't a database of properties — it's the output of 27 years of owner relationships. When an owner is ready to talk, we know before anyone else.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-brass pl-5">
                      <h3 className="font-display font-semibold text-ink mb-1">{item.title}</h3>
                      <p className="text-slate text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign-up form */}
              <div className="bg-paper-dark border border-paper-mid p-8">
                <h3 className="font-display text-xl font-semibold text-ink mb-2">
                  Join the Investor List
                </h3>
                <p className="text-slate text-sm mb-6">
                  Tell us what you&apos;re looking for. We&apos;ll be in touch when
                  something matches.
                </p>
                <InvestorForm />
              </div>
            </div>
          </div>
        </div>

        {/* Currently available */}
        {listings.length > 0 && (
          <div className="section bg-paper-dark">
            <div className="container-site">
              <p className="eyebrow mb-4">Currently Available</p>
              <h2
                className="text-display-md text-ink mb-8"
                style={{ fontVariationSettings: '"opsz" 36' }}
              >
                Exclusive listings on the market now.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.slice(0, 3).map((listing) => (
                  <Link
                    key={listing._id}
                    href={`/listings/${listing.slug}`}
                    className="group bg-paper border border-paper-mid hover:border-brass/40 transition-all hover:shadow-md"
                  >
                    <div className="relative h-44 bg-harbor-800 overflow-hidden">
                      {listing.images[0] && (
                        <Image
                          src={listing.images[0].src}
                          alt={listing.images[0].alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="33vw"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-mono text-[10px] text-brass tracking-wide uppercase mb-1">
                        {assetTypeLabel(listing.assetType)}
                      </p>
                      <p className="font-mono font-bold text-xl text-ink">{formatPrice(listing.price)}</p>
                      <p className="font-display font-medium text-ink group-hover:text-harbor transition-colors">
                        {listing.address}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/listings" className="text-sm text-signal hover:underline font-mono">
                  View all listings →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
