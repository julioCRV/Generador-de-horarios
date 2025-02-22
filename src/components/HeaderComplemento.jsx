import { useState, useEffect } from "react";
import "./HeaderComplemento.css"; // Archivo CSS separado

export default function HeaderComplemento() {
  const imagenes = ["../A.jpg", "../B.jpg", "../C.jpeg", "../D.jpeg"];
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
  };

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="header-container">
      <h1 className="title">Quiénes Somos</h1>
      <br />
      <div className={`carousel ${modalOpen ? "hidden" : ""}`}>
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
            onClick={() => openModal(imagenes[index])}
          />

          {/* Imagen derecha */}
          <div
            className="slide right"
            style={{ backgroundImage: `url(${imagenes[(index + 1) % imagenes.length]})` }}
            onClick={() => nextSlide()}
          />
        </div>

        {/* Modal para la imagen en grande */}
        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage} alt="Imagen ampliada" className="modal-image" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
