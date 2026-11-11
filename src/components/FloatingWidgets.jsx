import { useScrollHeader } from "../hooks/useScrollHeader";
import { HOTEL_CONFIG } from "../data/hotelConfig";

export default function FloatingWidgets() {
  const { showTopBtn } = useScrollHeader(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://wa.me/${HOTEL_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${HOTEL_CONFIG.name}, I have an inquiry regarding booking a room.`
  )}`;

  return (
    <>
      <a
        href={whatsappUrl}
        className="whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      <button
        id="topBtn"
        className={showTopBtn ? "show" : ""}
        title="Back to Top"
        aria-label="Back to Top"
        onClick={scrollToTop}
        type="button"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}
