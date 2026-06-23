// lib/getMenu.js
// Columnas en Google Sheets (fila 1 = encabezados):
// categoria | nombre | descripcion | precio | disponible | imagen_url | destacado

export async function getMenuData() {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;

  if (SHEET_ID) {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error("Sheet error");
      const csv = await res.text();
      const parsed = parseCSV(csv);
      if (parsed.length > 0) return parsed;
    } catch (e) {
      console.error("Google Sheets fetch failed:", e.message);
    }
  }

  return getFallbackData();
}

function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  return lines
    .slice(1)
    .map((line) => {
      const cols = splitCSVLine(line);
      const clean = (i) => (cols[i] || "").replace(/^"|"$/g, "").trim();
      return {
        categoria:   clean(0),
        nombre:      clean(1),
        descripcion: clean(2),
        precio:      parseFloat(clean(3)) || 0,
        disponible:  clean(4).toLowerCase() !== "no",
        imagen_url:  clean(5),
        destacado:   clean(6).toLowerCase() === "si",
      };
    })
    .filter((i) => i.nombre && i.disponible);
}

function splitCSVLine(line) {
  const result = [];
  let cur = "", inQ = false;
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; }
    else if (ch === "," && !inQ) { result.push(cur); cur = ""; }
    else { cur += ch; }
  }
  result.push(cur);
  return result;
}

const IMG = {
  latte:      "https://images.unsplash.com/photo-1426174840074-541ae41efdb9?w=600&h=600&fit=crop&q=80",
  lattePlus:  "https://images.unsplash.com/photo-1758900450186-e829f72d25fb?w=600&h=600&fit=crop&q=80",
  matcha:     "https://images.unsplash.com/photo-1560148196-df61132466ce?w=600&h=600&fit=crop&q=80",
  greenLatte: "https://images.unsplash.com/photo-1758417675743-0c97ae21e2ec?w=600&h=600&fit=crop&q=80",
  toast:      "https://images.unsplash.com/photo-1761027101409-fa96d88349c7?w=600&h=600&fit=crop&q=80",
  bowl:       "https://images.unsplash.com/photo-1725883691833-97103ecd582a?w=600&h=600&fit=crop&q=80",
  croissant:  "https://images.unsplash.com/photo-1623334044303-241021148842?w=600&h=600&fit=crop&q=80",
};

