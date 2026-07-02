"use client";

import { useEffect, useRef } from "react";
import { LinkButton, ArrowRight } from "@/components/ui/Button";

const ARGUMENTS = [
  {
    number: "01",
    title: "Depth That Generalists Can't Match",
    body: "When you've worked a single market for 27 years, you know every owner, every building, every value driver — and you know which blocks are hot before anyone else does. A generalist spreading across five boroughs can't compete with that level of accumulated intelligence.",
  },
  {
    number: "02",
    title: "A Buyer Pool That Takes Years to Build",
    body: "Our investor database isn't a mailing list — it's a curated network of pre-qualified buyers assembled over 27 years of exclusive Staten Island focus. When you hire us to sell, your property reaches buyers who have a specific mandate to buy in this market.",
  },
  {
    number: "03",
    title: "No Conflicts. No Divided Attention.",
    body: "We are not juggling residential sales, rentals, or other markets. Every hour of our practice is spent on commercial investment — which means every piece of market intelligence, every relationship, every dollar of focus works for your transaction.",
  },
];

export default function SpecialistManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = sectionRef.current?.querySelectorAll(".reveal-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section bg-harbor parcel-texture"
      aria-label="Why the specialist"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left — manifesto */}
          <div className="lg:col-span-7">
            <p className="eyebrow text-harbor-300 mb-6">The Specialist Argument</p>
            <h2
              className="text-display-lg text-paper mb-6 leading-tight"
              style={{ fontVariationSettings: '"opsz" 56' }}
            >
              One borough.
              <br />
              <span className="italic text-harbor-300">Every</span> deal.
            </h2>
            <p className="text-paper/60 text-lg leading-relaxed max-w-xl mb-12">
              Staten Island&apos;s commercial investment market is large enough to be
              lucrative and small enough that specialization creates an overwhelming
              competitive advantage. Here is why the only call you need to make is ours.
            </p>

            <div className="space-y-8">
              {ARGUMENTS.map((arg, i) => (
                <div
                  key={i}
                  className="reveal-card flex gap-6 opacity-0 translate-y-6 transition-all duration-700"
                  style={{
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  <div
                    className="font-mono text-[11px] tracking-[0.18em] text-signal/70 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  >
                    {arg.number}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-paper mb-2">
                      {arg.title}
                    </h3>
                    <p className="text-paper/55 leading-relaxed text-base">
                      {arg.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <LinkButton
                href="/sell"
                variant="signal"
                size="lg"
                icon={<ArrowRight />}
              >
                Request a Confidential Valuation
              </LinkButton>
            </div>
          </div>

          {/* Right — stylized parcel map of Staten Island */}
          <div
            ref={mapRef}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <StatIslandMap />
          </div>
        </div>
      </div>

      <style jsx>{`
        .reveal-card.revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}

function StatIslandMap() {
  return (
    <div className="relative">
      {/* Outer border */}
      <div className="border border-harbor-600 p-8">
        {/* Inner rule */}
        <div className="border border-harbor-600/40 p-6">
          {/* SVG stylized SI map outline */}
          <svg
            viewBox="0 0 400 500"
            className="w-full h-auto opacity-80"
            aria-label="Stylized map of Staten Island showing deal coverage"
          >
            {/* Staten Island simplified outline */}
            <path
              d="M 80 80 L 100 40 L 160 20 L 240 30 L 320 70 L 360 120 L 370 180 L 350 250 L 320 330 L 280 400 L 220 460 L 160 480 L 100 460 L 60 410 L 40 350 L 30 270 L 40 190 Z"
              fill="none"
              stroke="rgba(247,245,240,0.15)"
              strokeWidth="1.5"
            />

            {/* Neighborhood grid lines (stylized tax map) */}
            <g stroke="rgba(154,123,79,0.2)" strokeWidth="0.5" fill="none">
              <line x1="80" y1="80" x2="370" y2="180" />
              <line x1="40" y1="270" x2="360" y2="250" />
              <line x1="60" y1="410" x2="350" y2="250" />
              <line x1="100" y1="40" x2="100" y2="460" />
              <line x1="200" y1="30" x2="220" y2="460" />
              <line x1="300" y1="70" x2="280" y2="400" />
            </g>

            {/* Deal markers — dots for closed transactions */}
            {[
              [200, 100],
              [180, 180],
              [160, 200],
              [230, 160],
              [300, 150],
              [250, 250],
              [200, 300],
              [300, 280],
              [280, 200],
              [180, 320],
              [320, 360],
              [160, 380],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle
                  cx={Number(x)}
                  cy={Number(y)}
                  r="4"
                  fill="#C8451F"
                  opacity="0.8"
                />
                <circle
                  cx={Number(x)}
                  cy={Number(y)}
                  r="8"
                  fill="none"
                  stroke="#C8451F"
                  strokeWidth="1"
                  opacity="0.3"
                />
                {/* Animated pulse */}
                <circle
                  cx={Number(x)}
                  cy={Number(y)}
                  r="12"
                  fill="none"
                  stroke="#C8451F"
                  strokeWidth="0.5"
                  opacity="0.15"
                />
              </g>
            ))}

            {/* North arrow */}
            <g transform="translate(20, 30)">
              <line x1="0" y1="20" x2="0" y2="0" stroke="rgba(247,245,240,0.3)" strokeWidth="1" />
              <polygon points="0,0 -4,10 4,10" fill="rgba(247,245,240,0.3)" />
              <text x="5" y="8" fill="rgba(247,245,240,0.3)" fontSize="10" fontFamily="monospace">N</text>
            </g>
          </svg>

          {/* Map label */}
          <div className="mt-4 pt-4 border-t border-harbor-600/40">
            <p className="font-mono text-[10px] tracking-[0.18em] text-brass/70 uppercase">
              Staten Island, New York
            </p>
            <p className="font-mono text-[9px] text-harbor-300/50 tracking-wide mt-1">
              ● Closed commercial transactions · All neighborhoods covered
            </p>
          </div>
        </div>
      </div>

      {/* Stat overlays */}
      <div className="absolute -top-4 -right-4 bg-ink border border-harbor-600 p-3">
        <p className="font-mono text-[10px] text-brass/70 tracking-[0.15em]">TRANSACTIONS</p>
        <p className="font-mono text-2xl font-bold text-paper">1,000+</p>
      </div>
    </div>
  );
}
