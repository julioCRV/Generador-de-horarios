import { useState, useEffect } from "react";
import "./HeaderComplemento.css"; // Archivo CSS separado

export default function HeaderComplemento() {
  const imagenes = ["../A.jpg", "../B.jpg", "../C.jpeg", "../D.jpeg"];
  const [index, setIndex] = useState(0);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       nextSlide();
  //     }, 4000); // Cambio automático cada 4 segundos

  //     return () => clearInterval(interval);
  //   }, [index]);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
  };

  const goToSlide = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <div className="header-container">
      <h1 className="title">Quiénes Somos</h1>
      <br />
      <div className="carousel">
        <div className="carousel-inner">
          {/* Imagen izquierda */}
          <div
            className="slide left"
            style={{ backgroundImage: `url(${imagenes[(index - 1 + imagenes.length) % imagenes.length]})` }}
            onClick={() => prevSlide()}
          />

          {/* Imagen central */}
          <div
            className="slide active"
            style={{ backgroundImage: `url(${imagenes[index]})` }}
          />

          {/* Imagen derecha */}
          <div
            className="slide right"
            style={{ backgroundImage: `url(${imagenes[(index + 1) % imagenes.length]})` }}
            onClick={() => nextSlide()}
          />
        </div>
      </div>
    </div>
  );
}
