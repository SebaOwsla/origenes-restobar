import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const light = saved === "light";
    setIsLight(light);
    document.body.classList.toggle("theme-light", light);
  }, []);

  const toggleTheme = () => {
    setIsLight((prev) => {
      const next = !prev;
      document.body.classList.toggle("theme-light", next);
      localStorage.setItem("theme", next ? "light" : "dark");
      return next;
    });
  };

  return (
    <button
      type="button"
      className="theme-fab"
      onClick={toggleTheme}
      aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      title={isLight ? "Modo oscuro" : "Modo claro"}
    >
      <span className="theme-fab__icon" aria-hidden="true">
        {isLight ? "🌙" : "☀️"}
      </span>
      <span className="theme-fab__text">
        {isLight ? "Oscuro" : "Claro"}
      </span>
    </button>
  );
}
