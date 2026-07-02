"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { investorSchema, type InvestorSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { ASSET_TYPES_ORDERED, ASSET_TYPE_LABELS } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

const PRICE_OPTIONS = [
  { label: "Under $1M", value: 1_000_000 },
  { label: "$1M – $3M", value: 3_000_000 },
  { label: "$3M – $7M", value: 7_000_000 },
  { label: "$7M – $15M", value: 15_000_000 },
  { label: "$15M+", value: 50_000_000 },
];

export default function InvestorForm() {
  const [state, setState] = useState<FormState>("idle");
  const [msg, setMsg] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<InvestorSchema>({
    resolver: zodResolver(investorSchema),
    defaultValues: { assetTypes: [], priceMin: 0, priceMax: 5_000_000, honeypot: "" },
  });

  const onSubmit = async (data: InvestorSchema) => {
    setState("loading");
    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) { setState("success"); setMsg(json.message); reset(); }
      else { setState("error"); setMsg(json.error); }
    } catch { setState("error"); setMsg("Network error. Call 347-205-2882."); }
  };

  if (state === "success") {
    return (
      <div className="bg-harbor/5 border border-harbor/20 p-8 text-center">
        <p className="text-signal text-3xl mb-3">✓</p>
        <p className="font-display text-xl font-semibold text-ink mb-2">You&apos;re on the list.</p>
        <p className="text-slate">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input type="text" {...register("honeypot")} className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.name?.message} required>
          <input {...register("name")} type="text" placeholder="Your name" className={inp(!!errors.name)} />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <input {...register("email")} type="email" placeholder="your@email.com" className={inp(!!errors.email)} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone (optional)" error={undefined}>
          <input {...register("phone")} type="tel" placeholder="Phone number" className={inp(false)} />
        </Field>
        <Field label="Company / Fund (optional)" error={undefined}>
          <input {...register("company")} type="text" placeholder="Organization name" className={inp(false)} />
        </Field>
      </div>

      {/* Asset types */}
      <Field label="Asset Types of Interest" error={errors.assetTypes?.message} required>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
          {ASSET_TYPES_ORDERED.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm text-slate cursor-pointer hover:text-ink">
              <input {...register("assetTypes")} type="checkbox" value={t} className="accent-signal flex-shrink-0" />
              {ASSET_TYPE_LABELS[t]}
            </label>
          ))}
        </div>
      </Field>

      {/* Price range */}
      <div className="grid grid-cols-2 gap-5">
        <Field label="Minimum Price" error={undefined}>
          <select {...register("priceMin", { valueAsNumber: true })} className={inp(false)}>
            {PRICE_OPTIONS.map((p) => (
              <option key={p.value} value={p.value === PRICE_OPTIONS[0].value ? 0 : PRICE_OPTIONS[PRICE_OPTIONS.indexOf(p) - 1]?.value ?? 0}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Maximum Price" error={undefined}>
          <select {...register("priceMax", { valueAsNumber: true })} className={inp(false)}>
            {PRICE_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Additional Notes (optional)" error={undefined}>
        <textarea {...register("message")} rows={3} placeholder="Specific requirements, hold period, return targets..." className={inp(false) + " resize-none"} />
      </Field>

      {state === "error" && (
        <p className="text-signal text-sm p-3 border border-signal/30 bg-signal/5">{msg}</p>
      )}

      <Button type="submit" variant="signal" size="lg" className="w-full justify-center" disabled={state === "loading"}>
        {state === "loading" ? "Submitting…" : "Join the Investor List"}
      </Button>
    </form>
  );
}

function inp(err: boolean) {
  return `w-full px-4 py-3 bg-paper border text-ink text-sm focus:outline-none focus:border-harbor ${err ? "border-signal" : "border-paper-mid"}`;
}

function Field({ label, children, error, required }: { label: string; children: React.ReactNode; error?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-label text-slate mb-2">
        {label}{required && <span className="text-signal ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-signal mt-1" role="alert">{error}</p>}
    </div>
  );
}
