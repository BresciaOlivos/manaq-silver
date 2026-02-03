"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

type P = {
  id: string;
  category: string;
  status: string | null;
  price: number;
  name_en: string;
  name_de: string;
  description_en: string | null;
  description_de: string | null;
  images: string[] | null;
};

export default function AdminPage() {
  const params = useParams();
  const search = useSearchParams();
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";

  const key = search.get("key") || "";
  const [items, setItems] = useState<P[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/products?key=${encodeURIComponent(key)}`);
    const json = await res.json();
    setItems(json.products ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter((p) =>
      [p.id, p.name_en, p.name_de, p.category].join(" ").toLowerCase().includes(t)
    );
  }, [items, q]);

  async function save(id: string, patch: Partial<P>) {
    setSavingId(id);
    const res = await fetch(`/api/admin/products?key=${encodeURIComponent(key)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, patch }),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "Save failed");
    } else {
      await load();
    }
    setSavingId(null);
  }

  if (!key) {
    return (
      <div className="p-6 max-w-2xl">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-2 text-neutral-600">
          Missing key. Open:
          <br />
          <code className="text-xs">/en/admin?key=YOUR_ADMIN_KEY</code>
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Inventory Admin</h1>
        <button className="rounded-lg border px-3 py-2" onClick={load}>
          Refresh
        </button>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search id / name / category..."
        className="border rounded-lg px-3 py-2"
      />

      {loading ? (
        <div className="text-neutral-600">Loading…</div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-2xl border p-4 grid gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">{p.id}</div>
                <div className="text-sm text-neutral-600">{p.category}</div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <label className="grid gap-1 text-sm">
                  Name (EN)
                  <input
                    defaultValue={p.name_en}
                    className="border rounded-lg px-3 py-2"
                    onBlur={(e) => save(p.id, { name_en: e.target.value })}
                  />
                </label>

                <label className="grid gap-1 text-sm">
                  Name (DE)
                  <input
                    defaultValue={p.name_de}
                    className="border rounded-lg px-3 py-2"
                    onBlur={(e) => save(p.id, { name_de: e.target.value })}
                  />
                </label>

                <label className="grid gap-1 text-sm">
                  Price (€)
                  <input
                    type="number"
                    defaultValue={p.price}
                    className="border rounded-lg px-3 py-2"
                    onBlur={(e) => save(p.id, { price: Number(e.target.value) })}
                  />
                </label>

                <label className="grid gap-1 text-sm">
                  Status
                  <select
                    defaultValue={p.status ?? "available"}
                    className="border rounded-lg px-3 py-2"
                    onChange={(e) => save(p.id, { status: e.target.value })}
                  >
                    <option value="available">available</option>
                    <option value="reserved">reserved</option>
                    <option value="sold">sold</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-1 text-sm">
                Images (comma separated public paths)
                <input
                  defaultValue={(p.images ?? []).join(",")}
                  className="border rounded-lg px-3 py-2"
                  onBlur={(e) =>
                    save(p.id, {
                      images: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean) as any,
                    })
                  }
                />
                <div className="text-xs text-neutral-500">
                  Example: /images/sets/cereza/cereza1.png,/images/sets/cereza/cereza2.png
                </div>
              </label>

              {savingId === p.id && (
                <div className="text-xs text-neutral-500">Saving…</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}