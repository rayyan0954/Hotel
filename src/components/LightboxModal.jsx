import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function LightboxModal({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex] || images[0];

  return createPortal(
    <div
      id="galleryLightbox"
      className="lightbox-modal show"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.id === "galleryLightbox") onClose();
      }}
    >
      <span className="lightbox-close" aria-label="Close lightbox" onClick={onClose}>
        &times;
      </span>

      {images.length > 1 && (
        <>
          <button className="lightbox-prev" aria-label="Previous image" onClick={onPrev}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="lightbox-next" aria-label="Next image" onClick={onNext}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </>
      )}

      <div className="lightbox-content">
        <img id="lightboxImg" src={current.src} alt={current.alt || "Gallery preview"} />
        <div id="lightboxCaption" className="lightbox-caption">
          {current.caption || current.alt}
        </div>
      </div>
    </div>,
    document.body
  );
}
