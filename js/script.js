/* ==========================================
   AMPURIRA PHILBERT PORTFOLIO
   JAVASCRIPT FILE
========================================== */

// ================= TYPING EFFECT =================
const typingText = document.querySelector(".typing");

const words = [
    "Software Engineer",
    "Web Developer",
    "Python Programmer",
    "Database Designer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        charIndex++;
        typingText.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        charIndex--;
        typingText.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, 100);
}

typeEffect();

// ================= MOBILE MENU =================
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// ================= DARK / LIGHT MODE =================
const themeBtn = document.querySelector(".theme-btn");
const root = document.documentElement;

const themes = {
    dark: {
        "--bg": "#0f172a",
        "--card": "#1e293b",
        "--text": "#f8fafc",
        "--muted": "#cbd5e1",
        "--header-bg": "rgba(18, 32, 63, 0.75)"
    },
    light: {
        "--bg": "#f8fafc",
        "--card": "#e2e8f0",
        "--text": "#0f172a",
        "--muted": "#475569",
        "--header-bg": "rgba(248, 250, 252, 0.85)"
    }
};

function applyTheme(name) {
    Object.entries(themes[name]).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    if (name === "light") {
        themeBtn.classList.replace("fa-moon", "fa-sun");
    } else {
        themeBtn.classList.replace("fa-sun", "fa-moon");
    }
}

// Restore the visitor's saved choice (if any)
let currentTheme = "dark";
try {
    if (localStorage.getItem("theme") === "light") {
        currentTheme = "light";
    }
} catch (e) {
    // Storage unavailable: stay on the default dark theme
}
applyTheme(currentTheme);

themeBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);

    try {
        localStorage.setItem("theme", currentTheme);
    } catch (e) {
        // Ignore storage errors
    }
});

// ================= SCROLL REVEAL =================
const hiddenElements = document.querySelectorAll(
    ".skill-box, .service-card, .project-card, .timeline-item"
);

const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
        }
    });
});

hiddenElements.forEach(element => {
    element.classList.add("hidden");
    revealObserver.observe(element);
});

// ================= COUNTER ANIMATION =================
// Counts up only when the stats section scrolls into view
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        let count = 0;

        const interval = setInterval(() => {
            count++;
            counter.textContent = count;
            if (count >= target) clearInterval(interval);
        }, 100);

        obs.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counter.dataset.target = counter.textContent;
    counter.textContent = 0;
    counterObserver.observe(counter);
});

// ================= SCROLL TO TOP =================
const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 500 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});