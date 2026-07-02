import type { MetadataRoute } from "next";
import { getListings, getArticles, getTeamMembers } from "@/lib/sanity";

const BASE_URL = "https://schneiderrealty.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listings, articles, teamMembers] = await Promise.all([
    getListings(),
    getArticles(),
    getTeamMembers(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/listings`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/track-record`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/sell`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/invest`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/insights`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/legal/fair-housing`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/legal/sopa`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  const listingRoutes: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${BASE_URL}/listings/${l.slug}`,
    lastModified: new Date(l.listedDate),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/insights/${a.slug}`,
    lastModified: new Date(a.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teamMembers.map((m) => ({
    url: `${BASE_URL}/team/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...listingRoutes, ...articleRoutes, ...teamRoutes];
}
