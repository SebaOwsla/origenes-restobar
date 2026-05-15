import { useState, useMemo, useCallback } from "react";
import Navbar from "../components/Navbar";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

import comidaImg from "../assets/imagenes/IMG_9054-Mejorado-NR.jpg";
import postreImg from "../assets/imagenes/IMG_8938-Mejorado-NR.jpg";
import tragoImg from "../assets/imagenes/IMG_8882-Mejorado-NR.jpg";
import cervezaImg from "../assets/imagenes/IMG_8510-Mejorado-NR.jpg";
import cafeImg from "../assets/imagenes/IMG_8398-Mejorado-NR.jpg";
import imagenjugo from "../assets/imagenes/jugojumex.jpg";
import imagenebbida from "../assets/imagenes/imagenbeida.jpg";
import imagenaguagas from "../assets/imagenes/imagenaguagas.jpg";
import austral from "../assets/imagenes/austral.jpg";
import kutsman from "../assets/imagenes/kutsman.jpg";
import yagan from "../assets/imagenes/yagan.jpg";
import bock from "../assets/imagenes/bock.jpg";
import royal from "../assets/imagenes/royal.jpg";
import heineken from "../assets/imagenes/heinekjen.jpg";
import sol from "../assets/imagenes/sol.jpg";
import kutsman0 from "../assets/imagenes/kuts0.jpg";
import chelada from "../assets/imagenes/chelada.jpg";
import michelada from "../assets/imagenes/michelada.jpg";
import clavox from "../assets/imagenes/clavooxi.jpg";
import psicosour from "../assets/imagenes/piscosour.jpg";
import mojito from "../assets/imagenes/mojito.jpg";
import piñacoalda from "../assets/imagenes/piñacolada.jpg";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type TipoDia = "comida" | "tragos" | "cervezas";
type TipoNoche = "compartir" | "chorrillanas" | "mar" | "tablas" | "bebestibles" | "sour" | "cocteles" | "cervezas" | "destilados" | "cafeteria";

interface ProductoDia {
  id: number;
  nombre: string;
  descripcion?: string | null;
  precio: number | null;
  imagen: string;
  tipo: TipoDia;
  categoria: string;
}

