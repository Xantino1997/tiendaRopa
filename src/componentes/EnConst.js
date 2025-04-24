// src/components/EnConst.js
import React from "react";
import "../styles/EnConst.css";
import { Link } from "react-router-dom";
import maniqui from "./maniqui.png"
const EnConst = () => {
  return (
    <div className="enconst-container">
      <div className="enconst-box">
        <h1>¡Ups! Esta página está en construcción 🚧</h1>

        {/* Imagen o video */}
        <div className="media-container">
          {/* Imagen ejemplo */}
          <img src={maniqui} alt="En construcción" />

          {/* Para usar video, podés reemplazar el <img> por esto:
          <video controls autoPlay loop muted className="enconst-video">
            <source src="/videos/tu-video.mp4" type="video/mp4" />
            Tu navegador no soporta video.
          </video>
          */}
        </div>

        <p>Estamos trabajando para traerte una mejor experiencia.</p>

        <Link to="/" className="back-home-button">Volver al Inicio</Link>
      </div>
    </div>
  );
};

export default EnConst;
