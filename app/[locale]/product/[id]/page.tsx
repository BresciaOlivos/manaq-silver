"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/components/CartProvider";

type DbProduct = {
  id: string;
  name_en: string;
  name_de: string;
  price: number;
  category: string;
  description_en: string | null;
  description_de: string | null;
  status: string | null;
};

function formatMs(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export default function ProductPage() {
  const params = useParams();
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";
  const id = params.id as string;

  const cart = useCart();

  const [product, setProduct] = useState<DbProduct | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // tick for UI timer only
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const alreadyInCart = useMemo(
    () => cart.items.some((x) => x.productId === id),
    [cart.items, id]
  );

  const msLeft = expiresAt ? Math.max(0, new Date(expiresAt).getTime() - now) : 0;

  async function load() {
    setLoading(true);
    setErr(null);

    const { data, error } = await supabase
      .from("products")
      .select("id,name_en,name_de,price,category,description_en,description_de,status")
      .eq("id", id)
      .single();

    if (error) {
      setErr(error.message);
      setProduct(null);
      setExpiresAt(null);
      setLoading(false);
      return;
    }

    setProduct(data as DbProduct);

    const { data: resData } = await supabase
      .from("reservations")
      .select("expires_at")
      .eq("product_id", id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1);

    setExpiresAt(resData?.[0]?.expires_at ?? null);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ✅ auto-refresh when reserved (every 5s) so expiry frees items quickly,
  // without accidentally unreserving immediately after you reserve.
  useEffect(() => {
    if (!expiresAt) return;

    const t = setInterval(async () => {
      await supabase.rpc("release_expired_reservations");
      await load();
    }, 5000);

    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt, id]);

  if (loading) return <div className="p-6">Loading…</div>;

  if (err || !product) {
    return (
      <div className="p-6 grid gap-2">
        <h1 className="text-xl font-semibold">Product not found</h1>
        <div className="text-sm text-neutral-600">{err ?? ""}</div>
        <div className="text-xs text-neutral-500">id: {id}</div>
      </div>
    );
  }

  const isReserved = product.status === "reserved";

  const name = locale === "de" ? product.name_de : product.name_en;
  const desc = locale === "de" ? product.description_de ?? "" : product.description_en ?? "";

  async function reserveAndAddToCart() {
    // If already in cart, go there
    if (alreadyInCart) {
      window.location.href = `/${locale}/cart`;
      return;
    }

    // Create reservation that expires in 15 min
    const newExpiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const { error: resError } = await supabase.from("reservations").insert({
      product_id: id,
      expires_at: newExpiresAt,
      status: "active",
    });

    if (resError) {
      alert(locale === "de" ? "Bereits reserviert." : "Already reserved.");
      await load();
      return;
    }

    const { error: prodError } = await supabase
      .from("products")
      .update({ status: "reserved" })
      .eq("id", id);

    if (prodError) {
      alert(locale === "de" ? "Fehler beim Reservieren." : "Reservation failed.");
      await load();
      return;
    }

    // ✅ Update UI immediately (do not depend on load timing)
    setProduct((p) => (p ? { ...p, status: "reserved" } : p));
    setExpiresAt(newExpiresAt);

    // ✅ Add to cart immediately
    cart.add(id);

    // small sync reload (optional)
    await load();
  }

  return (
    <div className="grid gap-6 max-w-xl p-6">
      <div className="h-64 rounded-xl bg-neutral-200" />

      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <div className="text-lg text-neutral-800">€{product.price}</div>
      </div>

      <p className="text-neutral-700">{desc}</p>

      {expiresAt && (
        <div className="text-sm text-neutral-700">
          {locale === "de" ? "Reservierung läuft ab in: " : "Reservation expires in: "}
          <span className="font-mono">{formatMs(msLeft)}</span>
        </div>
      )}

      <button
        disabled={isReserved && !alreadyInCart}
        onClick={reserveAndAddToCart}
        className={`rounded-lg px-4 py-2 text-white ${
          isReserved && !alreadyInCart
            ? "bg-neutral-400 cursor-not-allowed"
            : "bg-neutral-900 hover:opacity-90"
        }`}
      >
        {alreadyInCart
          ? locale === "de"
            ? "Zum Warenkorb"
            : "Go to cart"
          : isReserved
          ? locale === "de"
            ? "Reserviert"
            : "Reserved"
          : locale === "de"
          ? "15 Minuten reservieren"
          : "Reserve for 15 minutes"}
      </button>

      <p className="text-xs text-neutral-500">
        {locale === "de"
          ? "Reservierung läuft nach 15 Minuten ab, wenn nicht bezahlt."
          : "Reservation expires after 15 minutes if not paid."}
      </p>
    </div>
  );
}
