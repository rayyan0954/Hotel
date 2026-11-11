import { useState } from "react";
import { ContactSuccessModal, ErrorModal } from "../components/Modal";
import { HOTEL_CONFIG, SCRIPT_URL } from "../data/hotelConfig";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loadTime] = useState(() => Date.now());

  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Valid email is required";
    }
    if (!subject.trim()) errs.subject = "Subject is required";
    if (!message.trim()) errs.message = "Message is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (honeypot) return; // Spam honeypot trap

    if (Date.now() - loadTime < 2000) {
      setErrorMessage("Please take your time to fill the form.");
      return;
    }

    const payload = {
      type: "contact",
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    try {
      setSubmitting(true);
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.status === "success") {
        setSuccessOpen(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setErrorMessage(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error occurred while submitting message. Please call or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-fade-in">
      <section className="contact-page">
        <div className="container">
          <div className="contact-wrapper">
            {/* Contact Info */}
            <div className="contact-info" data-aos="fade-right">
              <h1>Get in Touch</h1>
              <p>
                Our concierge desk is available 24/7 to assist you with room reservations, VIP
                arrangements, event bookings, and general inquiries.
              </p>

              <div className="info-card">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h3>Hotel Address</h3>
                  <p>
                    {HOTEL_CONFIG.address.street}
                    <br />
                    {HOTEL_CONFIG.address.city}, {HOTEL_CONFIG.address.state}{" "}
                    {HOTEL_CONFIG.address.zip}, {HOTEL_CONFIG.address.country}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-link"
                  >
                    <i className="fa-solid fa-diamond-turn-right"></i> Get Directions
                  </a>
                </div>
              </div>

              <div className="info-card">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h3>Phone & Reservations</h3>
                  <p>
                    {HOTEL_CONFIG.phone}
                    <br />
                    <small className="text-muted">Available 24/7 Concierge Desk</small>
                  </p>
                </div>
              </div>

              <div className="info-card">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h3>Email Inquiries</h3>
                  <p>
                    {HOTEL_CONFIG.email}
                    <br />
                    <small className="text-muted">Guaranteed response within 2 hours</small>
                  </p>
                </div>
              </div>

              <div className="info-card">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <h3>Front Desk Hours</h3>
                  <p>
                    24 Hours / 7 Days a Week
                    <br />
                    <small className="text-muted">
                      Standard Check-In: 12:00 PM | Check-Out: 11:00 AM
                    </small>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="contact-form-card" data-aos="fade-left">
              <form id="contactForm" onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="form-group">
                  <label htmlFor="contactName">Your Name *</label>
                  <input
                    type="text"
                    id="contactName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? "input-error" : ""}
                    required
                  />
                  <small className="error">{errors.name}</small>
                </div>

                <div className="form-group">
                  <label htmlFor="contactEmail">Email Address *</label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className={errors.email ? "input-error" : ""}
                    required
                  />
                  <small className="error">{errors.email}</small>
                </div>

                <div className="form-group">
                  <label htmlFor="contactSubject">Subject *</label>
                  <input
                    type="text"
                    id="contactSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Reservation Inquiry / Special Event"
                    className={errors.subject ? "input-error" : ""}
                    required
                  />
                  <small className="error">{errors.subject}</small>
                </div>

                <div className="form-group">
                  <label htmlFor="contactMessage">Message *</label>
                  <textarea
                    id="contactMessage"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message or inquiry here..."
                    className={errors.message ? "input-error" : ""}
                    required
                  ></textarea>
                  <small className="error">{errors.message}</small>
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  id="contactSubmitBtn"
                  disabled={submitting}
                >
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                  {submitting && <div className="loader"></div>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Hyderabad&output=embed"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>

      {/* Success Modal */}
      <ContactSuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={!!errorMessage}
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </div>
  );
}
