console.log("SCRIPT.JS LOADED");

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwWa4vcCYBih7qwV3H6BbaOD4_lPi_swXLFzWzAzHeug_PtH_BwoQ0WcYFx3endIOlq/exec";
/* ============================================================
   Rayyan's Luxury Stay
   script.js - Part 1
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Store Page Load Time
       ========================================== */

    const loadTimeInput = document.getElementById("loadTime");

    if (loadTimeInput) {
        loadTimeInput.value = Date.now();
    }

    /* ==========================================
       Dark Mode
       ========================================== */

    const darkButton = document.getElementById("darkMode");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        changeDarkIcon(true);
    }

    if (darkButton) {

        darkButton.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const enabled = document.body.classList.contains("dark");

            localStorage.setItem(
                "theme",
                enabled ? "dark" : "light"
            );

            changeDarkIcon(enabled);

        });

    }

    function changeDarkIcon(enabled) {

        if (!darkButton) return;

        darkButton.innerHTML = enabled
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    }

    /* ==========================================
       Smooth Scroll
       ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    /* ==========================================
       Back To Top
       ========================================== */

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (!topBtn) return;

        if (window.scrollY > 500) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       Room Slider
       ========================================== */

    const slider = document.querySelector(".slides");

    if (slider) {

        const slides = document.querySelectorAll(".slide");

        const next = document.querySelector(".next");

        const prev = document.querySelector(".prev");

        const dotsContainer = document.querySelector(".dots");

        let index = 0;

        let autoSlide;

        /* Create Dots */

        slides.forEach((slide, i) => {

            const dot = document.createElement("span");

            dot.classList.add("dot");

            if (i === 0) {

                dot.classList.add("active");

            }

            dot.addEventListener("click", () => {

                index = i;

                updateSlider();

                restartAuto();

            });

            dotsContainer.appendChild(dot);

        });

        const dots = document.querySelectorAll(".dot");

        function updateSlider() {

            slider.style.transform =
                `translateX(-${index * 100}%)`;

            dots.forEach(dot =>
                dot.classList.remove("active"));

            dots[index].classList.add("active");

        }

        function nextSlide() {

            index++;

            if (index >= slides.length) {

                index = 0;

            }

            updateSlider();

        }

        function prevSlide() {

            index--;

            if (index < 0) {

                index = slides.length - 1;

            }

            updateSlider();

        }

        if (next) {

            next.addEventListener("click", () => {

                nextSlide();

                restartAuto();

            });

        }

        if (prev) {

            prev.addEventListener("click", () => {

                prevSlide();

                restartAuto();

            });

        }

        function startAuto() {

            autoSlide = setInterval(() => {

                nextSlide();

            }, 5000);

        }

        function restartAuto() {

            clearInterval(autoSlide);

            startAuto();

        }

        startAuto();

    }

    /* ==========================================
       Mobile Menu
       ========================================== */

    const menuButton = document.getElementById("menuToggle");

    const menu = document.getElementById("menu");

    if (menuButton && menu) {

        menuButton.addEventListener("click", () => {

            menu.classList.toggle("active");

        });

    }

    /* ==========================================
       Initialize AOS
       ========================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 900,

            once: true,

            easing: "ease-in-out"

        });

    }

});
    /* ==========================================
       Booking Form Validation
       ========================================== */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const guests = document.getElementById("guests");
        const checkin = document.getElementById("checkin");
        const checkout = document.getElementById("checkout");
        const roomtype = document.getElementById("roomtype");
        const message = document.getElementById("message");

        const submitBtn = document.getElementById("submitBtn");
        const loader = document.getElementById("loader");

        // Set minimum check-in date to today
        const today = new Date().toISOString().split("T")[0];
        checkin.min = today;

        checkin.addEventListener("change", () => {
            checkout.min = checkin.value;

            if (checkout.value && checkout.value < checkin.value) {
                checkout.value = "";
            }
        });

        function showError(input, text) {

            const group = input.closest(".form-group");

            if (!group) return;

            const error = group.querySelector(".error");

            if (error) {

                error.textContent = text;

            }

            input.classList.add("input-error");

        }

        function clearError(input) {

            const group = input.closest(".form-group");

            if (!group) return;

            const error = group.querySelector(".error");

            if (error) {

                error.textContent = "";

            }

            input.classList.remove("input-error");

        }

        function validateName() {

            const value = name.value.trim();

            if (value.length < 3) {

                showError(name, "Enter your full name");

                return false;

            }

            clearError(name);

            return true;

        }

        function validateEmail() {

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regex.test(email.value.trim())) {

                showError(email, "Enter a valid email");

                return false;

            }

            clearError(email);

            return true;

        }

        function validatePhone() {

            const regex =
                /^[6-9]\d{9}$/;

            if (!regex.test(phone.value.trim())) {

                showError(phone, "Enter a valid Indian phone number");

                return false;

            }

            clearError(phone);

            return true;

        }

        function validateGuests() {

            if (guests.value === "") {

                showError(guests, "Select number of guests");

                return false;

            }

            clearError(guests);

            return true;

        }

        function validateRoom() {

            if (roomtype.value === "") {

                showError(roomtype, "Select a room type");

                return false;

            }

            clearError(roomtype);

            return true;

        }

        function validateDates() {

            if (!checkin.value) {

                showError(checkin, "Select check-in date");

                return false;

            }

            if (!checkout.value) {

                showError(checkout, "Select check-out date");

                return false;

            }

            const inDate = new Date(checkin.value);

            const outDate = new Date(checkout.value);

            if (outDate <= inDate) {

                showError(checkout,
                    "Check-out must be after check-in");

                return false;

            }

            const diff =
                (outDate - inDate) /
                (1000 * 60 * 60 * 24);

            if (diff > 30) {

                showError(
                    checkout,
                    "Maximum stay is 30 nights"
                );

                return false;

            }

            clearError(checkin);

            clearError(checkout);

            return true;

        }

        name.addEventListener("blur", validateName);

        email.addEventListener("blur", validateEmail);

        phone.addEventListener("blur", validatePhone);

        guests.addEventListener("change", validateGuests);

        roomtype.addEventListener("change", validateRoom);

        checkin.addEventListener("change", validateDates);

        checkout.addEventListener("change", validateDates);

        function validateForm() {

            return (

                validateName() &&

                validateEmail() &&

                validatePhone() &&

                validateGuests() &&

                validateRoom() &&

                validateDates()

            );

        }
        /* ==========================================
       Booking Form Validation
       ========================================== */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const guests = document.getElementById("guests");
        const checkin = document.getElementById("checkin");
        const checkout = document.getElementById("checkout");
        const roomtype = document.getElementById("roomtype");
        const message = document.getElementById("message");

        const submitBtn = document.getElementById("submitBtn");
        const loader = document.getElementById("loader");

        // Set minimum check-in date to today
        const today = new Date().toISOString().split("T")[0];
        checkin.min = today;

        checkin.addEventListener("change", () => {
            checkout.min = checkin.value;

            if (checkout.value && checkout.value < checkin.value) {
                checkout.value = "";
            }
        });

        function showError(input, text) {

            const group = input.closest(".form-group");

            if (!group) return;

            const error = group.querySelector(".error");

            if (error) {

                error.textContent = text;

            }

            input.classList.add("input-error");

        }

        function clearError(input) {

            const group = input.closest(".form-group");

            if (!group) return;

            const error = group.querySelector(".error");

            if (error) {

                error.textContent = "";

            }

            input.classList.remove("input-error");

        }

        function validateName() {

            const value = name.value.trim();

            if (value.length < 3) {

                showError(name, "Enter your full name");

                return false;

            }

            clearError(name);

            return true;

        }

        function validateEmail() {

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regex.test(email.value.trim())) {

                showError(email, "Enter a valid email");

                return false;

            }

            clearError(email);

            return true;

        }

        function validatePhone() {

            const regex =
                /^[6-9]\d{9}$/;

            if (!regex.test(phone.value.trim())) {

                showError(phone, "Enter a valid Indian phone number");

                return false;

            }

            clearError(phone);

            return true;

        }

        function validateGuests() {

            if (guests.value === "") {

                showError(guests, "Select number of guests");

                return false;

            }

            clearError(guests);

            return true;

        }

        function validateRoom() {

            if (roomtype.value === "") {

                showError(roomtype, "Select a room type");

                return false;

            }

            clearError(roomtype);

            return true;

        }

        function validateDates() {

            if (!checkin.value) {

                showError(checkin, "Select check-in date");

                return false;

            }

            if (!checkout.value) {

                showError(checkout, "Select check-out date");

                return false;

            }

            const inDate = new Date(checkin.value);

            const outDate = new Date(checkout.value);

            if (outDate <= inDate) {

                showError(checkout,
                    "Check-out must be after check-in");

                return false;

            }

            const diff =
                (outDate - inDate) /
                (1000 * 60 * 60 * 24);

            if (diff > 30) {

                showError(
                    checkout,
                    "Maximum stay is 30 nights"
                );

                return false;

            }

            clearError(checkin);

            clearError(checkout);

            return true;

        }

        name.addEventListener("blur", validateName);

        email.addEventListener("blur", validateEmail);

        phone.addEventListener("blur", validatePhone);

        guests.addEventListener("change", validateGuests);

        roomtype.addEventListener("change", validateRoom);

        checkin.addEventListener("change", validateDates);

        checkout.addEventListener("change", validateDates);

        function validateForm() {

            return (

                validateName() &&

                validateEmail() &&

                validatePhone() &&

                validateGuests() &&

                validateRoom() &&

                validateDates()

            );

        }
                /* ==========================================
           Google Sheets Integration
           ========================================== */


        let submitting = false;

        bookingForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            if (submitting) return;

            if (!validateForm()) return;

            /* ----------------------------
               Spam Protection
            ----------------------------- */

            const honeypot =
                document.getElementById("website");

            if (honeypot.value !== "") {

                console.warn("Spam detected.");

                return;

            }

            const loadTime =
                Number(document.getElementById("loadTime").value);

            const seconds =
                (Date.now() - loadTime) / 1000;

            if (seconds < 5) {

                showErrorModal(
                    "Form submitted too quickly. Please try again."
                );

                return;

            }

            /* ----------------------------
               Prevent duplicate submission
            ----------------------------- */

            const bookingKey =
                name.value +
                email.value +
                checkin.value +
                checkout.value;

            if (
                localStorage.getItem("lastBooking") === bookingKey
            ) {

                showErrorModal(
                    "Looks like you've already submitted this booking."
                );

                return;

            }

            submitting = true;

            submitBtn.disabled = true;

            loader.classList.remove("hidden");

            submitBtn.querySelector("span").textContent =
                "Submitting...";

            /* ----------------------------
               Booking Data
            ----------------------------- */

            const bookingData = {

                timestamp:
                    new Date().toLocaleString(),

                name:
                    name.value.trim(),

                email:
                    email.value.trim(),

                phone:
                    phone.value.trim(),

                checkin:
                    checkin.value,

                checkout:
                    checkout.value,

                guests:
                    guests.value,

                roomtype:
                    roomtype.value,

                message:
                    message.value.trim()

            };

            try {

                const response =
                    await fetch(SCRIPT_URL, {

                        method: "POST",

                    

                        body: JSON.stringify(bookingData)

                    });

                const result =
                    await response.json();

                if (
                    result.status === "success"
                ) {

                    localStorage.setItem(
                        "lastBooking",
                        bookingKey
                    );

                    bookingForm.reset();

                    document.getElementById("loadTime").value =
                        Date.now();

                    showSuccessModal();

                } else {

                    showErrorModal(
                        result.message ||
                        "Unable to submit booking."
                    );

                }

            }

            catch (error) {

                console.error(error);

                showErrorModal(
                    "Unable to connect to server."
                );

            }

            finally {

                loader.classList.add("hidden");

                submitBtn.disabled = false;

                submitBtn.querySelector("span").textContent =
                    "Book Now";

                submitting = false;

            }

        });
                /* ==========================================
           Success & Error Modals
           ========================================== */

        const successModal =
            document.getElementById("successModal");

        const errorModal =
            document.getElementById("errorModal");

        const errorText =
            document.getElementById("errorText");

        function showSuccessModal() {

            if (!successModal) return;

            successModal.classList.add("show");

            document.body.style.overflow = "hidden";

            // Auto close after 5 seconds
            setTimeout(() => {

                closeSuccess();

            }, 5000);

        }

        function closeSuccess() {

            if (!successModal) return;

            successModal.classList.remove("show");

            document.body.style.overflow = "";

        }

        function showErrorModal(message) {

            if (!errorModal) return;

            errorText.textContent =
                message ||
                "Something went wrong.";

            errorModal.classList.add("show");

            document.body.style.overflow = "hidden";

        }

        function closeError() {

            if (!errorModal) return;

            errorModal.classList.remove("show");

            document.body.style.overflow = "";

        }

        // Make available for HTML buttons
        window.closeSuccess = closeSuccess;
        window.closeError = closeError;

        /* ==========================================
           Close when clicking outside modal
           ========================================== */

        window.addEventListener("click", function (e) {

            if (e.target === successModal) {

                closeSuccess();

            }

            if (e.target === errorModal) {

                closeError();

            }

        });

        /* ==========================================
           ESC key closes modals
           ========================================== */

        document.addEventListener("keydown", function (e) {

            if (e.key === "Escape") {

                closeSuccess();

                closeError();

            }

        });

        /* ==========================================
           Prevent Enter from submitting invalid form
           ========================================== */

        bookingForm.addEventListener("keypress", function (e) {

            if (e.key === "Enter") {

                const target = e.target.tagName.toLowerCase();

                if (target !== "textarea") {

                    e.preventDefault();

                }

            }

        });

        /* ==========================================
           Character Counter (Message)
           ========================================== */

        if (message) {

            const counter = document.createElement("small");

            counter.className = "char-counter";

            counter.textContent = "0 / 500";

            message.parentNode.appendChild(counter);

            message.setAttribute("maxlength", "500");

            message.addEventListener("input", () => {

                counter.textContent =
                    `${message.value.length} / 500`;

            });

        }
            /* ==========================================
           Auto Save Form
        ========================================== */

        const formFields = [

            name,

            email,

            phone,

            guests,

            checkin,

            checkout,

            roomtype,

            message

        ];

        function saveDraft() {

            const draft = {

                name: name.value,

                email: email.value,

                phone: phone.value,

                guests: guests.value,

                checkin: checkin.value,

                checkout: checkout.value,

                roomtype: roomtype.value,

                message: message.value

            };

            localStorage.setItem(

                "bookingDraft",

                JSON.stringify(draft)

            );

        }

        function restoreDraft() {

            const draft = localStorage.getItem(

                "bookingDraft"

            );

            if (!draft) return;

            try {

                const data = JSON.parse(draft);

                name.value = data.name || "";

                email.value = data.email || "";

                phone.value = data.phone || "";

                guests.value = data.guests || "";

                checkin.value = data.checkin || "";

                checkout.value = data.checkout || "";

                roomtype.value = data.roomtype || "";

                message.value = data.message || "";

            }

            catch (e) {

                console.log(e);

            }

        }

        restoreDraft();

        formFields.forEach(field => {

            field.addEventListener(

                "input",

                saveDraft

            );

        });

        /* ==========================================
           Clear Draft After Success
        ========================================== */

        function clearDraft() {

            localStorage.removeItem(

                "bookingDraft"

            );

        }

        /* ==========================================
           Offline Detection
        ========================================== */

        function checkNetwork() {

            if (!navigator.onLine) {

                showErrorModal(

                    "No internet connection detected."

                );

                return false;

            }

            return true;

        }

        window.addEventListener(

            "offline",

            () => {

                showErrorModal(

                    "Internet connection lost."

                );

            }

        );

        window.addEventListener(

            "online",

            () => {

                console.log(

                    "Back Online"

                );

            }

        );

        /* ==========================================
           Cooldown Timer
        ========================================== */

        const COOLDOWN = 30000;

        function checkCooldown() {

            const last = Number(

                localStorage.getItem(

                    "lastSubmitTime"

                )

            );

            if (!last) return true;

            if (

                Date.now() - last < COOLDOWN

            ) {

                const remaining = Math.ceil(

                    (COOLDOWN -

                        (Date.now() - last))

                    / 1000

                );

                showErrorModal(

                    "Please wait " +

                    remaining +

                    " seconds before another booking."

                );

                return false;

            }

            return true;

        }

        function saveCooldown() {

            localStorage.setItem(

                "lastSubmitTime",

                Date.now()

            );

        }

        /* ==========================================
           Retry Fetch
        ========================================== */

        async function postBooking(

            url,

            data,

            retries = 3

        ) {

            while (retries > 0) {

                try {

                    const response = await fetch(

                        url,

                        {

                            method: "POST",

                            

                            body:

                                JSON.stringify(data)

                        }

                    );

                    return await response.json();

                }

                catch (err) {

                    retries--;

                    if (retries === 0)

                        throw err;

                }

            }

        }

        /* ==========================================
           Update Existing Submit Logic
        ========================================== */

        const originalSubmitHandler =
            bookingForm.onsubmit;

        bookingForm.onsubmit = null;

        bookingForm.addEventListener(

            "submit",

            async function (e) {

                if (!checkNetwork()) {

                    e.preventDefault();

                    return;

                }

                if (!checkCooldown()) {

                    e.preventDefault();

                    return;

                }

            }

        );

        /* ==========================================
           After Successful Booking
        ========================================== */

        function bookingCompleted() {

            clearDraft();

            saveCooldown();

        }

        /* ==========================================
           Phone Number Formatting
        ========================================== */

        phone.addEventListener(

            "input",

            () => {

                phone.value =

                    phone.value.replace(

                        /\D/g,

                        ""

                    );

            }

        );

        /* ==========================================
           Name Formatting
        ========================================== */

        name.addEventListener(

            "blur",

            () => {

                name.value =

                    name.value

                        .trim()

                        .replace(

                            /\s+/g,

                            " "

                        )

                        .replace(

                            /\b\w/g,

                            c =>

                                c.toUpperCase()

                        );

            }

        );
        /* ==========================================
   Contact Form
========================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        console.log("STEP 1");

        const data = {
            type: "contact",
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        console.log("STEP 2", data);

        try {
            console.log("STEP 3");

            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(data)
            });

            console.log("STEP 4", response);

            const result = await response.text();

            console.log("STEP 5", result);

        } catch (err) {
            console.error("FETCH ERROR:", err);
        }
    });
}

/* ==========================================
   Utility Functions
========================================== */

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {

        day: "2-digit",

        month: "long",

        year: "numeric"

    });

}

function calculateNights(checkin, checkout) {

    const inDate = new Date(checkin);

    const outDate = new Date(checkout);

    return Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));

}
    }
}