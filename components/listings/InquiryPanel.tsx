"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquirySchema } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { formatPhoneHref } from "@/lib/utils";
import type { Listing } from "@/types";

interface Props {
  listing: Listing;
}

type FormState = "idle" | "loading" | "success" | "error";

export default function InquiryPanel({ listing }: Props) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<InquirySchema>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      listingAddress: listing.address,
      listingSlug: listing.slug,
      honeypot: "",
    },
  });

  const onSubmit = async (data: InquirySchema) => {
    setState("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) { setState("success"); setMessage(json.message); reset(); }
      else { setState("error"); setMessage(json.error); }
    } catch {
      setState("error");
      setMessage("Network error. Please call 347-205-2882 directly.");
    }
  };

  return (
    <div className="sticky top-28">
      {/* Broker card */}
      <div className="bg-harbor text-paper p-5 mb-0 border border-harbor-600">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-harbor-600 flex-shrink-0">
            <Image
              src="/images/michael-headshot.webp"
              alt="Michael Schneider"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <p className="font-semibold text-paper">Michael Schneider</p>
            <p className="font-mono text-[11px] text-harbor-300">Principal Broker · NY Licensed</p>
          </div>
        </div>
        <a
          href={formatPhoneHref(listing.brokerPhone)}
          className="flex items-center gap-3 font-mono text-lg font-bold text-paper hover:text-signal transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {listing.brokerPhone}
        </a>
      </div>

      {/* Inquiry form */}
      <div className="border border-paper-mid border-t-0 p-5 bg-paper">
        {state === "success" ? (
          <div className="py-8 text-center">
            <p className="text-signal text-2xl mb-3">✓</p>
            <p className="font-display font-semibold text-ink mb-2">Inquiry Received</p>
            <p className="text-sm text-slate">{message}</p>
          </div>
        ) : (
          <>
            <h3 className="font-display font-semibold text-ink mb-4">Request Information</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
              <input type="text" {...register("honeypot")} className="hidden" aria-hidden="true" tabIndex={-1} />
              <input type="hidden" {...register("listingAddress")} />
              <input type="hidden" {...register("listingSlug")} />

              <FormInput label="Name" error={errors.name?.message} required>
                <input {...register("name")} type="text" placeholder="Your name" className={inp(!!errors.name)} />
              </FormInput>
              <FormInput label="Email" error={errors.email?.message} required>
                <input {...register("email")} type="email" placeholder="your@email.com" className={inp(!!errors.email)} />
              </FormInput>
              <FormInput label="Phone (optional)" error={undefined}>
                <input {...register("phone")} type="tel" placeholder="Phone number" className={inp(false)} />
              </FormInput>
              <FormInput label="Message" error={errors.message?.message} required>
                <textarea {...register("message")} rows={3} placeholder="Tell us about your interest in this property..." className={inp(!!errors.message) + " resize-none"} />
              </FormInput>

              <label className="flex items-center gap-2 text-sm text-slate cursor-pointer">
                <input {...register("requestOM")} type="checkbox" className="accent-signal" />
                Request Offering Memorandum (email required)
              </label>

              {state === "error" && (
                <p className="text-signal text-xs p-2 bg-signal/5 border border-signal/20">{message}</p>
              )}

              <Button type="submit" variant="signal" size="md" className="w-full justify-center" disabled={state === "loading"}>
                {state === "loading" ? "Sending…" : "Send Inquiry"}
              </Button>
            </form>
          </>
        )}
      </div>

      {/* Confidentiality note */}
      <p className="text-[11px] text-slate/50 text-center mt-3">
        Your inquiry is confidential. Response within one business day.
      </p>
    </div>
  );
}

function inp(hasError: boolean) {
  return `w-full px-3 py-2.5 bg-paper border text-ink text-sm focus:outline-none focus:border-harbor ${hasError ? "border-signal" : "border-paper-mid hover:border-slate/30"}`;
}

function FormInput({ label, children, error, required }: { label: string; children: React.ReactNode; error?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-label text-slate mb-1.5">
        {label}{required && <span className="text-signal ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-signal mt-1" role="alert">{error}</p>}
    </div>
  );
}
