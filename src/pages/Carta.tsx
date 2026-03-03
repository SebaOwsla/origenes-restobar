import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

import comidaImg from "../assets/imagenes/IMG_9054-Mejorado-NR.jpg";
import postreImg from "../assets/imagenes/IMG_8938-Mejorado-NR.jpg";
import tragoImg from "../assets/imagenes/IMG_8882-Mejorado-NR.jpg";
import cervezaImg from "../assets/imagenes/IMG_8510-Mejorado-NR.jpg";
import cafeImg from "../assets/imagenes/IMG_8398-Mejorado-NR.jpg";
import imagenjugo from "../assets/imagenes/jugojumex.jpg"
import imagenebbida from "../assets/imagenes/imagenbeida.jpg"
import imagenaguagas from "../assets/imagenes/imagenaguagas.jpg"
import austral from "../assets/imagenes/austral.jpg"
import kutsman from "../assets/imagenes/kutsman.jpg"
import yagan from "../assets/imagenes/yagan.jpg" 
import bock from "../assets/imagenes/bock.jpg"
import royal from "../assets/imagenes/royal.jpg"
import heineken from "../assets/imagenes/heinekjen.jpg"
import sol from "../assets/imagenes/sol.jpg"
import kutsman0 from "../assets/imagenes/kuts0.jpg"
import chelada from "../assets/imagenes/chelada.jpg"
import michelada from "../assets/imagenes/michelada.jpg"
import clavox from "../assets/imagenes/clavooxi.jpg"
import psicosour from "../assets/imagenes/piscosour.jpg"
import mojito from "../assets/imagenes/mojito.jpg"
import piñacoalda from "../assets/imagenes/piñacolada.jpg"








 
type Tipo = "comida" | "tragos" | "cervezas";

interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen: string;
  tipo: Tipo;
  categoria: string; // subcategoría
}8

const formatCLP = (precio?: number | null) => {
  if (!precio) return "";
  
  return precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};
const groupBy = <T, K extends string>(arr: T[], keyFn: (t: T) => K) => {
  const map = {} as Record<K, T[]>;
  for (const item of arr) {
    const k = keyFn(item);
    if (!map[k]) map[k] = [];
    map[k].push(item);
  }
  return map;
};

