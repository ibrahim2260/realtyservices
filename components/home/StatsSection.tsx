"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel?: string;
}

const STATS: Stat[] = [
  {
    value: 27,
    suffix: "",
    label: "Years of Exclusive Focus",
    sublabel: "Staten Island commercial only",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Properties Personally Sold",
    sublabel: "Every asset class, every neighborhood",
  },
  {
    value: 400,
    suffix: "M+",
    prefix: "$",
    label: "Career Transaction Volume",
    sublabel: "Closed investment sales",
  },
  {
    value: 1,
    suffix: "",
    label: "Borough. One Specialist.",
    sublabel: "#1 in Staten Island commercial transactions",
  },
];

function useCountUp(target: number, duration = 1400, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);

  return count;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, 1400, active);

  return (
    <div className="flex flex-col">
      {/* Rule above */}
      <div className="w-8 h-px bg-brass mb-6" aria-hidden="true" />

      {/* Number */}
      <div
        className="font-mono text-5xl md:text-6xl font-bold text-ink leading-none mb-3"
        style={{ fontVariationSettings: '"wdth" 100' }}
        aria-label={`${stat.prefix ?? ""}${stat.value}${stat.suffix}`}
      >
        {stat.prefix && (
          <span className="text-brass text-3xl md:text-4xl">{stat.prefix}</span>
        )}
        {active ? count.toLocaleString("en-US") : "0"}
        <span className="text-signal text-3xl md:text-4xl">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="font-display text-lg font-semibold text-ink leading-tight mb-1">
        {stat.label}
      </p>
      {stat.sublabel && (
        <p className="text-sm text-slate">{stat.sublabel}</p>
      )}
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section bg-paper-dark"
      aria-label="Track record statistics"
    >
      <div className="container-site">
        <div className="mb-12">
          <p className="eyebrow text-brass mb-4">By the Numbers</p>
          <h2 className="text-display-lg text-ink max-w-2xl" style={{ fontVariationSettings: '"opsz" 56' }}>
            The record speaks for itself.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} active={active} />
          ))}
        </div>

        {/* Supporting text */}
        <div className="mt-16 pt-8 border-t border-paper-mid max-w-2xl">
          <p className="text-slate leading-relaxed">
            Michael Schneider recently closed more commercial transactions than
            any other broker operating in Staten Island — not as one of several
            active specialists, but as the borough&apos;s only broker focused exclusively
            on commercial investment sales.
          </p>
        </div>
      </div>
    </section>
  );
}
