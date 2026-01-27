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
};

function formatMs(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export default function CartPage() {
  const params = useParams();
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";
  const cart = useCart();

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [expMap, setExpMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const ids = useMemo(() => cart.items.map((x) => x.productId), [cart.items]);

  async function load() {
    setLoading(true);

    if (ids.length === 0) {
      setProducts([]);
      setExpMap({});
      setLoading(false);
      return;
    }

    const { data: prodData, error: prodErr } = await supabase
      .from("products")
      .select("id,name_en,name_de,price,status")
      .in("id", ids);

    if (prodErr) {
      console.error(prodErr);
      setProducts([]);
      setExpMap({});
      setLoading(false);
      return;
    }

    // Keep only items that still exist (and show them)
    setProducts((prodData ?? []) as any);

    const { data: resData } = await supabase
      .from("reservations")
      .select("product_id,expires_at")
      .in("product_id", ids)
      .eq("status", "active");

    const map: Record<string, string> = {};
    (resData ?? []).forEach((r) => (map[r.product_id] = r.expires_at));
    setExpMap(map);

    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  // ✅ run cleanup + reload every 5s while cart has items
  useEffect(() => {
    if (ids.length === 0) return;

    const t = setInterval(async () => {
      await supabase.rpc("release_expired_reservations");
      await load();
    }, 5000);

    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  // ✅ if an item has no active reservation anymore, remove it from cart
  useEffect(() => {
    if (ids.length === 0) return;
    ids.forEach((pid) => {
      if (!expMap[pid]) {
        // no active reservation => remove from cart
        cart.remove(pid);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(expMap)]);

  const total = products.reduce((sum, p) => sum + p.price, 0);

  async function goCheckout() {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: ids, locale }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "Checkout failed");
        setCheckingOut(false);
        return;
      }

      window.location.href = json.url;
    } catch {
      alert("Checkout failed");
      setCheckingOut(false);
    }
  }

  return (
    <div className="grid gap-6 max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">{locale === "de" ? "Warenkorb" : "Cart"}</h1>

      {loading ? (
        <p className="text-neutral-600">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-neutral-600">
          {locale === "de" ? "Dein Warenkorb ist leer." : "Your cart is empty."}
        </p>
      ) : (
        <div className="grid gap-3">
          {products.map((p) => {
            const msLeft = expMap[p.id]
              ? Math.max(0, new Date(expMap[p.id]).getTime() - now)
              : 0;

            return (
              <div key={p.id} className="flex items-center justify-between rounded-xl border p-4">
                <div className="grid gap-1">
                  <div className="font-medium">{locale === "de" ? p.name_de : p.name_en}</div>
                  <div className="text-sm text-neutral-600">€{p.price}</div>

                  {expMap[p.id] && (
                    <div className="text-xs text-neutral-600">
                      {locale === "de" ? "Läuft ab in: " : "Expires in: "}
                      <span className="font-mono">{formatMs(msLeft)}</span>
                    </div>
                  )}
                </div>

                <button onClick={() => cart.remove(p.id)} className="text-sm underline text-neutral-700">
                  {locale === "de" ? "Entfernen" : "Remove"}
                </button>
              </div>
            );
          })}

          <div className="flex items-center justify-between pt-2">
            <div className="font-medium">{locale === "de" ? "Summe" : "Total"}</div>
            <div className="font-medium">€{total}</div>
          </div>

          <button
            onClick={goCheckout}
            disabled={checkingOut}
            className={`rounded-lg px-4 py-2 text-white ${
              checkingOut ? "bg-neutral-400" : "bg-neutral-900 hover:opacity-90"
            }`}
          >
            {checkingOut
              ? locale === "de"
                ? "Weiterleitung…"
                : "Redirecting…"
              : locale === "de"
              ? "Mit Karte bezahlen"
              : "Pay by card"}
          </button>
        </div>
      )}
    </div>
  );
}
