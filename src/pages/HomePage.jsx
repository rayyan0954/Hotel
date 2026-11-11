import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuickBookingBar from "../components/QuickBookingBar";
import LightboxModal from "../components/LightboxModal";
import {
  HOTEL_CONFIG,
  GALLERY_ITEMS,
  AMENITIES,
  TESTIMONIALS,
  FAQ_ITEMS,
} from "../data/hotelConfig";

export default function HomePage() {
  // Gallery state
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  // Mobile room slider state
  const [sliderIndex, setSliderIndex] = useState(0);

  const roomEntries = Object.entries(HOTEL_CONFIG.rooms);

  const filteredGallery =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const toggleFaq = (index) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  // Auto slide mobile rooms
  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % roomEntries.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [roomEntries.length]);

  return (
    <div className="page-fade-in">
      {/* HERO */}
      <section id="home" className="hero">
        <div className="overlay"></div>
        <div className="hero-content" data-aos="zoom-in">
          <h1>Experience Luxury Like Never Before</h1>
          <p>Spacious Rooms • Rooftop Pool • Premium Dining • Free Wi-Fi</p>
          <div className="hero-buttons">
            <Link to="/booking" className="btn">
              Book Your Stay
            </Link>
            <a href="#rooms" className="btn-outline">
              Explore Rooms
            </a>
          </div>
        </div>
      </section>

      {/* QUICK BOOKING BAR */}
      <QuickBookingBar />

      {/* ABOUT */}
      <section className="about section">
        <div className="container about-grid">
          <div className="about-text" data-aos="fade-right">
            <h2>Welcome To {HOTEL_CONFIG.name}</h2>
            <p>
              Enjoy premium hospitality with elegant interiors, spacious executive rooms,
              24×7 concierge support, high-speed Wi-Fi, gourmet complimentary breakfast,
              and exceptional service in Jubilee Hills, Hyderabad.
            </p>
            <p>
              Whether you are travelling for corporate business or a luxury vacation, our
              hotel ensures an unforgettable five-star experience.
            </p>
            <Link to="/booking" className="btn">
              Reserve Your Room
            </Link>
          </div>

          <div className="about-image" data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200"
              alt="Elegantly designed grand hotel lobby"
            />
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Our Premium Rooms
          </h2>

          {/* Desktop & Tablet Rooms Grid */}
          <div className="rooms-grid" data-aos="fade-up">
            {roomEntries.map(([roomName, room]) => (
              <div
                key={roomName}
                className={`room-card ${room.featured ? "featured" : ""}`}
              >
                {room.badge && <div className="room-badge">{room.badge}</div>}

                <div className="room-card-image">
                  <img src={room.cardImage} alt={roomName} />
                  <span className="room-price-badge">
                    ₹{room.price.toLocaleString("en-IN")} / Night
                  </span>
                </div>

                <div className="room-card-content">
                  <h3>{roomName}</h3>
                  <p className="room-desc">{room.description}</p>

                  <div className="room-specs">
                    <span>
                      <i className="fa-solid fa-user-group"></i> Up to {room.maxGuests} Guests
                    </span>
                    <span>
                      <i className="fa-solid fa-bed"></i> {room.bedType}
                    </span>
                    <span>
                      <i className="fa-solid fa-ruler-combined"></i> {room.size}
                    </span>
                  </div>

                  <ul className="room-features">
                    {room.cardAmenities.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fa-solid fa-check"></i> {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="room-card-actions">
                    <Link to={`/rooms/${room.slug}`} className="btn-outline room-btn-details">
                      View Details
                    </Link>
                    <Link
                      to={`/booking?roomtype=${encodeURIComponent(roomName)}`}
                      className="btn room-btn-book"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slider View */}
          <div className="slider-mobile-only">
            <div className="slider" id="roomSlider">
              <div
                className="slides"
                style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
              >
                {roomEntries.map(([roomName, room]) => (
                  <div key={roomName} className="slide">
                    <Link to={`/rooms/${room.slug}`}>
                      <img src={room.cardImage} alt={roomName} />
                      <div className="caption">
                        <h3>{roomName}</h3>
                        <p>Starting ₹{room.price.toLocaleString("en-IN")} / Night</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <button
                className="prev"
                aria-label="Previous room"
                onClick={() =>
                  setSliderIndex(
                    (prev) => (prev - 1 + roomEntries.length) % roomEntries.length
                  )
                }
                type="button"
              >
                ❮
              </button>
              <button
                className="next"
                aria-label="Next room"
                onClick={() => setSliderIndex((prev) => (prev + 1) % roomEntries.length)}
                type="button"
              >
                ❯
              </button>

              <div className="dots">
                {roomEntries.map(([name], idx) => (
                  <span
                    key={name}
                    className={`dot ${idx === sliderIndex ? "active" : ""}`}
                    onClick={() => setSliderIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="section amenities">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Hotel Amenities
          </h2>
          <div className="amenities-grid">
            {AMENITIES.map((item, idx) => (
              <div
                key={idx}
                className="amenity-card"
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
              >
                <i className={item.icon}></i>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Gallery Showcase
          </h2>

          {/* Filter Pills */}
          <div className="gallery-filters" data-aos="fade-up">
            {[
              { id: "all", label: "All" },
              { id: "rooms", label: "Rooms" },
              { id: "pool", label: "Pool & Spa" },
              { id: "dining", label: "Dining" },
            ].map((f) => (
              <button
                key={f.id}
                className={`gallery-filter-btn ${activeFilter === f.id ? "active" : ""}`}
                onClick={() => setActiveFilter(f.id)}
                type="button"
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredGallery.map((img, idx) => (
              <div
                key={idx}
                className="gallery-item"
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                onClick={() => openLightbox(idx)}
              >
                <img src={img.src} alt={img.alt} />
                <div className="gallery-overlay">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                  <span>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={filteredGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={prevLightbox}
        onNext={nextLightbox}
      />

      {/* LOCATION */}
      <section id="location" className="section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Find Us
          </h2>
          <div className="location-grid">
            <div className="map" data-aos="fade-right">
              <iframe
                title="Hotel Google Maps Location"
                src="https://www.google.com/maps?q=Hyderabad&output=embed"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div className="location-info" data-aos="fade-left">
              <h3>{HOTEL_CONFIG.name}</h3>
              <p>
                <i className="fa-solid fa-location-dot"></i>
                {HOTEL_CONFIG.address.street}
                <br />
                {HOTEL_CONFIG.address.city}, {HOTEL_CONFIG.address.state}
                <br />
                {HOTEL_CONFIG.address.country}
              </p>
              <p>
                <i className="fa-solid fa-phone"></i> {HOTEL_CONFIG.phone}
              </p>
              <p>
                <i className="fa-solid fa-envelope"></i> {HOTEL_CONFIG.email}
              </p>
              <p>
                <i className="fa-solid fa-clock"></i> Open 24 Hours
              </p>
              <Link to="/booking" className="btn">
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Frequently Asked Questions
          </h2>
          <div className="faq-accordion" data-aos="fade-up">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${activeFaq === idx ? "active" : ""}`}
              >
                <button
                  className="faq-question"
                  aria-expanded={activeFaq === idx}
                  onClick={() => toggleFaq(idx)}
                  type="button"
                >
                  <span>{faq.question}</span>
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Guest Reviews
          </h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <h4>{"★".repeat(t.stars)}</h4>
                <p>{t.text}</p>
                <strong>— {t.author}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container" data-aos="zoom-in">
          <h2>Ready for Your Next Stay?</h2>
          <p>Reserve your room today and experience unmatched luxury.</p>
          <Link to="/booking" className="btn">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
