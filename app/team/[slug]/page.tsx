import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LinkButton, ArrowRight } from "@/components/ui/Button";
import { getTeamMemberBySlug, getTeamMembers } from "@/lib/sanity";
import { formatPhoneHref } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  const members = await getTeamMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return { title: "Team Member Not Found" };
  return {
    title: `${member.name} | ${member.title}`,
    description: member.bio.slice(0, 160),
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    telephone: member.phone,
    email: member.email,
    worksFor: {
      "@type": "Organization",
      name: "Schneider Realty Services",
      url: "https://schneiderrealty.com",
    },
  };

  const paragraphs = member.bio.split("\n\n").filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content" className="pt-24">
        <div className="section bg-paper">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Profile */}
              <div className="lg:col-span-4">
                {member.photo && (
                  <div className="relative w-full bg-harbor-800 overflow-hidden mb-6" style={{ aspectRatio: "3/4" }}>
                    <Image src={member.photo.src} alt={member.photo.alt} fill className="object-cover object-center" sizes="400px" />
                  </div>
                )}
                <p className="font-mono text-[10px] text-brass tracking-[0.18em] uppercase mb-2">
                  {member.licenseType === "broker" ? "NY Licensed Real Estate Broker" : "NY Licensed Real Estate Salesperson"}
                </p>
                <h1 className="font-display text-3xl font-bold text-ink mb-1">{member.name}</h1>
                <p className="text-slate mb-6">{member.title}</p>

                {member.phone && (
                  <a href={formatPhoneHref(member.phone)} className="flex items-center gap-2 font-mono text-lg font-bold text-ink hover:text-signal transition-colors mb-4">
                    {member.phone}
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-sm text-slate hover:text-ink transition-colors block mb-6">
                    {member.email}
                  </a>
                )}

                <LinkButton href="/sell" variant="signal" size="md" icon={<ArrowRight />} className="w-full justify-center">
                  Request a Valuation
                </LinkButton>
              </div>

              {/* Bio */}
              <div className="lg:col-span-8">
                <div className="prose prose-slate max-w-none">
                  {paragraphs.map((para, i) => (
                    <p key={i} className={`leading-relaxed mb-5 ${i === 0 ? "text-lg text-ink" : "text-slate"}`}>
                      {para}
                    </p>
                  ))}
                </div>

                {member.highlights && member.highlights.length > 0 && (
                  <div className="mt-8 p-6 bg-paper-dark border border-paper-mid">
                    <p className="eyebrow mb-4">Career Highlights</p>
                    <ul className="space-y-2">
                      {member.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate text-sm">
                          <span className="text-signal flex-shrink-0 mt-0.5">→</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
