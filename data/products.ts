export type Category =
  | "earrings"
  | "necklaces" // chains go here
  | "rings"
  | "sets"
  | "pendants"
  | "bracelets";

export type Tier = "premium" | "casual";

export type Product = {
  id: string; // english id for URL
  name: { en: string; de: string };
  price: number;
  category: Category;
  tier?: Tier; // only used for sets
  description: { en: string; de: string };
  images: string | string[]; // always 3 images for carousel
};

function img3(category: Category, id: string): string[] {
  // expects you to upload:
  // public/images/<category>/<id>/<id>1.png ...2.png ...3.png
  return [
    `/images/${category}/${id}/${id}1.png`,
    `/images/${category}/${id}/${id}2.png`,
    `/images/${category}/${id}/${id}3.png`,
  ];
}

export const products: Product[] = [
  // =========================
  // RINGS
  // =========================
  {
    id: "ring-feather-bold",
    category: "rings",
    price: 42,
    name: { en: "Feather Bold Ring", de: "Ring: Hoja (Bold)" },
    description: {
      en: "950 Peruvian silver ring. Bold feather/leaf style.",
      de: "Ring aus 950er Silber. Kräftiges Blatt/Feder-Design.",
    },
    images: img3("rings", "ring-feather-bold"),
  },
  {
    id: "ring-mask",
    category: "rings",
    price: 42,
    name: { en: "Mask Ring", de: "Ring: Mascara" },
    description: {
      en: "950 silver ring with mask motif.",
      de: "950er Silberring mit Maskenmotiv.",
    },
    images: img3("rings", "ring-mask"),
  },
  {
    id: "ring-gemini-starry-path",
    category: "rings",
    price: 42,
    name: { en: "Gemini (Starry Path) Ring", de: "Ring: Geminis" },
    description: {
      en: "950 silver ring inspired by a starry path.",
      de: "950er Silberring inspiriert von einem Sternenpfad.",
    },
    images: img3("rings", "ring-gemini-starry-path"),
  },
  {
    id: "ring-layered-horizon",
    category: "rings",
    price: 40,
    name: { en: "Layered Horizon Ring", de: "Ring: Layered Horizon" },
    description: {
      en: "950 silver ring with layered horizon lines.",
      de: "950er Silberring mit mehrlagigen Linien.",
    },
    images: img3("rings", "ring-layered-horizon"),
  },
  {
    id: "ring-droplet",
    category: "rings",
    price: 37,
    name: { en: "Droplet Ring", de: "Ring: Droplet" },
    description: {
      en: "Minimal droplet form in 950 silver.",
      de: "Minimalistische Tropfenform aus 950er Silber.",
    },
    images: img3("rings", "ring-droplet"),
  },
  {
    id: "ring-classic",
    category: "rings",
    price: 27,
    name: { en: "Classic Ring", de: "Ring: Liso (Classic)" },
    description: {
      en: "Classic clean band in 950 silver.",
      de: "Klassischer, cleaner Ring aus 950er Silber.",
    },
    images: img3("rings", "ring-classic"),
  },
  {
    id: "ring-ocean-flow",
    category: "rings",
    price: 42,
    name: { en: "Ocean Flow Ring", de: "Ring: Cupido (Ocean Flow)" },
    description: {
      en: "Flowing wave-like design in 950 silver.",
      de: "Fließendes Wellen-Design aus 950er Silber.",
    },
    images: img3("rings", "ring-ocean-flow"),
  },
  {
    id: "ring-serpent",
    category: "rings",
    price: 25,
    name: { en: "Serpent Ring", de: "Ring: Serpiente" },
    description: {
      en: "Serpent-inspired ring in 950 silver.",
      de: "Schlangen-inspiriertes Design aus 950er Silber.",
    },
    images: img3("rings", "ring-serpent"),
  },
  {
    id: "ring-dolphin-tail",
    category: "rings",
    price: 25,
    name: { en: "Dolphin Tail Ring", de: "Ring: Cola de delfín" },
    description: {
      en: "Dolphin tail motif in 950 silver.",
      de: "Delfinschwanz-Motiv aus 950er Silber.",
    },
    images: img3("rings", "ring-dolphin-tail"),
  },
  {
    id: "ring-butterfly",
    category: "rings",
    price: 25,
    name: { en: "Butterfly Ring", de: "Ring: Mariposa" },
    description: {
      en: "Butterfly motif in 950 silver.",
      de: "Schmetterlingsmotiv aus 950er Silber.",
    },
    images: img3("rings", "ring-butterfly"),
  },
  {
    id: "ring-zircon",
    category: "rings",
    price: 25,
    name: { en: "Zircon Ring", de: "Ring: Zirconio" },
    description: {
      en: "950 silver ring with zircon detail.",
      de: "950er Silberring mit Zirkon-Detail.",
    },
    images: img3("rings", "ring-zircon"),
  },

  // =========================
  // SETS — PREMIUM
  // =========================
  {
    id: "set-diana",
    category: "sets",
    tier: "premium",
    price: 60,
    name: { en: "Diana Set", de: "Set Diana" },
    description: {
      en: "Premium matching set in 950 Peruvian silver.",
      de: "Premium Set aus 950er peruanischem Silber.",
    },
    images: img3("sets", "set-diana"),
  },
  {
    id: "set-cereza",
    category: "sets",
    tier: "premium",
    price: 50,
    name: { en: "Cereza Set", de: "Set Cereza" },
    description: {
      en: "Earrings + pendant set in 950 Peruvian silver.",
      de: "Set aus Ohrringen + Anhänger aus 950er Silber.",
    },
    images: img3("sets", "set-cereza"),
  },
  {
    id: "set-butterfly",
    category: "sets",
    tier: "premium",
    price: 50,
    name: { en: "Butterfly Set", de: "Set Mariposa" },
    description: {
      en: "Premium butterfly-themed set in 950 silver.",
      de: "Premium Set mit Schmetterlingsmotiv aus 950er Silber.",
    },
    images: img3("sets", "set-butterfly"),
  },
  {
    id: "set-rainbow",
    category: "sets",
    tier: "premium",
    price: 54,
    name: { en: "Rainbow Set", de: "Set Arcoiris" },
    description: {
      en: "Premium set with rainbow-inspired details.",
      de: "Premium Set mit regenbogen-inspirierten Details.",
    },
    images: img3("sets", "set-rainbow"),
  },
  {
    id: "set-pastel-rose",
    category: "sets",
    tier: "premium",
    price: 54,
    name: { en: "Pastel Rose Set", de: "Set Rosa Pastel" },
    description: {
      en: "Premium pastel rose-inspired set.",
      de: "Premium Set im Pastell-Rosenstil.",
    },
    images: img3("sets", "set-pastel-rose"),
  },
  {
    id: "set-square",
    category: "sets",
    tier: "premium",
    price: 50,
    name: { en: "Square Set", de: "Set Cuadrado" },
    description: {
      en: "Premium geometric square set.",
      de: "Premium geometrisches Set (Quadrat).",
    },
    images: img3("sets", "set-square"),
  },
  {
    id: "set-flower",
    category: "sets",
    tier: "premium",
    price: 50,
    name: { en: "Flower Set", de: "Set Flor" },
    description: {
      en: "Premium flower-themed set.",
      de: "Premium Set mit Blumenmotiv.",
    },
    images: img3("sets", "set-flower"),
  },

  // =========================
  // SETS — CASUAL
  // =========================
  {
    id: "set-chakana",
    category: "sets",
    tier: "casual",
    price: 54,
    name: { en: "Chakana Set", de: "Set Chakana" },
    description: {
      en: "Casual set inspired by Andean Chakana symbolism.",
      de: "Casual Set inspiriert von der Chakana-Symbolik.",
    },
    images: img3("sets", "set-chakana"),
  },
  {
    id: "set-starfish",
    category: "sets",
    tier: "casual",
    price: 38,
    name: { en: "Starfish Set", de: "Set Starfish" },
    description: {
      en: "Casual starfish-themed set.",
      de: "Casual Set mit Seestern-Motiv.",
    },
    images: img3("sets", "set-starfish"),
  },
  {
    id: "set-fan",
    category: "sets",
    tier: "casual",
    price: 45,
    name: { en: "Fan Set", de: "Set Abanico" },
    description: {
      en: "Casual fan-inspired set.",
      de: "Casual Set inspiriert von einem Fächer.",
    },
    images: img3("sets", "set-fan"),
  },
  {
    id: "set-rosette",
    category: "sets",
    tier: "casual",
    price: 35,
    name: { en: "Rosette Set", de: "Set Roseta" },
    description: {
      en: "Casual rosette-inspired set.",
      de: "Casual Set im Rosettenstil.",
    },
    images: img3("sets", "set-rosette"),
  },
  {
    id: "set-sunflower",
    category: "sets",
    tier: "casual",
    price: 45,
    name: { en: "Sunflower Set", de: "Set Girasol" },
    description: {
      en: "Casual sunflower-themed set.",
      de: "Casual Set mit Sonnenblumenmotiv.",
    },
    images: img3("sets", "set-sunflower"),
  },
  {
    id: "set-temptation",
    category: "sets",
    tier: "casual",
    price: 45,
    name: { en: "Temptation Set", de: "Set Tentación" },
    description: {
      en: "Casual set with elegant details.",
      de: "Casual Set mit eleganten Details.",
    },
    images: img3("sets", "set-temptation"),
  },
  {
    id: "set-seashell",
    category: "sets",
    tier: "casual",
    price: 30,
    name: { en: "Seashell Set", de: "Set Seashell" },
    description: {
      en: "Casual seashell-inspired set.",
      de: "Casual Set mit Muschel-Design.",
    },
    images: img3("sets", "set-seashell"),
  },
  {
    id: "set-butterfly-casual",
    category: "sets",
    tier: "casual",
    price: 35,
    name: { en: "Butterfly Set (Casual)", de: "Set Mariposa (Casual)" },
    description: {
      en: "Casual butterfly set in 950 silver.",
      de: "Casual Schmetterlings-Set aus 950er Silber.",
    },
    images: img3("sets", "set-butterfly-casual"),
  },
  // duplicates you listed (2): we create separate IDs so you can upload distinct photos
  {
    id: "set-rosca-1",
    category: "sets",
    tier: "casual",
    price: 45,
    name: { en: "Rosca Set (1)", de: "Set Rosca (1)" },
    description: { en: "Casual rosca set.", de: "Casual Rosca-Set." },
    images: img3("sets", "set-rosca-1"),
  },
  {
    id: "set-rosca-2",
    category: "sets",
    tier: "casual",
    price: 45,
    name: { en: "Rosca Set (2)", de: "Set Rosca (2)" },
    description: { en: "Casual rosca set.", de: "Casual Rosca-Set." },
    images: img3("sets", "set-rosca-2"),
  },
  {
    id: "set-flower-stud-1",
    category: "sets",
    tier: "casual",
    price: 45,
    name: { en: "Flower Stud Set (1)", de: "Set Flor Pegada (1)" },
    description: { en: "Casual flower stud set.", de: "Casual Set mit Blumensteckern." },
    images: img3("sets", "set-flower-stud-1"),
  },
  {
    id: "set-flower-stud-2",
    category: "sets",
    tier: "casual",
    price: 45,
    name: { en: "Flower Stud Set (2)", de: "Set Flor Pegada (2)" },
    description: { en: "Casual flower stud set.", de: "Casual Set mit Blumensteckern." },
    images: img3("sets", "set-flower-stud-2"),
  },
  {
    id: "set-hanging-rosette-1",
    category: "sets",
    tier: "casual",
    price: 35,
    name: { en: "Hanging Rosette Set (1)", de: "Set Rosquita Colgada (1)" },
    description: { en: "Casual hanging rosette set.", de: "Casual hängendes Rosetten-Set." },
    images: img3("sets", "set-hanging-rosette-1"),
  },
  {
    id: "set-hanging-rosette-2",
    category: "sets",
    tier: "casual",
    price: 35,
    name: { en: "Hanging Rosette Set (2)", de: "Set Rosquita Colgada (2)" },
    description: { en: "Casual hanging rosette set.", de: "Casual hängendes Rosetten-Set." },
    images: img3("sets", "set-hanging-rosette-2"),
  },
  {
    id: "set-stud-rosette",
    category: "sets",
    tier: "casual",
    price: 35,
    name: { en: "Stud Rosette Set", de: "Set Rosquita Pegada" },
    description: { en: "Casual stud rosette set.", de: "Casual Rosettenstecker-Set." },
    images: img3("sets", "set-stud-rosette"),
  },
  {
    id: "set-rapunzel",
    category: "sets",
    tier: "casual",
    price: 45,
    name: { en: "Rapunzel Set", de: "Set Rapunzel" },
    description: { en: "Casual Rapunzel-inspired set.", de: "Casual Set (Rapunzel-Stil)." },
    images: img3("sets", "set-rapunzel"),
  },
  {
    id: "set-compass",
    category: "sets",
    tier: "casual",
    price: 30,
    name: { en: "Compass Set", de: "Set Compas" },
    description: { en: "Casual compass-inspired set.", de: "Casual Set (Kompass-Stil)." },
    images: img3("sets", "set-compass"),
  },
  {
    id: "set-clover",
    category: "sets",
    tier: "casual",
    price: 35,
    name: { en: "Clover Set", de: "Set Trebol" },
    description: { en: "Casual clover set.", de: "Casual Kleeblatt-Set." },
    images: img3("sets", "set-clover"),
  },
  {
    id: "set-pearl",
    category: "sets",
    tier: "casual",
    price: 35,
    name: { en: "Pearl Set", de: "Set Perla" },
    description: { en: "Casual pearl detail set.", de: "Casual Set mit Perlendetail." },
    images: img3("sets", "set-pearl"),
  },

  // =========================
  // BRACELETS
  // =========================
  {
    id: "bracelet-infinity",
    category: "bracelets",
    price: 40,
    name: { en: "Infinity Bracelet", de: "Armband Infinito" },
    description: { en: "950 silver infinity bracelet.", de: "950er Silberarmband mit Infinity-Symbol." },
    images: img3("bracelets", "bracelet-infinity"),
  },
  {
    id: "bracelet-flower",
    category: "bracelets",
    price: 40,
    name: { en: "Flower Bracelet", de: "Armband Flor" },
    description: { en: "950 silver flower bracelet.", de: "950er Silberarmband mit Blumenmotiv." },
    images: img3("bracelets", "bracelet-flower"),
  },
  {
    id: "bracelet-twisted",
    category: "bracelets",
    price: 40,
    name: { en: "Twisted Bracelet", de: "Armband Enroscada" },
    description: { en: "Twisted 950 silver bracelet.", de: "Gedrehtes 950er Silberarmband." },
    images: img3("bracelets", "bracelet-twisted"),
  },
  {
    id: "bracelet-quartz",
    category: "bracelets",
    price: 35,
    name: { en: "Quartz Bracelet", de: "Armband Cuarzo" },
    description: { en: "950 silver bracelet with quartz detail.", de: "950er Silberarmband mit Quarzdetail." },
    images: img3("bracelets", "bracelet-quartz"),
  },

  // =========================
  // EARRINGS
  // =========================
  {
    id: "earrings-llanta",
    category: "earrings",
    price: 45,
    name: { en: "Llanta Earrings", de: "Ohrringe Llanta" },
    description: { en: "950 silver earrings.", de: "Ohrringe aus 950er Silber." },
    images: img3("earrings", "earrings-llanta"),
  },
  {
    id: "earrings-twist-grand-hoops",
    category: "earrings",
    price: 75,
    name: { en: "Twist Grand Hoops", de: "Ohrringe Twist Grande Hoops" },
    description: { en: "Statement hoops in 950 silver.", de: "Statement-Creolen aus 950er Silber." },
    images: img3("earrings", "earrings-twist-grand-hoops"),
  },
  {
    id: "earrings-twelve-rings-hoops",
    category: "earrings",
    price: 40,
    name: { en: "Twelve Rings Hoops", de: "Ohrringe Aros Twelve Rings" },
    description: { en: "Hoops with layered ring detail.", de: "Creolen mit Ring-Detail." },
    images: img3("earrings", "earrings-twelve-rings-hoops"),
  },
  {
    id: "earrings-tron",
    category: "earrings",
    price: 40,
    name: { en: "Tron Earrings", de: "Ohrringe Tron" },
    description: { en: "950 silver earrings.", de: "Ohrringe aus 950er Silber." },
    images: img3("earrings", "earrings-tron"),
  },
  {
    id: "earrings-minimal-beaded-hoop-25",
    category: "earrings",
    price: 38,
    name: { en: "Minimal Beaded Hoops (2.5)", de: "Minimal Beaded Hoops (2.5)" },
    description: { en: "Minimal beaded hoops in 950 silver.", de: "Minimalistische Perlen-Creolen aus 950er Silber." },
    images: img3("earrings", "earrings-minimal-beaded-hoop-25"),
  },
  {
    id: "earrings-minimal-beaded-hoop-15",
    category: "earrings",
    price: 34,
    name: { en: "Minimal Beaded Hoops (1.5)", de: "Minimal Beaded Hoops (1.5)" },
    description: { en: "Smaller beaded hoops in 950 silver.", de: "Kleinere Perlen-Creolen aus 950er Silber." },
    images: img3("earrings", "earrings-minimal-beaded-hoop-15"),
  },
  {
    id: "earrings-andean-stone",
    category: "earrings",
    price: 50,
    name: { en: "Andean Stone Earrings", de: "Ohrringe Piedra Andina" },
    description: { en: "950 silver earrings with stone detail.", de: "950er Silberohrringe mit Steindetail." },
    images: img3("earrings", "earrings-andean-stone"),
  },
  {
    id: "earrings-drop",
    category: "earrings",
    price: 35,
    name: { en: "Drop Earrings", de: "Ohrringe Gota" },
    description: { en: "Classic drop shape in 950 silver.", de: "Klassische Tropfenform aus 950er Silber." },
    images: img3("earrings", "earrings-drop"),
  },
  {
    id: "earrings-feather",
    category: "earrings",
    price: 35,
    name: { en: "Feather Earrings", de: "Ohrringe Pluma" },
    description: { en: "Feather motif in 950 silver.", de: "Feder-Motiv aus 950er Silber." },
    images: img3("earrings", "earrings-feather"),
  },
  {
    id: "earrings-drop-20",
    category: "earrings",
    price: 35,
    name: { en: "Drop Earrings 2.0", de: "Ohrringe Gota 2.0" },
    description: { en: "Updated drop design in 950 silver.", de: "Modernes Tropfen-Design aus 950er Silber." },
    images: img3("earrings", "earrings-drop-20"),
  },
  {
    id: "earrings-butterfly-de",
    category: "earrings",
    price: 40,
    name: { en: "Butterfly Earrings", de: "Ohrringe Schmetterling" },
    description: { en: "Butterfly motif in 950 silver.", de: "Schmetterlingsmotiv aus 950er Silber." },
    images: img3("earrings", "earrings-butterfly-de"),
  },
  {
    id: "earrings-sun-hoops",
    category: "earrings",
    price: 30,
    name: { en: "Sun Hoops", de: "Ohrringe Aros Sol" },
    description: { en: "Sun-inspired hoops in 950 silver.", de: "Sonnen-inspirierte Creolen aus 950er Silber." },
    images: img3("earrings", "earrings-sun-hoops"),
  },
  {
    id: "earrings-elsa",
    category: "earrings",
    price: 30,
    name: { en: "Elsa Earrings", de: "Ohrringe Elsa" },
    description: { en: "950 silver earrings.", de: "Ohrringe aus 950er Silber." },
    images: img3("earrings", "earrings-elsa"),
  },
  {
    id: "earrings-caribbean",
    category: "earrings",
    price: 30,
    name: { en: "Caribbean Earrings", de: "Ohrringe Caribe" },
    description: { en: "Light everyday earrings in 950 silver.", de: "Leichte Alltags-Ohrringe aus 950er Silber." },
    images: img3("earrings", "earrings-caribbean"),
  },
  {
    id: "earrings-mini-1",
    category: "earrings",
    price: 25,
    name: { en: "Mini Earrings (1)", de: "Kleine Ohrringe (1)" },
    description: { en: "Small everyday earrings in 950 silver.", de: "Kleine Alltags-Ohrringe aus 950er Silber." },
    images: img3("earrings", "earrings-mini-1"),
  },
  {
    id: "earrings-unnamed-1",
    category: "earrings",
    price: 25,
    name: { en: "Unnamed Earrings (1)", de: "Ohrringe (ohne Name) (1)" },
    description: { en: "950 silver earrings.", de: "Ohrringe aus 950er Silber." },
    images: img3("earrings", "earrings-unnamed-1"),
  },
  {
    id: "earrings-unnamed-2",
    category: "earrings",
    price: 25,
    name: { en: "Unnamed Earrings (2)", de: "Ohrringe (ohne Name) (2)" },
    description: { en: "950 silver earrings.", de: "Ohrringe aus 950er Silber." },
    images: img3("earrings", "earrings-unnamed-2"),
  },
  {
    id: "earrings-mandala",
    category: "earrings",
    price: 25,
    name: { en: "Mandala Earrings", de: "Ohrringe Mandala" },
    description: { en: "Mandala motif in 950 silver.", de: "Mandala-Motiv aus 950er Silber." },
    images: img3("earrings", "earrings-mandala"),
  },
  {
    id: "earrings-butterfly-mini",
    category: "earrings",
    price: 25,
    name: { en: "Butterfly Earrings (Mini)", de: "Ohrringe Mariposa" },
    description: { en: "Butterfly motif in 950 silver.", de: "Schmetterlingsmotiv aus 950er Silber." },
    images: img3("earrings", "earrings-butterfly-mini"),
  },
  {
    id: "earrings-geometry",
    category: "earrings",
    price: 25,
    name: { en: "Geometry Earrings", de: "Ohrringe Geometry" },
    description: { en: "Geometric design in 950 silver.", de: "Geometrisches Design aus 950er Silber." },
    images: img3("earrings", "earrings-geometry"),
  },
  {
    id: "earrings-rosette",
    category: "earrings",
    price: 35,
    name: { en: "Rosette Earrings", de: "Ohrringe Roseta" },
    description: { en: "Rosette design in 950 silver.", de: "Rosetten-Design aus 950er Silber." },
    images: img3("earrings", "earrings-rosette"),
  },
  {
    id: "earrings-leaf",
    category: "earrings",
    price: 35,
    name: { en: "Leaf Earrings", de: "Ohrringe Hoja" },
    description: { en: "Leaf motif in 950 silver.", de: "Blattmotiv aus 950er Silber." },
    images: img3("earrings", "earrings-leaf"),
  },

  // =========================
  // NECKLACES / CHAINS
  // =========================
  {
    id: "chain-rolo",
    category: "necklaces",
    price: 35,
    name: { en: "Rolo Chain", de: "Kette Rolo" },
    description: { en: "Rolo chain in 950 silver.", de: "Rolo-Kette aus 950er Silber." },
    images: img3("necklaces", "chain-rolo"),
  },
  {
    id: "chain-fine",
    category: "necklaces",
    price: 40,
    name: { en: "Fine Chain", de: "Kette Fina" },
    description: { en: "Fine chain in 950 silver.", de: "Feine Kette aus 950er Silber." },
    images: img3("necklaces", "chain-fine"),
  },
  {
    id: "chain-1",
    category: "necklaces",
    price: 35,
    name: { en: "Chain 1", de: "Kette 1" },
    description: { en: "950 silver chain.", de: "950er Silberkette." },
    images: img3("necklaces", "chain-1"),
  },
  {
    id: "chain-2",
    category: "necklaces",
    price: 30,
    name: { en: "Chain 2", de: "Kette 2" },
    description: { en: "950 silver chain.", de: "950er Silberkette." },
    images: img3("necklaces", "chain-2"),
  },
  {
    id: "chain-thick",
    category: "necklaces",
    price: 55,
    name: { en: "Thick Chain", de: "Kette Gruesa" },
    description: { en: "Thicker 950 silver chain.", de: "Dicke 950er Silberkette." },
    images: img3("necklaces", "chain-thick"),
  },
  {
    id: "chain-long-stitch",
    category: "necklaces",
    price: 40,
    name: { en: "Long Link Chain", de: "Kette Punto Largo" },
    description: { en: "Long link chain in 950 silver.", de: "Kette mit langen Gliedern aus 950er Silber." },
    images: img3("necklaces", "chain-long-stitch"),
  },
  {
    id: "chain-short-stitch",
    category: "necklaces",
    price: 35,
    name: { en: "Short Link Chain", de: "Kette Punto Corto" },
    description: { en: "Short link chain in 950 silver.", de: "Kette mit kurzen Gliedern aus 950er Silber." },
    images: img3("necklaces", "chain-short-stitch"),
  },

  // =========================
  // PENDANTS (DIJES)
  // =========================
  {
    id: "pendant-snail",
    category: "pendants",
    price: 20,
    name: { en: "Snail Pendant", de: "Anhänger Caracol" },
    description: { en: "Snail pendant in 950 silver.", de: "Schnecken-Anhänger aus 950er Silber." },
    images: img3("pendants", "pendant-snail"),
  },
  {
    id: "pendant-dog-paw",
    category: "pendants",
    price: 25,
    name: { en: "Dog Paw Pendant", de: "Anhänger Huella de Perro" },
    description: { en: "Dog paw pendant in 950 silver.", de: "Pfoten-Anhänger aus 950er Silber." },
    images: img3("pendants", "pendant-dog-paw"),
  },
  // tumi (2)
  {
    id: "pendant-tumi-1",
    category: "pendants",
    price: 25,
    name: { en: "Tumi Pendant (1)", de: "Anhänger Tumi (1)" },
    description: { en: "Iconic Tumi symbol in 950 silver.", de: "Ikonisches Tumi-Symbol aus 950er Silber." },
    images: img3("pendants", "pendant-tumi-1"),
  },
  {
    id: "pendant-tumi-2",
    category: "pendants",
    price: 25,
    name: { en: "Tumi Pendant (2)", de: "Anhänger Tumi (2)" },
    description: { en: "Iconic Tumi symbol in 950 silver.", de: "Ikonisches Tumi-Symbol aus 950er Silber." },
    images: img3("pendants", "pendant-tumi-2"),
  },
  {
    id: "pendant-clover",
    category: "pendants",
    price: 20,
    name: { en: "Clover Pendant", de: "Anhänger Trebol" },
    description: { en: "Clover pendant in 950 silver.", de: "Kleeblatt-Anhänger aus 950er Silber." },
    images: img3("pendants", "pendant-clover"),
  },
  {
    id: "pendant-zircon",
    category: "pendants",
    price: 17,
    name: { en: "Zircon Pendant", de: "Anhänger Zirconio" },
    description: { en: "Zircon detail pendant in 950 silver.", de: "Anhänger mit Zirkon-Detail aus 950er Silber." },
    images: img3("pendants", "pendant-zircon"),
  },
  {
    id: "pendant-justice",
    category: "pendants",
    price: 25,
    name: { en: "Justice Pendant", de: "Anhänger Justicia" },
    description: { en: "Justice motif in 950 silver.", de: "Gerechtigkeitsmotiv aus 950er Silber." },
    images: img3("pendants", "pendant-justice"),
  },
  // dije peruano (5)
  {
    id: "pendant-peru-1",
    category: "pendants",
    price: 35,
    name: { en: "Peru Pendant (1)", de: "Anhänger Peru (1)" },
    description: { en: "Peru-inspired pendant in 950 silver.", de: "Peru-inspirierter Anhänger aus 950er Silber." },
    images: img3("pendants", "pendant-peru-1"),
  },
  {
    id: "pendant-peru-2",
    category: "pendants",
    price: 35,
    name: { en: "Peru Pendant (2)", de: "Anhänger Peru (2)" },
    description: { en: "Peru-inspired pendant in 950 silver.", de: "Peru-inspirierter Anhänger aus 950er Silber." },
    images: img3("pendants", "pendant-peru-2"),
  },
  {
    id: "pendant-peru-3",
    category: "pendants",
    price: 35,
    name: { en: "Peru Pendant (3)", de: "Anhänger Peru (3)" },
    description: { en: "Peru-inspired pendant in 950 silver.", de: "Peru-inspirierter Anhänger aus 950er Silber." },
    images: img3("pendants", "pendant-peru-3"),
  },
  {
    id: "pendant-peru-4",
    category: "pendants",
    price: 35,
    name: { en: "Peru Pendant (4)", de: "Anhänger Peru (4)" },
    description: { en: "Peru-inspired pendant in 950 silver.", de: "Peru-inspirierter Anhänger aus 950er Silber." },
    images: img3("pendants", "pendant-peru-4"),
  },
  {
    id: "pendant-peru-5",
    category: "pendants",
    price: 35,
    name: { en: "Peru Pendant (5)", de: "Anhänger Peru (5)" },
    description: { en: "Peru-inspired pendant in 950 silver.", de: "Peru-inspirierter Anhänger aus 950er Silber." },
    images: img3("pendants", "pendant-peru-5"),
  },

  {
  id: "bracelet-infinito",
  category: "bracelets",
  price: 40,
  name: { de: "Infinito", en: "Infinity" },
  description: {
    de: "Armband aus 950er Silber, handgefertigt in Peru.",
    en: "950 silver bracelet, handmade in Peru.",
  },
  images: ["/images/bracelets/infinito/infinito1.png"],
},
{
  id: "bracelet-flor",
  category: "bracelets",
  price: 40,
  name: { de: "Flor", en: "Flower" },
  description: {
    de: "Armband aus 950er Silber, handgefertigt in Peru.",
    en: "950 silver bracelet, handmade in Peru.",
  },
  images: ["/images/braceletes/flor/flor1.png"],
},
{
  id: "bracelet-enroscada",
  category: "bracelets",
  price: 40,
  name: { de: "Enroscada", en: "Twisted" },
  description: {
    de: "Armband aus 950er Silber, handgefertigt in Peru.",
    en: "950 silver bracelet, handmade in Peru.",
  },
  images: ["/images/bracelets/enroscada/enroscada1.png"],
},
{
  id: "bracelet-cuarzo",
  category: "bracelets",
  price: 35,
  name: { de: "Cuarzo", en: "Quartz" },
  description: {
    de: "Armband aus 950er Silber, handgefertigt in Peru.",
    en: "950 silver bracelet, handmade in Peru.",
  },
  images: ["/images/bracelets/cuarzo/cuarzo1.png"],
},
];

