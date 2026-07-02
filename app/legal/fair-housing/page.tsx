import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Fair Housing Notice | Schneider Realty Services",
};

export default function FairHousingPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Fair Housing Notice</h1>
          <div className="space-y-6 text-slate leading-relaxed">
            <div className="flex items-start gap-4 p-6 bg-paper-dark border border-paper-mid">
              <span className="text-3xl" aria-hidden="true">⊕</span>
              <div>
                <p className="font-semibold text-ink mb-1">Equal Housing Opportunity</p>
                <p className="text-sm">Schneider Realty Services is an equal opportunity real estate brokerage. We are committed to complying with federal, state, and local fair housing laws.</p>
              </div>
            </div>

            <p>Schneider Realty Services does not discriminate against any person because of race, color, religion, sex, national origin, disability, familial status, sexual orientation, gender identity, or any other characteristic protected under applicable federal, state, or local laws.</p>

            <p>It is illegal under federal law (the Fair Housing Act, 42 U.S.C. §§ 3601–3619) to discriminate in the sale or lease of commercial or residential real estate based on protected characteristics. New York State Human Rights Law and New York City Human Rights Law provide additional protections.</p>

            <p>If you believe you have been a victim of housing discrimination, you may file a complaint with:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>U.S. Department of Housing and Urban Development (HUD): 1-800-669-9777</li>
              <li>New York State Division of Human Rights: 1-888-392-3644</li>
              <li>New York City Commission on Human Rights: 212-306-7450</li>
            </ul>

            <p className="text-sm">For questions about fair housing compliance, contact us at 347-205-2882 or 420 South Avenue, Staten Island, NY 10303.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
