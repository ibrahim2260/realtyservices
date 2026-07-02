import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LinkButton, ArrowRight } from "@/components/ui/Button";
import { getTeamMembers } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About the Firm | Schneider Realty Services",
  description:
    "Schneider Realty Services is Staten Island's only commercial investment brokerage dedicated exclusively to the borough's commercial market. Founded by Michael Schneider, 27 years of focus.",
};

const TIMELINE = [
  { year: "1997", event: "Michael Schneider enters commercial real estate in Staten Island" },
  { year: "2005", event: "Completes NY State Real Estate Broker license; focuses exclusively on commercial investment sales" },
  { year: "2010", event: "Closes first $10M+ single-asset transaction — a North Shore industrial property" },
  { year: "2015", event: "Expands practice to include note sales, partnership interests, and EB-5 transactions" },
  { year: "2019", event: "Closes 500th commercial transaction; $200M+ career volume milestone" },
  { year: "2022", event: "Closes largest single transaction in SI: $14M+ anchored shopping center" },
  { year: "2024", event: "More closed commercial transactions than any other broker in Staten Island (annual period)" },
  { year: "2025", event: "Crosses $400M+ in career commercial transaction volume" },
];

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Schneider Realty Services",
    description: "Staten Island's exclusive commercial investment brokerage.",
    url: "https://schneiderrealty.com",
    telephone: "347-205-2882",
    address: {
      "@type": "PostalAddress",
      streetAddress: "420 South Avenue",
      addressLocality: "Staten Island",
      addressRegion: "NY",
      postalCode: "10303",
      addressCountry: "US",
    },
    sameAs: [
      "https://facebook.com/schneiderrealty",
      "https://x.com/SRSstatenisland",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content" className="pt-24">
        {/* Hero */}
        <div className="bg-harbor parcel-texture py-20">
          <div className="container-site">
            <p className="eyebrow text-harbor-300 mb-5">About the Firm</p>
            <h1
              className="text-display-xl text-paper mb-6 max-w-4xl"
              style={{ fontVariationSettings: '"opsz" 72' }}
            >
              One borough.
              <br />
              One practice.
              <br />
              <span className="italic text-harbor-300">27 years.</span>
            </h1>
          </div>
        </div>

        {/* Firm story */}
        <div className="section bg-paper">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <p className="eyebrow mb-6">The Firm</p>
                <div className="space-y-5 text-slate leading-relaxed">
                  <p className="text-ink text-lg">
                    Schneider Realty Services was built on a premise that sounds
                    simple but is rarely executed: focus on one market completely,
                    know it better than anyone, and let that depth create results
                    that generalists can&apos;t match.
                  </p>
                  <p>
                    For 27 years, Principal Broker Michael Schneider has operated
                    exclusively in Staten Island&apos;s commercial investment market — not
                    as a side practice alongside residential sales or other boroughs,
                    but as the firm&apos;s singular focus. The result is a level of market
                    knowledge, owner relationships, and buyer access that no one
                    competing across multiple markets can replicate.
                  </p>
                  <p>
                    The firm handles every commercial asset class the borough offers.
                    Multifamily, retail, office, land and development sites, industrial
                    and warehouse properties, hotels, shopping centers, mixed-use
                    buildings, SROs, IMDs, retail condos, note and loan sales,
                    partnership interest transactions, and adaptive reuse conversions.
                    Michael Schneider has personally closed transactions in every
                    category.
                  </p>
                  <p>
                    Schneider Realty Services is based at 420 South Avenue,
                    Staten Island. All inquiries are handled personally by
                    Michael Schneider.
                  </p>
                </div>

                <div className="mt-8">
                  <LinkButton href="/sell" variant="signal" size="md" icon={<ArrowRight />}>
                    Request a Confidential Valuation
                  </LinkButton>
                </div>
              </div>

              {/* Timeline */}
              <div className="lg:col-span-5">
                <p className="eyebrow mb-6">Timeline</p>
                <div className="space-y-0">
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-5 pb-6">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-signal flex-shrink-0 mt-1" />
                        {i < TIMELINE.length - 1 && (
                          <div className="w-px flex-1 bg-paper-mid mt-2" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="font-mono text-[11px] text-brass tracking-wide mb-1">{item.year}</p>
                        <p className="text-sm text-slate leading-relaxed">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="section bg-paper-dark">
          <div className="container-site">
            <p className="eyebrow mb-4">The Team</p>
            <h2 className="text-display-md text-ink mb-12" style={{ fontVariationSettings: '"opsz" 36' }}>
              Two brokers. Full attention.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {teamMembers.map((member) => (
                <Link
                  key={member._id}
                  href={`/team/${member.slug}`}
                  className="group flex flex-col"
                >
                  {member.photo && (
                    <div className="relative w-full bg-harbor-800 overflow-hidden mb-5" style={{ aspectRatio: "3/4" }}>
                      <Image
                        src={member.photo.src}
                        alt={member.photo.alt}
                        fill
                        className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <p className="font-mono text-[10px] text-brass tracking-[0.18em] uppercase mb-2">
                    {member.licenseType === "broker" ? "NY Licensed Real Estate Broker" : "NY Licensed Real Estate Salesperson"}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-ink group-hover:text-harbor transition-colors mb-1">
                    {member.name}
                  </h3>
                  <p className="text-slate text-sm">{member.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
