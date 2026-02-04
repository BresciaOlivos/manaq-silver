"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Row = {
  id: string;
  category: string;
  price: number;
  status: string | null;
  name_en: string;
  name_de: string;
  images?: string[] | null;
};

const CATS = ["earrings", "necklaces", "rings", "sets", "pendants", "bracelets"] as const;
const STATUS = ["available", "reserved", "sold"] as const;

function money(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

export default function InventoryClient({ locale }: { locale: "de" | "en" }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setMsg(null);

    const { data, error } = await supabase
      .from("products")
      .select("id,category,price,status,name_en,name_de,images")
      .order("category", { ascending: true });

    if (error) {
      setMsg(error.message);
      setRows([]);
      setLoading(false);
      return;
    }

    setRows((data ?? []) as Row[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesTerm =
        !term ||
        r.id.toLowerCase().includes(term) ||
        r.name_en.toLowerCase().includes(term) ||
        r.name_de.toLowerCase().includes(term);
      const matchesCat = cat === "all" || r.category === cat;
      const matchesStatus = status === "all" || (r.status ?? "available") === status;
      return matchesTerm && matchesCat && matchesStatus;
    });
  }, [rows, q, cat, status]);

  function updateLocal(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function save(row: Row) {
    setSavingId(row.id);
    setMsg(null);

    const payload: any = {
      category: row.category,
      price: Number(row.price),
      status: row.status ?? "available",
      name_en: row.name_en,
      name_de: row.name_de,
      images: Array.isArray(row.images) ? row.images.filter(Boolean) : [],
    };

    const { error } = await supabase.from("products").update(payload).eq("id", row.id);

    if (error) {
      setMsg(error.message);
      setSavingId(null);
      return;
    }

    setMsg(`Saved: ${row.id}`);
    setSavingId(null);
  }

  if (loading) return <div className="text-neutral-600">Loading…</div>;

  return (
    <div className="grid gap-4">
      {msg && (
        <div className="rounded-2xl border bg-white px-4 py-3 text-sm text-neutral-800">
          {msg}
        </div>
      )}

      {/* Filters */}
      <div className="grid gap-3 md:flex md:items-center md:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search id / name…"
          className="w-full md:w-[320px] rounded-xl border px-3 py-2 text-sm"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm bg-white"
          >
            <option value="all">All categories</option>
            {CATS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm bg-white"
          >
            <option value="all">All status</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button
            onClick={load}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Table-ish cards */}
      <div className="grid gap-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border bg-white p-4 grid gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-neutral-900">
                {r.id}
              </div>
              <div className="text-sm text-neutral-600">
                {money(Number(r.price || 0))}
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <label className="grid gap-1 text-xs text-neutral-600">
                Name (EN)
                <input
                  value={r.name_en}
                  onChange={(e) => updateLocal(r.id, { name_en: e.target.value })}
                  className="rounded-xl border px-3 py-2 text-sm text-neutral-900"
                />
              </label>

              <label className="grid gap-1 text-xs text-neutral-600">
                Name (DE)
                <input
                  value={r.name_de}
                  onChange={(e) => updateLocal(r.id, { name_de: e.target.value })}
                  className="rounded-xl border px-3 py-2 text-sm text-neutral-900"
                />
              </label>

              <label className="grid gap-1 text-xs text-neutral-600">
                Category
                <select
                  value={r.category}
                  onChange={(e) => updateLocal(r.id, { category: e.target.value })}
                  className="rounded-xl border px-3 py-2 text-sm bg-white text-neutral-900"
                >
                  {CATS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1 text-xs text-neutral-600">
                Status
                <select
                  value={(r.status ?? "available") as any}
                  onChange={(e) => updateLocal(r.id, { status: e.target.value })}
                  className="rounded-xl border px-3 py-2 text-sm bg-white text-neutral-900"
                >
                  {STATUS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1 text-xs text-neutral-600">
                Price (EUR)
                <input
                  type="number"
                  value={Number(r.price || 0)}
                  onChange={(e) => updateLocal(r.id, { price: Number(e.target.value) })}
                  className="rounded-xl border px-3 py-2 text-sm text-neutral-900"
                />
              </label>

              <label className="grid gap-1 text-xs text-neutral-600">
                Images (comma separated URLs)
                <input
                  value={(Array.isArray(r.images) ? r.images : []).join(",")}
                  onChange={(e) =>
                    updateLocal(r.id, {
                      images: e.target.value
                        .split(",")
                        .map((x) => x.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="https://.../1.png, https://.../2.png, https://.../3.png"
                  className="rounded-xl border px-3 py-2 text-sm text-neutral-900"
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => save(r)}
                disabled={savingId === r.id}
                className={`rounded-xl px-4 py-2 text-sm text-white ${
                  savingId === r.id ? "bg-neutral-400" : "bg-neutral-900 hover:opacity-90"
                }`}
              >
                {savingId === r.id ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-sm text-neutral-600">No matches.</div>
      )}
    </div>
  );
}