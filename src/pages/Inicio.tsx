import { Link } from "react-router-dom";
import logo from "../assets/imagenes/logoooo.png";

import "./inicio.css";

export default function Inicio() {
  return (
    <main className="inicio">
      <div className="inicio__card">

        <img
          className="inicio__logo animate-logo"
          src={logo}
          alt="Logo Orígenes"
        />

        <h1 className="inicio__title animate-text">
          Bienvenidos a Orígenes
        </h1>

        <p className="inicio__subtitle animate-text delay-1">
          Resto Bar
        </p>

        <Link className="inicio__btn" to="/menu">
          Ir al menú
        </Link>


      </div>
    </main>
  );
}
