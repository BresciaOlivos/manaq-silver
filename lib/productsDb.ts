// lib/productsDb.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
if (!anon) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabaseBrowser = createClient(url, anon);

export type DbProduct = {
  id: string;
  category: string;
  price: number;
  name_en: string;
  name_de: string;
  description_en: string | null;
  description_de: string | null;
  status: string | null;
};

// list all
export async function fetchAllProducts() {
  const { data, error } = await supabaseBrowser
    .from("products")
    .select("id,category,price,name_en,name_de,description_en,description_de,status")
    .order("category", { ascending: true })
    .order("price", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as DbProduct[];
}

// by category
export async function fetchProductsByCategory(category: string) {
  const { data, error } = await supabaseBrowser
    .from("products")
    .select("id,category,price,name_en,name_de,description_en,description_de,status")
    .eq("category", category)
    .order("price", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as DbProduct[];
}

// single
export async function fetchProductById(id: string) {
  const { data, error } = await supabaseBrowser
    .from("products")
    .select("id,category,price,name_en,name_de,description_en,description_de,status")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as DbProduct;
}