import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import DealTicker from "@/components/home/DealTicker";
import StatsSection from "@/components/home/StatsSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import SpecialistManifesto from "@/components/home/SpecialistManifesto";
import AssetClassIndex from "@/components/home/AssetClassIndex";
import TrackRecordTeaser from "@/components/home/TrackRecordTeaser";
import InsightsTeaser from "@/components/home/InsightsTeaser";
import ConversionBand from "@/components/home/ConversionBand";
import {
  getFeaturedListings,
  getClosedDeals,
  getLatestArticles,
} from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Schneider Realty Services | Staten Island Commercial Investment",
  description:
    "Staten Island's commercial investment market runs through this office. 27 years, 1,000+ properties, $400M+ in career sales. The only broker dedicated exclusively to commercial investment in the borough.",
  openGraph: {
    title: "Schneider Realty Services | Staten Island Commercial Investment",
    description:
      "Staten Island's exclusive commercial investment specialist. 27 years, 1,000+ properties, $400M+.",
  },
};

export default async function HomePage() {
  const [featuredListings, closedDeals, latestArticles] = await Promise.all([
    getFeaturedListings(),
    getClosedDeals(),
    getLatestArticles(2),
  ]);

  return (
    <>
      <Header transparent />
      <main id="main-content">
        <Hero />
        <DealTicker deals={closedDeals} />
        <StatsSection />
        <FeaturedListings listings={featuredListings} />
        <SpecialistManifesto />
        <AssetClassIndex />
        <TrackRecordTeaser deals={closedDeals} />
        <InsightsTeaser articles={latestArticles} />
        <ConversionBand />
      </main>
      <Footer />
    </>
  );
}
