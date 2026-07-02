import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Schneider Realty Services",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-4xl font-bold text-ink mb-8">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none space-y-6 text-slate leading-relaxed">
            <p className="text-sm text-slate/60">Last updated: January 1, 2026</p>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Information We Collect</h2>
              <p>Schneider Realty Services collects information you voluntarily provide through our contact forms, valuation request forms, and investor list sign-up forms. This includes your name, email address, phone number, and property information.</p>
              <p>We also collect technical information automatically, including IP address, browser type, and pages visited, through standard web analytics tools.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">How We Use Your Information</h2>
              <p>Information you provide is used solely to respond to your inquiry, provide property valuation services, deliver requested property information, and, if you have opted in, notify you of commercial investment opportunities matching your stated criteria.</p>
              <p>We do not sell, rent, or share your personal information with third parties except as required by law or as necessary to complete a real estate transaction you are party to.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Data Retention</h2>
              <p>We retain inquiry and lead information for business purposes consistent with industry practice. You may request deletion of your personal data by contacting us directly at 347-205-2882 or via our contact form.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Cookies</h2>
              <p>This site uses essential cookies for analytics and site functionality. We do not use advertising cookies or share data with advertising networks.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink mb-3">Contact</h2>
              <p>Privacy questions: 420 South Avenue, Staten Island, NY 10303 · 347-205-2882.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
