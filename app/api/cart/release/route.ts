import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
    const { productId } = (await req.json()) as { productId?: string };

    const id = String(productId ?? "").trim();
    if (!id) return NextResponse.json({ ok: true });

    // mark active reservations as released
    await supabase
      .from("reservations")
      .update({ status: "released" })
      .eq("product_id", id)
      .eq("status", "active");

    // set product back to available (only if you use these statuses)
    await supabase.from("products").update({ status: "available" }).eq("id", id);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "release failed" }, { status: 500 });
  }
}