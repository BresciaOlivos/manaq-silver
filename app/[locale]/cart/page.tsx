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
  status?: string | null;
};

function moneyEUR(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CartPage() {
  const params = useParams();
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";

  const cart = useCart();
  const ids = useMemo(() => cart.items.map((x) => x.productId), [cart.items]);

  const [products, setProducts] = useState<Record<string, DbProduct>>({});
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  const [shipZone, setShipZone] = useState <"DE" | "EU"> ("DE");

  async function load() {
    if (!cart.ready) return;

    setLoading(true);

    if (ids.length === 0) {
      setProducts({});
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("id,name_en,name_de,price,status")
      .in("id", ids);

    if (error) {
      console.error(error);
      setProducts({});
      setLoading(false);
      return;
    }

    const map: Record<string, DbProduct> = {};
    (data ?? []).forEach((p: any) => (map[p.id] = p as DbProduct));
    setProducts(map);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.ready, ids.join(",")]);

  const total = useMemo(() => {
    return cart.items.reduce((sum, item) => {
      const p = products[item.productId];
      if (!p) return sum;
      return sum + p.price * (item.qty ?? 1);
    }, 0);
  }, [cart.items, products]);

  async function removeItem(productId: string) {
    // release reservation (recommended; see route below)
    await fetch("/api/cart/release", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    }).catch(() => {});

    cart.remove(productId);
    await load();
  }

  async function goCheckout() {
    if (!cart.ready) return;
    if (cart.items.length === 0) return;

    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          shipZone,
          items: cart.items.map((x) => ({ id: x.productId, qty: x.qty ?? 1 })),
        }),
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

  // ✅ hydration-safe
  if (!cart.ready) {
    return <div className="p-6 text-neutral-600">Loading…</div>;
  }

  return (
    <div className="grid gap-6 max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">{locale === "de" ? "Warenkorb" : "Cart"}</h1>

      {loading ? (
        <p className="text-neutral-600">Loading…</p>
      ) : cart.items.length === 0 ? (
        <p className="text-neutral-600">
          {locale === "de" ? "Dein Warenkorb ist leer." : "Your cart is empty."}
        </p>
      ) : (
        <div className="grid gap-3">

          <div className="rounded-xl border p-4 grid gap-2">
  <div className="font-medium">Shipping region</div>

  <select
    value={shipZone}
    onChange={(e) => setShipZone(e.target.value as "DE" | "EU")}
    className="border rounded-lg px-3 py-2"
  >
    <option value="DE">Germany (€4 • free over €55)</option>
    <option value="EU">EU (€7 • free over €85)</option>
  </select>
</div>

          {cart.items.map((item) => {
            const p = products[item.productId];
            const qty = item.qty ?? 1;

            return (
              <div
                key={item.productId}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div className="grid gap-1">
                  <div className="font-medium">
                    {p ? (locale === "de" ? p.name_de : p.name_en) : "Product"}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {p ? moneyEUR(p.price) : "—"} • Qty: {qty}
                  </div>

                  {p?.status === "sold" && (
                    <div className="text-xs text-red-600">This item is sold.</div>
                  )}
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-sm underline text-neutral-700"
                >
                  {locale === "de" ? "Entfernen" : "Remove"}
                </button>
              </div>
            );
          })}

          <div className="flex items-center justify-between pt-2">
            <div className="font-medium">{locale === "de" ? "Summe" : "Total"}</div>
            <div className="font-medium">{moneyEUR(total)}</div>
          </div>

          <button
            onClick={goCheckout}
            disabled={checkingOut}
            className={`rounded-lg px-4 py-2 text-white ${
              checkingOut ? "bg-neutral-400" : "bg-neutral-900 hover:opacity-90"
            }`}
          >
            {checkingOut ? "Redirecting…" : "Pay by card"}
          </button>
        </div>
      )}
    </div>
  );
}