import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LinkButton, ArrowRight } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-24 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="container-site py-20">
            <div className="max-w-2xl">
              {/* Deal stamp 404 */}
              <div className="inline-flex mb-10">
                <div
                  className="deal-stamp deal-stamp-sold font-mono"
                  aria-hidden="true"
                  style={{ transform: "rotate(-2deg)", padding: "16px 20px" }}
                >
                  <span className="text-[11px] tracking-[0.2em]">ERROR · 404</span>
                  <span className="text-2xl font-bold tracking-tight mt-1">NOT FOUND</span>
                  <span className="text-[11px] tracking-wide opacity-70">SCHNEIDER REALTY SERVICES</span>
                </div>
              </div>

              <h1
                className="text-display-xl text-ink mb-4"
                style={{ fontVariationSettings: '"opsz" 72' }}
              >
                This parcel
                <br />
                isn&apos;t on the map.
              </h1>

              <p className="text-xl text-slate leading-relaxed mb-8 max-w-lg">
                The page you&apos;re looking for doesn&apos;t exist — but we know every
                commercial parcel in Staten Island that does.
              </p>

              <div className="flex flex-wrap gap-4">
                <LinkButton href="/listings" variant="signal" size="lg" icon={<ArrowRight />}>
                  View Listings
                </LinkButton>
                <LinkButton href="/" variant="ghost-ink" size="lg">
                  Back to Home
                </LinkButton>
              </div>

              <div className="mt-10 pt-8 border-t border-paper-mid">
                <p className="text-sm text-slate">
                  Looking for something specific?{" "}
                  <Link href="/contact" className="text-signal hover:underline">
                    Contact the office
                  </Link>{" "}
                  or call{" "}
                  <a href="tel:3472052882" className="font-mono text-ink hover:text-signal transition-colors">
                    347-205-2882
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
