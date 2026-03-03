import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="container my-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-uppercase mb-3"style={{
                  color: "white",
                  fontSize: "2rem",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                }}>
            Contáctanos
          </h1>
          <p className="text-muted fs-5">
            ¿Tienes dudas, pedidos especiales o sugerencias?
            <br />
            Completa el formulario y te responderemos pronto 🍰
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <form className="p-4 shadow rounded "style={{ backgroundColor: "#310701d0" }}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold text-white">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Ej: Ana González"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold text-white">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Ej: ana@email.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="form-label fw-semibold text-white">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Enviar mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
