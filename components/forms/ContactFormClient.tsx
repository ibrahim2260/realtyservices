"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactFormClient() {
  const [state, setState] = useState<FormState>("idle");
  const [msg, setMsg] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: ContactSchema) => {
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) { setState("success"); setMsg(json.message); reset(); }
      else { setState("error"); setMsg(json.error); }
    } catch { setState("error"); setMsg("Network error. Please call 347-205-2882."); }
  };

  if (state === "success") {
    return (
      <div className="py-12 text-center">
        <p className="text-signal text-3xl mb-3">✓</p>
        <p className="font-display text-xl font-semibold text-ink mb-2">Message received.</p>
        <p className="text-slate">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input type="text" {...register("honeypot")} className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" error={errors.name?.message} required>
          <input {...register("name")} type="text" placeholder="Your name" className={inp(!!errors.name)} />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <input {...register("email")} type="email" placeholder="your@email.com" className={inp(!!errors.email)} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone (optional)" error={undefined}>
          <input {...register("phone")} type="tel" placeholder="Phone number" className={inp(false)} />
        </Field>
        <Field label="Subject (optional)" error={undefined}>
          <input {...register("subject")} type="text" placeholder="Topic" className={inp(false)} />
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message} required>
        <textarea {...register("message")} rows={5} placeholder="How can we help?" className={inp(!!errors.message) + " resize-none"} />
      </Field>

      {state === "error" && (
        <p className="text-signal text-sm p-3 border border-signal/30 bg-signal/5">{msg}</p>
      )}

      <Button type="submit" variant="signal" size="lg" className="w-full justify-center" disabled={state === "loading"}>
        {state === "loading" ? "Sending…" : "Send Message"}
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
      <label className="block text-label text-slate mb-1.5">
        {label}{required && <span className="text-signal ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-signal mt-1" role="alert">{error}</p>}
    </div>
  );
}
