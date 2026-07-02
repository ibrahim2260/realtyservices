import Link from "next/link";
import { formatPhoneHref } from "@/lib/utils";

const PHONE = "347-205-2882";
const ADDRESS = "420 South Avenue, Staten Island, NY 10303";

const NAV_COL_1 = [
  { label: "Exclusive Listings", href: "/listings" },
  { label: "Track Record", href: "/track-record" },
  { label: "Sell a Property", href: "/sell" },
  { label: "Join the Investor List", href: "/invest" },
  { label: "Advisory Services", href: "/services" },
];

const NAV_COL_2 = [
  { label: "About the Firm", href: "/about" },
  { label: "Michael Schneider", href: "/team/michael-schneider" },
  { label: "Denise Schneider", href: "/team/denise-schneider" },
  { label: "Market Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Fair Housing Notice", href: "/legal/fair-housing" },
  { label: "NY Standard Operating Procedures", href: "/legal/sopa" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/schneiderrealty", icon: "f" },
  { label: "Instagram", href: "https://instagram.com/schneiderrealty", icon: "ig" },
  { label: "LinkedIn", href: "https://linkedin.com/company/schneider-realty", icon: "in" },
  { label: "X / Twitter", href: "https://x.com/SRSstatenisland", icon: "x" },
];

export default function Footer() {
  return (
    <footer
      className="bg-harbor parcel-texture text-paper/80"
      role="contentinfo"
    >
      {/* Main footer grid */}
      <div className="container-site py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand col */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex flex-col mb-6">
              <span className="font-mono text-label tracking-[0.16em] text-brass">
                SCHNEIDER
              </span>
              <span
                className="font-display text-2xl font-bold text-paper leading-none"
                style={{ fontVariationSettings: '"opsz" 40' }}
              >
                Realty Services
              </span>
              <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-harbor-300 mt-1">
                Staten Island · Commercial Investment
              </span>
            </Link>

            <p className="text-sm text-paper/60 leading-relaxed max-w-xs">
              Staten Island&apos;s exclusive commercial investment brokerage.
              27 years of focused expertise in every commercial asset class the
              borough offers.
            </p>

            <div className="flex items-center gap-4 mt-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded flex items-center justify-center border border-harbor-600 text-paper/50 hover:text-paper hover:border-paper/30 transition-colors font-mono text-[10px] font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav col 1 */}
          <div>
            <p className="eyebrow text-harbor-300 mb-5">Services</p>
            <ul className="space-y-3">
              {NAV_COL_1.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/60 hover:text-paper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav col 2 */}
          <div>
            <p className="eyebrow text-harbor-300 mb-5">Firm</p>
            <ul className="space-y-3">
              {NAV_COL_2.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/60 hover:text-paper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p className="eyebrow text-harbor-300 mb-5">Contact</p>
            <address className="not-italic space-y-3">
              <div>
                <p className="text-label text-harbor-300 mb-1">Office</p>
                <p className="text-sm text-paper/70">{ADDRESS}</p>
              </div>
              <div>
                <p className="text-label text-harbor-300 mb-1">Phone</p>
                <a
                  href={formatPhoneHref(PHONE)}
                  className="font-mono text-paper hover:text-signal transition-colors text-base"
                >
                  {PHONE}
                </a>
              </div>
              <div>
                <p className="text-label text-harbor-300 mb-1">Hours</p>
                <p className="text-sm text-paper/60">Monday – Friday, 9 AM – 5 PM</p>
              </div>
            </address>

            {/* Licenses */}
            <div className="mt-6 pt-6 border-t border-harbor-600">
              <p className="text-label text-harbor-300 mb-2">License</p>
              <p className="font-mono text-[11px] text-paper/50 leading-relaxed">
                Michael Schneider<br />
                NY Licensed Real Estate Broker<br />
                Denise Schneider<br />
                NY Licensed Real Estate Salesperson
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-harbor-600">
        <div className="container-site py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] text-paper/40 hover:text-paper/70 transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Equal Housing Opportunity logo (text version) */}
            <span
              className="font-mono text-[10px] text-paper/40 tracking-wider"
              aria-label="Equal Housing Opportunity"
            >
              ⊕ EQUAL HOUSING OPPORTUNITY
            </span>
            <span className="text-[11px] text-paper/30">
              © {new Date().getFullYear()} Schneider Realty Services
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
