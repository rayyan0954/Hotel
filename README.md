# Rayyan's Luxury Stay - React Edition 🏨✨

A modern, clean, component-driven React application converted from the multi-page HTML hotel website.

## 🚀 Key Usage in React

1. **Unified Dynamic Room Page (`/rooms/:slug`)**:
   - Replaced 3 separate redundant HTML files (`standard-room.html`, `deluxe-room.html`, `executive-suite.html`) with a single, clean, dynamic `RoomDetailPage` component driven by centralized room data in `src/data/hotelConfig.js`.
   - Added interactive **"Compare Rooms" switcher pills** on room pages for instant toggling between rooms without reloading the page.
   - Added breadcrumb navigation (`Home / Rooms / Standard Room`).
   - "Explore Other Rooms" comparison cards at the bottom of the page.

2. **100% Google Apps Script Compatibility (`Code.gs` --> Google Scripts)**:
   - Uses the exact same Google Apps Script Web App API endpoint (`SCRIPT_URL`).
   - Sends exact JSON payloads for both **Bookings** (`{ type: "booking", refId, name, email, phone, checkin, checkout, nights, guests, roomtype, totalAmount, message }`) and **Contact** (`{ type: "contact", name, email, subject, message }`).
   - Handles the backend's responses and reference IDs (`RLS-...`).

3. **Dynamic Pricing & Live Breakdown Engine**:
   - Live night calculator based on check-in and check-out dates.
   - Real-time price breakdown displaying room rate, stay duration, room subtotal, 9% GST tax, and grand total.
   - Auto-population of booking form inputs from URL search params.

4. **Modern Component Architecture**:
   - `Navbar`: Sticky blurred glassmorphism on scroll, smooth anchor navigation, active routes, and accessible mobile drawer.
   - `ThemeContext`: Seamless dark mode / light mode toggle saved in `localStorage` with OS preference detection.
   - `QuickBookingBar`: Instant rate check & redirect to booking page with pre-filled dates and guests.
   - `LightboxModal`: Accessible fullscreen image modal with keyboard controls (Escape, ArrowLeft, ArrowRight).
   - `BookingConfirmationModal` & `ErrorModal`: Professional confirmation summary with Booking Reference ID.
   - `FloatingWidgets`: WhatsApp quick inquiry button + Back to Top button.

## 📁 Project Structure

```text
react-hotel/
├── index.html                 # Main HTML template with Google Fonts, Font Awesome, and JSON-LD schema
├── package.json               # Dependencies (React 19, React Router v7, AOS, Vite)
├── vite.config.js             # Vite configuration
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Router, routes, scroll handler, AOS animation init
    ├── App.css                # Polished design enhancements & page transitions
    ├── index.css              # Full luxury hotel stylesheet & dark mode system
    ├── context/
    │   └── ThemeContext.jsx   # Dark / Light theme provider & hook
    ├── hooks/
    │   └── useScrollHeader.js # Header scroll detection & back to top trigger
    ├── data/
    │   └── hotelConfig.js     # Single source of truth: hotel info, room specs, gallery, amenities, FAQs
    ├── components/
    │   ├── Navbar.jsx         # Sticky navigation with mobile drawer & dark mode
    │   ├── Footer.jsx         # Clean footer with contact & social links
    │   ├── QuickBookingBar.jsx# Fast room reservation bar
    │   ├── FloatingWidgets.jsx# Floating WhatsApp & Back to Top triggers
    │   ├── LightboxModal.jsx  # Image gallery lightbox modal
    │   └── Modal.jsx          # Booking confirmation & error modals
    └── pages/
        ├── HomePage.jsx       # Hero, Quick Booking, About, Rooms, Amenities, Gallery, Location, FAQ, Testimonials
        ├── RoomDetailPage.jsx # Unified dynamic room page with gallery & sticky reservation box
        ├── BookingPage.jsx    # Real-time booking form, live price calculator, anti-spam & GAS submission
        └── ContactPage.jsx    # Contact information cards, message form & Google Maps
```

## 💻 How to Run Locally

```bash
# Navigate to the react-hotel directory
cd react-hotel

# Install dependencies (already installed)
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
