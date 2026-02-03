
// scripts/seed-products.mjs
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

// ✅ Reads from your .env.local (make sure these exist there)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
if (!SERVICE_ROLE) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

function eur(n) {
  // store as number (e.g., 50) not string
  const x = Number(n);
  if (!Number.isFinite(x) || x <= 0) throw new Error(`Invalid price: ${n}`);
  return x;
}

/**
 * IMPORTANT:
 * This matches the columns we have been using in your code:
 * - products: id, category, price, name_en, name_de, description_en, description_de, status
 *
 * If your table uses different column names, tell me and I’ll adapt it.
 */
const PRODUCTS = [
  // =========================
  // SETS (Premium)
  // =========================
  {
    id: "set-diana",
    category: "sets",
    price: eur(60),
    name_en: "Set Diana",
    name_de: "Set Diana",
    description_en: "Premium 950 silver set (earrings + pendant).",
    description_de: "Premium-Set aus 950er Silber (Ohrringe + Anhänger).",
    status: "available",
  },
  {
    id: "set-cereza",
    category: "sets",
    price: eur(50),
    name_en: "Set Cereza",
    name_de: "Set Cereza",
    description_en: "950 silver set with earrings and pendant.",
    description_de: "950er Silber-Set mit Ohrringen und Anhänger.",
    status: "available",
  },
  { id: "set-mariposa", category: "sets", price: eur(50), name_en: "Set Mariposa", name_de: "Set Mariposa", description_en: "950 silver set (earrings + pendant).", description_de: "950er Silber-Set (Ohrringe + Anhänger).", status: "available" },
  { id: "set-arcoiris", category: "sets", price: eur(54), name_en: "Set Arcoiris", name_de: "Set Arcoiris", description_en: "950 silver set (earrings + pendant).", description_de: "950er Silber-Set (Ohrringe + Anhänger).", status: "available" },
  { id: "set-rosa-pastel", category: "sets", price: eur(54), name_en: "Set Rosa Pastel", name_de: "Set Rosa Pastel", description_en: "950 silver set (earrings + pendant).", description_de: "950er Silber-Set (Ohrringe + Anhänger).", status: "available" },
  { id: "set-cuadrado", category: "sets", price: eur(50), name_en: "Set Cuadrado", name_de: "Set Cuadrado", description_en: "950 silver set (earrings + pendant).", description_de: "950er Silber-Set (Ohrringe + Anhänger).", status: "available" },
  { id: "set-flor", category: "sets", price: eur(50), name_en: "Set Flor", name_de: "Set Flor", description_en: "950 silver set (earrings + pendant).", description_de: "950er Silber-Set (Ohrringe + Anhänger).", status: "available" },

  // =========================
  // SETS (Casual)
  // =========================
  { id: "set-chacana", category: "sets", price: eur(54), name_en: "Chacana Set", name_de: "Chacana Set", description_en: "950 silver set inspired by Peru.", description_de: "950er Silber-Set inspiriert von Peru.", status: "available" },
  { id: "set-starfish", category: "sets", price: eur(38), name_en: "Starfish Set", name_de: "Starfish Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-abanico", category: "sets", price: eur(45), name_en: "Abanico Set", name_de: "Abanico Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-rosca-1", category: "sets", price: eur(45), name_en: "Rosca Set (1)", name_de: "Rosca Set (1)", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-rosca-2", category: "sets", price: eur(45), name_en: "Rosca Set (2)", name_de: "Rosca Set (2)", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-rapunzel", category: "sets", price: eur(45), name_en: "Rapunzel Set", name_de: "Rapunzel Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-compas", category: "sets", price: eur(30), name_en: "Compas Set", name_de: "Kompass Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-flor-pegada-1", category: "sets", price: eur(45), name_en: "Flor Pegada Set (1)", name_de: "Flor Pegada Set (1)", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-flor-pegada-2", category: "sets", price: eur(45), name_en: "Flor Pegada Set (2)", name_de: "Flor Pegada Set (2)", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-trebol", category: "sets", price: eur(35), name_en: "Trebol Set", name_de: "Klee Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-perla", category: "sets", price: eur(35), name_en: "Perla Set", name_de: "Perle Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-roseta", category: "sets", price: eur(35), name_en: "Roseta Set", name_de: "Roseta Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-girasol", category: "sets", price: eur(45), name_en: "Girasol Set", name_de: "Sonnenblume Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-tentacion", category: "sets", price: eur(45), name_en: "Tentacion Set", name_de: "Tentacion Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-seashell", category: "sets", price: eur(30), name_en: "Seashell Set", name_de: "Muschel Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-rosquita-pegada", category: "sets", price: eur(35), name_en: "Rosquita Pegada Set", name_de: "Rosquita Pegada Set", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-rosquita-colgada-1", category: "sets", price: eur(35), name_en: "Rosquita Colgada Set (1)", name_de: "Rosquita Colgada Set (1)", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-rosquita-colgada-2", category: "sets", price: eur(35), name_en: "Rosquita Colgada Set (2)", name_de: "Rosquita Colgada Set (2)", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },
  { id: "set-mariposa-casual", category: "sets", price: eur(35), name_en: "Mariposa Set (Casual)", name_de: "Mariposa Set (Casual)", description_en: "950 silver set.", description_de: "950er Silber-Set.", status: "available" },

  // =========================
  // RINGS
  // =========================
  { id: "ring-hoja-feather-bold", category: "rings", price: eur(42), name_en: "Hoja / Feather Bold Ring", name_de: "Hoja / Feather Bold Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-mascara-mask", category: "rings", price: eur(42), name_en: "Mascara / Mask Ring", name_de: "Mascara / Mask Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-geminis-starry-path", category: "rings", price: eur(42), name_en: "Geminis / Starry Path Ring", name_de: "Geminis / Starry Path Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-layered-horizon", category: "rings", price: eur(40), name_en: "Layered Horizon Ring", name_de: "Layered Horizon Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-droplet", category: "rings", price: eur(37), name_en: "Droplet Ring", name_de: "Droplet Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-liso-classic", category: "rings", price: eur(27), name_en: "Liso / Classic Ring", name_de: "Liso / Classic Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-cupido-ocean-flow", category: "rings", price: eur(42), name_en: "Cupido / Ocean Flow Ring", name_de: "Cupido / Ocean Flow Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-serpiente", category: "rings", price: eur(25), name_en: "Serpiente Ring", name_de: "Schlange Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-cola-de-delfin", category: "rings", price: eur(25), name_en: "Dolphin Tail Ring", name_de: "Delfinschwanz Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-mariposa", category: "rings", price: eur(25), name_en: "Mariposa Ring", name_de: "Schmetterling Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },
  { id: "ring-zirconio", category: "rings", price: eur(25), name_en: "Zirconio Ring", name_de: "Zirkonia Ring", description_en: "950 silver ring.", description_de: "950er Silberring.", status: "available" },

  // =========================
  // BRACELETS
  // =========================
  { id: "bracelet-infinito", category: "bracelets", price: eur(40), name_en: "Infinito Bracelet", name_de: "Unendlichkeitsarmband", description_en: "950 silver bracelet.", description_de: "950er Silberarmband.", status: "available" },
  { id: "bracelet-flor", category: "bracelets", price: eur(40), name_en: "Flor Bracelet", name_de: "Blumenarmband", description_en: "950 silver bracelet.", description_de: "950er Silberarmband.", status: "available" },
  { id: "bracelet-enroscada", category: "bracelets", price: eur(40), name_en: "Enroscada Bracelet", name_de: "Enroscada Armband", description_en: "950 silver bracelet.", description_de: "950er Silberarmband.", status: "available" },
  { id: "bracelet-cuarzo", category: "bracelets", price: eur(35), name_en: "Cuarzo Bracelet", name_de: "Quarzarmband", description_en: "950 silver bracelet.", description_de: "950er Silberarmband.", status: "available" },

  // =========================
  // EARRINGS
  // =========================
  { id: "earrings-llanta", category: "earrings", price: eur(45), name_en: "Llanta Earrings", name_de: "Llanta Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-twist-grande-hoops", category: "earrings", price: eur(75), name_en: "Twist Grande Hoops", name_de: "Twist Grande Hoops", description_en: "950 silver hoops.", description_de: "950er Creolen.", status: "available" },
  { id: "earrings-aros-twelve-rings", category: "earrings", price: eur(40), name_en: "Aros Twelve Rings", name_de: "Aros Twelve Rings", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-tron", category: "earrings", price: eur(40), name_en: "Tron Earrings", name_de: "Tron Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-minimalist-beaded-hoop-25", category: "earrings", price: eur(38), name_en: "Minimalist Beaded Hoop (2.5)", name_de: "Minimalist Beaded Hoop (2.5)", description_en: "950 silver hoops.", description_de: "950er Creolen.", status: "available" },
  { id: "earrings-minimalist-beaded-hoop-15", category: "earrings", price: eur(34), name_en: "Minimalist Beaded Hoop (1.5)", name_de: "Minimalist Beaded Hoop (1.5)", description_en: "950 silver hoops.", description_de: "950er Creolen.", status: "available" },
  { id: "earrings-piedra-andina", category: "earrings", price: eur(50), name_en: "Piedra Andina Earrings", name_de: "Piedra Andina Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-gota", category: "earrings", price: eur(35), name_en: "Gota Earrings", name_de: "Gota Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-pluma", category: "earrings", price: eur(35), name_en: "Pluma Earrings", name_de: "Feder Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-gota-20", category: "earrings", price: eur(35), name_en: "Gota 2.0 Earrings", name_de: "Gota 2.0 Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-schmetterling", category: "earrings", price: eur(40), name_en: "Schmetterling Earrings", name_de: "Schmetterling Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-aros-sol", category: "earrings", price: eur(30), name_en: "Aros Sol Earrings", name_de: "Aros Sol Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-elsa", category: "earrings", price: eur(30), name_en: "Elsa Earrings", name_de: "Elsa Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-caribe", category: "earrings", price: eur(30), name_en: "Caribe Earrings", name_de: "Caribe Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },

  // the unnamed €25 ones (placeholders you can rename later)
  { id: "earrings-unnamed-1", category: "earrings", price: eur(25), name_en: "Earrings (Rename me) 1", name_de: "Ohrringe (umbenennen) 1", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-unnamed-2", category: "earrings", price: eur(25), name_en: "Earrings (Rename me) 2", name_de: "Ohrringe (umbenennen) 2", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-unnamed-3", category: "earrings", price: eur(25), name_en: "Earrings (Rename me) 3", name_de: "Ohrringe (umbenennen) 3", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },

  { id: "earrings-mandala", category: "earrings", price: eur(25), name_en: "Mandala Earrings", name_de: "Mandala Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-mariposa", category: "earrings", price: eur(25), name_en: "Mariposa Earrings", name_de: "Schmetterling Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-geometry", category: "earrings", price: eur(25), name_en: "Geometry Earrings", name_de: "Geometrie Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-roseta", category: "earrings", price: eur(35), name_en: "Roseta Earrings", name_de: "Roseta Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },
  { id: "earrings-hoja", category: "earrings", price: eur(35), name_en: "Hoja Earrings", name_de: "Blatt Ohrringe", description_en: "950 silver earrings.", description_de: "950er Silberohrringe.", status: "available" },

  // =========================
  // NECKLACES (Chains)
  // =========================
  { id: "necklace-rolo", category: "necklaces", price: eur(35), name_en: "Rolo Necklace", name_de: "Rolo Kette", description_en: "950 silver chain necklace.", description_de: "950er Silberkette.", status: "available" },
  { id: "necklace-fina", category: "necklaces", price: eur(40), name_en: "Fina Necklace", name_de: "Feine Kette", description_en: "950 silver chain necklace.", description_de: "950er Silberkette.", status: "available" },
  { id: "necklace-cadena-1", category: "necklaces", price: eur(35), name_en: "Cadena 1 Necklace", name_de: "Cadena 1 Kette", description_en: "950 silver chain necklace.", description_de: "950er Silberkette.", status: "available" },
  { id: "necklace-cadena-2", category: "necklaces", price: eur(30), name_en: "Cadena 2 Necklace", name_de: "Cadena 2 Kette", description_en: "950 silver chain necklace.", description_de: "950er Silberkette.", status: "available" },
  { id: "necklace-gruesa", category: "necklaces", price: eur(55), name_en: "Gruesa Necklace", name_de: "Dicke Kette", description_en: "950 silver chain necklace.", description_de: "950er Silberkette.", status: "available" },
  { id: "necklace-punto-largo", category: "necklaces", price: eur(40), name_en: "Punto Largo Necklace", name_de: "Punto Largo Kette", description_en: "950 silver chain necklace.", description_de: "950er Silberkette.", status: "available" },
  { id: "necklace-punto-corto", category: "necklaces", price: eur(35), name_en: "Punto Corto Necklace", name_de: "Punto Corto Kette", description_en: "950 silver chain necklace.", description_de: "950er Silberkette.", status: "available" },

  // =========================
  // PENDANTS (Charms)
  // =========================
  { id: "pendant-caracol", category: "pendants", price: eur(20), name_en: "Caracol Pendant", name_de: "Schnecke Anhänger", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-huella-de-perro", category: "pendants", price: eur(25), name_en: "Dog Paw Pendant", name_de: "Hundepfote Anhänger", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-tumi-1", category: "pendants", price: eur(25), name_en: "Tumi Pendant (1)", name_de: "Tumi Anhänger (1)", description_en: "Iconic Peruvian symbol in 950 silver.", description_de: "Ikonisches peruanisches Symbol aus 950er Silber.", status: "available" },
  { id: "pendant-tumi-2", category: "pendants", price: eur(25), name_en: "Tumi Pendant (2)", name_de: "Tumi Anhänger (2)", description_en: "Iconic Peruvian symbol in 950 silver.", description_de: "Ikonisches peruanisches Symbol aus 950er Silber.", status: "available" },
  { id: "pendant-trebol", category: "pendants", price: eur(20), name_en: "Trebol Pendant", name_de: "Klee Anhänger", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-zirconio", category: "pendants", price: eur(17), name_en: "Zirconio Pendant", name_de: "Zirkonia Anhänger", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-justicia", category: "pendants", price: eur(25), name_en: "Justicia Pendant", name_de: "Justitia Anhänger", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-peruano-1", category: "pendants", price: eur(35), name_en: "Peruvian Pendant (1)", name_de: "Peruanischer Anhänger (1)", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-peruano-2", category: "pendants", price: eur(35), name_en: "Peruvian Pendant (2)", name_de: "Peruanischer Anhänger (2)", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-peruano-3", category: "pendants", price: eur(35), name_en: "Peruvian Pendant (3)", name_de: "Peruanischer Anhänger (3)", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-peruano-4", category: "pendants", price: eur(35), name_en: "Peruvian Pendant (4)", name_de: "Peruanischer Anhänger (4)", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
  { id: "pendant-peruano-5", category: "pendants", price: eur(35), name_en: "Peruvian Pendant (5)", name_de: "Peruanischer Anhänger (5)", description_en: "950 silver pendant.", description_de: "950er Silberanhänger.", status: "available" },
];

async function main() {
  console.log(`Seeding ${PRODUCTS.length} products…`);

  // Upsert so you can run multiple times without duplicates.
  const { error } = await supabase
    .from("products")
    .upsert(PRODUCTS, { onConflict: "id" });

  if (error) {
    console.error("❌ Supabase error:", error.message);
    process.exit(1);
  }

  console.log("✅ Done. Products inserted/updated.");
}

main();