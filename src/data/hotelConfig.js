export const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwWa4vcCYBih7qwV3H6BbaOD4_lPi_swXLFzWzAzHeug_PtH_BwoQ0WcYFx3endIOlq/exec";

export const HOTEL_CONFIG = {
  name: "Rayyan's Luxury Stay",
  tagline: "Comfort • Elegance • Luxury",
  phone: "+91 9164222302",
  email: "info@rayyansluxurystay.com",
  whatsappNumber: "919164222302",
  address: {
    street: "123 Luxury Avenue, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    zip: "500033",
    country: "India",
    short: "Hyderabad, Telangana",
  },
  taxRate: 0.09,
  rooms: {
    "Standard Room": {
      price: 999,
      maxGuests: 2,
      bedType: "Queen Size Bed",
      size: "280 sq.ft",
      heroImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1920",
      cardImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
      description: "A cozy, elegant haven designed for business travelers and couples seeking baseline luxury with complete modern convenience.",
      overview: "Our Standard Room offers a cozy and comfortable space thoughtfully crafted for short stays or business trips. Featuring high-thread-count linens, soundproof windows, ergonomic work desk, and high-speed Wi-Fi.",
      quickSpecs: [
        { icon: "fa-solid fa-user-group", text: "Up to 2 Guests" },
        { icon: "fa-solid fa-bed", text: "Queen Size Bed" },
        { icon: "fa-solid fa-ruler-combined", text: "280 sq.ft" },
        { icon: "fa-solid fa-shower", text: "En-suite Bathroom" },
      ],
      amenities: [
        { icon: "fa-solid fa-wifi", text: "Free High-Speed Wi-Fi" },
        { icon: "fa-solid fa-mug-hot", text: "Free Gourmet Breakfast" },
        { icon: "fa-solid fa-tv", text: '43" Smart LED TV' },
        { icon: "fa-solid fa-snowflake", text: "Climate Control Air-Con" },
        { icon: "fa-solid fa-vault", text: "In-Room Digital Safe" },
        { icon: "fa-solid fa-bottle-water", text: "Complimentary Mineral Water" },
      ],
      cardAmenities: ["High-speed Free Wi-Fi", "Complimentary Breakfast", "Smart LED TV"],
      policies: [
        { label: "Check-In", value: "12:00 PM | Check-Out: 11:00 AM" },
        { label: "Breakfast", value: "Served daily from 7:00 AM to 10:30 AM at the rooftop restaurant." },
        { label: "Cancellation", value: "Free cancellation up to 24 hours prior to check-in." },
      ],
      gallery: [
        { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800", alt: "Standard Bedroom" },
        { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800", alt: "Standard Living Area" },
        { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", alt: "Standard Bathroom" },
      ],
      perks: ["Best Price Guarantee", "Free Breakfast Included", "Instant Booking Request"],
      slug: "standard-room",
    },
    "Deluxe Room": {
      price: 1999,
      maxGuests: 3,
      bedType: "King Size Bed",
      size: "420 sq.ft",
      featured: true,
      badge: "Popular Choice",
      heroImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1920",
      cardImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
      description: "Elevated luxury featuring generous living space, plush king-size bed, private mini bar, and stunning panoramic city views.",
      overview: "Experience superior sophistication in our Deluxe Room. Offering expanded square footage, an inviting sofa lounge area, espresso machine, and floor-to-ceiling city views designed for ultimate relaxation.",
      quickSpecs: [
        { icon: "fa-solid fa-user-group", text: "Up to 3 Guests" },
        { icon: "fa-solid fa-bed", text: "King Size Bed" },
        { icon: "fa-solid fa-ruler-combined", text: "420 sq.ft" },
        { icon: "fa-solid fa-bath", text: "Designer Bath / Shower" },
      ],
      amenities: [
        { icon: "fa-solid fa-wifi", text: "High-Speed Free Wi-Fi" },
        { icon: "fa-solid fa-mug-hot", text: "Gourmet Buffet Breakfast" },
        { icon: "fa-solid fa-tv", text: '55" 4K Smart TV' },
        { icon: "fa-solid fa-wine-glass", text: "Fully Stocked Mini Bar" },
        { icon: "fa-solid fa-mug-saucer", text: "In-Room Espresso Machine" },
        { icon: "fa-solid fa-bath", text: "Plush Robes & Slippers" },
      ],
      cardAmenities: ["All Standard Amenities", "Mini Bar & Espresso", "Luxury Bathrobe & Toiletries"],
      policies: [
        { label: "Check-In", value: "12:00 PM | Check-Out: 11:00 AM" },
        { label: "Breakfast", value: "Complimentary full breakfast buffet included." },
        { label: "Cancellation", value: "Free cancellation up to 24 hours prior to check-in." },
      ],
      gallery: [
        { src: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=800", alt: "Deluxe Bedroom" },
        { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800", alt: "Deluxe Living Area" },
        { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800", alt: "Deluxe Bathroom" },
      ],
      perks: ["Best Price Guarantee", "Free Breakfast Included", "Instant Booking Request"],
      slug: "deluxe-room",
    },
    "Executive Suite": {
      price: 3499,
      maxGuests: 4,
      bedType: "California King Bed",
      size: "650 sq.ft",
      heroImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1920",
      cardImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
      description: "The pinnacle of opulent hospitality. Features a master bedroom, separate grand living room, private Jacuzzi, and 24/7 personal butler service.",
      overview: "Designed for dignitaries, VIPs, and discerning guests who expect the extraordinary. The Executive Suite offers a lavish master bedroom, private dining set, automated smart lighting, private Jacuzzi spa, and personal butler attention.",
      quickSpecs: [
        { icon: "fa-solid fa-user-group", text: "Up to 4 Guests" },
        { icon: "fa-solid fa-bed", text: "California King" },
        { icon: "fa-solid fa-ruler-combined", text: "650 sq.ft" },
        { icon: "fa-solid fa-hot-tub-person", text: "Private Jacuzzi" },
      ],
      amenities: [
        { icon: "fa-solid fa-hot-tub-person", text: "Private Jacuzzi & Steam Shower" },
        { icon: "fa-solid fa-bell-concierge", text: "24/7 Dedicated Butler" },
        { icon: "fa-solid fa-utensils", text: "Private Dining Set" },
        { icon: "fa-solid fa-tv", text: '65" OLED Home Theater System' },
        { icon: "fa-solid fa-champagne-glasses", text: "Complimentary Champagne Welcome" },
        { icon: "fa-solid fa-car", text: "Free Airport VIP Transfer" },
      ],
      cardAmenities: ["Private Jacuzzi & Steam Shower", "24/7 Personal Butler Service", "Panoramic Skyline View"],
      policies: [
        { label: "Check-In", value: "12:00 PM | Check-Out: 12:00 PM (Late Check-out Included)" },
        { label: "Breakfast", value: "In-suite or rooftop gourmet breakfast menu." },
        { label: "Cancellation", value: "Free cancellation up to 24 hours prior to check-in." },
      ],
      gallery: [
        { src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&q=80&w=800", alt: "Executive Master Bedroom" },
        { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", alt: "Executive Grand Hall" },
        { src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800", alt: "Executive Jacuzzi Bathroom" },
      ],
      perks: ["Best Price Guarantee", "Free In-Suite Gourmet Breakfast", "VIP Airport Transfer Included"],
      slug: "executive-suite",
    },
  },
};

export const GALLERY_ITEMS = [
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200", alt: "Rooftop Luxury Swimming Pool", caption: "Rooftop Swimming Pool", category: "pool" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200", alt: "Executive Suite Bedroom", caption: "Executive Suite", category: "rooms" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200", alt: "Resort Sunset Lounge View", caption: "Resort Lounge", category: "pool" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200", alt: "Fine Dining Rooftop Restaurant", caption: "Fine Dining Restaurant", category: "dining" },
  { src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1200", alt: "Deluxe Master Suite", caption: "Deluxe Suite", category: "rooms" },
  { src: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=1200", alt: "Gourmet Breakfast Buffet", caption: "Gourmet Breakfast", category: "dining" },
];

export const AMENITIES = [
  { icon: "fa-solid fa-wifi", title: "Free Wi-Fi", description: "High-speed internet throughout the hotel." },
  { icon: "fa-solid fa-mug-hot", title: "Breakfast", description: "Complimentary breakfast with every stay." },
  { icon: "fa-solid fa-person-swimming", title: "Swimming Pool", description: "Relax in our luxurious rooftop pool." },
  { icon: "fa-solid fa-dumbbell", title: "Fitness Center", description: "Modern gym with premium equipment." },
  { icon: "fa-solid fa-square-parking", title: "Free Parking", description: "Secure parking for all guests." },
  { icon: "fa-solid fa-bell-concierge", title: "24×7 Service", description: "Always available to assist our guests." },
];

export const TESTIMONIALS = [
  { stars: 5, text: "Amazing hospitality and spacious rooms. Highly recommended!", author: "Mohammed A." },
  { stars: 5, text: "Beautiful interiors and excellent customer service.", author: "Priya S." },
  { stars: 5, text: "One of the best luxury hotels for the price.", author: "Rahul K." },
];

export const FAQ_ITEMS = [
  { question: "What are the check-in and check-out times?", answer: "Standard check-in time is 12:00 PM and check-out is 11:00 AM. Early check-in or late check-out is subject to room availability upon request." },
  { question: "Is breakfast included with my room reservation?", answer: "Yes, all room bookings at Rayyan's Luxury Stay include complimentary gourmet buffet breakfast served daily at our rooftop restaurant." },
  { question: "Is Wi-Fi free and available in all rooms?", answer: "Absolutely. High-speed fiber Wi-Fi is available free of charge across all guest rooms, suites, and public areas." },
  { question: "What is your cancellation policy?", answer: "Free cancellation is available up to 24 hours prior to check-in. Cancellations made within 24 hours may incur a one-night charge." },
  { question: "Do you offer free parking and airport pickup?", answer: "Yes, we provide secure 24/7 complimentary valet parking. Airport pickup and drop-off services can be arranged upon request during booking." },
];
