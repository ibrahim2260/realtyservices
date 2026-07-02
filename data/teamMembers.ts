/**
 * PLACEHOLDER DATA — SRS team members.
 * Replace with live Sanity CMS data.
 */

import type { TeamMember } from "@/types";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    _id: "tm-001",
    slug: "michael-schneider",
    name: "Michael Schneider",
    title: "Principal Broker | Head of Investment Sales",
    licenseType: "broker",
    bio: `Michael Schneider is Staten Island's foremost commercial investment specialist — the only broker in the borough dedicating his practice exclusively to commercial investment sales. Over a 27-year career, he has personally sold more than 1,000 properties and closed in excess of $400 million in career transaction volume.

Michael heads Schneider Realty Services' Investment Sales Division and has recently closed more commercial transactions than any other broker operating in Staten Island. His practice spans every commercial asset class the borough offers: land and development sites, multifamily, retail, office, shopping centers, mixed-use, hotels, industrial and warehouse properties, SROs, IMDs, EB-5 projects, retail condos, note and loan sales, partnership interests, and conversion plays.

What distinguishes Michael is a combination of depth and scope that no generalist can replicate. He knows every block, every owner, every zoning nuance in the borough — and he has represented every side of the table: sellers, buyers, developers, lenders, and 1031-exchange intermediaries. When you're making a seven- or eight-figure decision in Staten Island's commercial market, there is one call to make.

Michael holds a New York State Real Estate Broker license and is an active member of the Staten Island Board of Realtors.`,
    highlights: [
      "27 years of exclusive Staten Island commercial focus",
      "1,000+ properties personally sold",
      "$400M+ career transaction volume",
      "More closed commercial transactions than any other SI broker (recent period)",
      "All asset classes: multifamily, retail, land, industrial, hotels, notes, EB-5",
    ],
    phone: "347-205-2882",
    email: "michael@schneiderrealty.com",
    photo: {
      src: "/images/michael-headshot.webp",
      alt: "Michael Schneider, Principal Broker",
      width: 600,
      height: 750,
    },
    featured: true,
  },
  {
    _id: "tm-002",
    slug: "denise-schneider",
    name: "Denise Schneider",
    title: "Licensed Real Estate Salesperson",
    licenseType: "salesperson",
    bio: `Denise Schneider is a New York State Licensed Real Estate Salesperson at Schneider Realty Services, where she provides client services across the firm's investment sales and advisory practice.

Denise works closely with sellers and buyers throughout the transaction lifecycle — from initial property analysis and marketing coordination through due diligence support and closing. Her detail-oriented approach and deep familiarity with Staten Island's commercial real estate landscape make her an integral part of every transaction the firm handles.`,
    highlights: [
      "NY State Licensed Real Estate Salesperson",
      "Transaction coordination and client services",
      "Due diligence support and marketing coordination",
    ],
    phone: "347-205-2882",
    email: "denise@schneiderrealty.com",
    photo: {
      src: "/images/denise-headshot.webp",
      alt: "Denise Schneider, Licensed Salesperson",
      width: 600,
      height: 750,
    },
    featured: true,
  },
];
