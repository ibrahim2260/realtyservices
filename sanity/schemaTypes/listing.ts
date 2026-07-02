import { defineType, defineField } from "sanity";

export default defineType({
  name: "listing",
  title: "Listing",
  type: "document",
  fields: [
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["available", "in-contract", "sold"] }, validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "address" }, validation: (r) => r.required() }),
    defineField({ name: "address", title: "Address", type: "string", validation: (r) => r.required() }),
    defineField({ name: "neighborhood", title: "Neighborhood", type: "string", validation: (r) => r.required() }),
    defineField({ name: "zip", title: "ZIP Code", type: "string" }),
    defineField({ name: "assetType", title: "Asset Type", type: "string", options: { list: ["multifamily","mixed-use","retail","office","land","industrial","hotel","shopping-center","sro","imd","retail-condo","note-sale","partnership-interest","conversion"] }, validation: (r) => r.required() }),
    defineField({ name: "price", title: "Asking Price ($)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "priceUndisclosed", title: "Price Undisclosed", type: "boolean" }),
    defineField({ name: "buildingSF", title: "Building SF", type: "number" }),
    defineField({ name: "lotSF", title: "Lot SF", type: "number" }),
    defineField({ name: "units", title: "Residential Units", type: "number" }),
    defineField({ name: "stories", title: "Stories", type: "number" }),
    defineField({ name: "yearBuilt", title: "Year Built", type: "number" }),
    defineField({ name: "noi", title: "NOI ($)", type: "number" }),
    defineField({ name: "capRate", title: "Cap Rate (%)", type: "number" }),
    defineField({ name: "grm", title: "GRM", type: "number" }),
    defineField({ name: "zoning", title: "Zoning", type: "string" }),
    defineField({ name: "blockLot", title: "Block / Lot", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "highlights", title: "Investment Highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "images", title: "Property Photos", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }] }),
    defineField({ name: "omUrl", title: "Offering Memorandum URL", type: "url" }),
    defineField({ name: "lat", title: "Latitude", type: "number", validation: (r) => r.required() }),
    defineField({ name: "lng", title: "Longitude", type: "number", validation: (r) => r.required() }),
    defineField({ name: "listedDate", title: "Listed Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "isFeatured", title: "Featured on Home Page", type: "boolean" }),
  ],
  orderings: [{ title: "Listed Date, New", name: "listedDateDesc", by: [{ field: "listedDate", direction: "desc" }] }],
  preview: {
    select: { title: "address", subtitle: "assetType", media: "images.0" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle?.toUpperCase() };
    },
  },
});
