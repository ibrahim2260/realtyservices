import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrackRecordClient from "@/components/track-record/TrackRecordClient";
import { getClosedDeals } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Track Record | 1,000+ Closed Commercial Transactions",
  description:
    "Schneider Realty Services closed deal archive — multifamily, retail, land, industrial, hotels, and more across all of Staten Island's commercial corridors.",
};

export default async function TrackRecordPage() {
  const deals = await getClosedDeals();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-20">
        {/* Header */}
        <div className="container-site mb-10">
          <p className="eyebrow mb-4">Closed Transactions</p>
          <h1
            className="text-display-lg text-ink max-w-3xl mb-6"
            style={{ fontVariationSettings: '"opsz" 56' }}
          >
            The record in full.
          </h1>

          {/* Aggregate stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-paper-dark border border-paper-mid mb-8">
            <StatPill label="Total Transactions" value="1,000+" />
            <StatPill label="Career Volume" value="$400M+" />
            <StatPill label="Years Active" value="27" />
            <StatPill label="Asset Classes" value="14" />
          </div>

          <p className="text-slate max-w-2xl leading-relaxed">
            Every commercial asset class. Every Staten Island neighborhood.
            This archive shows a representative sample of closed transactions —
            the full record spans 27 years and 1,000+ individual closings.
          </p>
        </div>

        <TrackRecordClient deals={deals} />
      </main>
      <Footer />
    </>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-2xl font-bold text-ink">{value}</p>
      <p className="text-label text-brass mt-1">{label}</p>
    </div>
  );
}
