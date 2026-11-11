import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOTEL_CONFIG } from "../data/hotelConfig";

export default function QuickBookingBar() {
  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [checkin, setCheckin] = useState(todayStr);
  const [checkout, setCheckout] = useState(tomorrowStr);
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("Deluxe Room");

  const handleCheckinChange = (e) => {
    const val = e.target.value;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkin,
      checkout,
      guests,
      roomtype: roomType,
    });
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className="quick-booking-wrapper">
      <div className="container">
        <form id="quickBookingForm" className="quick-booking-bar" onSubmit={handleSubmit}>
          <div className="qb-field">
            <label htmlFor="qbCheckin">
              <i className="fa-solid fa-calendar-days"></i> Check-In
            </label>
            <input
              type="date"
              id="qbCheckin"
              min={todayStr}
              value={checkin}
              onChange={handleCheckinChange}
              required
            />
          </div>

          <div className="qb-field">
            <label htmlFor="qbCheckout">
              <i className="fa-solid fa-calendar-days"></i> Check-Out
            </label>
            <input
              type="date"
              id="qbCheckout"
              min={checkin || todayStr}
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              required
            />
          </div>

          <div className="qb-field">
            <label htmlFor="qbGuests">
              <i className="fa-solid fa-user-group"></i> Guests
            </label>
            <select
              id="qbGuests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
          </div>

          <div className="qb-field">
            <label htmlFor="qbRoom">
              <i className="fa-solid fa-bed"></i> Room Type
            </label>
            <select
              id="qbRoom"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            >
              {Object.keys(HOTEL_CONFIG.rooms).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="qb-btn-container">
            <button type="submit" className="btn qb-btn">
              <i className="fa-solid fa-arrow-right-to-bracket"></i> Check Rates & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
