import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "NY Standard Operating Procedures | Schneider Realty Services",
};

export default function SopaPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-4xl font-bold text-ink mb-4">
            New York Standard Operating Procedures
          </h1>
          <p className="text-sm text-slate/60 mb-8">
            As required by New York State law (NY Real Property Law § 443-a) for licensed real estate brokers.
          </p>

          <div className="space-y-8 text-slate leading-relaxed">
            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Firm Information</h2>
              <p><strong>Schneider Realty Services</strong><br />
              420 South Avenue, Staten Island, NY 10303<br />
              Phone: 347-205-2882<br />
              Principal Broker: Michael Schneider, NY Licensed Real Estate Broker</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Type of Representation</h2>
              <p>Schneider Realty Services represents sellers and buyers in commercial real estate transactions. The nature of our representation — seller&apos;s agent, buyer&apos;s agent, or dual agent — is disclosed to all parties at the time of first substantive contact, as required by Article 12-A of the New York Real Property Law.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Listings</h2>
              <p>Properties listed with Schneider Realty Services are accepted and shown without discrimination based on any protected characteristic. All listings are handled in accordance with applicable law and professional standards.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Buyer Representation</h2>
              <p>Buyers who engage Schneider Realty Services will receive a written buyer representation agreement prior to touring properties, as required by New York State law effective July 1, 2024. The terms of representation, including compensation arrangements, will be fully disclosed.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Complaints</h2>
              <p>Complaints regarding the conduct of this firm may be directed to:</p>
              <p className="mt-2">New York State Department of State, Division of Licensing Services<br />
              One Commerce Plaza, 99 Washington Ave., Albany, NY 12231<br />
              Phone: 518-474-4429<br />
              Website: dos.ny.gov/licensing</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Document Retention</h2>
              <p>Transaction records are retained for a minimum of three years from closing, as required by New York State regulations.</p>
            </section>

            <p className="text-sm text-slate/60 border-t border-paper-mid pt-6">
              These Standard Operating Procedures are subject to change to reflect updates in applicable law. Last reviewed: January 2026.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
