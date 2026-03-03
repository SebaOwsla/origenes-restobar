import { NavLink } from "react-router-dom";
import logo from "../assets/imagenes/logito.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark elegant-navbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/" end>
          <img className="brand-logo" src={logo} alt="Orígenes" />
          <span className="brand-text">Orígenes</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
                {/*<li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Inicio
              </NavLink>
            </li>

            * ✅ MENÚ → Index.tsx */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/menu">
                Menú
              </NavLink>
            </li>

            {/* ✅ CARTA → Carta.tsx (PRODUCTOS) */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">
                Carta
              </NavLink>
            </li>

            {/*<li className="nav-item">
              <NavLink className="nav-link" to="/contacto">
                Contacto
              </NavLink>
            </li>*/}
          </ul>
        </div>
      </div>
    </nav>
  );
}
