import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { productIds, locale } = await req.json();

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return NextResponse.json({ error: "No items in cart." }, { status: 400 });
  }

  const safeLocale = locale === "de" ? "de" : "en";

  // Always fetch from DB (prevents price tampering)
  const { data: products, error } = await supabaseAdmin
    .from("products")
    .select("id,name_en,name_de,price,status")
    .in("id", productIds);

  if (error || !products) {
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }

  // Require reserved
  const notReserved = products.find((p) => p.status !== "reserved");
  if (notReserved) {
    return NextResponse.json(
      { error: `Item not reserved: ${notReserved.id}` },
      { status: 400 }
    );
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map(
    (p) => ({
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(p.price * 100),
        product_data: { name: safeLocale === "de" ? p.name_de : p.name_en },
      },
    })
  );

  const total = products.reduce((s, p) => s + p.price, 0);

  // ✅ Shipping thresholds
  const deFree = total >= 55;
  const euFree = total >= 85;

  // NOTE: Hosted Stripe Checkout cannot automatically choose shipping
  // based on address + threshold at the same time.
  // So we provide options and (for qualifying totals) a free option too.
  const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 300, currency: "eur" },
        display_name:
          safeLocale === "de" ? "Versand (Deutschland)" : "Shipping (Germany)",
      },
    },
    {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 700, currency: "eur" },
        display_name: safeLocale === "de" ? "Versand (EU)" : "Shipping (EU)",
      },
    },
  ];

  // Add free shipping option only if they qualify for at least one threshold
  if (deFree || euFree) {
    shipping_options.push({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: 0, currency: "eur" },
        display_name:
          safeLocale === "de"
            ? "Kostenloser Versand (ab 55€ DE / 85€ EU)"
            : "Free shipping (from €55 DE / €85 EU)",
      },
    });
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,

    shipping_address_collection: {
      allowed_countries: [
        "DE",
        // EU group (you can add/remove later)
        "AT",
        "FR",
        "IT",
        "ES",
        "PT",
        "PL",
      ],
    },

    shipping_options,

    success_url: `${site}/${safeLocale}/success`,
    cancel_url: `${site}/${safeLocale}/cart`,

    metadata: {
      productIds: productIds.join(","),
      total: String(total),
    },
  });

  return NextResponse.json({ url: session.url });
}
