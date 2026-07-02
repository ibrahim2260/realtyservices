import { LinkButton, ArrowRight } from "@/components/ui/Button";
import { formatPhoneHref } from "@/lib/utils";

const PHONE = "347-205-2882";

export default function ConversionBand() {
  return (
    <section
      className="bg-harbor parcel-texture py-20"
      aria-label="Call to action"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <p className="eyebrow text-harbor-300 mb-4">
              Ready to Have a Conversation?
            </p>
            <h2
              className="text-display-lg text-paper mb-4"
              style={{ fontVariationSettings: '"opsz" 56' }}
            >
              What is your property worth
              <br />
              in today&apos;s market?
            </h2>
            <p className="text-paper/60 text-lg leading-relaxed max-w-lg">
              Michael Schneider provides confidential Broker Opinion of Value
              reports for commercial property owners considering a sale — at no
              cost, with no obligation. The market doesn&apos;t wait.
            </p>
          </div>

          {/* Right — CTA block */}
          <div className="lg:col-span-5">
            <div className="border border-harbor-600 bg-harbor-800/60 p-8">
              {/* Stamp */}
              <div className="inline-flex mb-6">
                <div
                  className="font-mono text-[10px] tracking-[0.18em] text-signal border border-signal/50 px-3 py-1.5 uppercase"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(200,69,31,0.15)" }}
                >
                  CONFIDENTIAL · NO OBLIGATION
                </div>
              </div>

              {/* Headline */}
              <p className="font-display text-xl font-semibold text-paper mb-2">
                Request a Broker Opinion of Value
              </p>
              <p className="text-paper/50 text-sm mb-6">
                We&apos;ll analyze your property and provide a detailed valuation
                within 3 business days.
              </p>

              {/* Primary CTA */}
              <LinkButton
                href="/sell"
                variant="signal"
                size="lg"
                className="w-full justify-center mb-4"
                icon={<ArrowRight />}
              >
                Request a Valuation
              </LinkButton>

              {/* Or call */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-harbor-600" />
                <span className="text-paper/30 text-xs font-mono">or call directly</span>
                <div className="flex-1 h-px bg-harbor-600" />
              </div>
              <a
                href={formatPhoneHref(PHONE)}
                className="block text-center font-mono text-xl font-bold text-paper hover:text-signal transition-colors mt-4"
              >
                {PHONE}
              </a>
              <p className="text-center font-mono text-[10px] text-paper/30 mt-1 tracking-wide">
                MICHAEL SCHNEIDER · PRINCIPAL BROKER
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
