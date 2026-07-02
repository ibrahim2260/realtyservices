import DealStamp from "@/components/ui/DealStamp";
import { LinkButton, ArrowRight } from "@/components/ui/Button";
import type { ClosedDeal } from "@/types";

interface TrackRecordTeaserProps {
  deals: ClosedDeal[];
}

export default function TrackRecordTeaser({ deals }: TrackRecordTeaserProps) {
  const featured = deals.slice(0, 6);

  return (
    <section className="section bg-paper-dark" aria-label="Track record">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left */}
          <div className="lg:max-w-md">
            <p className="eyebrow mb-4">Proof of Work</p>
            <h2
              className="text-display-lg text-ink mb-6"
              style={{ fontVariationSettings: '"opsz" 56' }}
            >
              A borough covered
              <br />
              in closed deals.
            </h2>
            <p className="text-slate leading-relaxed mb-8">
              The track record doesn&apos;t lie. Over 27 years, every neighborhood,
              every asset class, every side of the table. This is what
              1,000+ closed commercial transactions looks like.
            </p>
            <LinkButton
              href="/track-record"
              variant="ghost-ink"
              size="md"
              icon={<ArrowRight />}
            >
              View Full Track Record
            </LinkButton>
          </div>

          {/* Right — scattered deal stamps */}
          <div className="flex-1 max-w-2xl">
            <div className="relative flex flex-wrap gap-4 items-start">
              {featured.map((deal, i) => {
                const rotations = [1.5, -2, 0.8, -1.2, 2.2, -0.5];
                return (
                  <DealStamp
                    key={deal._id}
                    address={deal.address}
                    assetType={deal.assetType}
                    price={deal.price}
                    priceUndisclosed={deal.priceUndisclosed}
                    status="sold"
                    year={deal.closedYear}
                    units={deal.units}
                    sf={deal.buildingSF}
                    size="sm"
                    rotation={rotations[i % rotations.length]}
                  />
                );
              })}

              {/* "And 994 more" overflow */}
              <div
                className="font-mono text-[10px] text-slate/60 border border-paper-mid px-3 py-2"
                style={{ transform: "rotate(-1deg)" }}
              >
                <span className="text-signal font-bold">+ 994</span> more
                <br />
                closed deals
              </div>
            </div>

            {/* Aggregate */}
            <div className="mt-8 pt-6 border-t border-paper-mid flex gap-8">
              <div>
                <p className="font-mono text-3xl font-bold text-ink">$400M+</p>
                <p className="text-label text-brass mt-1">Career Volume</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-ink">1,000+</p>
                <p className="text-label text-brass mt-1">Properties Sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
