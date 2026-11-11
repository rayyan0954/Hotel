import { useEffect } from "react";
import { createPortal } from "react-dom";

export function BookingConfirmationModal({ isOpen, details, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !details) return null;

  return createPortal(
    <div
      className="modal show"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal-content booking-confirmation-content">
        <i className="fa-solid fa-circle-check success-icon"></i>
        <h2>Booking Request Submitted!</h2>
        <p className="mb-3 text-center">
          Thank you for choosing <strong>Rayyan's Luxury Stay</strong>. Your reservation details have been recorded.
        </p>

        <div className="confirmation-details-card mb-4">
          <div className="conf-row">
            <span>Booking Reference ID:</span>
            <strong style={{ color: "var(--primary)" }}>{details.refId}</strong>
          </div>
          <div className="conf-row">
            <span>Guest Name:</span>
            <strong>{details.name}</strong>
          </div>
          <div className="conf-row">
            <span>Room Type:</span>
            <strong>{details.roomtype}</strong>
          </div>
          <div className="conf-row">
            <span>Check-In / Out:</span>
            <strong>
              {details.checkin} to {details.checkout}
            </strong>
          </div>
          <div className="conf-row">
            <span>Duration:</span>
            <strong>
              {details.nights} {details.nights === 1 ? "Night" : "Nights"}
            </strong>
          </div>
          <div className="conf-row conf-total">
            <span>Estimated Total:</span>
            <strong>₹{Number(details.totalAmount).toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <p className="text-muted small mb-4" style={{ textAlign: "center", fontSize: "0.85rem" }}>
          <i className="fa-solid fa-circle-info"></i> Our reservations desk will review your request and send a detailed confirmation receipt to <strong>{details.email}</strong> shortly.
        </p>

        <button className="btn w-100" onClick={onClose} type="button">
          Close Confirmation
        </button>
      </div>
    </div>,
    document.body
  );
}

export function ContactSuccessModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal show"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal-content">
        <i className="fa-solid fa-circle-check success-icon"></i>
        <h2>Message Sent!</h2>
        <p>
          Thank you for contacting <strong>Rayyan's Luxury Stay</strong>.
          <br />
          <br />
          We have received your message and our concierge will get back to you shortly.
        </p>
        <button className="btn" onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export function ErrorModal({ isOpen, message, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal show"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal-content">
        <i className="fa-solid fa-circle-xmark error-icon"></i>
        <h2>Submission Failed</h2>
        <p>{message || "Something went wrong. Please check your connection and try again."}</p>
        <button className="btn" onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}
