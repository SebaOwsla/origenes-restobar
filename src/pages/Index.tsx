import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

/* ICONOS */
import {
  FaInstagram,
  FaWhatsapp,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

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
import diaMadre from "../assets/imagenes/dia-madre.jpg";
import equipo from "../assets/imagenes/equipo.jpg";

const Home: React.FC = () => {
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

    /* NUEVAS */
    { src: diaMadre, alt: "Día de la Madre" },
    { src: equipo, alt: "Equipo Orígenes" },

    {
      src: img9124,
      alt: "Orígenes - Cocina",
      position: "center 24%",
    },
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="elegant-bg">
      <Navbar />

      {/* HERO */}
      <section className="hero-premium">
        <img
          src={slides[slideIndex].src}
          alt={slides[slideIndex].alt}
          className="hero-bg"
          style={{
            objectPosition:
              (slides[slideIndex] as any).position ?? "center center",
          }}
        />

        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <div className="hero-badge animate-fade-up">
            <FaStar />
            <span>Experiencia gastronómica premium</span>
          </div>

          <h1 className="hero-title animate-fade-up delay-1">
            Bienvenido a <span>Orígenes</span>
          </h1>

          <p className="hero-subtitle animate-fade-up delay-2">
            Cocina de autor, coctelería premium y sabores con identidad.
          </p>

          <div className="hero-buttons animate-fade-up delay-2">
            <Link
              to="/productos"
              className="hero-btn hero-btn-primary"
            >
              Ver Carta
              <FaArrowRight />
            </Link>

            <a
              href="https://wa.me/56966475903"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-secondary"
            >
              <FaWhatsapp />
              Reservar Mesa
            </a>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title text-center mb-5 animate-fade-up">
            Nuestra experiencia
          </h2>

          <div className="gallery-grid">

            {/* PRIMERAS 4 */}
            {slides.slice(0, 4).map((img, i) => (
              <div
                className="gallery-card"
                key={i}
                style={{
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <img src={img.src} alt={img.alt} />

                <div className="gallery-overlay">
                  <span>{img.alt}</span>
                </div>
              </div>
            ))}

            {/* DÍA DE LA MADRE */}
            <div
              className="gallery-card"
              style={{
                animationDelay: "0.7s",
              }}
            >
              <img
                src={diaMadre}
                alt="Día de la Madre"
              />

              <div className="gallery-overlay">
                <span>Día de la Madre</span>
              </div>
            </div>

            {/* EQUIPO ORÍGENES */}
            <div
              className="gallery-card"
              style={{
                animationDelay: "0.8s",
              }}
            >
              <img
                src={equipo}
                alt="Equipo Orígenes"
              />

              <div className="gallery-overlay">
                <span>Equipo Orígenes</span>
              </div>
            </div>

            {/* EXPERIENCIA */}
            <div
              className="gallery-card"
              style={{
                animationDelay: "0.9s",
              }}
            >
              <img
                src={slides[4].src}
                alt={slides[4].alt}
              />

              <div className="gallery-overlay">
                <span>Experiencia Premium</span>
              </div>
            </div>

            {/* COCTELERÍA */}
            <div
              className="gallery-card"
              style={{
                animationDelay: "1s",
              }}
            >
              <img
                src={slides[5].src}
                alt={slides[5].alt}
              />

              <div className="gallery-overlay">
                <span>Coctelería</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="pb-5">
        <div className="container">
          <div className="premium-box animate-fade-up">
            <h2 className="section-title mb-4 text-center">
              Nuestra Historia
            </h2>

            <p className="premium-text">
              Orígenes nace en el corazón de San José de Maipo inspirado
              en nuestras raíces, en los sabores auténticos y en la pasión
              por crear experiencias memorables.
            </p>

            <p className="premium-text">
              Fusionamos tradición y modernidad en cada plato, en cada
              copa y en cada rincón de nuestro espacio.
            </p>
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="pb-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="info-card animate-left">
                <h3>Misión</h3>

                <p>
                  Brindar una experiencia gastronómica auténtica,
                  combinando tradición culinaria con innovación y atención
                  excepcional.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="info-card animate-right">
                <h3>Visión</h3>

                <p>
                  Ser un referente gastronómico de la zona cordillerana,
                  reconocido por nuestra calidad y esencia única.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REDES */}
      <section className="pb-5">
        <div className="container text-center">
          <h2 className="section-title mb-5">
            Conecta con nosotros
          </h2>

          <div className="social-grid">
            <a
              href="https://www.instagram.com/origenes.restobar?igsh=cnY4M3BueWN5ejRz"
              target="_blank"
              rel="noopener noreferrer"
              className="social-premium"
            >
              <FaInstagram />
              <span>@origenes.restobar</span>
            </a>

            <a
              href="https://wa.me/56966475903"
              target="_blank"
              rel="noopener noreferrer"
              className="social-premium"
            >
              <FaWhatsapp />
              <span>Reservas WhatsApp</span>
            </a>
          </div>

          {/* MAPA */}
          <div className="map-box mt-5">
            <iframe
              src="https://www.google.com/maps?q=Or%C3%ADgenes%20RestoBar%20San%20Jos%C3%A9%20de%20Maipo&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              title="Mapa Orígenes"
            />
          </div>
        </div>
      </section>

      <ThemeToggle />
      <Footer />
    </div>
  );
};

export default Home;