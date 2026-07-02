import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ListingsClient from "@/components/listings/ListingsClient";
import { getListings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Exclusive Listings | Staten Island Commercial Investment",
  description:
    "Browse Schneider Realty Services' exclusive commercial listings — multifamily, retail, land, industrial, and mixed-use properties across Staten Island, NY.",
  openGraph: {
    title: "Exclusive Listings | Schneider Realty Services",
    description: "Exclusive commercial listings across all asset classes in Staten Island, NY.",
  },
};

export default async function ListingsPage() {
  const listings = await getListings();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-20">
        <div className="container-site mb-10">
          <p className="eyebrow mb-4">Exclusive Listings</p>
          <h1
            className="text-display-lg text-ink max-w-3xl"
            style={{ fontVariationSettings: '"opsz" 56' }}
          >
            Staten Island Commercial Opportunities
          </h1>
          <p className="text-slate mt-4 max-w-xl leading-relaxed">
            Every listing is handled personally by Michael Schneider. Most
            buyers first access our properties through the off-market investor
            list — join it to see opportunities before they appear here.
          </p>
        </div>
        <ListingsClient listings={listings} />
      </main>
      <Footer />
    </>
  );
}
