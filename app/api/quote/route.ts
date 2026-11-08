import { NextResponse } from "next/server";
import { PHONE_DISPLAY } from "@/lib/contact";

type QuotePayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  cityZip?: string;
  service?: string;
  message?: string;
  website?: string;
};

const FAIL_MESSAGE = `Something went wrong. Please call us at ${PHONE_DISPLAY}.`;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const TELEGRAM_TIMEOUT_MS = 5000;

const recentByIp = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const prior = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (prior.length >= RATE_MAX) {
    recentByIp.set(ip, prior);
    return true;
  }
  prior.push(now);
  recentByIp.set(ip, prior);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  if (digits.length > 0) return `tel:+${digits}`;
  return "tel:";
}

function newYorkTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function buildTelegramText(body: Required<Pick<QuotePayload, "fullName" | "phone" | "email" | "cityZip" | "service">> & {
  message: string;
}) {
  const phoneText = escapeHtml(body.phone);
  const phoneLink = escapeHtml(telHref(body.phone));
  const message = body.message.trim() ? escapeHtml(body.message) : "—";
  return [
    "New quote request",
    `Name: ${escapeHtml(body.fullName)}`,
    `Phone: <a href="${phoneLink}">${phoneText}</a>`,
    `Email: ${escapeHtml(body.email)}`,
    `City/ZIP: ${escapeHtml(body.cityZip)}`,
    `Service: ${escapeHtml(body.service)}`,
    `Message: ${message}`,
    newYorkTimestamp(),
  ].join("\n");
}

async function sendQuoteEmail(): Promise<boolean> {
  // Email delivery is not wired to a provider yet.
  return false;
}

async function sendTelegramMessage(chatId: string, text: string, token: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
      }
    );
    if (!response.ok) return false;
    const payload = (await response.json()) as { ok?: boolean };
    return payload.ok === true;
  } finally {
    clearTimeout(timer);
  }
}

async function notifyTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const rawIds = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !rawIds) {
    console.warn("[quote] telegram skipped: missing configuration");
    return false;
  }

  const chatIds = rawIds
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (chatIds.length === 0) {
    console.warn("[quote] telegram skipped: missing configuration");
    return false;
  }

  const results = await Promise.allSettled(
    chatIds.map((chatId) => sendTelegramMessage(chatId, text, token))
  );

  const sent = results.some((result) => result.status === "fulfilled" && result.value);
  if (!sent) {
    console.warn("[quote] telegram notification failed");
  }
  return sent;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotePayload;
    const ip = clientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: FAIL_MESSAGE }, { status: 429 });
    }

    if (body.website?.trim()) {
      return NextResponse.json({ ok: true });
    }

    if (
      !body.fullName?.trim() ||
      !body.phone?.trim() ||
      !body.email?.trim() ||
      !body.cityZip?.trim() ||
      !body.service?.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const payload = {
      fullName: body.fullName.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      cityZip: body.cityZip.trim(),
      service: body.service.trim(),
      message: (body.message ?? "").trim(),
    };

    const text = buildTelegramText(payload);
    const [emailSent, telegramSent] = await Promise.all([
      sendQuoteEmail(),
      notifyTelegram(text),
    ]);

    if (!emailSent && !telegramSent) {
      return NextResponse.json({ ok: false, error: FAIL_MESSAGE }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
