"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { valuationSchema, type ValuationSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { ASSET_TYPES_ORDERED, ASSET_TYPE_LABELS } from "@/lib/utils";
import { formatPhoneHref } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

export default function ValuationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValuationSchema>({
    resolver: zodResolver(valuationSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: ValuationSchema) => {
    setState("loading");
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setState("success");
        setMessage(json.message ?? "Request received.");
        reset();
      } else {
        setState("error");
        setMessage(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Please call us directly at 347-205-2882.");
    }
  };

  if (state === "success") {
    return (
      <div className="bg-paper border border-paper-mid p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-signal" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-ink mb-2">Request Received</h3>
        <p className="text-slate">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from users, catches bots */}
      <input type="text" {...register("honeypot")} className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.name?.message} required>
          <input {...register("name")} type="text" placeholder="Your name" className={inputCls(!!errors.name)} autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <input {...register("email")} type="email" placeholder="your@email.com" className={inputCls(!!errors.email)} autoComplete="email" />
        </Field>
      </div>

      <Field label="Phone" error={errors.phone?.message} required>
        <input {...register("phone")} type="tel" placeholder="Your phone number" className={inputCls(!!errors.phone)} autoComplete="tel" />
      </Field>

      <Field label="Property Address" error={errors.propertyAddress?.message} required>
        <input {...register("propertyAddress")} type="text" placeholder="Street address, Staten Island, NY" className={inputCls(!!errors.propertyAddress)} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Asset Type" error={errors.assetType?.message} required>
          <select {...register("assetType")} className={inputCls(!!errors.assetType)}>
            <option value="">Select asset type</option>
            {ASSET_TYPES_ORDERED.map((t) => (
              <option key={t} value={t}>{ASSET_TYPE_LABELS[t]}</option>
            ))}
          </select>
        </Field>
        <Field label="Approximate Size (optional)" error={undefined}>
          <input {...register("approximateSize")} type="text" placeholder="e.g. 8,000 SF · 12 units" className={inputCls(false)} />
        </Field>
      </div>

      <Field label="Timeframe" error={errors.timeframe?.message} required>
        <select {...register("timeframe")} className={inputCls(!!errors.timeframe)}>
          <option value="">Select timeframe</option>
          <option value="immediate">Immediate (0–3 months)</option>
          <option value="3-months">3–6 Months</option>
          <option value="6-months">6–12 Months</option>
          <option value="exploring">Still Exploring</option>
        </select>
      </Field>

      <Field label="Additional Information (optional)" error={undefined}>
        <textarea {...register("message")} rows={4} placeholder="Anything else we should know about the property..." className={inputCls(false) + " resize-none"} />
      </Field>

      {state === "error" && (
        <p className="text-signal text-sm p-3 border border-signal/30 bg-signal/5">{message}</p>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="signal"
          size="lg"
          className="w-full justify-center"
          disabled={state === "loading"}
        >
          {state === "loading" ? "Submitting…" : "Request a Confidential Valuation"}
        </Button>
        <p className="text-center text-xs text-slate mt-3">
          Or call directly:{" "}
          <a href={formatPhoneHref("347-205-2882")} className="font-mono font-semibold text-ink hover:text-signal transition-colors">
            347-205-2882
          </a>
        </p>
      </div>

      <p className="text-[11px] text-slate/50 text-center">
        Your information is kept strictly confidential. We will contact you within one business day.
      </p>
    </form>
  );
}

function inputCls(hasError: boolean): string {
  return [
    "w-full px-4 py-3 bg-paper border text-ink text-sm font-body",
    "placeholder:text-slate/40 transition-colors duration-150",
    "focus:outline-none focus:border-harbor focus:ring-1 focus:ring-harbor/30",
    hasError
      ? "border-signal ring-1 ring-signal/20"
      : "border-paper-mid hover:border-slate/30",
  ].join(" ");
}

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-label text-slate mb-2">
        {label}
        {required && <span className="text-signal ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-signal mt-1.5" role="alert">{error}</p>
      )}
    </div>
  );
}