interface ProductoNoche {
  id: number;
  nombre: string;
  descripcion?: string | null;
  precio: number | null;
  imagen: string;
  tipo: TipoNoche;
  categoria: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtCLP = (precio?: number | null): string => {
  if (!precio) return "";
  return precio.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
};

const groupBy = <T, K extends string>(arr: T[], keyFn: (t: T) => K): Record<K, T[]> => {
  const map = {} as Record<K, T[]>;
  for (const item of arr) {
    const k = keyFn(item);
    if (!map[k]) map[k] = [];
    map[k].push(item);
  }
  return map;
};

// 09:00 – 18:00 → restaurante día
// 18:01 – 07:00 → resto-bar noche
const getModoCarta = (h: number): "dia" | "noche" => {
  return h >= 9 && h <= 18 ? "dia" : "noche";
};

// ─── Datos carta DÍA (Restaurante Orígenes 09:00–18:00) ──────────────────────
const PRODUCTOS_DIA: ProductoDia[] = [
  {
    id: 11,
    nombre: "Cocina De Autor",
    descripcion: `ENTRADAS\n\nArancini al azafrán relleno de osobuco con salsa romesco — $13.500\n\nCrema Yin-Yang (dueto de cremas en base de gazpacho andaluz y crema de setas parisina) — $11.800\n\n\nPLATOS PRINCIPALES\n\nBonito ahumado a las brasas con puré cítrico, beurre blanc y crocante de tapioca con gajos de pomelo, lima y naranja — $18.900\n\nRagout de cordero cocinado a fuego lento en su salsa con gnocchis caseros de patata a la parmesana y hojas de perejil fresco — $21.500\n\n\nPOSTRES\n\nNuestro Volcán Protector San José 5880 — $6.500\n\nPavlova de berries en su salsa y helado de la casa — $5.900`,
    precio: null,
    imagen: comidaImg,
    tipo: "comida",
    categoria: "Cocina Del Autor",
  },
  { id: 1, nombre: "Menú Ejecutivo", descripcion: "Incluye: ensalada o consomé + plato principal (proteína y acompañamiento) + bebida, pan, pebre y acompañamiento.", precio: 9500, imagen: comidaImg, tipo: "comida", categoria: "Menú Ejecutivo" },
  { id: 2, nombre: "Ceviche tradicional montado a la peruana", descripcion: "Con nuestra leche de tigre Orígenes.", precio: 13800, imagen: comidaImg, tipo: "comida", categoria: "Para comenzar con frescura" },
  { id: 3, nombre: "Ceviche mixto de pescado y mariscos", descripcion: "Montado a la peruana con nuestra leche de tigre Orígenes.", precio: 14900, imagen: comidaImg, tipo: "comida", categoria: "Para comenzar con frescura" },
  { id: 4, nombre: "Mixto de locos en su verde y pulpo al oliva", precio: 17500, imagen: comidaImg, tipo: "comida", categoria: "Para comenzar con frescura" },
  { id: 5, nombre: "Bloody Mary", descripcion: "Cocktail frío de mariscos en zumo de tomates, aromatizado en especias, pimientas y un toque de vodka.", precio: 17800, imagen: comidaImg, tipo: "comida", categoria: "Para comenzar con frescura" },
  { id: 6, nombre: "Ostiones parmesana", descripcion: "Con un toque de Sauvignon Blanc.", precio: 17500, imagen: comidaImg, tipo: "comida", categoria: "Para comenzar con calidez" },
  { id: 7, nombre: "Camarones al pil-pil", descripcion: "Con cacho de cabra ahumado en greda de Pomaire.", precio: 13800, imagen: comidaImg, tipo: "comida", categoria: "Para comenzar con calidez" },
  { id: 8, nombre: "Chupe de jaiva", descripcion: "En base de bisquet con un toque del Elqui.", precio: 14900, imagen: comidaImg, tipo: "comida", categoria: "Para comenzar con calidez" },
  { id: 96, nombre: "Mar y tierra", descripcion: "Al ajillo con camarones, lomo y champiñones servido con tostadas caseras.", precio: 12500, imagen: comidaImg, tipo: "comida", categoria: "Para comenzar con calidez" },
  { id: 9, nombre: "Plateada a la campesina", descripcion: "Con reducción de Merlot y especias, acompañada con puré criollo.", precio: 17900, imagen: comidaImg, tipo: "comida", categoria: "Cocina chilena" },
  { id: 10, nombre: "Lomo a lo pobre tradicional", descripcion: "Con cebolla caramelizada, papas fritas y huevo frito.", precio: 19500, imagen: comidaImg, tipo: "comida", categoria: "Cocina chilena" },
  { id: 12, nombre: "Pastel de choclo", descripcion: "Casero en librillo (según temporada), acompañado de mini chilena.", precio: 13500, imagen: comidaImg, tipo: "comida", categoria: "Cocina chilena" },
  { id: 13, nombre: "Merluza austral frita", descripcion: "Con ensalada a la chilena y papas mayo.", precio: 15500, imagen: comidaImg, tipo: "comida", categoria: "Cocina chilena" },
  { id: 15, nombre: "Salmón con salsas", descripcion: "De mariscos a lo macho acompañado de arroz verde al cilantro.", precio: 18900, imagen: comidaImg, tipo: "comida", categoria: "Cocina internacional" },
  { id: 16, nombre: "Filete de res", descripcion: "En salsa Merlot acompañado de risotto atomatado y espárragos salteados.", precio: 22900, imagen: comidaImg, tipo: "comida", categoria: "Cocina internacional" },
  { id: 17, nombre: "Lomo saltado limeño", descripcion: "A la soya, aromatizado al jengibre, acompañado de papas fritas y arroz.", precio: 15500, imagen: comidaImg, tipo: "comida", categoria: "Cocina internacional" },
  { id: 18, nombre: "Pasta Orígenes casera", descripcion: "Ñoquis o fettuccini con salsa a elección (pesto, mechada al pomodoro o carbonara).", precio: 12300, imagen: comidaImg, tipo: "comida", categoria: "Cocina internacional" },
  { id: 19, nombre: "Paccheri", descripcion: "En salsa coral con mixto de mariscos, aceite verde y parmesano.", precio: 17500, imagen: comidaImg, tipo: "comida", categoria: "Cocina internacional" },
  { id: 20, nombre: "Dueto de fettuccinis", descripcion: "En salsa huancaína con lomo saltado a la peruana.", precio: 16900, imagen: comidaImg, tipo: "comida", categoria: "Cocina internacional" },
  { id: 21, nombre: "Fettuccini (peques)", descripcion: "En salsa alfredo con jamón o salsa pomodoro.", precio: 8900, imagen: comidaImg, tipo: "comida", categoria: "El rincón de los peques" },
  { id: 22, nombre: "Salchipapas caseras", precio: 7500, imagen: comidaImg, tipo: "comida", categoria: "El rincón de los peques" },
  { id: 23, nombre: "Filetitos de pollo apanados", descripcion: "Con papas fritas, puré o arroz.", precio: 8300, imagen: comidaImg, tipo: "comida", categoria: "El rincón de los peques" },
  { id: 24, nombre: "Humus tahine con vegetales salteados al oliva y pan pita", precio: 6800, imagen: comidaImg, tipo: "comida", categoria: "Del huerto a la mesa" },
  { id: 27, nombre: "Ensalada mixta de hojas verdes", descripcion: "Con tomate cherry y champiñones en dressing balsámico con queso de cabra.", precio: 8900, imagen: comidaImg, tipo: "comida", categoria: "Del huerto a la mesa" },
  { id: 28, nombre: "Ensalada César tradicional con pollo", descripcion: "Lechuga, aderezo, crutones, queso parmesano.", precio: 10900, imagen: comidaImg, tipo: "comida", categoria: "Del huerto a la mesa" },
  { id: 30, nombre: "Tiramisú (receta original de Venecia)", descripcion: "Con mascarpone y cacao amazónico.", precio: 5500, imagen: postreImg, tipo: "comida", categoria: "Un dulce final" },
  { id: 31, nombre: "Suspiro limeño tradicional", descripcion: "Con merengue al oport perfumado.", precio: 4800, imagen: postreImg, tipo: "comida", categoria: "Un dulce final" },
  { id: 34, nombre: "Crème brûlée", descripcion: "Caramelo crocante y frutillas borrachas al merlot.", precio: 6200, imagen: postreImg, tipo: "comida", categoria: "Un dulce final" },
  { id: 35, nombre: "Pie de limón Orígenes al vaso", descripcion: "Con pica y crumble de naranja.", precio: 5500, imagen: postreImg, tipo: "comida", categoria: "Un dulce final" },
  // Tragos día
  { id: 36, nombre: "Bebidas gaseosas", precio: 2900, imagen: imagenebbida, tipo: "tragos", categoria: "Líquidos bebestibles" },
  { id: 37, nombre: "Néctar Yumex sabores", precio: 3300, imagen: imagenjugo, tipo: "tragos", categoria: "Líquidos bebestibles" },
  { id: 38, nombre: "Jugo natural", precio: 4500, imagen: tragoImg, tipo: "tragos", categoria: "Líquidos bebestibles" },
  { id: 39, nombre: "Agua mineral (con y sin gas)", precio: 2500, imagen: imagenaguagas, tipo: "tragos", categoria: "Líquidos bebestibles" },
  { id: 40, nombre: "Limonada clásica", descripcion: "Con jugo de limón natural.", precio: 4300, imagen: tragoImg, tipo: "tragos", categoria: "Líquidos bebestibles" },
  { id: 41, nombre: "Limonada menta jengibre", precio: 4500, imagen: tragoImg, tipo: "tragos", categoria: "Líquidos bebestibles" },
  { id: 42, nombre: "Limonada frambuesa menta", precio: 4800, imagen: tragoImg, tipo: "tragos", categoria: "Líquidos bebestibles" },
  { id: 43, nombre: "Limonada con albahaca fresca", precio: 4500, imagen: tragoImg, tipo: "tragos", categoria: "Líquidos bebestibles" },
  { id: 44, nombre: "Pisco sour a la peruana", precio: 5200, imagen: psicosour, tipo: "tragos", categoria: "Aperitivos Sour" },
  { id: 45, nombre: "Mango sour", precio: 5500, imagen: tragoImg, tipo: "tragos", categoria: "Aperitivos Sour" },
  { id: 46, nombre: "Tropical sour", descripcion: "Mango – maracuyá.", precio: 5800, imagen: tragoImg, tipo: "tragos", categoria: "Aperitivos Sour" },
  { id: 47, nombre: "Maracuyá sour", precio: 5500, imagen: tragoImg, tipo: "tragos", categoria: "Aperitivos Sour" },
  { id: 48, nombre: "Sour menta jengibre", precio: 5500, imagen: tragoImg, tipo: "tragos", categoria: "Aperitivos Sour" },
  { id: 49, nombre: "Sour de frambuesa", precio: 5800, imagen: tragoImg, tipo: "tragos", categoria: "Aperitivos Sour" },
  { id: 50, nombre: "Sour Catedral (a elección)", descripcion: "Todos a solo $8.900.", precio: 8990, imagen: tragoImg, tipo: "tragos", categoria: "Aperitivos Sour" },
  { id: 51, nombre: "Daikiri", descripcion: "Tradicional, frambuesa o mango.", precio: 5200, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 52, nombre: "Tequila margarita", precio: 5800, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 53, nombre: "Tequila sunrise", precio: 5800, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 54, nombre: "Tequila margarita blue", precio: 6200, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 55, nombre: "Piña colada", precio: 5500, imagen: piñacoalda, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 56, nombre: "Mojito", descripcion: "Tradicional, mango, berries y blue.", precio: 6800, imagen: mojito, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 57, nombre: "Vodka tonic", precio: 6200, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 58, nombre: "Gin tonic", precio: 6200, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 59, nombre: "Clavo oxidado", precio: 6500, imagen: clavox, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 60, nombre: "Negroni de Florencia", precio: 6500, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 61, nombre: "Old fashion", precio: 6200, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 62, nombre: "Espresso martini", precio: 6200, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 63, nombre: "Baileys Irish Cream", precio: 6800, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 64, nombre: "Kir royal", precio: 6500, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 65, nombre: "Copa de espumante", precio: 5500, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 66, nombre: "Ramazzotti spritz", precio: 7200, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 67, nombre: "Aperol spritz", precio: 7200, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
  { id: 68, nombre: "Licor bitter araucano", precio: 3500, imagen: tragoImg, tipo: "tragos", categoria: "Bajativos" },
  { id: 69, nombre: "Fernet", precio: 4200, imagen: tragoImg, tipo: "tragos", categoria: "Bajativos" },
  { id: 70, nombre: "Amaretto", precio: 3600, imagen: tragoImg, tipo: "tragos", categoria: "Bajativos" },
  { id: 71, nombre: "Manzanilla", precio: 2600, imagen: tragoImg, tipo: "tragos", categoria: "Bajativos" },
  { id: 72, nombre: "Menta", precio: 2600, imagen: tragoImg, tipo: "tragos", categoria: "Bajativos" },
  { id: 73, nombre: "Té fina selección", precio: 2900, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 74, nombre: "Agua de hierbas e infusiones", precio: 2500, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 75, nombre: "Café americano", precio: 2900, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 76, nombre: "Café espresso", precio: 2600, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 77, nombre: "Café espresso doble", precio: 2900, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 78, nombre: "Café cortado", precio: 3200, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 79, nombre: "Café mocaccino", precio: 3500, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 80, nombre: "Café capuccino", precio: 3500, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 81, nombre: "Café irlandés", precio: 4200, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  { id: 82, nombre: "Chocolate caliente", descripcion: "Con marshmallow.", precio: 3500, imagen: cafeImg, tipo: "tragos", categoria: "Cafetería" },
  // Cervezas día
  { id: 83, nombre: "Austral Lager", precio: 5300, imagen: austral, tipo: "cervezas", categoria: "Cervezas" },
  { id: 84, nombre: "Kunstmann Lager", precio: 5300, imagen: kutsman, tipo: "cervezas", categoria: "Cervezas" },
  { id: 85, nombre: "Austral Yagan", precio: 5300, imagen: yagan, tipo: "cervezas", categoria: "Cervezas" },
  { id: 86, nombre: "Kunstmann Bock", precio: 5600, imagen: bock, tipo: "cervezas", categoria: "Cervezas" },
  { id: 87, nombre: "Royal Guard", precio: 4300, imagen: royal, tipo: "cervezas", categoria: "Cervezas" },
  { id: 88, nombre: "Heineken", precio: 4300, imagen: heineken, tipo: "cervezas", categoria: "Cervezas" },
  { id: 89, nombre: "Sol", precio: 4300, imagen: sol, tipo: "cervezas", categoria: "Cervezas" },
  { id: 90, nombre: "Kunstmann sin alcohol", precio: 5200, imagen: kutsman0, tipo: "cervezas", categoria: "Cervezas" },
  { id: 91, nombre: "Chelada", descripcion: "Cerveza, jugo de limón y sal.", precio: 4700, imagen: chelada, tipo: "cervezas", categoria: "Cervezas" },
  { id: 92, nombre: "Michelada", descripcion: "Cerveza, jugo de limón, tabasco, salsa inglesa y tajín.", precio: 5200, imagen: michelada, tipo: "cervezas", categoria: "Cervezas" },
  { id: 93, nombre: "Michelada Azteca", precio: 5500, imagen: cervezaImg, tipo: "cervezas", categoria: "Cervezas" },
  { id: 94, nombre: "Michelada con jugo de tomate", precio: 5500, imagen: cervezaImg, tipo: "cervezas", categoria: "Cervezas" },
  { id: 95, nombre: "Mexijito", descripcion: "Tequila, limón, tabasco, salsa inglesa, sal, tajín y corona invertida.", precio: 6500, imagen: cervezaImg, tipo: "cervezas", categoria: "Cervezas" },
];

// ─── Orden de categorías día ──────────────────────────────────────────────────
const ORDEN_DIA = [
  "Cocina Del Autor", "Menú Ejecutivo",
  "Para comenzar con frescura", "Para comenzar con calidez",
  "Cocina chilena", "Cocina internacional",
  "El rincón de los peques", "Del huerto a la mesa", "Un dulce final",
  "Líquidos bebestibles", "Aperitivos Sour", "Variedad de cócteles",
  "Bajativos", "Cafetería", "Cervezas",
];

// ─── Datos carta NOCHE (Resto-Bar Orígenes 18:01–07:00) ──────────────────────
const PRODUCTOS_NOCHE: ProductoNoche[] = [
  // Para compartir
  { id: 101, nombre: "Empanadas de queso o pino fritas", descripcion: "6 unidades.", precio: 8900, imagen: comidaImg, tipo: "compartir", categoria: "Para compartir" },
  { id: 102, nombre: "Arrollados primavera en dos salsas", descripcion: "5 unidades.", precio: 8200, imagen: comidaImg, tipo: "compartir", categoria: "Para compartir" },
  { id: 103, nombre: "Alitas de pollo broaster estilo Orígenes", descripcion: "6 unidades en dos salsas.", precio: 8500, imagen: comidaImg, tipo: "compartir", categoria: "Para compartir" },
  { id: 104, nombre: "Papas fritas en cono", descripcion: "Acompañadas en dos salsas.", precio: 7300, imagen: comidaImg, tipo: "compartir", categoria: "Para compartir" },
  { id: 105, nombre: "Quesadilla mixta", descripcion: "Pollo, carne y chorizo con guacamole y pico de gallo.", precio: 13900, imagen: comidaImg, tipo: "compartir", categoria: "Para compartir" },
  { id: 106, nombre: "Pil-pil mixto a la greda", descripcion: "Pollo, camarón y champiñones al merkén con tostadas.", precio: 12500, imagen: comidaImg, tipo: "compartir", categoria: "Para compartir" },
  // Chorrillanas
  { id: 107, nombre: "Chorrillana Inka", descripcion: "Base de papas fritas con lomo saltado al estilo Orígenes y salsa huancaína.", precio: 19900, imagen: comidaImg, tipo: "chorrillanas", categoria: "Chorrillanas Orígenes" },
  { id: 108, nombre: "Chorrillana Marina", descripcion: "Base de papas fritas con mixto de mariscos a la crema, camarón, pulpo y calamar.", precio: 18800, imagen: comidaImg, tipo: "chorrillanas", categoria: "Chorrillanas Orígenes" },
  { id: 109, nombre: "Chorrillana Chilena", descripcion: "Base de papas fritas con lomo, pollo, chorizos, cebollas caramelizadas y huevo frito.", precio: 17500, imagen: comidaImg, tipo: "chorrillanas", categoria: "Chorrillanas Orígenes" },
  // Del mar
  { id: 110, nombre: "Ceviche Imperial de Pescado", descripcion: "500g montado a la peruana con leche de tigre Orígenes, choclo peruano, maíz cancha y papa camote.", precio: 18900, imagen: comidaImg, tipo: "mar", categoria: "Del mar a la mesa" },
  { id: 111, nombre: "Ceviche Imperial Mixto", descripcion: "500g de pescado y mariscos montado a la peruana con leche de tigre Orígenes, choclo peruano y papa camote.", precio: 21300, imagen: comidaImg, tipo: "mar", categoria: "Del mar a la mesa" },
  { id: 112, nombre: "Trilogía Marina", descripcion: "Locos en salsa verde, pulpo en salsa de olivos y cóctel de camarones ecuatorianos al ron con brusquetas.", precio: 23900, imagen: comidaImg, tipo: "mar", categoria: "Del mar a la mesa" },
  // Tablas
  { id: 113, nombre: "Tabla de Queso-Embutidos", descripcion: "Selección de quesos clásicos y maduros, jamones y salame, encurtidos, frutos secos, salsas y galletas.", precio: 18900, imagen: comidaImg, tipo: "tablas", categoria: "Tablas Estilo Orígenes" },
  { id: 114, nombre: "Tabla de Carnes", descripcion: "Lomo vetado 300g, baby rib de cerdo BBQ y pollo adobado, montado con papas fritas naturales al tajín.", precio: 24500, imagen: comidaImg, tipo: "tablas", categoria: "Tablas Estilo Orígenes" },
  // Bebestibles noche
  { id: 115, nombre: "Bebida lata 330cc", precio: 2900, imagen: imagenebbida, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 116, nombre: "Bebida lata mini", precio: 1500, imagen: imagenebbida, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 117, nombre: "Jugo natural", precio: 4500, imagen: imagenjugo, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 118, nombre: "Jugo natural mix", precio: 5500, imagen: imagenjugo, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 119, nombre: "Agua sin gas / con gas", precio: 2200, imagen: imagenaguagas, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 120, nombre: "Red Bull", precio: 3000, imagen: tragoImg, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 121, nombre: "Limonada clásica", precio: 4300, imagen: tragoImg, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 122, nombre: "Limonada menta jengibre", precio: 4500, imagen: tragoImg, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 123, nombre: "Limonada frambuesa menta", precio: 4800, imagen: tragoImg, tipo: "bebestibles", categoria: "Bebestibles" },
  { id: 124, nombre: "Limonada albahaca fresca", precio: 4500, imagen: tragoImg, tipo: "bebestibles", categoria: "Bebestibles" },
  // Sour noche
  { id: 125, nombre: "Pisco sour a la peruana", precio: 5200, imagen: psicosour, tipo: "sour", categoria: "Aperitivos Sour" },
  { id: 126, nombre: "Mango sour", precio: 5500, imagen: tragoImg, tipo: "sour", categoria: "Aperitivos Sour" },
  { id: 127, nombre: "Maracuyá sour", precio: 5500, imagen: tragoImg, tipo: "sour", categoria: "Aperitivos Sour" },
  { id: 128, nombre: "Frambuesa sour", precio: 5800, imagen: tragoImg, tipo: "sour", categoria: "Aperitivos Sour" },
  { id: 129, nombre: "Tropical sour", descripcion: "Mango - Maracuyá.", precio: 5800, imagen: tragoImg, tipo: "sour", categoria: "Aperitivos Sour" },
  { id: 130, nombre: "Sour menta jengibre", precio: 5500, imagen: tragoImg, tipo: "sour", categoria: "Aperitivos Sour" },
  { id: 131, nombre: "Sour Catedral", precio: 8990, imagen: tragoImg, tipo: "sour", categoria: "Aperitivos Sour" },
  // Cócteles noche
  { id: 132, nombre: "Daikiri", descripcion: "Tradicional, frambuesa o mango.", precio: 5200, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 133, nombre: "Tequila Margarita", precio: 5800, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 134, nombre: "Tequila Sunrise", precio: 5800, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 135, nombre: "Tequila Margarita Blue", precio: 6200, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 136, nombre: "Tequilazo", precio: 4000, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 137, nombre: "Piña colada", precio: 5500, imagen: piñacoalda, tipo: "cocteles", categoria: "Cócteles" },
  { id: 138, nombre: "Mojito", descripcion: "Tradicional, mango, berries o blue.", precio: 6800, imagen: mojito, tipo: "cocteles", categoria: "Cócteles" },
  { id: 139, nombre: "Gin tonic", precio: 6500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 140, nombre: "Tropical gin", precio: 7500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 141, nombre: "Granada gin (temporada)", precio: 8500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 142, nombre: "Kiwi gin (temporada)", precio: 8500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 143, nombre: "Sandía gin (temporada)", precio: 8500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 144, nombre: "Aperol spritz", precio: 6500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 145, nombre: "Ramazzotti spritz", precio: 6500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 146, nombre: "Clavo oxidado", precio: 6200, imagen: clavox, tipo: "cocteles", categoria: "Cócteles" },
  { id: 147, nombre: "Negroni de Florencia", precio: 6500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 148, nombre: "Old fashion", precio: 6200, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 149, nombre: "Espresso martini", precio: 6200, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 150, nombre: "Baileys Irish Cream", precio: 6800, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 151, nombre: "Kir royal", precio: 5500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 152, nombre: "Copa de espumante", precio: 4900, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  { id: 153, nombre: "Copa de vino", precio: 4500, imagen: tragoImg, tipo: "cocteles", categoria: "Cócteles" },
  // Cervezas noche
  { id: 154, nombre: "Austral Lager 330cc", precio: 4200, imagen: austral, tipo: "cervezas", categoria: "Cervezas" },
  { id: 155, nombre: "Austral Calafate 330cc", precio: 4200, imagen: austral, tipo: "cervezas", categoria: "Cervezas" },
  { id: 156, nombre: "Austral Yagan 330cc", precio: 4200, imagen: yagan, tipo: "cervezas", categoria: "Cervezas" },
  { id: 157, nombre: "Kunstmann Torobayo 330cc", precio: 4200, imagen: kutsman, tipo: "cervezas", categoria: "Cervezas" },
  { id: 158, nombre: "Kunstmann Lager 330cc", precio: 4200, imagen: kutsman, tipo: "cervezas", categoria: "Cervezas" },
  { id: 159, nombre: "Kunstmann Bock 330cc", precio: 4200, imagen: bock, tipo: "cervezas", categoria: "Cervezas" },
  { id: 160, nombre: "Kunstmann Sin Alcohol 330cc", precio: 4200, imagen: kutsman0, tipo: "cervezas", categoria: "Cervezas" },
  { id: 161, nombre: "Royal 330cc", precio: 3800, imagen: royal, tipo: "cervezas", categoria: "Cervezas" },
  { id: 162, nombre: "Heineken 330cc", precio: 3800, imagen: heineken, tipo: "cervezas", categoria: "Cervezas" },
  { id: 163, nombre: "Sol 330cc", precio: 3800, imagen: sol, tipo: "cervezas", categoria: "Cervezas" },
  { id: 164, nombre: "Corona 330cc", precio: 3800, imagen: cervezaImg, tipo: "cervezas", categoria: "Cervezas" },
  { id: 165, nombre: "Austral Lager 500cc", precio: 5600, imagen: austral, tipo: "cervezas", categoria: "Cervezas" },
  { id: 166, nombre: "Austral Calafate 500cc", precio: 5600, imagen: austral, tipo: "cervezas", categoria: "Cervezas" },
  { id: 167, nombre: "Austral Torres del Paine 500cc", precio: 5600, imagen: austral, tipo: "cervezas", categoria: "Cervezas" },
  { id: 168, nombre: "Kunstmann Torobayo 500cc", precio: 5600, imagen: kutsman, tipo: "cervezas", categoria: "Cervezas" },
  { id: 169, nombre: "Chelada", descripcion: "Cerveza con limón y sal.", precio: 1500, imagen: chelada, tipo: "cervezas", categoria: "Cervezas" },
  { id: 170, nombre: "Michelada", descripcion: "Tabasco, salsa inglesa y tajín.", precio: 2500, imagen: michelada, tipo: "cervezas", categoria: "Cervezas" },
  { id: 171, nombre: "Michelada Azteca", precio: 3000, imagen: michelada, tipo: "cervezas", categoria: "Cervezas" },
  { id: 172, nombre: "Mexijito", descripcion: "Tequila, limón, tabasco, sal, tajín y corona invertida.", precio: 6500, imagen: cervezaImg, tipo: "cervezas", categoria: "Cervezas" },
  { id: 173, nombre: "Cervezas artesanales Puente", descripcion: "Blonde Ale, Red IPA, Porter, Scottish Ale.", precio: 5900, imagen: cervezaImg, tipo: "cervezas", categoria: "Cervezas" },
  // Destilados
  { id: 174, nombre: "Johnnie Walker Red Label", precio: 6500, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 175, nombre: "Johnnie Walker Black Label", precio: 7900, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 176, nombre: "Jack Daniel's Apple", precio: 7400, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 177, nombre: "Jack Daniel's Honey", precio: 7400, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 178, nombre: "Jack Daniel's", precio: 7900, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 179, nombre: "Pisco Capel 35°", precio: 4200, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 180, nombre: "Pisco Alto del Carmen 35°", precio: 5200, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 181, nombre: "Pisco Mistral 35°", precio: 5200, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 182, nombre: "Ron Habana Añejo", precio: 6500, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 183, nombre: "Ron Bacardi Añejo", precio: 5500, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 184, nombre: "Vodka tonic", precio: 6200, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 185, nombre: "Vodka Stolinskaya", precio: 6200, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  { id: 186, nombre: "Vodka Absolut", precio: 6800, imagen: tragoImg, tipo: "destilados", categoria: "Destilados" },
  // Cafetería noche
  { id: 187, nombre: "Té fina selección", precio: 2900, imagen: cafeImg, tipo: "cafeteria", categoria: "Cafetería" },
  { id: 188, nombre: "Agua de hierbas e infusiones", precio: 2900, imagen: cafeImg, tipo: "cafeteria", categoria: "Cafetería" },
  { id: 189, nombre: "Café americano", precio: 2900, imagen: cafeImg, tipo: "cafeteria", categoria: "Cafetería" },
  { id: 190, nombre: "Café espresso", precio: 2500, imagen: cafeImg, tipo: "cafeteria", categoria: "Cafetería" },
  { id: 191, nombre: "Café espresso doble", precio: 2900, imagen: cafeImg, tipo: "cafeteria", categoria: "Cafetería" },
  { id: 192, nombre: "Café irlandés", precio: 4500, imagen: cafeImg, tipo: "cafeteria", categoria: "Cafetería" },
  { id: 193, nombre: "Café capuccino", precio: 3500, imagen: cafeImg, tipo: "cafeteria", categoria: "Cafetería" },
  { id: 194, nombre: "Chocolate caliente", descripcion: "Días de lluvia.", precio: 4500, imagen: cafeImg, tipo: "cafeteria", categoria: "Cafetería" },
];

const ORDEN_NOCHE = [
  "Para compartir", "Chorrillanas Orígenes", "Del mar a la mesa",
  "Tablas Estilo Orígenes", "Bebestibles", "Aperitivos Sour",
  "Cócteles", "Cervezas", "Destilados", "Cafetería",
];

// ─── Componente principal ─────────────────────────────────────────────────────
export default function CartaHorario() {
  const horaReal = new Date().getHours();
  const [horaSimulada, setHoraSimulada] = useState<number | null>(null);

  // filtros día
  const [filtroDia, setFiltroDia] = useState<TipoDia | "todo">("todo");
  const [subCatDia, setSubCatDia] = useState<string>("todas");

  // filtros noche
  const [filtroNoche, setFiltroNoche] = useState<TipoNoche | "todo">("todo");
  const [subCatNoche, setSubCatNoche] = useState<string>("todas");

  const hora = horaSimulada !== null ? horaSimulada : horaReal;
  const modo = getModoCarta(hora);
  const esDia = modo === "dia";

  const setFiltroDiaSafe = useCallback((f: TipoDia | "todo") => {
    setFiltroDia(f);
    setSubCatDia("todas");
  }, []);

  const setFiltroNocheSafe = useCallback((f: TipoNoche | "todo") => {
    setFiltroNoche(f);
    setSubCatNoche("todas");
  }, []);

  // ── Lógica día ──
  const productosDiaFiltrados = useMemo(() => {
    if (filtroDia === "todo") return PRODUCTOS_DIA;
    return PRODUCTOS_DIA.filter((p) => p.tipo === filtroDia);
  }, [filtroDia]);

  const subcategoriasDia = useMemo(() => {
    const set = new Set<string>();
    for (const p of productosDiaFiltrados) set.add(p.categoria);
    return ORDEN_DIA.filter((c) => set.has(c));
  }, [productosDiaFiltrados]);

  const productosDiaFinales = useMemo(() => {
    if (subCatDia === "todas") return productosDiaFiltrados;
    return productosDiaFiltrados.filter((p) => p.categoria === subCatDia);
  }, [productosDiaFiltrados, subCatDia]);

  const gruposDia = useMemo(() => {
    const g = groupBy(productosDiaFinales, (p) => p.categoria);
    return ORDEN_DIA.filter((k) => g[k]).map((k) => [k, g[k]] as const);
  }, [productosDiaFinales]);

  // ── Lógica noche ──
  const productosNocheFiltrados = useMemo(() => {
    if (filtroNoche === "todo") return PRODUCTOS_NOCHE;
    return PRODUCTOS_NOCHE.filter((p) => p.tipo === filtroNoche);
  }, [filtroNoche]);

  const subcategoriasNoche = useMemo(() => {
    const set = new Set<string>();
    for (const p of productosNocheFiltrados) set.add(p.categoria);
    return ORDEN_NOCHE.filter((c) => set.has(c));
  }, [productosNocheFiltrados]);

  const productosNocheFinales = useMemo(() => {
    if (subCatNoche === "todas") return productosNocheFiltrados;
    return productosNocheFiltrados.filter((p) => p.categoria === subCatNoche);
  }, [productosNocheFiltrados, subCatNoche]);

  const gruposNoche = useMemo(() => {
    const g = groupBy(productosNocheFinales, (p) => p.categoria);
    return ORDEN_NOCHE.filter((k) => g[k]).map((k) => [k, g[k]] as const);
  }, [productosNocheFinales]);

  // ── Banner de horario ──
  const bannerDia = (
    <div
      className="d-flex align-items-center gap-2 mb-4 px-3 py-2"
      style={{
        background: "rgba(95,112,95,0.18)",
        border: "1px solid rgba(95,112,95,0.45)",
        borderRadius: 12,
        fontSize: 14,
      }}
    >
      <span style={{ color: "#7ec87e", fontSize: 18 }}>☀️</span>
      <span style={{ color: "var(--muted)" }}>
        <strong style={{ color: "var(--gold2)" }}>Carta Orígenes</strong>
        {" — "}Disponible de 09:00 a 18:00
        {horaSimulada !== null && (
          <span style={{ color: "var(--gold)", marginLeft: 8 }}>
            (simulando {hora}:00)
          </span>
        )}
      </span>
      <span
        className="ms-auto"
        style={{
          fontSize: 12,
          color: "rgba(127,200,127,0.8)",
          border: "1px solid rgba(127,200,127,0.35)",
          borderRadius: 99,
          padding: "2px 10px",
        }}
      >
        ● Activa ahora
      </span>
    </div>
  );

  const bannerNoche = (
    <div
      className="d-flex align-items-center gap-2 mb-4 px-3 py-2"
      style={{
        background: "rgba(203,179,122,0.10)",
        border: "1px solid rgba(203,179,122,0.35)",
        borderRadius: 12,
        fontSize: 14,
      }}
    >
      <span style={{ fontSize: 18 }}>🌙</span>
      <span style={{ color: "var(--muted)" }}>
        <strong style={{ color: "var(--gold2)" }}>Carta Resto-Bar Orígenes</strong>
        {" — "}Disponible de 18:01 a 07:00
        {horaSimulada !== null && (
          <span style={{ color: "var(--gold)", marginLeft: 8 }}>
            (simulando {hora}:00)
          </span>
        )}
      </span>
      <span
        className="ms-auto"
        style={{
          fontSize: 12,
          color: "rgba(203,179,122,0.9)",
          border: "1px solid rgba(203,179,122,0.35)",
          borderRadius: 99,
          padding: "2px 10px",
        }}
      >
        ● Activa ahora
      </span>
    </div>
  );

  // ── Banner carta bloqueada ──
  const bannerBloqueadaDia = (
    <div
      className="d-flex align-items-center gap-2 px-3 py-2"
      style={{
        background: "rgba(20,22,24,0.6)",
        border: "1px solid rgba(203,179,122,0.12)",
        borderRadius: 12,
        fontSize: 14,
        opacity: 0.5,
      }}
    >
      <span style={{ fontSize: 16 }}>🔒</span>
      <span style={{ color: "var(--muted)" }}>
        <strong style={{ color: "var(--muted)" }}>Carta Orígenes</strong>
        {" — "}Disponible de 09:00 a 18:00
      </span>
      <span
        className="ms-auto"
        style={{
          fontSize: 12,
          color: "rgba(242,242,242,0.3)",
          border: "1px solid rgba(242,242,242,0.12)",
          borderRadius: 99,
          padding: "2px 10px",
        }}
      >
        ○ No disponible
      </span>
    </div>
  );

  const bannerBloqueadaNoche = (
    <div
      className="d-flex align-items-center gap-2 px-3 py-2"
      style={{
        background: "rgba(20,22,24,0.6)",
        border: "1px solid rgba(203,179,122,0.12)",
        borderRadius: 12,
        fontSize: 14,
        opacity: 0.5,
      }}
    >
      <span style={{ fontSize: 16 }}>🔒</span>
      <span style={{ color: "var(--muted)" }}>
        <strong style={{ color: "var(--muted)" }}>Carta Resto-Bar Orígenes</strong>
        {" — "}Disponible de 18:01 a 07:00
      </span>
      <span
        className="ms-auto"
        style={{
          fontSize: 12,
          color: "rgba(242,242,242,0.3)",
          border: "1px solid rgba(242,242,242,0.12)",
          borderRadius: 99,
          padding: "2px 10px",
        }}
      >
        ○ No disponible
      </span>
    </div>
  );

  return (
    <div className="elegant-bg">
      <Navbar />

      <section className="elegant-wrap">
        <div className="container elegant-card">
          <div className="mb-5">
            {esDia ? bannerDia : bannerBloqueadaDia}

            {esDia && (
              <>
                <h1 className="text-center elegant-title mb-2 mt-4">Carta Orígenes</h1>
                <p className="text-center elegant-subtitle mb-4">
                  Elige tu categoría: comida, tragos o cervezas.
                </p>

                {/* Filtros principales día */}
                <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
                  {(["todo", "comida", "tragos", "cervezas"] as const).map((f) => (
                    <button
                      key={f}
                      className={`menu-filter ${filtroDia === f ? "is-active" : ""}`}
                      onClick={() => setFiltroDiaSafe(f)}
                    >
                      {f === "todo" ? "Todo" : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Subfiltros día */}
                {(filtroDia === "comida" || filtroDia === "tragos") && (
                  <div className="menu-subfilters mb-4">
                    <button
                      className={`menu-filter menu-filter--sub ${subCatDia === "todas" ? "is-active" : ""}`}
                      onClick={() => setSubCatDia("todas")}
                    >
                      Todas
                    </button>
                    {subcategoriasDia.map((sc) => (
                      <button
                        key={sc}
                        className={`menu-filter menu-filter--sub ${subCatDia === sc ? "is-active" : ""}`}
                        onClick={() => setSubCatDia(sc)}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                )}

                {/* Listado día */}
                {gruposDia.map(([categoria, items]) => (
                  <div key={categoria} className="mb-5">
                    <h2 className="section-title text-center mb-3">{categoria}</h2>
                    <div className="row g-3">
                      {items.map((p) => (
                        <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                          <div className="menu-card h-100">
                            <div className="menu-card__imgWrap">
                              <img src={p.imagen} alt={p.nombre} />
                              <span className={`menu-pill pill-${p.tipo}`}>
                                {p.tipo.toUpperCase()}
                              </span>
                            </div>
                            <div className="menu-card__body">
                              <h3 className="menu-card__title">{p.nombre}</h3>
                              {p.descripcion ? (
                                <p className="menu-card__desc" style={{ whiteSpace: "pre-line" }}>
                                  {p.descripcion}
                                </p>
                              ) : (
                                <p className="menu-card__desc muted"> </p>
                              )}
                              <div className="menu-card__price">{fmtCLP(p.precio)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Separador */}
          <div
            style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(203,179,122,0.35), transparent)",
              margin: "8px 0 32px",
            }}
          />

          {/* ═══════════════════════════════════
              CARTA NOCHE
          ════════════════════════════════════ */}
          <div>
            {!esDia ? bannerNoche : bannerBloqueadaNoche}

            {!esDia && (
              <>
                <h1 className="text-center elegant-title mb-2 mt-4">Carta Resto-Bar Orígenes</h1>
                <p className="text-center elegant-subtitle mb-4">
                  Bar & cocina nocturna · 18:01 a 07:00
                </p>

                {/* Filtros principales noche */}
                <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
                  <button
                    className={`menu-filter ${filtroNoche === "todo" ? "is-active" : ""}`}
                    onClick={() => setFiltroNocheSafe("todo")}
                  >
                    Todo
                  </button>
                  {(
                    [
                      { tipo: "compartir" as TipoNoche, label: "Para compartir" },
                      { tipo: "chorrillanas" as TipoNoche, label: "Chorrillanas" },
                      { tipo: "mar" as TipoNoche, label: "Del mar" },
                      { tipo: "tablas" as TipoNoche, label: "Tablas" },
                      { tipo: "cocteles" as TipoNoche, label: "Cócteles" },
                      { tipo: "cervezas" as TipoNoche, label: "Cervezas" },
                      { tipo: "destilados" as TipoNoche, label: "Destilados" },
                      { tipo: "cafeteria" as TipoNoche, label: "Cafetería" },
                    ]
                  ).map(({ tipo, label }) => (
                    <button
                      key={tipo}
                      className={`menu-filter ${filtroNoche === tipo ? "is-active" : ""}`}
                      onClick={() => setFiltroNocheSafe(tipo)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Subfiltros noche */}
                {filtroNoche !== "todo" && (
                  <div className="menu-subfilters mb-4">
                    <button
                      className={`menu-filter menu-filter--sub ${subCatNoche === "todas" ? "is-active" : ""}`}
                      onClick={() => setSubCatNoche("todas")}
                    >
                      Todas
                    </button>
                    {subcategoriasNoche.map((sc) => (
                      <button
                        key={sc}
                        className={`menu-filter menu-filter--sub ${subCatNoche === sc ? "is-active" : ""}`}
                        onClick={() => setSubCatNoche(sc)}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                )}

                {/* Listado noche */}
                {gruposNoche.map(([categoria, items]) => (
                  <div key={categoria} className="mb-5">
                    <h2 className="section-title text-center mb-3">{categoria}</h2>
                    <div className="row g-3">
                      {items.map((p) => (
                        <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                          <div className="menu-card h-100">
                            <div className="menu-card__imgWrap">
                              <img src={p.imagen} alt={p.nombre} />
                              <span className="menu-pill pill-tragos">
                                {p.tipo.toUpperCase()}
                              </span>
                            </div>
                            <div className="menu-card__body">
                              <h3 className="menu-card__title">{p.nombre}</h3>
                              {p.descripcion ? (
                                <p className="menu-card__desc">{p.descripcion}</p>
                              ) : (
                                <p className="menu-card__desc muted"> </p>
                              )}
                              <div className="menu-card__price">{fmtCLP(p.precio)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <p className="text-center mt-4" style={{ color: "var(--muted)", fontSize: 13 }}>
            * Productos y precios transcritos desde la carta del local. Pueden variar.
          </p>
        </div>
      </section>

      <ThemeToggle />
      <Footer />
    </div>
  );
}