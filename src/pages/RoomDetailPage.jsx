import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LightboxModal from "../components/LightboxModal";
import { HOTEL_CONFIG } from "../data/hotelConfig";

export default function RoomDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find room by slug, or default to standard-room
  const rooms = HOTEL_CONFIG.rooms;
  const currentEntry =
    Object.entries(rooms).find(([, r]) => r.slug === slug) ||
    Object.entries(rooms)[0];

  const [roomName, room] = currentEntry;

  // Lightbox for room gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const otherRooms = Object.entries(rooms).filter(([name]) => name !== roomName);

  return (
    <div className="page-fade-in">
      {/* ROOM DETAIL HERO */}
      <section
        className="room-hero"
        style={{ backgroundImage: `url('${room.heroImage}')` }}
      >
        <div className="room-hero-overlay"></div>
        <div className="container room-hero-content" data-aos="fade-up">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <Link to="/#rooms">Rooms</Link>
            <span className="separator">/</span>
            <span className="current-crumb">{roomName}</span>
          </nav>

          <span className="room-type-badge">
            Starting ₹{room.price.toLocaleString("en-IN")} / Night
          </span>
          <h1>{roomName}</h1>
          <p>{room.description}</p>

          <div className="room-quick-specs">
            {room.quickSpecs.map((spec, i) => (
              <span key={i}>
                <i className={spec.icon}></i> {spec.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ROOM DETAILS & RESERVATION */}
      <section className="room-details section">
        <div className="container">
          {/* Quick Room Switcher Tabs */}
          <div className="room-switcher" data-aos="fade-up">
            <span style={{ fontWeight: 600, alignSelf: "center", marginRight: 8 }}>
              Compare Rooms:
            </span>
            {Object.entries(rooms).map(([name, r]) => (
              <Link
                key={name}
                to={`/rooms/${r.slug}`}
                className={`room-switcher-pill ${r.slug === slug ? "active" : ""}`}
              >
                <i className="fa-solid fa-bed"></i> {name} (₹{r.price.toLocaleString("en-IN")})
              </Link>
            ))}
          </div>

          <div className="room-detail-grid">
            {/* Main Info */}
            <div className="room-detail-main" data-aos="fade-right">
              <h2>Room Overview</h2>
              <p>{room.overview}</p>

              <h3 className="mt-4 mb-2">Key Amenities Included</h3>
              <div className="room-amenities-grid">
                {room.amenities.map((item, idx) => (
                  <div key={idx}>
                    <i className={item.icon}></i> {item.text}
                  </div>
                ))}
              </div>

              <h3 className="mt-4 mb-2">Hotel Policies & Inclusions</h3>
              <ul className="room-policy-list">
                {room.policies.map((p, idx) => (
                  <li key={idx}>
                    <strong>{p.label}:</strong> {p.value}
                  </li>
                ))}
              </ul>

              <h3 className="mt-4 mb-3">Room Showcase Gallery</h3>
              <div className="room-gallery-grid">
                {room.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    style={{ cursor: "pointer" }}
                    onClick={() => openLightbox(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Reservation Sidebar Card */}
            <div className="room-reservation-card" data-aos="fade-left">
              <div className="reservation-box">
                <h3>Reserve {roomName}</h3>
                <div className="reservation-price">
                  <span className="price">₹{room.price.toLocaleString("en-IN")}</span>
                  <span className="unit">/ Night + Tax</span>
                </div>

                <ul className="reservation-perks">
                  {room.perks.map((perk, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-check"></i> {perk}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/booking?roomtype=${encodeURIComponent(roomName)}`}
                  className="btn w-100"
                >
                  <i className="fa-solid fa-calendar-check" style={{ marginRight: 8 }}></i>
                  Reserve This Room
                </Link>

                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 15,
                    borderTop: "1px dashed var(--border)",
                    textAlign: "center",
                    fontSize: "0.85rem",
                    color: "var(--gray)",
                  }}
                >
                  <i className="fa-solid fa-headset" style={{ color: "var(--primary)", marginRight: 5 }}></i>
                  Need assistance? Call concierge: <br />
                  <a href={`tel:${HOTEL_CONFIG.phone}`} style={{ color: "var(--primary)", fontWeight: 600 }}>
                    {HOTEL_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER ROOMS SUGGESTION */}
      <section className="section" style={{ background: "var(--light)", paddingTop: 40, paddingBottom: 60 }}>
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Explore Other Rooms
          </h2>
          <div className="rooms-grid" data-aos="fade-up">
            {otherRooms.map(([name, r]) => (
              <div key={name} className="room-card">
                <div className="room-card-image">
                  <img src={r.cardImage} alt={name} />
                  <span className="room-price-badge">
                    ₹{r.price.toLocaleString("en-IN")} / Night
                  </span>
                </div>
                <div className="room-card-content">
                  <h3>{name}</h3>
                  <p className="room-desc">{r.description}</p>
                  <div className="room-card-actions">
                    <Link to={`/rooms/${r.slug}`} className="btn-outline room-btn-details">
                      View Details
                    </Link>
                    <Link
                      to={`/booking?roomtype=${encodeURIComponent(name)}`}
                      className="btn room-btn-book"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Room Gallery */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={room.gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev - 1 + room.gallery.length) % room.gallery.length)
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % room.gallery.length)
        }
      />
    </div>
  );
}
