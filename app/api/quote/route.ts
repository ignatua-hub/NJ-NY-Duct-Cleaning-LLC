import { NextResponse } from "next/server";

type QuotePayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  cityZip?: string;
  service?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotePayload;

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

    // TODO: connect email/CRM later (SendGrid, Resend, HubSpot, etc.)
    console.log("[quote request]", {
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      cityZip: body.cityZip,
      service: body.service,
      message: body.message ?? "",
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
