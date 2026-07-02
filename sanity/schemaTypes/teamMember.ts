import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "licenseType", title: "License Type", type: "string", options: { list: ["broker", "salesperson"] }, validation: (r) => r.required() }),
    defineField({ name: "licenseNumber", title: "License Number", type: "string" }),
    defineField({ name: "bio", title: "Biography", type: "text", rows: 10, validation: (r) => r.required() }),
    defineField({ name: "highlights", title: "Career Highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "photo", title: "Profile Photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }),
    defineField({ name: "featured", title: "Show on About page", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
