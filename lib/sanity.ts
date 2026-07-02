/**
 * Sanity CMS client — typed mock layer.
 *
 * When Sanity credentials are available, set these env vars and uncomment the
 * live client section. The public API surface (getListing, getListings, etc.)
 * stays identical — swapping to live data requires only this file.
 *
 * Required env vars (add to .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_API_READ_TOKEN=
 */

import type { Listing, ClosedDeal, TeamMember, Article } from "@/types";

// ─── Live Sanity client (uncomment when credentials are ready) ────────────────
// import { createClient } from "next-sanity";
// export const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//   apiVersion: "2024-01-01",
//   useCdn: true,
//   token: process.env.SANITY_API_READ_TOKEN,
// });

// ─── Mock data imports (replace with GROQ queries when live) ─────────────────
import { LISTINGS, FEATURED_LISTINGS } from "@/data/listings";
import { CLOSED_DEALS } from "@/data/closedDeals";
import { TEAM_MEMBERS } from "@/data/teamMembers";
import { ARTICLES } from "@/data/articles";

// ─── Listings ─────────────────────────────────────────────────────────────────

export async function getListings(): Promise<Listing[]> {
  // Live: return sanityClient.fetch(`*[_type == "listing"] | order(listedDate desc)`)
  return LISTINGS;
}

export async function getFeaturedListings(): Promise<Listing[]> {
  // Live: return sanityClient.fetch(`*[_type == "listing" && isFeatured == true][0...3]`)
  return FEATURED_LISTINGS;
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  // Live: return sanityClient.fetch(`*[_type == "listing" && slug.current == $slug][0]`, { slug })
  return LISTINGS.find((l) => l.slug === slug) ?? null;
}

// ─── Closed Deals ─────────────────────────────────────────────────────────────

export async function getClosedDeals(): Promise<ClosedDeal[]> {
  // Live: return sanityClient.fetch(`*[_type == "closedDeal"] | order(closedYear desc, closedMonth desc)`)
  return CLOSED_DEALS;
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  // Live: return sanityClient.fetch(`*[_type == "teamMember" && featured == true] | order(order asc)`)
  return TEAM_MEMBERS;
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  // Live: return sanityClient.fetch(`*[_type == "teamMember" && slug.current == $slug][0]`, { slug })
  return TEAM_MEMBERS.find((m) => m.slug === slug) ?? null;
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  // Live: return sanityClient.fetch(`*[_type == "article"] | order(publishedDate desc)`)
  return ARTICLES;
}

export async function getLatestArticles(count = 2): Promise<Article[]> {
  // Live: return sanityClient.fetch(`*[_type == "article"] | order(publishedDate desc)[0...$count]`, { count })
  return ARTICLES.slice(0, count);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Live: return sanityClient.fetch(`*[_type == "article" && slug.current == $slug][0]`, { slug })
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}
