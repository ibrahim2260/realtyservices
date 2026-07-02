import { defineType, defineField } from "sanity";

export default defineType({
  name: "closedDeal",
  title: "Closed Deal",
  type: "document",
  fields: [
    defineField({ name: "address", title: "Address", type: "string", validation: (r) => r.required() }),
    defineField({ name: "neighborhood", title: "Neighborhood", type: "string", validation: (r) => r.required() }),
    defineField({ name: "assetType", title: "Asset Type", type: "string", options: { list: ["multifamily","mixed-use","retail","office","land","industrial","hotel","shopping-center","sro","imd","retail-condo","note-sale","partnership-interest","conversion"] }, validation: (r) => r.required() }),
    defineField({ name: "price", title: "Sale Price ($)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "priceUndisclosed", title: "Price Undisclosed", type: "boolean" }),
    defineField({ name: "closedYear", title: "Closed Year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "closedMonth", title: "Closed Month (1–12)", type: "number" }),
    defineField({ name: "units", title: "Residential Units", type: "number" }),
    defineField({ name: "buildingSF", title: "Building SF", type: "number" }),
    defineField({ name: "lotSF", title: "Lot SF", type: "number" }),
    defineField({ name: "capRate", title: "Cap Rate (%)", type: "number" }),
    defineField({ name: "representedSide", title: "Represented", type: "string", options: { list: ["seller", "buyer", "both"] } }),
    defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
    defineField({ name: "lat", title: "Latitude", type: "number", validation: (r) => r.required() }),
    defineField({ name: "lng", title: "Longitude", type: "number", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Closed Date, New", name: "closedDateDesc", by: [{ field: "closedYear", direction: "desc" }, { field: "closedMonth", direction: "desc" }] }],
  preview: {
    select: { title: "address", subtitle: "closedYear" },
    prepare({ title, subtitle }) { return { title, subtitle: `Closed ${subtitle}` }; },
  },
});