function getFallbackData() {
  return [
    // ── Cafés ──────────────────────────────────────────────
    { categoria: "Cafés", nombre: "Espresso", descripcion: "Nuestro blend de origen único, 18g extraídos en 28 segundos. Intenso, con retrogusto de cacao amargo y una acidez cítrica limpia que te despierta de verdad.", precio: 1500, disponible: true, imagen_url: IMG.latte, destacado: false },
    { categoria: "Cafés", nombre: "Latte de avena", descripcion: "Doble espresso con leche de avena texturizada al vapor. Cremoso sin ser pesado. Lo pedirás todos los días.", precio: 2200, disponible: true, imagen_url: IMG.lattePlus, destacado: true },
    { categoria: "Cafés", nombre: "Cold Brew de 18h", descripcion: "Infusión en frío durante 18 horas con agua filtrada. Concentrado, bajo en acidez, con notas de nuez y chocolate oscuro. Sobre hielo con un chorrito de leche de coco.", precio: 2600, disponible: true, imagen_url: IMG.latte, destacado: true },
    { categoria: "Cafés", nombre: "Cortado con canela", descripcion: "Espresso con un splash de leche entera y canela de Ceilán recién rallada. Simple, equilibrado y reconfortante.", precio: 1800, disponible: true, imagen_url: IMG.lattePlus, destacado: false },
    { categoria: "Cafés", nombre: "Cappuccino clásico", descripcion: "Partes iguales de espresso, leche vaporizada y espuma seca. Arte latte de temporada. Podés elegir leche entera, de avena o de almendras.", precio: 2000, disponible: true, imagen_url: IMG.latte, destacado: false },

    // ── Matcha & Especiales ────────────────────────────────
    { categoria: "Especiales", nombre: "Matcha latte", descripcion: "Matcha ceremonial de Uji batido con agua caliente a 75°C y leche de avena fría. Color verde vibrante, sabor vegetal y cremoso. Caliente o frío.", precio: 2800, disponible: true, imagen_url: IMG.matcha, destacado: true },
    { categoria: "Especiales", nombre: "Cúrcuma latte", descripcion: "Golden milk con cúrcuma fresca, jengibre, pimienta negra y leche de almendras. Antiinflamatorio, especiado y muy reconfortante.", precio: 2600, disponible: true, imagen_url: IMG.greenLatte, destacado: false },
    { categoria: "Especiales", nombre: "Hojicha con miel", descripcion: "Té verde japonés tostado que se prepara como un latte. Terroso, suavemente ahumado, con miel silvestre y leche de avena.", precio: 2500, disponible: true, imagen_url: IMG.matcha, destacado: false },
    { categoria: "Especiales", nombre: "Limonada de rosas", descripcion: "Limón prensado al momento, agua de rosas, stevia y agua con gas. Floral, refrescante y completamente rosada.", precio: 2200, disponible: true, imagen_url: IMG.greenLatte, destacado: true },

    // ── Tostados & Bowls ───────────────────────────────────
    { categoria: "Para comer", nombre: "Tostado de ricota y miel", descripcion: "Sourdough artesanal tostado, ricota batida con ralladura de limón, miel de flores y tomillo fresco. Lo mejor del menú para el desayuno.", precio: 2800, disponible: true, imagen_url: IMG.toast, destacado: true },
    { categoria: "Para comer", nombre: "Smash de palta", descripcion: "Pan de masa madre, palta prensada con aceite de oliva y sal de mar, tomates cherry asados, semillas de sésamo negro y hojitas de cilantro. Con o sin huevo poché.", precio: 3200, disponible: true, imagen_url: IMG.toast, destacado: false },
    { categoria: "Para comer", nombre: "Bowl açaí", descripcion: "Base de açaí con banana y leche de coco, granola de avena y miel, frutos rojos frescos, chips de coco y un hilo de mantequilla de maní. Frío y nutritivo.", precio: 3500, disponible: true, imagen_url: IMG.bowl, destacado: true },
    { categoria: "Para comer", nombre: "Granola bowl", descripcion: "Yogur griego natural de producción local, granola con nueces y arándanos, fruta de estación y miel. Liviano, ácido y satisfactorio.", precio: 2900, disponible: true, imagen_url: IMG.bowl, destacado: false },

    // ── Repostería ─────────────────────────────────────────
    { categoria: "Dulce", nombre: "Croissant de manteca", descripcion: "72 horas de fermentación, 27 capas de masa laminada. Horneado fresco a las 7 AM. Crocante afuera, alveolado y mantecoso adentro. El mejor de la ciudad, lo decimos en serio.", precio: 1600, disponible: true, imagen_url: IMG.croissant, destacado: false },
    { categoria: "Dulce", nombre: "Cookie de tahini", descripcion: "Cookie grande y blanda con tahini, chocolate oscuro picado y fleur de sel. Sin gluten. Receta de la abuela siria de nuestra pastelera.", precio: 1400, disponible: true, imagen_url: IMG.croissant, destacado: true },
    { categoria: "Dulce", nombre: "Tarta de limón y lavanda", descripcion: "Base sablée de almendras, crema de limón de Sicilia y merengue italiano perfumado con lavanda. De edición limitada — cuando se acaba, se acaba.", precio: 2400, disponible: true, imagen_url: IMG.lattePlus, destacado: true },
    { categoria: "Dulce", nombre: "Banana bread", descripcion: "Húmedo, especiado con cardamomo y ralladura de naranja. Tibio y con un trozo de mantequilla de calidad. El abrazo que necesitás a las 4 PM.", precio: 1800, disponible: true, imagen_url: IMG.croissant, destacado: false },
  ];
}
