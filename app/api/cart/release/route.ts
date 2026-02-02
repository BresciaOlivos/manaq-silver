import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Body = {
  productId?: string;
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = (await req.json()) as Body;

    const productId = String(body?.productId ?? "").trim();
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    // 1) Delete any active reservation for this product
    const { error: resErr } = await supabase
      .from("reservations")
      .delete()
      .eq("product_id", productId)
      .eq("status", "active");

    if (resErr) {
      return NextResponse.json({ error: resErr.message }, { status: 500 });
    }

    // 2) Mark product back to available (only if it was reserved)
    const { error: prodErr } = await supabase
      .from("products")
      .update({ status: "available" })
      .eq("id", productId)
      .eq("status", "reserved");

    if (prodErr) {
      return NextResponse.json({ error: prodErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Release failed" },
      { status: 500 }
    );
  }
}