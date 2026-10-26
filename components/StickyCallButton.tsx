"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { PHONE_HREF } from "@/lib/contact";

const FIELD_SELECTOR = "input, select, textarea";

export default function StickyCallButton() {
  // Hidden while a form field has focus so it never sits on top of the field above the keyboard.
  const [fieldFocused, setFieldFocused] = useState(false);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      if ((e.target as Element | null)?.matches?.(FIELD_SELECTOR)) setFieldFocused(true);
    };
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Element | null;
      if (!next?.matches?.(FIELD_SELECTOR)) setFieldFocused(false);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <div
      id="sticky-call"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/95 p-3 backdrop-blur transition-transform duration-200 md:hidden ${
        fieldFocused ? "pointer-events-none translate-y-full" : "translate-y-0"
      }`}
      aria-hidden={fieldFocused || undefined}
    >
      <a
        href={PHONE_HREF}
        tabIndex={fieldFocused ? -1 : undefined}
        className="btn-primary flex min-h-12 w-full items-center justify-center gap-2 py-3.5 text-base"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call Now
      </a>
    </div>
  );
}
