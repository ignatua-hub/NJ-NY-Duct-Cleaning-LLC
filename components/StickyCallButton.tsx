"use client";

import { Phone } from "lucide-react";

// TODO: replace with real business phone number
const PHONE_HREF = "tel:+10000000000";

export default function StickyCallButton() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/95 p-3 backdrop-blur md:hidden">
      <a
        href={PHONE_HREF}
        className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-base shadow-glow"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call Now
      </a>
    </div>
  );
}
