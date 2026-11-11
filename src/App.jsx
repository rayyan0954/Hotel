import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";

import HomePage from "./pages/HomePage";
import RoomDetailPage from "./pages/RoomDetailPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";

// Scroll to top helper or scroll to hash anchor on route changes
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollHandler />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />

            {/* Dynamic Unified Room Page */}
            <Route path="/rooms/:slug" element={<RoomDetailPage />} />
            <Route path="/rooms" element={<Navigate to="/#rooms" replace />} />

            {/* Backwards compatibility for legacy HTML files */}
            <Route
              path="/standard-room.html"
              element={<Navigate to="/rooms/standard-room" replace />}
            />
            <Route
              path="/deluxe-room.html"
              element={<Navigate to="/rooms/deluxe-room" replace />}
            />
            <Route
              path="/executive-suite.html"
              element={<Navigate to="/rooms/executive-suite" replace />}
            />
            <Route
              path="/standard-room"
              element={<Navigate to="/rooms/standard-room" replace />}
            />
            <Route
              path="/deluxe-room"
              element={<Navigate to="/rooms/deluxe-room" replace />}
            />
            <Route
              path="/executive-suite"
              element={<Navigate to="/rooms/executive-suite" replace />}
            />

            {/* Booking Page */}
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking.html" element={<Navigate to="/booking" replace />} />

            {/* Contact Page */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact.html" element={<Navigate to="/contact" replace />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWidgets />
      </BrowserRouter>
    </ThemeProvider>
  );
}
