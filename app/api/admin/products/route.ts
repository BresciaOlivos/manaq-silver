import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

function checkKey(req: Request) {
  const u = new URL(req.url);
  const key = u.searchParams.get("key") || "";
  const adminKey = process.env.ADMIN_KEY || "";
  return adminKey && key === adminKey;
}

export async function GET(req: Request) {
  if (!checkKey(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select("id,category,status,price,name_en,name_de,description_en,description_de,images")
    .order("category", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data ?? [] });
}

export async function PUT(req: Request) {
  if (!checkKey(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const body = await req.json();

  const { id, patch } = body || {};
  if (!id || !patch) return NextResponse.json({ error: "Missing id/patch" }, { status: 400 });

  const { error } = await supabase.from("products").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}