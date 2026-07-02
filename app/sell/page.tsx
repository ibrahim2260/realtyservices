import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ValuationForm from "@/components/forms/ValuationForm";
import DealStamp from "@/components/ui/DealStamp";
import { CLOSED_DEALS } from "@/data/closedDeals";

export const metadata: Metadata = {
  title: "Sell a Commercial Property | Confidential Valuation",
  description:
    "Request a confidential Broker Opinion of Value for your Staten Island commercial property. No cost, no obligation. Michael Schneider responds within one business day.",
};

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Confidential Analysis",
    description:
      "We review your property's rent rolls, leases, tax bills, and physical condition. Everything discussed is strictly confidential — no public disclosure, no premature marketing.",
  },
  {
    number: "02",
    title: "Broker Opinion of Value",
    description:
      "Within 3 business days, you receive a detailed BOV supported by comparable closed transactions, cap rate analysis, and a realistic price range for today's market.",
  },
  {
    number: "03",
    title: "Strategy + Timing",
    description:
      "We present options: public listing, targeted off-market campaign, or a specific buyer approach. You decide how — and whether — to proceed. No pressure, no timeline.",
  },
  {
    number: "04",
    title: "Execution to Closing",
    description:
      "If you proceed, we manage the entire process — marketing, due diligence management, negotiation, and closing coordination — until the wire clears.",
  },
];

export default function SellPage() {
  const featuredDeals = CLOSED_DEALS.slice(0, 4);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        {/* Hero band */}
        <div className="bg-harbor parcel-texture py-20">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="eyebrow text-harbor-300 mb-5">For Property Owners</p>
              <h1
                className="text-display-xl text-paper mb-6"
                style={{ fontVariationSettings: '"opsz" 72' }}
              >
                What is your property
                <br />
                <span className="italic text-harbor-300">actually</span> worth?
              </h1>
              <p className="text-paper/60 text-xl leading-relaxed max-w-xl">
                Most owners selling their first commercial property don&apos;t know
                what they don&apos;t know. Michael Schneider has closed 1,000+ commercial
                transactions in this borough. Let&apos;s start with the facts.
              </p>
            </div>
          </div>
        </div>

        {/* Why owners choose us */}
        <div className="section bg-paper-dark">
          <div className="container-site">
            <p className="eyebrow mb-4">Why Owners Choose SRS</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Off-Market Options", body: "Not every owner wants a public listing. We routinely sell properties confidentially to buyers from our private investor database — faster, with less disruption." },
                { title: "The Deep Buyer Pool", body: "27 years building relationships with every type of buyer active in Staten Island's commercial market — individual investors, family offices, institutions, developers." },
                { title: "The #1 Track Record", body: "More closed commercial transactions in Staten Island than any other broker operating in the borough. The proof is in the deals." },
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-signal pl-5">
                  <h3 className="font-display text-lg font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The 4-step process */}
        <div className="section bg-paper">
          <div className="container-site">
            <p className="eyebrow mb-4">The Process</p>
            <h2
              className="text-display-lg text-ink mb-12"
              style={{ fontVariationSettings: '"opsz" 56' }}
            >
              How a sale actually works.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <div className="font-mono text-[11px] text-brass/50 tracking-[0.2em] pt-1 flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <div className="w-6 h-px bg-signal mb-4" />
                    <h3 className="font-display text-xl font-semibold text-ink mb-2">{step.title}</h3>
                    <p className="text-slate leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proof — relevant closings */}
        <div className="section bg-paper-dark">
          <div className="container-site">
            <p className="eyebrow mb-4">Recent Closings</p>
            <h2 className="text-display-md text-ink mb-8" style={{ fontVariationSettings: '"opsz" 36' }}>
              Proof of results.
            </h2>
            <div className="flex flex-wrap gap-5">
              {featuredDeals.map((deal, i) => (
                <DealStamp
                  key={deal._id}
                  address={deal.address}
                  assetType={deal.assetType}
                  price={deal.price}
                  priceUndisclosed={deal.priceUndisclosed}
                  status="sold"
                  year={deal.closedYear}
                  units={deal.units}
                  size="md"
                  rotation={[1.5, -2, 0.8, -1.2][i] ?? 0}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Valuation form */}
        <div className="section bg-paper">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow mb-4">Request a Valuation</p>
                <h2
                  className="text-display-md text-ink mb-4"
                  style={{ fontVariationSettings: '"opsz" 36' }}
                >
                  Start with a
                  <br />
                  confidential conversation.
                </h2>
                <p className="text-slate leading-relaxed mb-6">
                  Complete the form and Michael Schneider will personally review
                  your property and respond within one business day with a
                  detailed Broker Opinion of Value.
                </p>
                <ul className="space-y-2">
                  {["No cost, no obligation", "Strictly confidential", "Response within 1 business day", "27 years of Staten Island market data"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate">
                      <span className="text-signal flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7">
                <ValuationForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
