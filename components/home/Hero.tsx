"use client";

import { useEffect, useRef } from "react";
import { LinkButton, ArrowRight } from "@/components/ui/Button";
import { formatPhoneHref } from "@/lib/utils";

const STATS = [
  { value: "27", label: "Years" },
  { value: "1,000+", label: "Properties" },
  { value: "$400M+", label: "Volume" },
] as const;

export default function Hero() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = [
      { el: overlayRef.current, delay: 0 },
      { el: headlineRef.current, delay: 180 },
      { el: statsRef.current, delay: 400 },
      { el: subRef.current, delay: 540 },
      { el: ctaRef.current, delay: 700 },
    ];

    timeline.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition =
        "opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)";
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });
  }, []);

  return (
    <section
      className="relative h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover animate-[kenburns_22s_ease-in-out_infinite_alternate]"
          style={{
            backgroundImage: `url('/images/nyc2-header.avif')`,
            backgroundPosition: "center 40%",
          }}
          aria-hidden="true"
        />
        {/* Bottom-to-top gradient: photo breathes at top, deep dark anchors the text */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              rgba(10,20,28,0.97) 0%,
              rgba(12,26,36,0.90) 28%,
              rgba(15,33,48,0.62) 55%,
              rgba(15,33,48,0.16) 100%
            )`,
          }}
          aria-hidden="true"
        />
        {/* Top fade */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(10,20,28,0.92) 0%,
              rgba(10,20,28,0.55) 8%,
              rgba(10,20,28,0.10) 20%,
              transparent 35%
            )`,
          }}
          aria-hidden="true"
        />
        {/* Left vignette for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(10,20,28,0.30) 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content — bottom-anchored, all spacing in vh so it compresses on short screens */}
      <div
        className="container-site relative z-10"
        style={{ paddingBottom: "clamp(2rem, 6vh, 4.5rem)" }}
      >

        {/* Eyebrow */}
        <div
          ref={overlayRef}
          style={{ opacity: 0, marginBottom: "clamp(0.75rem, 2vh, 1.25rem)" }}
        >
          <p className="font-mono text-label font-bold tracking-[0.22em] text-paper/90 uppercase flex items-center gap-3" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
            <span className="block w-8 h-px bg-signal" aria-hidden="true" />
            Staten Island · Commercial Investment
          </p>
        </div>

        {/* Headline — font-size capped so 3 lines never overflow the viewport */}
        <h1
          ref={headlineRef}
          className="text-paper max-w-5xl"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            fontVariationSettings: '"opsz" 72',
            marginBottom: "clamp(1rem, 2.5vh, 1.75rem)",
          }}
        >
          Staten Island&apos;s Commercial
          <br />
          Investment Market{" "}
          <span
            className="italic"
            style={{ color: "var(--harbor-300)" }}
          >
            Runs Through
          </span>
          <br />
          This Office.
        </h1>

        {/* Stat row */}
        <div
          ref={statsRef}
          className="flex items-center"
          style={{ opacity: 0, marginBottom: "clamp(0.75rem, 2vh, 1.25rem)" }}
        >
          {STATS.map(({ value, label }, i) => (
            <div key={value} className="flex items-center">
              <div className="flex flex-col pr-6">
                <span className="font-mono text-[1.05rem] font-bold text-paper leading-none tracking-tight">
                  {value}
                </span>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-paper/35 mt-1">
                  {label}
                </span>
              </div>
              {i < STATS.length - 1 && (
                <span
                  className="h-6 w-px bg-paper/15 mr-6 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-[0.925rem] text-paper/50 max-w-sm leading-[1.7]"
          style={{ opacity: 0, marginBottom: "clamp(1.25rem, 3vh, 2rem)" }}
        >
          The only broker in the borough dedicated exclusively to commercial
          investment sales — every asset class, every neighborhood.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center gap-3"
          style={{ opacity: 0 }}
        >
          <LinkButton href="/sell" variant="signal" size="lg" icon={<ArrowRight />}>
            Request a Confidential Valuation
          </LinkButton>
          <LinkButton href="/listings" variant="ghost" size="lg">
            View Exclusive Listings
          </LinkButton>
          <a
            href={formatPhoneHref("347-205-2882")}
            className="hidden sm:inline-flex items-center gap-2 ml-1 font-mono text-[0.8rem] text-paper/28 hover:text-paper/55 transition-colors duration-200"
          >
            <span className="block w-4 h-px bg-current" aria-hidden="true" />
            347-205-2882
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 md:right-14 z-10 flex flex-col items-center gap-2 opacity-25">
        <div className="w-px h-12 bg-paper/50 animate-[scrollbar_2s_ease-in-out_infinite]" />
        <span className="font-mono text-[9px] text-paper tracking-[0.22em] rotate-90 origin-center translate-y-4">
          SCROLL
        </span>
      </div>

      <style jsx>{`
        @keyframes kenburns {
          from { transform: scale(1) translateY(0); }
          to   { transform: scale(1.06) translateY(-1.5%); }
        }
        @keyframes scrollbar {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
          50%       { opacity: 0.9; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
