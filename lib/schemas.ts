import { z } from "zod";

const phoneRegex = /^[\d\s\-\(\)\+]{7,}$/;

// ─── Valuation Request ────────────────────────────────────────────────────────

export const valuationSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number")
    .min(7),
  propertyAddress: z
    .string()
    .min(5, "Please enter the property address"),
  assetType: z.enum([
    "multifamily",
    "mixed-use",
    "retail",
    "office",
    "land",
    "industrial",
    "hotel",
    "shopping-center",
    "sro",
    "imd",
    "retail-condo",
    "note-sale",
    "partnership-interest",
    "conversion",
  ]),
  approximateSize: z.string().optional(),
  timeframe: z.enum(["immediate", "3-months", "6-months", "exploring"]),
  message: z.string().max(2000).optional(),
  honeypot: z.literal("").optional(),
});

export type ValuationSchema = z.infer<typeof valuationSchema>;

// ─── Investor Sign-Up ─────────────────────────────────────────────────────────

export const investorSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().optional(),
  assetTypes: z
    .array(
      z.enum([
        "multifamily",
        "mixed-use",
        "retail",
        "office",
        "land",
        "industrial",
        "hotel",
        "shopping-center",
        "sro",
        "imd",
        "retail-condo",
        "note-sale",
        "partnership-interest",
        "conversion",
      ])
    )
    .min(1, "Please select at least one asset type"),
  priceMin: z.number().min(0),
  priceMax: z.number().min(0),
  message: z.string().max(1000).optional(),
  honeypot: z.literal("").optional(),
});

export type InvestorSchema = z.infer<typeof investorSchema>;

// ─── Listing Inquiry ──────────────────────────────────────────────────────────

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  listingAddress: z.string().min(1),
  listingSlug: z.string().min(1),
  message: z.string().min(10, "Please tell us about your interest"),
  requestOM: z.boolean().optional(),
  honeypot: z.literal("").optional(),
});

export type InquirySchema = z.infer<typeof inquirySchema>;

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().optional(),
  message: z
    .string()
    .min(10, "Please enter a message (at least 10 characters)"),
  honeypot: z.literal("").optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
