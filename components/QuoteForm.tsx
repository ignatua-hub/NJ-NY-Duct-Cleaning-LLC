"use client";

import {
  FormEvent,
  useState,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import { BadgeCheck, Clock, Mail, Phone } from "lucide-react";
import FadeIn from "./FadeIn";
import { HOURS_DISPLAY, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

const SERVICES = [
  "Air Duct Cleaning",
  "Dryer Vent Cleaning",
  "Chimney Cleaning",
  "HVAC Maintenance",
] as const;

// TODO: replace with real business email
const EMAIL_DISPLAY = "info@example.com";
const EMAIL_HREF = "mailto:info@example.com";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  cityZip: string;
  service: string;
  message: string;
};

const INITIAL: FormState = {
  fullName: "",
  phone: "",
  email: "",
  cityZip: "",
  service: "",
  message: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Enter a valid phone number.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email.";
    }
    if (!form.cityZip.trim()) next.cityZip = "City or ZIP is required.";
    if (!form.service) next.service = "Select a service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  };

  const field = (
    id: keyof FormState,
    label: string,
    props: (
      | InputHTMLAttributes<HTMLInputElement>
      | TextareaHTMLAttributes<HTMLTextAreaElement>
      | SelectHTMLAttributes<HTMLSelectElement>
    ) & {
      as?: "input" | "textarea" | "select";
      children?: ReactNode;
    }
  ) => {
    const { as = "input", children, ...rest } = props;
    const shared =
      "mt-1.5 min-h-11 w-full rounded-card border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none transition placeholder:text-brand-muted/60 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue";
    return (
      <label className="block text-sm font-medium text-white" htmlFor={id}>
        {label}
        {as === "textarea" ? (
          <textarea
            id={id}
            className={shared}
            value={form[id]}
            onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : as === "select" ? (
          <select
            id={id}
            className={shared}
            value={form[id]}
            onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
            {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            className={shared}
            value={form[id]}
            onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {errors[id] && (
          <span className="mt-1 block text-xs text-red-400">{errors[id]}</span>
        )}
      </label>
    );
  };

  return (
    <section id="contact" className="bg-brand-alt py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">Get Your </span>
            <span className="text-blue-gradient">Free Quote</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            Tell us what you need. We&apos;ll follow up fast with upfront pricing.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="card-surface grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 sm:p-8"
              noValidate
            >
              {field("fullName", "Full Name", {
                placeholder: "Jane Doe",
                autoComplete: "name",
              })}
              {field("phone", "Phone", {
                placeholder: "(201) 555-0100",
                type: "tel",
                autoComplete: "tel",
              })}
              {field("email", "Email", {
                placeholder: "you@email.com",
                type: "email",
                autoComplete: "email",
              })}
              {field("cityZip", "City/ZIP", {
                placeholder: "Newark, 07102",
                autoComplete: "postal-code",
              })}
              <div className="sm:col-span-2">
                {field("service", "Service", {
                  as: "select",
                  children: (
                    <>
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </>
                  ),
                })}
              </div>
              <div className="sm:col-span-2">
                {field("message", "Message", {
                  as: "textarea",
                  rows: 4,
                  placeholder: "Anything we should know about your home or system?",
                })}
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Request Free Quote"}
                </button>
                {status === "success" && (
                  <p className="mt-3 text-sm font-medium text-brand-cyan" role="status">
                    Thanks — we received your request and will be in touch shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-sm font-medium text-red-400" role="alert">
                    Something went wrong. Please call us or try again.
                  </p>
                )}
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-2">
            <aside className="card-surface flex h-full flex-col gap-6 p-6 sm:p-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-pill bg-blue-gradient px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-glow">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Free estimates
              </div>

              <div>
                <h3 className="font-heading text-xl font-extrabold italic text-white">
                  Prefer to talk?
                </h3>
                <p className="mt-2 text-sm text-brand-muted">
                  Call or email — we typically respond the same day.
                </p>
              </div>

              <a
                href={PHONE_HREF}
                className="flex min-h-11 items-center gap-3 text-white transition hover:text-brand-cyan"
              >
                <span className="rounded-full bg-white/5 p-2.5 text-brand-cyan">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-brand-muted">Phone</span>
                  <span className="font-semibold">{PHONE_DISPLAY}</span>
                </span>
              </a>

              {/* TODO: replace with real business email */}
              <a
                href={EMAIL_HREF}
                className="flex min-h-11 items-center gap-3 text-white transition hover:text-brand-cyan"
              >
                <span className="rounded-full bg-white/5 p-2.5 text-brand-cyan">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-brand-muted">Email</span>
                  <span className="font-semibold">{EMAIL_DISPLAY}</span>
                </span>
              </a>

              <div className="flex items-start gap-3 text-white">
                <span className="rounded-full bg-white/5 p-2.5 text-brand-cyan">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs text-brand-muted">Working hours</span>
                  <span className="font-semibold">{HOURS_DISPLAY}</span>
                  <span className="mt-1 block text-sm text-brand-muted">Sunday: closed</span>
                </div>
              </div>
            </aside>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
