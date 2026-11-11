import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BookingConfirmationModal, ErrorModal } from "../components/Modal";
import { HOTEL_CONFIG, SCRIPT_URL } from "../data/hotelConfig";

export default function BookingPage() {
  const [searchParams] = useSearchParams();

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [checkin, setCheckin] = useState(todayStr);
  const [checkout, setCheckout] = useState(tomorrowStr);
  const [roomtype, setRoomtype] = useState("Standard Room");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({});
  const [loadTime] = useState(() => Date.now());

  // Status & Modals
  const [submitting, setSubmitting] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize from search params if present
  useEffect(() => {
    const paramRoom = searchParams.get("roomtype");
    if (paramRoom) {
      const match = Object.keys(HOTEL_CONFIG.rooms).find(
        (key) =>
          key.toLowerCase() === paramRoom.toLowerCase() ||
          paramRoom.toLowerCase().includes(key.toLowerCase())
      );
      if (match) setRoomtype(match);
    }
    const paramCheckin = searchParams.get("checkin");
    if (paramCheckin) setCheckin(paramCheckin);

    const paramCheckout = searchParams.get("checkout");
    if (paramCheckout) setCheckout(paramCheckout);

    const paramGuests = searchParams.get("guests");
    if (paramGuests) setGuests(paramGuests);
  }, [searchParams]);

  // Live pricing breakdown
  const pricing = useMemo(() => {
    const room = HOTEL_CONFIG.rooms[roomtype] || HOTEL_CONFIG.rooms["Standard Room"];
    const rate = room.price;

    let nights = 1;
    if (checkin && checkout) {
      const start = new Date(checkin);
      const end = new Date(checkout);
      const diff = end.getTime() - start.getTime();
      if (diff > 0) {
        nights = Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
      }
    }

    const roomCharges = rate * nights;
    const taxAmount = Math.round(roomCharges * HOTEL_CONFIG.taxRate);
    const totalAmount = roomCharges + taxAmount;

    return {
      roomName: roomtype,
      rate,
      nights,
      roomCharges,
      taxAmount,
      totalAmount,
    };
  }, [roomtype, checkin, checkout]);

  // Handle check-in change with auto-adjusting check-out
  const handleCheckinChange = (val) => {
    setCheckin(val);
    if (val) {
      const cDate = new Date(val);
      const minOut = new Date(cDate);
      minOut.setDate(minOut.getDate() + 1);
      const minOutStr = minOut.toISOString().split("T")[0];
      if (new Date(checkout) <= cDate) {
        setCheckout(minOutStr);
      }
    }
  };

  const validate = () => {
    const errs = {};
    if (!name.trim() || name.trim().length < 3) {
      errs.name = "Full name required (min 3 characters)";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.trim())) {
      errs.phone = "Valid 10-digit mobile number required (starts with 6-9)";
    }
    if (!guests) {
      errs.guests = "Please select number of guests";
    }
    if (!checkin) {
      errs.checkin = "Check-in date is required";
    }
    if (!checkout) {
      errs.checkout = "Check-out date is required";
    } else if (new Date(checkout) <= new Date(checkin)) {
      errs.checkout = "Check-out must be after check-in date";
    }
    if (!roomtype) {
      errs.roomtype = "Please select a room type";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Spam honeypot
    if (honeypot) return;

    // Too fast submission check (bot trap)
    if (Date.now() - loadTime < 2500) {
      setErrorMessage("Please take a moment to review your details before submitting.");
      return;
    }

    // Cooldown check
    const lastSubmit = localStorage.getItem("lastSubmitTime");
    if (lastSubmit && Date.now() - Number(lastSubmit) < 30000) {
      setErrorMessage("Please wait 30 seconds before submitting another booking request.");
      return;
    }

    const refId = "RLS-" + Math.floor(1000 + Math.random() * 9000);

    const payload = {
      type: "booking",
      refId: refId,
      timestamp: new Date().toLocaleString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      checkin: checkin,
      checkout: checkout,
      nights: pricing.nights,
      guests: guests,
      roomtype: roomtype,
      totalAmount: pricing.totalAmount,
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
        localStorage.setItem("lastSubmitTime", Date.now().toString());
        setConfirmationDetails({
          ...payload,
          refId: result.refId || refId,
        });
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setErrorMessage(result.message || "Failed to submit booking request.");
      }
    } catch (err) {
      // If CORS blocks reading JSON but network reached Google script:
      setErrorMessage(
        "Notice: Network request encountered an issue. If you received a confirmation email, your booking was recorded. Otherwise please contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-page page-fade-in">
      <div className="container">
        <div className="booking-card" data-aos="fade-up">
          <h1>Book Your Luxury Stay</h1>
          <p>
            Fill in the details below and reserve your stay with best price guarantee.
            Our team will confirm your reservation via email shortly.
          </p>

          <form id="bookingForm" className="booking-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohammed Rayyan"
                  className={errors.name ? "input-error" : ""}
                  required
                />
                <small className="error">{errors.name}</small>
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className={errors.email ? "input-error" : ""}
                  required
                />
                <small className="error">{errors.email}</small>
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone">Phone Number (10 digits) *</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9164222302"
                  maxLength={10}
                  className={errors.phone ? "input-error" : ""}
                  required
                />
                <small className="error">{errors.phone}</small>
              </div>

              {/* Guests */}
              <div className="form-group">
                <label htmlFor="guests">Number of Guests *</label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className={errors.guests ? "input-error" : ""}
                  required
                >
                  <option value="">Select Guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
                <small className="error">{errors.guests}</small>
              </div>

              {/* Check-in Date */}
              <div className="form-group">
                <label htmlFor="checkin">Check-in Date *</label>
                <input
                  type="date"
                  id="checkin"
                  min={todayStr}
                  value={checkin}
                  onChange={(e) => handleCheckinChange(e.target.value)}
                  className={errors.checkin ? "input-error" : ""}
                  required
                />
                <small className="error">{errors.checkin}</small>
              </div>

              {/* Check-out Date */}
              <div className="form-group">
                <label htmlFor="checkout">Check-out Date *</label>
                <input
                  type="date"
                  id="checkout"
                  min={checkin || todayStr}
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  className={errors.checkout ? "input-error" : ""}
                  required
                />
                <small className="error">{errors.checkout}</small>
              </div>

              {/* Room Type */}
              <div className="form-group full">
                <label htmlFor="roomtype">Room Type *</label>
                <select
                  id="roomtype"
                  value={roomtype}
                  onChange={(e) => setRoomtype(e.target.value)}
                  className={errors.roomtype ? "input-error" : ""}
                  required
                >
                  {Object.entries(HOTEL_CONFIG.rooms).map(([name, r]) => (
                    <option key={name} value={name}>
                      {name} (₹{r.price.toLocaleString("en-IN")} / night)
                    </option>
                  ))}
                </select>
                <small className="error">{errors.roomtype}</small>
              </div>

              {/* Special Requests */}
              <div className="form-group full">
                <label htmlFor="message">Special Requests / Preferences (Optional)</label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention any special requirements, flight timings, airport pickup, dietary preferences, extra bedding..."
                ></textarea>
              </div>

              {/* Booking Summary Breakdown */}
              <div className="booking-summary-box full" id="bookingSummaryBox">
                <h3>
                  <i className="fa-solid fa-receipt"></i> Booking Summary Breakdown
                </h3>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Selected Room:</span>
                    <strong>{pricing.roomName}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Rate per Night:</span>
                    <strong>₹{pricing.rate.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Duration of Stay:</span>
                    <strong>
                      {pricing.nights} {pricing.nights === 1 ? "Night" : "Nights"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    <span>Room Charges:</span>
                    <strong>₹{pricing.roomCharges.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Estimated Taxes (9% GST):</span>
                    <strong>₹{pricing.taxAmount.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="summary-row total-row">
                    <span>Estimated Total Amount:</span>
                    <strong>₹{pricing.totalAmount.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-group full">
                <button
                  type="submit"
                  className="btn"
                  id="submitBtn"
                  disabled={submitting}
                >
                  <span>
                    {submitting ? "Submitting Booking..." : "Submit Booking Request"}
                  </span>
                  {submitting && <div className="loader"></div>}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={!!confirmationDetails}
        details={confirmationDetails}
        onClose={() => setConfirmationDetails(null)}
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
