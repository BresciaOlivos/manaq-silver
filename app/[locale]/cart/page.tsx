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

  async function load() {
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
    (data ?? []).forEach((p: any) => {
      map[p.id] = p as DbProduct;
    });

    setProducts(map);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  const total = useMemo(() => {
    return cart.items.reduce((sum, item) => {
      const p = products[item.productId];
      if (!p) return sum;
      return sum + p.price * (item.qty ?? 1);
    }, 0);
  }, [cart.items, products]);

  async function goCheckout() {
  if (cart.items.length === 0) {
    alert("Cart is empty.");
    return;
  }

  setCheckingOut(true);

  try {
    const payload = {
      locale,
      items: cart.items.map((x) => ({ id: x.productId, qty: x.qty ?? 1 })),
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Read text first (works even if server throws weird things)
    const text = await res.text();

    let json: any = null;
    try {
      json = JSON.parse(text);
    } catch {
      // Not JSON — show raw response
      alert(`Checkout failed (non-JSON):\n${text}`);
      setCheckingOut(false);
      return;
    }

    if (!res.ok) {
      alert(`Checkout failed:\n${json?.error ?? "Unknown error"}`);
      setCheckingOut(false);
      return;
    }

    if (!json?.url) {
      alert("Checkout failed: missing Stripe URL.");
      setCheckingOut(false);
      return;
    }

    window.location.href = json.url;
  } catch (e: any) {
    alert(`Checkout error:\n${e?.message ?? "Unknown error"}`);
    setCheckingOut(false);
  }
}

  return (
    <div className="grid gap-6 max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">
        {locale === "de" ? "Warenkorb" : "Cart"}
      </h1>

      {loading ? (
        <p className="text-neutral-600">Loading…</p>
      ) : cart.items.length === 0 ? (
        <p className="text-neutral-600">
          {locale === "de" ? "Dein Warenkorb ist leer." : "Your cart is empty."}
        </p>
      ) : (
        <div className="grid gap-3">
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
                    {p
                      ? locale === "de"
                        ? p.name_de
                        : p.name_en
                      : locale === "de"
                      ? "Produkt nicht gefunden"
                      : "Product not found"}
                  </div>

                  <div className="text-sm text-neutral-600">
                    {p ? moneyEUR(p.price) : "—"} • Qty: {qty}
                  </div>
                </div>

                <button
  onClick={async () => {
    // Release reservation in DB first
    await fetch("/api/cart/release", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: item.productId }),
    });

    // Then remove locally
    cart.remove(item.productId);

    // Reload products map
    await load();
  }}
  className="text-sm underline text-neutral-700"
>
  Remove
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