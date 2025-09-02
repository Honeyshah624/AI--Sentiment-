// ====== Configuration ======
const API_BASE = "https://sentiment-backend-phbw.onrender.com"; // your backend

// ====== DOM Elements ======
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const reviewText = document.getElementById("reviewText");
const loader = document.getElementById("loader");
const resultEl = document.getElementById("result");

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

// ====== Mobile menu toggle ======
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ====== Smooth scroll with offset for header ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const headerOffset = document.querySelector(".site-header")?.offsetHeight || 72;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset - 8;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  });
});

// ====== Active nav link on scroll ======
const sections = document.querySelectorAll("main section[id]");
function updateActiveNav() {
  const scrollPos = window.scrollY + (document.querySelector(".site-header")?.offsetHeight || 72) + 20;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.id;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
}
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// ====== Analyze sentiment ======
function showLoader(show = true) {
  if (!loader) return;
  loader.hidden = !show;
}

function showResult(text, sentiment) {
  if (!resultEl) return;
  resultEl.hidden = false;
  resultEl.className = "result"; // reset classes
  if (sentiment === "positive") resultEl.classList.add("positive");
  else if (sentiment === "negative") resultEl.classList.add("negative");
  else resultEl.classList.add("neutral");

  resultEl.textContent = text;

  // fade-in animation
  resultEl.style.opacity = 0;
  setTimeout(() => {
    resultEl.style.transition = "opacity 0.5s ease";
    resultEl.style.opacity = 1;
  }, 50);
}

if (analyzeBtn && reviewText) {
  analyzeBtn.addEventListener("click", async () => {
    const text = reviewText.value.trim();
    if (!text) {
      showResult("Please enter text to analyze.", "neutral");
      return;
    }

    analyzeBtn.disabled = true;
    showLoader(true);
    resultEl.hidden = true;

    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const sentiment = (data.sentiment || "").toLowerCase();
      const emoji = sentiment === "positive" ? "😊" : sentiment === "negative" ? "☹️" : "😐";
      showResult(`${emoji}  ${sentiment.toUpperCase()}`, sentiment);
    } catch (err) {
      console.error("Analyze error:", err);
      showResult("Error analyzing. Please try again later.", "neutral");
    } finally {
      analyzeBtn.disabled = false;
      showLoader(false);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      reviewText.value = "";
      resultEl.hidden = true;
      resultEl.textContent = "";
    });
  }
}

// ====== Contact form handler (demo) ======
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactStatus.textContent = "Sending message...";
    // Demo: simulate delay
    setTimeout(() => {
      contactStatus.textContent = "Thanks — we received your message (demo).";
      contactForm.reset();
    }, 900);
  });
}