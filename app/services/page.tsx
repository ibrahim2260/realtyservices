import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LinkButton, ArrowRight } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Advisory & Brokerage Services | Commercial Real Estate",
  description:
    "Schneider Realty Services offers investment sales, advisory, financial analysis, 1031 exchange support, note sales, partnership dispute resolution, and EB-5 transaction services.",
};

const SERVICES = [
  {
    number: "01",
    title: "Investment Sales",
    description:
      "Our core practice. We represent sellers and buyers in the disposition and acquisition of commercial real estate assets across all property types in Staten Island. Confidential processes, institutional-quality marketing, and a buyer pool built over 27 years.",
    scenarios: [
      "Multifamily owner ready to sell after 20 years of hold",
      "Developer seeking a dispositions strategy for a completed project",
      "1031 buyer seeking replacement property before deadline",
    ],
  },
  {
    number: "02",
    title: "Broker Opinion of Value",
    description:
      "Confidential market valuations for owners evaluating a sale, estate planning, financing, partnership disputes, or corporate portfolio decisions. Delivered within 3 business days, supported by comparable closed transactions.",
    scenarios: [
      "Estate planning — establishing FMV for tax purposes",
      "Refinancing — lender requiring an independent value opinion",
      "Partnership dispute — neutral third-party valuation",
    ],
  },
  {
    number: "03",
    title: "1031 Exchange Advisory",
    description:
      "We work with sellers executing 1031 exchanges to identify suitable replacement property in Staten Island — or to identify buyers for exchange-motivated sales on an expedited timeline. Deep familiarity with exchange intermediaries and qualified opportunity zones.",
    scenarios: [
      "Seller needs a replacement property ID within 45 days",
      "Buyer seeking exchange-motivated, motivated-seller opportunities",
      "Portfolio reallocation from depreciated residential to commercial",
    ],
  },
  {
    number: "04",
    title: "Note / Loan Sales",
    description:
      "We facilitate the sale of performing and non-performing commercial mortgage notes secured by Staten Island properties. Buyer and seller representation, with access to note buyers ranging from individual investors to institutional distressed-debt funds.",
    scenarios: [
      "Community bank disposing of non-performing commercial loan",
      "Private lender seeking note monetization before maturity",
      "Distressed investor acquiring note as path to property ownership",
    ],
  },
  {
    number: "05",
    title: "Partnership & Ownership Dispute Resolution",
    description:
      "When co-owners disagree on timing or price, we provide neutral valuation, structured buyout facilitation, and transaction management to reach an equitable resolution — without litigation if possible.",
    scenarios: [
      "Two partners with conflicting exit timelines",
      "Estate with multiple heirs seeking property division",
      "LLC dissolution requiring asset liquidation",
    ],
  },
  {
    number: "06",
    title: "Development Advisory",
    description:
      "For developers evaluating Staten Island sites, we provide market context, comparable sales, absorption analysis, and buyer/renter demand insight — the ground-level intelligence that no generic research report can replicate.",
    scenarios: [
      "Out-of-borough developer evaluating first SI acquisition",
      "Local owner with land considering a development partnership",
      "Investor evaluating a conversion play in rezoning corridor",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        {/* Hero */}
        <div className="bg-harbor parcel-texture py-20">
          <div className="container-site max-w-4xl">
            <p className="eyebrow text-harbor-300 mb-5">Advisory & Services</p>
            <h1
              className="text-display-xl text-paper mb-6"
              style={{ fontVariationSettings: '"opsz" 72' }}
            >
              More than
              <br />
              a listing agreement.
            </h1>
            <p className="text-paper/60 text-xl leading-relaxed max-w-2xl">
              Our practice spans the full lifecycle of commercial real estate
              ownership — from initial valuation through complex disposition
              scenarios that most brokers won&apos;t touch.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="section bg-paper">
          <div className="container-site">
            <div className="space-y-0 divide-y divide-paper-mid">
              {SERVICES.map((service) => (
                <div key={service.number} className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[11px] text-brass/50 tracking-[0.2em]">
                      {service.number}
                    </span>
                  </div>
                  <div className="lg:col-span-5">
                    <h2 className="font-display text-2xl font-semibold text-ink mb-4">{service.title}</h2>
                    <p className="text-slate leading-relaxed">{service.description}</p>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="text-label text-brass mb-3">Example Scenarios</p>
                    <ul className="space-y-2" role="list">
                      {service.scenarios.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate">
                          <span className="text-signal mt-1 flex-shrink-0" aria-hidden="true">→</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-paper-dark section">
          <div className="container-site text-center max-w-2xl mx-auto">
            <p className="eyebrow mb-4">Have a Specific Situation?</p>
            <h2 className="text-display-md text-ink mb-4" style={{ fontVariationSettings: '"opsz" 36' }}>
              Complex transactions are our specialty.
            </h2>
            <p className="text-slate mb-8 leading-relaxed">
              If your situation doesn&apos;t fit a simple listing agreement,
              that&apos;s exactly when 27 years of experience matters most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <LinkButton href="/sell" variant="signal" size="lg" icon={<ArrowRight />}>
                Request a Valuation
              </LinkButton>
              <LinkButton href="/contact" variant="ghost-ink" size="lg">
                Contact the Office
              </LinkButton>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
