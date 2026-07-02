"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { LinkButton } from "@/components/ui/Button";
import { formatPhoneHref, cn } from "@/lib/utils";

const PHONE = "347-205-2882";

const NAV_LINKS = [
  { label: "Listings", href: "/listings" },
  { label: "Track Record", href: "/track-record" },
  { label: "Sell", href: "/sell" },
  { label: "Invest", href: "/invest" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

interface HeaderProps {
  /** When true, header starts transparent over a hero */
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route navigation
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isSolid = !transparent || scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isSolid
            ? "bg-paper shadow-sm border-b border-paper-mid"
            : "bg-transparent"
        )}
        role="banner"
      >
        {/* Utility bar — hidden on mobile */}
        <div
          className={cn(
            "hidden sm:block border-b transition-colors duration-300",
            isSolid ? "border-paper-mid" : "border-white/10"
          )}
        >
          <div className="container-site flex items-center justify-between py-1.5">
            <address
              className={cn(
                "not-italic text-label transition-colors duration-300 hidden md:block",
                isSolid ? "text-slate" : "text-harbor-300"
              )}
            >
              420 South Ave, Staten Island, NY · Mon–Fri 9–5
            </address>
            <a
              href={formatPhoneHref(PHONE)}
              className={cn(
                "text-label transition-colors duration-300 hover:underline ml-auto",
                isSolid ? "text-ink font-semibold" : "text-paper/80"
              )}
            >
              {PHONE}
            </a>
          </div>
        </div>

        {/* Main nav */}
        <div className="container-site flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
            aria-label="Schneider Realty Services — Home"
          >
            <span
              className={cn(
                "font-mono text-label tracking-[0.14em] transition-colors duration-300",
                isSolid ? "text-brass" : "text-brass-light"
              )}
            >
              SCHNEIDER
            </span>
            <span
              className={cn(
                "font-display font-700 text-[1.35rem] leading-none transition-colors duration-300",
                isSolid ? "text-harbor" : "text-paper"
              )}
              style={{ fontVariationSettings: '"opsz" 40' }}
            >
              Realty Services
            </span>
            <span
              className={cn(
                "hidden xl:block font-mono text-[9px] tracking-[0.16em] uppercase mt-1.5 transition-colors duration-300",
                isSolid ? "text-slate" : "text-harbor-300"
              )}
            >
              Staten Island · Commercial Investment
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-5"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[12px] font-medium tracking-wide whitespace-nowrap transition-colors duration-200",
                  isSolid
                    ? "text-slate hover:text-ink"
                    : "text-paper/70 hover:text-paper"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LinkButton
              href="/sell"
              variant="signal"
              size="sm"
            >
              Request a Valuation
            </LinkButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              "lg:hidden flex flex-col justify-center gap-1.5 w-10 h-10 p-2",
              "transition-colors duration-200",
              isSolid ? "text-ink" : "text-paper"
            )}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className="block w-full h-px bg-current" />
            <span className="block w-2/3 h-px bg-current" />
            <span className="block w-full h-px bg-current" />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-[60] bg-harbor parcel-texture transition-all duration-500",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-harbor-600">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex flex-col"
            >
              <span className="font-mono text-label tracking-[0.14em] text-brass">
                SCHNEIDER
              </span>
              <span className="font-display font-bold text-xl text-paper leading-none">
                Realty Services
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-paper/60 hover:text-paper transition-colors p-2"
              aria-label="Close navigation menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav
            className="flex-1 flex flex-col justify-center px-6 gap-2"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-harbor-600/50"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="font-display text-2xl text-paper font-semibold">
                  {link.label}
                </span>
                <svg
                  className="w-5 h-5 text-signal opacity-0 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10h12M10 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Mobile bottom CTA + deal stamp */}
          <div className="px-6 pb-10 pt-6 border-t border-harbor-600">
            <LinkButton
              href="/sell"
              variant="signal"
              size="lg"
              className="w-full justify-center mb-4"
              onClick={() => setMobileOpen(false)}
            >
              Request a Confidential Valuation
            </LinkButton>
            <a
              href={formatPhoneHref(PHONE)}
              className="block text-center font-mono text-paper/70 text-sm tracking-wider"
            >
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
