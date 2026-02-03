import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

type ReqBody = {
  locale?: "de" | "en";
  items?: { id: string; qty?: number }[];
};

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  return new Stripe(key, {
    // If you hit the apiVersion type error again, remove this line.
    // apiVersion: "2024-06-20",
  });
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const supabase = getSupabaseAdmin();

    const body = (await req.json()) as ReqBody;
    const locale: "de" | "en" = body?.locale === "de" ? "de" : "en";

    const incoming = Array.isArray(body?.items) ? body.items : [];

    // Clean & normalize
    const clean = incoming
      .map((x) => ({
        id: String(x?.id ?? "").trim(),
        qty: Math.max(1, Number(x?.qty ?? 1)),
      }))
      .filter((x) => x.id);

    if (!clean.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const ids = clean.map((x) => x.id);

    // Fetch products from Supabase
    const { data, error } = await supabase
      .from("products")
      .select("id,name_en,name_de,price,status")
      .in("id", ids);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const products = data ?? [];
    if (!products.length) {
      return NextResponse.json({ error: "No products found." }, { status: 400 });
    }

    // Map for lookup
    const byId = new Map(products.map((p: any) => [p.id, p]));

    // Build Stripe line items in the SAME order as cart items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const it of clean) {
      const p = byId.get(it.id);
      if (!p) continue; // skip IDs not found in DB

      // Optional: block sold items
      if (p.status === "sold") {
        return NextResponse.json(
          { error: "One or more items are already sold. Please remove them and try again." },
          { status: 400 }
        );
      }

      // Validate price
      const price = Number(p.price);
      if (!Number.isFinite(price) || price <= 0) {
        return NextResponse.json(
          { error: `Invalid price for product ${p.id}.` },
          { status: 400 }
        );
      }

      line_items.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: locale === "de" ? p.name_de : p.name_en,
          },
          unit_amount: Math.round(price * 100), // cents
        },
        quantity: it.qty,
      });
    }

    if (!line_items.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const success_url = `${site}/${locale}?success=1`;
    const cancel_url = `${site}/${locale}/cart?canceled=1`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url,
      cancel_url,
      metadata: {
        productIds: ids.join(","),
        locale,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Checkout error" },
      { status: 500 }
    );
  }
}