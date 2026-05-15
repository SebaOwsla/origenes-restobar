import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import logo from "../assets/imagenes/logoooo.png";

import "./inicio.css";

export default function Inicio() {
  return (
    <main className="inicio">
      {/* Fondo glow */}
      <div className="inicio__bgGlow"></div>

      {/* Partículas */}
      <div className="inicio__particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="inicio__card">
        {/* Línea brillante */}
        <div className="inicio__line"></div>

        <img
          className="inicio__logo animate-logo"
          src={logo}
          alt="Logo Orígenes"
        />

        <div className="inicio__content">
          <span className="inicio__badge animate-fade">
            EXPERIENCIA GASTRONÓMICA
          </span>

          <h1 className="inicio__title animate-text">
            Bienvenidos a <span>Orígenes</span>
          </h1>

          <p className="inicio__subtitle animate-text delay-1">
            Cocina • Coctelería • Experiencia
          </p>

          <Link className="inicio__btn animate-btn" to="/menu">
            Entrar al menú
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}