import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text(); // IMPORTANT: raw body
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const ids =
      session.metadata?.productIds
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) ?? [];

    if (ids.length) {
      // Mark products sold
      await supabaseAdmin.from("products").update({ status: "sold" }).in("id", ids);

      // Complete reservations
      await supabaseAdmin
        .from("reservations")
        .update({ status: "completed" })
        .in("product_id", ids)
        .eq("status", "active");
    }
  }

  return NextResponse.json({ received: true });
}
