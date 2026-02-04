export type Category =
  | "earrings"
  | "sets"
  | "pendants"
  | "bracelets"
  | "necklaces"
  | "rings";

export type Product = {
  id: string;
  name: { en: string; de: string };
  price: number;
  category: Category;
  description: { en: string; de: string };
  images: string[];
};

function slug(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-");
}

function images(category: Category, name: string) {
  const s = slug(name);
  return [
    `/images/${category}/${s}/${s}1.png`,
    `/images/${category}/${s}/${s}2.png`,
    `/images/${category}/${s}/${s}3.png`,
  ];
}

function make(
  category: Category,
  name: string,
  price: number
): Product {
  return {
    id: slug(name),
    category,
    price,
    name: { en: name, de: name },
    description: {
      en: "Hand-finished 950 Peruvian silver. Limited piece.",
      de: "Handgefertigtes 950er peruanisches Silber. Limitiertes Stück.",
    },
    images: images(category, name),
  };
}

export const products: Product[] = [

  // ======================
  // EARRINGS (Aretes)
  // ======================
  make("earrings", "Piedra Andina", 50),
  make("earrings", "Feather", 35),
  make("earrings", "Geometry", 25),
  make("earrings", "Cross Weave", 45),
  make("earrings", "Flower", 40),
  make("earrings", "Mandala", 25),
  make("earrings", "Leaf", 35),
  make("earrings", "Petal", 35),
  make("earrings", "Nieve", 25),
  make("earrings", "Durazno", 25),
  make("earrings", "Mariposa Mini", 25),
  make("earrings", "Mariposa", 35),

  // ======================
  // HOOPS & STUDS (still earrings)
  // ======================
  make("earrings", "Twist Hoops", 40),
  make("earrings", "Wheel Hoops", 40),
  make("earrings", "Granule Hoops 1.5", 34),
  make("earrings", "Sun Bloom Hoops", 35),
  make("earrings", "Luna Studs", 35),
  make("earrings", "Twist Grand Hoops", 75),
  make("earrings", "Granule Hoops 2.5", 38),
  make("earrings", "Gota", 35),

  // ======================
  // CASUAL SETS
  // ======================
  make("sets", "Daisy Pearl", 45),
  make("sets", "Twisted Pearl", 40),
  make("sets", "Classic Pearl", 40),
  make("sets", "Clover", 35),
  make("sets", "Fan", 45),
  make("sets", "Shell Pearl", 30),
  make("sets", "Sun Pearl", 45),
  make("sets", "Lotus", 35),
  make("sets", "Rope Pearl", 45),
  make("sets", "Clover Bloom", 35),
  make("sets", "Pearl Blossom", 40),
  make("sets", "Starfish", 38),

  // ======================
  // FORMAL SETS
  // ======================
  make("sets", "Set Diana", 60),
  make("sets", "Set Cereza", 50),
  make("sets", "Set Mariposa", 50),
  make("sets", "Set Arcoiris", 54),
  make("sets", "Set Rosa Pastel", 54),
  make("sets", "Set Cuadrado", 50),
  make("sets", "Set Flor", 50),
  make("sets", "Set Chacana", 54),
  make("sets", "Set Corazon", 50),

  // ======================
  // PERUVIAN PENDANTS
  // ======================
  make("pendants", "Peru Rojo", 35),
  make("pendants", "Peru Corazon", 35),
  make("pendants", "Mapa", 35),
  make("pendants", "Tumi", 35),
  make("pendants", "Escudo", 35),

  // ======================
  // PENDANTS (charms)
  // ======================
  make("pendants", "Caracol", 20),
  make("pendants", "Huella de Perro", 25),
  make("pendants", "Trebol", 20),
  make("pendants", "Zirconio", 17),
  make("pendants", "Justicia", 25),

  // ======================
  // RINGS
  // ======================
  make("rings", "Whale Tail", 25),
  make("rings", "Butterfly", 25),
  make("rings", "Twin Crystal", 25),
  make("rings", "Serpent", 25),
  make("rings", "Ocean Flow", 42),
  make("rings", "Mask", 42),
  make("rings", "Feather Bold", 42),
  make("rings", "Classic", 27),
  make("rings", "Layered Bold", 40),
  make("rings", "Droplet", 37),
  make("rings", "Ruby", 95),
  make("rings", "Starry Path", 42),

  // ======================
  // BRACELETS
  // ======================
  make("bracelets", "Infinito", 40),
  make("bracelets", "Flor", 40),
  make("bracelets", "Enroscada", 40),
  make("bracelets", "Cuarzo", 35),

  // ======================
  // NECKLACES
  // ======================
  make("necklaces", "Fina", 35),
  make("necklaces", "Minima", 35),
  make("necklaces", "Punto Corto", 35),
  make("necklaces", "Punto Largo", 40),
  make("necklaces", "Rolo", 35),
  make("necklaces", "Serpent", 55),
  make("necklaces", "Casual", 35),
];
