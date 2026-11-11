import { Link } from "react-router-dom";
import { HOTEL_CONFIG } from "../data/hotelConfig";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <h3>{HOTEL_CONFIG.name}</h3>
          <p>Luxury • Comfort • Hospitality</p>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/_r_y.a.n/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
            <a
              href="https://linkedin.com/in/rayyan0954/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/#rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/#amenities">Amenities</Link>
            </li>
            <li>
              <Link to="/booking">Booking</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact & Location</h4>
          <p>
            <i className="fa-solid fa-location-dot"></i> {HOTEL_CONFIG.address.street},{" "}
            {HOTEL_CONFIG.address.city}
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> {HOTEL_CONFIG.phone}
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> {HOTEL_CONFIG.email}
          </p>
          <p>
            <i className="fa-solid fa-clock"></i> Open 24 × 7
          </p>
        </div>
      </div>

      <div className="copyright">
        <p>© 2026 {HOTEL_CONFIG.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