export default function Carta() {
  const [filtro, setFiltro] = useState<Tipo | "todo">("todo");

  // Subfiltros
  const [subCatComida, setSubCatComida] = useState<string>("todas");
  const [subCatTragos, setSubCatTragos] = useState<string>("todas");

  // ✅ Orden “bonito” (también sirve para ordenar subcategorías)
  const ordenCategorias = [
    // Comida
    "Cocina Del Autor",
    "Menú Ejecutivo",
    "Para comenzar con frescura",
    "Para comenzar con calidez",
    "Cocina chilena",
    "Cocina internacional",
    "El rincón de los peques",
    "Del huerto a la mesa",
    "Un dulce final",
    // Tragos
    "Líquidos bebestibles",
    "Aperitivos Sour",
    "Variedad de cócteles",
    "Bajativos",
    "Cafetería",
    // Cervezas
    "Cervezas",
  ];

  const productos: Producto[] = [
  {
  id: 11,
  nombre: "Cocina De Autor",
  descripcion: `
ENTRADAS

Arancini al azafrán relleno de osobuco con salsa romesco — $13.500

Crema Yin-Yang (dueto de cremas en base de gazpacho andaluz y crema de setas parisina) — $11.800


PLATOS PRINCIPALES

Bonito ahumado a las brasas con puré cítrico, beurre blanc y crocante de tapioca con gajos de pomelo, lima y naranja — $18.900

Ragout de cordero cocinado a fuego lento en su salsa con gnocchis caseros de patata a la parmesana y hojas de perejil fresco — $21.500


POSTRES

Nuestro Volcán Protector San José 5880 — $6.500

Pavlova de berries en su salsa y helado de la casa — $5.900
  `,
  precio: null, // puedes dejarlo null o 0 porque son varios precios
  imagen: comidaImg,
  tipo: "comida",
  categoria: "Cocina Del Autor",
},



    {
      id: 1,
      nombre: "Menú Ejecutivo",
      descripcion:
        "Incluye: ensalada o consomé + plato principal (proteína y acompañamiento) + bebida, pan, pebre y acompañamiento.",
      precio: 9500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Menú Ejecutivo",
    },

    // Para comenzar con frescura
    {
      id: 2,
      nombre: "Ceviche tradicional montado a la peruana",
      descripcion: "Con nuestra leche de tigre Orígenes.",
      precio: 13800,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Para comenzar con frescura",
    },
    {
      id: 3,
      nombre: "Ceviche mixto de pescado y mariscos",
      descripcion: "Montado a la peruana con nuestra leche de tigre Orígenes.",
      precio: 14900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Para comenzar con frescura",
    },
    {
      id: 4,
      nombre: "Mixto de locos en su verde y pulpo al oliva",
      precio: 17500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Para comenzar con frescura",
    },
    {
      id: 5,
      nombre: "Bloody Mary",
      descripcion: "Cocktail frío de mariscos en zumo de tomates, aromatizado en especias, pimientas y un toque de vodka.",
      precio: 17800,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Para comenzar con frescura",
    },

    // Para comenzar con calidez
    {
      id: 6,
      nombre: "Ostiones parmesana",
      descripcion: "Con un toque de Sauvignon Blanc.",
      precio: 17500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Para comenzar con calidez",
    },
    {
      id: 7,
      nombre: "Camarones al pil-pil",
      descripcion: "Con cacho de cabra ahumado en greda de Pomaire.",
      precio: 13800,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Para comenzar con calidez",
    },
    {
      id: 8,
      nombre: "Chupe de jaiva",
      descripcion:
        " En base de bisquet con un toque del Elqui.",
      precio: 14900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Para comenzar con calidez",
    },
     {
      id: 96,
      nombre: "Mar y tierra",
      descripcion:
        "Al ajillo con camarones, lomo y champiñones servido con tostadas caseras.",
      precio: 12500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Para comenzar con calidez",
    },
    // Cocina chilena
    {
      id: 9,
      nombre: "Plateada a la campesina",
      descripcion:
        "Con reducción de Merlot y especias, acompañada con puré criollo.",
      precio: 17900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina chilena",
    },
    {
      id: 10,
      nombre: "Lomo a lo pobre tradicional",
      descripcion: "Con cebolla caramelizada, papas fritas y huevo frito.",
      precio: 19500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina chilena",
    },
    {
      id: 12,
      nombre: "Pastel de choclo",
      descripcion: "Casero en librillo (según temporada), acompañado de mini chilena.",
      precio: 13500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina chilena",
    },
    {
      id: 13,
      nombre: "Merluza austral frita",
      descripcion: "Con ensalada a la chilena y papas mayo.",
      precio: 15500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina chilena",
    },

    // Cocina internacional
    {
      id: 15,
      nombre: "Salmón con salsas",
      descripcion:
        "De mariscos a lo macho acompañado de arroz verde al cilantro.",
      precio: 18900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina internacional",
    },
    {
      id: 16,
      nombre: "Filete de res",
      descripcion:
        "En salsa Merlot acompañado de risotto atomatado y espárragos salteados.",
      precio: 22900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina internacional",
    },
    {
      id: 17,
      nombre: "Lomo saltado limeño",
      descripcion: "A la soya, aromatizado al jengibre, acompañado de papas fritas y arroz.",
      precio: 15500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina internacional",
    },
    {
      id: 18,
      nombre: "Pasta Orígenes casera",
      descripcion:
        "Ñoquis o fettuccini con salsa a elección (pesto, mechada al pomodoro o carbonara).",
      precio: 12300,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina internacional",
    },
    {
      id: 19,
      nombre: "Paccheri",
      descripcion: "En salsa coral con mixto de mariscos, aceite verde y parmesano.",
      precio: 17500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina internacional",
    },
    {
      id: 20,
      nombre: "Dueto de fetuccinis ",
      descripcion:
        "En salsa huancaína con lomo saltado a la peruana.",
      precio: 16900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Cocina internacional",
    },

    // Peques
    {
      id: 21,
      nombre: "Fettuccini (peques)",
      descripcion: "En salsa alfredo con jamón o salsa pomodoro.",
      precio: 8900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "El rincón de los peques",
    },
    {
      id: 22,
      nombre: "Salchipapas caseras",
      precio: 7500,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "El rincón de los peques",
    },
    {
      id: 23,
      nombre: "Filetitos de pollo apanados",
      descripcion: "Con papas fritas, puré o arroz.",
      precio: 8300,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "El rincón de los peques",
    },

    // Ensaladas
    {
      id: 24,
      nombre: "Humus tahine con vegetales salteados al oliva y pan pita",
      precio: 6800,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Del huerto a la mesa",
    },
    
    {
      id: 27,
      nombre: "Ensalada mixta de hojas verdes",
      descripcion: "Con tomate cherry y champiñones en dressing balsámico con queso de cabra.",
      precio: 8900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Del huerto a la mesa",
    },
    {
      id: 28,
      nombre: "Ensalada César tradicional con pollo",
      descripcion: "Lechuga, aderezo, crutones, queso parmesano.",
      precio: 10900,
      imagen: comidaImg,
      tipo: "comida",
      categoria: "Del huerto a la mesa",
    },


    // Postres
    {
      id: 30,
      nombre: "Tiramisú (receta original de Venecia)",
      descripcion: "Con mascarpone y cacao amazónico.",
      precio: 5500,
      imagen: postreImg,
      tipo: "comida",
      categoria: "Un dulce final",
    },
    {
      id: 31,
      nombre: "Suspiro limeño tradicional",
      descripcion: "Con merengue al oport perfumado.",
      precio: 4800,
      imagen: postreImg,
      tipo: "comida",
      categoria: "Un dulce final",
    },
    {
      id: 34,
      nombre: "Crème brûlée",
      descripcion: "Caramelo crocante y frutillas borrachas al merlot.",
      precio: 6200,
      imagen: postreImg,
      tipo: "comida",
      categoria: "Un dulce final",
    },
    {
      id: 35,
      nombre: "Pie de limón Orígenes al vaso",
      descripcion: "Con pica y crumble de naranja.",
      precio: 5500,
      imagen: postreImg,
      tipo: "comida",
      categoria: "Un dulce final",
    },

    // TRAGOS
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
    { id: 55, nombre: "Piña colada", precio: 5500, imagen: tragoImg, tipo: "tragos", categoria: "Variedad de cócteles" },
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

    // CERVEZAS
    { id: 83, nombre: "Austral Lager", precio: 5300, imagen: austral, tipo: "cervezas", categoria: "Cervezas" },
    { id: 84, nombre: "Kunstmann Lager", precio: 5300, imagen: kutsman, tipo: "cervezas", categoria: "Cervezas" },
    { id: 85, nombre: "Austral yagan", precio: 5300, imagen: yagan, tipo: "cervezas", categoria: "Cervezas" },
    { id: 86, nombre: "Kunstmann bock", precio: 5600, imagen: bock, tipo: "cervezas", categoria: "Cervezas" },
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

  // Reset subfiltros al cambiar filtro principal
  const setFiltroSafe = (nuevo: Tipo | "todo") => {
    setFiltro(nuevo);
    setSubCatComida("todas");
    setSubCatTragos("todas");
  };

  const productosFiltrados = useMemo(() => {
    if (filtro === "todo") return productos;
    return productos.filter((p) => p.tipo === filtro);
  }, [filtro, productos]);

  // ✅ Subcategorías (ordenadas)
  const subcategoriasComida = useMemo(() => {
    if (filtro !== "comida") return [];
    const set = new Set<string>();
    for (const p of productosFiltrados) set.add(p.categoria);
    return ordenCategorias.filter((c) => set.has(c));
  }, [filtro, productosFiltrados]);

  const subcategoriasTragos = useMemo(() => {
    if (filtro !== "tragos") return [];
    const set = new Set<string>();
    for (const p of productosFiltrados) set.add(p.categoria);
    return ordenCategorias.filter((c) => set.has(c));
  }, [filtro, productosFiltrados]);

  // Aplicar subfiltros
  const productosFinales = useMemo(() => {
    if (filtro === "comida") {
      if (subCatComida === "todas") return productosFiltrados;
      return productosFiltrados.filter((p) => p.categoria === subCatComida);
    }

    if (filtro === "tragos") {
      if (subCatTragos === "todas") return productosFiltrados;
      return productosFiltrados.filter((p) => p.categoria === subCatTragos);
    }

    return productosFiltrados;
  }, [filtro, subCatComida, subCatTragos, productosFiltrados]);

  // Agrupar por categoría
  const grupos = useMemo(() => {
    const g = groupBy(productosFinales, (p) => p.categoria);
    return ordenCategorias
      .filter((k) => g[k])
      .map((k) => [k, g[k]] as const);
  }, [productosFinales]);

  return (
    <div className="elegant-bg">
      <Navbar />

      <section className="elegant-wrap">
        <div className="container elegant-card">
          <h1 className="text-center elegant-title mb-2">Carta Orígenes</h1>
          <p className="text-center elegant-subtitle mb-4">
            Elige tu categoría: comida, tragos o cervezas.
          </p>

          {/* FILTROS PRINCIPALES */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
            <button
              className={`menu-filter ${filtro === "todo" ? "is-active" : ""}`}
              onClick={() => setFiltroSafe("todo")}
            >
              Todo
            </button>

            <button
              className={`menu-filter ${filtro === "comida" ? "is-active" : ""}`}
              onClick={() => setFiltroSafe("comida")}
            >
              Comida
            </button>

            <button
              className={`menu-filter ${filtro === "tragos" ? "is-active" : ""}`}
              onClick={() => setFiltroSafe("tragos")}
            >
              Tragos
            </button>

            <button
              className={`menu-filter ${filtro === "cervezas" ? "is-active" : ""}`}
              onClick={() => setFiltroSafe("cervezas")}
            >
              Cervezas
            </button>
          </div>

          {/* SUBFILTRO COMIDA (GRID EN MÓVIL) */}
          {filtro === "comida" && (
            <div className="menu-subfilters mb-4">
              <button
                className={`menu-filter menu-filter--sub ${subCatComida === "todas" ? "is-active" : ""
                  }`}
                onClick={() => setSubCatComida("todas")}
              >
                Todas
              </button>

              {subcategoriasComida.map((sc) => (
                <button
                  key={sc}
                  className={`menu-filter menu-filter--sub ${subCatComida === sc ? "is-active" : ""
                    }`}
                  onClick={() => setSubCatComida(sc)}
                >
                  {sc}
                </button>
              ))}
            </div>
          )}

          {/* SUBFILTRO TRAGOS (GRID EN MÓVIL) */}
          {filtro === "tragos" && (
            <div className="menu-subfilters mb-4">
              <button
                className={`menu-filter menu-filter--sub ${subCatTragos === "todas" ? "is-active" : ""
                  }`}
                onClick={() => setSubCatTragos("todas")}
              >
                Todas
              </button>

              {subcategoriasTragos.map((sc) => (
                <button
                  key={sc}
                  className={`menu-filter menu-filter--sub ${subCatTragos === sc ? "is-active" : ""
                    }`}
                  onClick={() => setSubCatTragos(sc)}
                >
                  {sc}
                </button>
              ))}
            </div>
          )}

          {/* LISTADO POR SUBCATEGORÍA */}
          {grupos.map(([categoria, items]) => (
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
                          <p className="menu-card__desc">{p.descripcion}</p>
                        ) : (
                          <p className="menu-card__desc muted"> </p>
                        )}

                        <div className="menu-card__price">
                          {formatCLP(p.precio)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="text-center" style={{ color: "var(--muted)" }}>
            * Productos y precios transcritos desde la carta del local.
          </p>
        </div>
      </section>
      <ThemeToggle />
      <Footer />
    </div>
  );
}
