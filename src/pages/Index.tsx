import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ NUEVO
import Navbar from "../components/Navbar";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

/* IMÁGENES */
import img8361 from "../assets/imagenes/IMG_8361-Mejorado-NR.jpg";
import img8398 from "../assets/imagenes/IMG_8398-Mejorado-NR.jpg";
import img8410 from "../assets/imagenes/IMG_8410-Mejorado-NR.jpg";
import img8414 from "../assets/imagenes/IMG_8414-Mejorado-NR.jpg";
import img8510 from "../assets/imagenes/IMG_8510-Mejorado-NR.jpg";
import img8571 from "../assets/imagenes/IMG_8571-Mejorado-NR.jpg";
import img8594 from "../assets/imagenes/IMG_8594-Mejorado-NR.jpg";
import img8613 from "../assets/imagenes/IMG_8613-Mejorado-NR.jpg";
import img8740 from "../assets/imagenes/IMG_8740-Mejorado-NR.jpg";
import img8767 from "../assets/imagenes/IMG_8767-Mejorado-NR.jpg";
import img8882 from "../assets/imagenes/IMG_8882-Mejorado-NR.jpg";
import img8938 from "../assets/imagenes/IMG_8938-Mejorado-NR.jpg";
import img8996 from "../assets/imagenes/IMG_8996-Mejorado-NR.jpg";
import img9051 from "../assets/imagenes/IMG_9051-Mejorado-NR.jpg";
import img9054 from "../assets/imagenes/IMG_9054-Mejorado-NR.jpg";
import img9124 from "../assets/imagenes/IMG_9124-Mejorado-NR.jpg";

/* TIPADO */
interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
}

const Home: React.FC = () => {
  const [productos] = useState<Producto[]>([]);

  /* SLIDER */
  const slides = [
    { src: img8361, alt: "Orígenes - Ambiente" },
    { src: img8398, alt: "Orígenes - Cocina" },
    { src: img8410, alt: "Orígenes - Cocina" },
    { src: img8414, alt: "Orígenes - Preparaciones" },
    { src: img8510, alt: "Orígenes - Bar" },
    { src: img8571, alt: "Orígenes - Experiencia" },
    { src: img8594, alt: "Orígenes - Detalles" },
    { src: img8613, alt: "Orígenes - Cocina" },
    { src: img8740, alt: "Orígenes - Ambiente" },
    { src: img8767, alt: "Orígenes - Bar" },
    { src: img8882, alt: "Orígenes - Preparaciones" },
    { src: img8938, alt: "Orígenes - Detalles" },
    { src: img8996, alt: "Orígenes - Experiencia" },
    { src: img9051, alt: "Orígenes - Ambiente" },
    { src: img9054, alt: "Orígenes - Bar" },
    {
      src: img9124,
      alt: "Orígenes - Cocina",
      position: "center 24%",
    },
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="elegant-bg">
      <Navbar />

      {/* HERO */}
      <section className="elegant-wrap">
        <div className="container elegant-card">
          <h1 className="text-center elegant-title mb-2">
            Esto es Orígenes RestoBar
          </h1>
          <p className="text-center elegant-subtitle mb-4">
            Sabores con identidad. Hechos para compartir.
          </p>

          {/* SLIDER */}
          <div className="origenes-slider">
            <button
              className="origenes-slider__btn origenes-slider__btn--left"
              onClick={() =>
                setSlideIndex(
                  slideIndex === 0 ? slides.length - 1 : slideIndex - 1
                )
              }
            >
              ‹
            </button>

            <div className="origenes-slider__frame">
              <img
                src={slides[slideIndex].src}
                alt={slides[slideIndex].alt}
                className="origenes-slider__img"
                style={{
                  objectPosition:
                    (slides[slideIndex] as any).position ?? "center center",
                }}
              />
            </div>

            <button
              className="origenes-slider__btn origenes-slider__btn--right"
              onClick={() =>
                setSlideIndex(
                  slideIndex === slides.length - 1 ? 0 : slideIndex + 1
                )
              }
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* HISTORIA / MISIÓN / VISIÓN */}
      <section className="pb-5">
        <div className="container">

          {/* ✅ NUEVO: BOTÓN ARRIBA DE HISTORIA (MISMA CARTA) */}
          <div className="text-center mb-4">
            <Link to="/productos" className="social-card carta-btn mx-auto">
              <i className="bi bi-journal-text social-icon" />
              <span>Ver la carta</span>
            </Link>


          </div>

          {/* HISTORIA */}
          <div className="text-center mb-5">
            <h2 className="section-title mb-3">Historia</h2>
            <div className="section-box historia-box mx-auto">
              <p className="mb-0" style={{ color: "var(--muted)" }}>
                Orígenes nace en el corazón de San José de Maipo, inspirado en
                nuestras raíces y en el camino que cada uno de nosotros ha
                recorrido. Creemos que la cocina es memoria, identidad y
                encuentro. Por eso cuidamos cada detalle de nuestras
                preparaciones, respetando la tradición que nos formó, pero
                atreviéndonos a innovar con nuevos sabores y técnicas. Somos un
                resto bar donde lo clásico y lo moderno conviven, donde cada
                plato cuenta una historia y cada copa acompaña un momento. En
                Orígenes honramos de dónde venimos, para crear experiencias que
                se disfrutan hoy.
              </p>
            </div>
          </div>

          {/* MISIÓN Y VISIÓN */}
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <h3 className="h5 text-center section-title">Misión</h3>
              <div className="section-box">
                <p className="mb-0" style={{ color: "var(--muted)" }}>
                  Brindar una experiencia gastronómica auténtica en San José de
                  Maipo, elaborando cada plato con dedicación y respeto por
                  nuestras raíces, combinando la tradición culinaria con la
                  innovación y ofreciendo un espacio acogedor donde la comida y
                  el encuentro se convierten en momentos memorables.
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <h3 className="h5 text-center section-title">Visión</h3>
              <div className="section-box">
                <p className="mb-0" style={{ color: "var(--muted)" }}>
                  Ser un referente gastronómico en la zona cordillerana,
                  reconocido por la calidad de nuestras preparaciones y el
                  respeto por la identidad local, sin perder la esencia que
                  define a Orígenes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ NUEVO: REDES SOCIALES + OPINIONES GOOGLE (IFRAME) */}
      <section className="pb-5">
        <div className="container text-center">
          <h2 className="section-title mb-4">Conéctate con Orígenes</h2>

          {/* REDES */}
          <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap">
            <a
              href="https://www.instagram.com/origenes.restobar?igsh=cnY4M3BueWN5ejRz"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <i className="bi bi-instagram social-icon"></i>
              <span>@origenes.restobar</span>
            </a>

            <a
              href="https://wa.me/56966475903"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <i className="bi bi-whatsapp social-icon"></i>
              <span>Reservas por WhatsApp</span>
            </a>
          </div>

          <div
            className="section-box mx-auto"
            style={{ maxWidth: "900px", padding: 0, overflow: "hidden" }}
          >
            <iframe
              src="https://www.google.com/maps?q=Or%C3%ADgenes%20RestoBar%20San%20Jos%C3%A9%20de%20Maipo&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Opiniones Google - Orígenes RestoBar"
            />
          </div>

          <a
            href="https://share.google/esvbRq9WHfGbAPSGg"
            target="_blank"
            rel="noopener noreferrer"
            className="elegant-link"
            style={{ marginTop: 14, display: "inline-block" }}
          >
            Ver reseñas en Google
          </a>
        </div>
      </section>
      <ThemeToggle />
      <Footer />
    </div>
  );
};

export default Home;
