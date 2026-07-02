import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactFormClient from "@/components/forms/ContactFormClient";
import { formatPhoneHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact | Schneider Realty Services",
  description:
    "Contact Schneider Realty Services. 420 South Avenue, Staten Island, NY. 347-205-2882. Monday–Friday 9 AM – 5 PM.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        <div className="section bg-paper">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left — contact info */}
              <div className="lg:col-span-5">
                <p className="eyebrow mb-4">Contact</p>
                <h1
                  className="text-display-lg text-ink mb-8"
                  style={{ fontVariationSettings: '"opsz" 56' }}
                >
                  Let&apos;s talk
                  <br />
                  about the deal.
                </h1>

                <div className="space-y-8">
                  <div>
                    <p className="text-label text-brass mb-2">Phone</p>
                    <a
                      href={formatPhoneHref("347-205-2882")}
                      className="font-mono text-3xl font-bold text-ink hover:text-signal transition-colors"
                    >
                      347-205-2882
                    </a>
                    <p className="text-sm text-slate mt-1">
                      Direct line to Michael Schneider
                    </p>
                  </div>

                  <div>
                    <p className="text-label text-brass mb-2">Office</p>
                    <address className="not-italic text-slate leading-relaxed">
                      420 South Avenue<br />
                      Staten Island, NY 10303
                    </address>
                  </div>

                  <div>
                    <p className="text-label text-brass mb-2">Hours</p>
                    <p className="text-slate">Monday – Friday, 9:00 AM – 5:00 PM</p>
                    <p className="text-sm text-slate/60 mt-1">
                      Evening and weekend calls accepted for active transaction matters.
                    </p>
                  </div>

                  <div>
                    <p className="text-label text-brass mb-3">Connect</p>
                    <div className="flex gap-4">
                      {[
                        { label: "Facebook", href: "https://facebook.com/schneiderrealty" },
                        { label: "Instagram", href: "https://instagram.com/schneiderrealty" },
                        { label: "LinkedIn", href: "https://linkedin.com/company/schneider-realty" },
                        { label: "X", href: "https://x.com/SRSstatenisland" },
                      ].map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-slate/60 hover:text-ink border border-paper-mid hover:border-ink/30 px-3 py-1.5 transition-colors"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-8 h-48 bg-harbor-800 flex items-center justify-center">
                  <p className="font-mono text-xs text-paper/30">
                    420 South Avenue, Staten Island, NY 10303<br />
                    <span className="text-[10px] opacity-50">MAP — requires Mapbox token</span>
                  </p>
                </div>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-7">
                <div className="bg-paper-dark border border-paper-mid p-8">
                  <h2 className="font-display text-xl font-semibold text-ink mb-2">
                    Send a Message
                  </h2>
                  <p className="text-slate text-sm mb-6">
                    We respond to all inquiries within one business day.
                  </p>
                  <ContactFormClient />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
