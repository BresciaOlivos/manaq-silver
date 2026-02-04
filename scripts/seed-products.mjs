// scripts/seed-products.mjs
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

/**
 * Requires in .env.local (or environment):
 * NEXT_PUBLIC_SUPABASE_URL=...
 * SUPABASE_SERVICE_ROLE_KEY=...
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
if (!serviceKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

// ---------- helpers ----------
function slugify(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// For sets, folder is usually WITHOUT "set-" prefix (e.g. "cereza", not "set-cereza")
function folderSlug(category, name) {
  const n = String(name).trim();
  if (category === "sets") {
    if (/^set\s+/i.test(n)) return slugify(n.replace(/^set\s+/i, ""));
  }
  return slugify(n);
}

function buildLocalImages(category, name) {
  const f = folderSlug(category, name);
  // Example: /images/rings/butterfly/butterfly1.png
  return [
    `/images/${category}/${f}/${f}1.png`,
    `/images/${category}/${f}/${f}2.png`,
    `/images/${category}/${f}/${f}3.png`,
  ];
}

// very-light DE naming (better than showing EN everywhere)
// you can refine later in Supabase UI
function toGerman(name) {
  // keep Spanish names as-is (many of yours are Spanish and that’s ok)
  const n = String(name);

  // quick dictionary replacements
  const rep = [
    ["Pearl", "Perle"],
    ["Classic", "Klassisch"],
    ["Clover", "Klee"],
    ["Fan", "Fächer"],
    ["Shell", "Muschel"],
    ["Sun", "Sonne"],
    ["Rope", "Seil"],
    ["Bloom", "Blüte"],
    ["Blossom", "Blüte"],
    ["Starfish", "Seestern"],
    ["Wheel", "Rad"],
    ["Hoops", "Creolen"],
    ["Studs", "Stecker"],
    ["Feather", "Feder"],
    ["Leaf", "Blatt"],
    ["Flower", "Blume"],
    ["Geometry", "Geometrie"],
    ["Petal", "Blütenblatt"],
    ["Snow", "Schnee"],
    ["Butterfly", "Schmetterling"],
    ["Serpent", "Schlange"],
    ["Mask", "Maske"],
    ["Droplet", "Tröpfchen"],
    ["Ruby", "Rubin"],
    ["Starry Path", "Sternenpfad"],
    ["Whale tail", "Walschwanz"],
    ["Twin Crystal", "Doppelkristall"],
    ["Ocean Flow", "Ozeanfluss"],
    ["Infinito", "Unendlichkeit"],
    ["Cuarzo", "Quarz"],
    ["Caracol", "Schnecke"],
    ["Huella de Perro", "Hundepfote"],
    ["Trebol", "Kleeblatt"],
    ["Zirconio", "Zirkon"],
    ["Justicia", "Gerechtigkeit"],
    ["Peru Rojo", "Peru Rot"],
    ["Peru Corazon", "Peru Herz"],
    ["Mapa", "Karte"],
    ["Escudo", "Wappen"],
    ["fina", "Fein"],
    ["minima", "Minimal"],
    ["punto corto", "Kurz"],
    ["punto largo", "Lang"],
    ["rolo", "Rolo"],
    ["casual", "Casual"],
  ];

  let out = n;
  for (const [a, b] of rep) {
    out = out.replace(new RegExp(a, "gi"), b);
  }
  return out;
}

function makeProduct({ category, name, price, groupNote }) {
  const id = (() => {
    // Unique id by category + slug
    // Sets: use slug without "set-" (because folders are like that)
    const base = folderSlug(category, name);
    return `${category}-${base}`;
  })();

  const images = buildLocalImages(category, name);

  const name_en = name;
  const name_de = toGerman(name);

  const description_en =
    groupNote?.en ??
    `950 Peruvian silver. Hand-finished. Ships from Germany.`;

  const description_de =
    groupNote?.de ??
    `950er peruanisches Silber. Handgefertigt. Versand aus Deutschland.`;

  return {
    id,
    category, // must match your pages: earrings, rings, sets, bracelets, necklaces, pendants
    price: Number(price),
    name_en,
    name_de,
    description_en,
    description_de,
    images, // array of local paths
    status: "available",
  };
}

// ---------- inventory (YOUR FINAL LIST) ----------
const inventory = [
  // Earrings (Aretes)
  { category: "earrings", name: "Piedra Andina", price: 50 },
  { category: "earrings", name: "Feather", price: 35 },
  { category: "earrings", name: "Geometry", price: 25 },
  { category: "earrings", name: "Cross Weave", price: 45 },
  { category: "earrings", name: "Flower", price: 40 },
  { category: "earrings", name: "Mandala", price: 25 },
  { category: "earrings", name: "Leaf", price: 35 },
  { category: "earrings", name: "Petal", price: 35 },
  { category: "earrings", name: "Nieve", price: 25 },
  { category: "earrings", name: "Durazno", price: 25 },
  { category: "earrings", name: "Mariposa mini", price: 25 },
  { category: "earrings", name: "Mariposa", price: 35 },

  // Casual sets (sets casuales)
  { category: "sets", name: "Daisy Pearl", price: 45, group: "casual" },
  { category: "sets", name: "Twisted Pearl", price: 40, group: "casual" },
  { category: "sets", name: "Classic Pearl", price: 40, group: "casual" },
  { category: "sets", name: "Clover", price: 35, group: "casual" },
  { category: "sets", name: "Fan", price: 45, group: "casual" },
  { category: "sets", name: "Shell pearl", price: 30, group: "casual" },
  { category: "sets", name: "Sun pearl", price: 45, group: "casual" },
  { category: "sets", name: "Lotus", price: 35, group: "casual" },
  { category: "sets", name: "Rope Pearl", price: 45, group: "casual" },
  { category: "sets", name: "Clover Bloom", price: 35, group: "casual" },
  { category: "sets", name: "Pearl Blossom", price: 40, group: "casual" },
  { category: "sets", name: "Starfish", price: 38, group: "casual" },

  // Hoops & studs (still earrings category)
  { category: "earrings", name: "Twist Hoops", price: 40 },
  { category: "earrings", name: "Wheel Hoops", price: 40 },
  { category: "earrings", name: "Granule Hoops 1.5", price: 34 },
  { category: "earrings", name: "Sun Bloom Hoops", price: 35 },
  { category: "earrings", name: "Luna Studs", price: 35 },
  { category: "earrings", name: "Twist Grand Hoops", price: 75 },
  { category: "earrings", name: "Granule Hoops 2.5", price: 38 },
  { category: "earrings", name: "Gota", price: 35 },

  // Peruvian pendants (pendants category)
  { category: "pendants", name: "Peru Rojo", price: 35 },
  { category: "pendants", name: "Peru Corazon", price: 35 },
  { category: "pendants", name: "Mapa", price: 35 },
  { category: "pendants", name: "Tumi", price: 35 },
  { category: "pendants", name: "Escudo", price: 35 },

  // Rings (you labeled this block as “pendants” once but it’s rings)
  { category: "rings", name: "Whale tail", price: 25 },
  { category: "rings", name: "Butterfly", price: 25 },
  { category: "rings", name: "Twin Crystal", price: 25 },
  { category: "rings", name: "Serpent", price: 25 },
  { category: "rings", name: "Ocean Flow", price: 42 },
  { category: "rings", name: "Mask", price: 42 },
  { category: "rings", name: "Feather bold", price: 42 },
  { category: "rings", name: "Classic", price: 27 },
  { category: "rings", name: "Layered Bold", price: 40 },
  { category: "rings", name: "Droplet", price: 37 },
  { category: "rings", name: "Ruby", price: 95 },
  { category: "rings", name: "Starry Path", price: 42 },

  // Bracelets
  { category: "bracelets", name: "Infinito", price: 40 },
  { category: "bracelets", name: "Flor", price: 40 },
  { category: "bracelets", name: "Enroscada", price: 40 },
  { category: "bracelets", name: "Cuarzo", price: 35 },

  // Charms / other pendants (dijes)
  { category: "pendants", name: "Caracol", price: 20 },
  { category: "pendants", name: "Huella de Perro", price: 25 },
  { category: "pendants", name: "Trebol", price: 20 },
  { category: "pendants", name: "Zirconio", price: 17 },
  { category: "pendants", name: "Justicia", price: 25 },

  // Formal sets (Sets formales)
  { category: "sets", name: "Set Diana", price: 60, group: "formal" },
  { category: "sets", name: "Set Cereza", price: 50, group: "formal" },
  { category: "sets", name: "Set Mariposa", price: 50, group: "formal" },
  { category: "sets", name: "Set Arcoiris", price: 54, group: "formal" },
  { category: "sets", name: "Set Rosa pastel", price: 54, group: "formal" },
  { category: "sets", name: "Set cuadrado", price: 50, group: "formal" },
  { category: "sets", name: "Set Flor", price: 50, group: "formal" },
  { category: "sets", name: "Set Chacana", price: 54, group: "formal" },
  { category: "sets", name: "Set Corazon", price: 50, group: "formal" },

  // Necklaces
  { category: "necklaces", name: "fina", price: 35 },
  { category: "necklaces", name: "minima", price: 35 },
  { category: "necklaces", name: "punto corto", price: 35 },
  { category: "necklaces", name: "punto largo", price: 40 },
  { category: "necklaces", name: "rolo", price: 35 },
  { category: "necklaces", name: "Serpent", price: 55 },
  { category: "necklaces", name: "casual", price: 35 },
];

// ---------- main ----------
async function main() {
 console.log("🧹 Clearing reservations…");
const resDel = await supabase
  .from("reservations")
  .delete()
  .not("id", "is", null); // deletes all rows (uuid-safe)

if (resDel.error) {
  console.error("❌ Reservations delete failed:", resDel.error.message);
  process.exit(1);
}

console.log("🧹 Clearing products…");
const prodDel = await supabase
  .from("products")
  .delete()
  .not("id", "is", null); // deletes all rows (uuid-safe)

if (prodDel.error) {
  console.error("❌ Products delete failed:", prodDel.error.message);
  process.exit(1);
}

  // 2) Build rows
  const rows = inventory.map((x) =>
    makeProduct({
      category: x.category,
      name: x.name,
      price: x.price,
      groupNote: x.group
        ? {
            en:
              x.group === "formal"
                ? "Formal set. 950 Peruvian silver. Ships from Germany."
                : "Casual set. 950 Peruvian silver. Ships from Germany.",
            de:
              x.group === "formal"
                ? "Elegantes Set. 950er peruanisches Silber. Versand aus Deutschland."
                : "Casual Set. 950er peruanisches Silber. Versand aus Deutschland.",
          }
        : null,
    })
  );

  // 3) Insert in chunks (safe)
  const chunkSize = 50;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const ins = await supabase.from("products").insert(chunk);
    if (ins.error) {
      console.error("❌ Insert failed:", ins.error.message);
      console.error("Chunk starts at index:", i);
      process.exit(1);
    }
    console.log(`  → inserted ${Math.min(i + chunkSize, rows.length)}/${rows.length}`);
  }

  console.log(`✅ Done. Seeded ${rows.length} products.`);
  console.log("Next: open /en/shop and /en/earrings etc.");
}

main().catch((e) => {
  console.error("❌ Seed error:", e?.message ?? e);
  process.exit(1);
});