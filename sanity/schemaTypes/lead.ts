import { defineType, defineField } from "sanity";

export default defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({ name: "source", title: "Lead Source", type: "string", options: { list: ["valuation", "investor", "inquiry", "contact"] }, validation: (r) => r.required() }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["new", "contacted", "qualified", "closed"] }, initialValue: "new", validation: (r) => r.required() }),
    defineField({ name: "createdAt", title: "Submitted At", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required() }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "company", title: "Company / Fund", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "propertyAddress", title: "Property Address (valuation)", type: "string" }),
    defineField({ name: "assetTypes", title: "Asset Types of Interest", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "priceMin", title: "Min Price", type: "number" }),
    defineField({ name: "priceMax", title: "Max Price", type: "number" }),
    defineField({ name: "timeframe", title: "Timeframe (valuation)", type: "string" }),
    defineField({ name: "listingSlug", title: "Listing (inquiry)", type: "string" }),
    defineField({ name: "notes", title: "Internal Notes", type: "text", rows: 4 }),
  ],
  orderings: [{ title: "Newest First", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "name", subtitle: "source", description: "createdAt" },
    prepare({ title, subtitle, description }) {
      return { title, subtitle: `${subtitle?.toUpperCase()} — ${new Date(description).toLocaleDateString()}` };
    },
  },
});
