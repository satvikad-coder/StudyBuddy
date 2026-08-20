// const fadeElements = document.querySelectorAll(".fade-scroll");

// window.addEventListener("scroll", () => {
//   const windowHeight = window.innerHeight;

//   fadeElements.forEach((el) => {
//     const rect = el.getBoundingClientRect();
//     const elementTop = rect.top;

//     const fadeStart = windowHeight * 0.2; // start fading when near top
//     const fadeEnd = windowHeight * 0.9; // fully faded when closer to top

//     if (elementTop > fadeStart) {
//       el.style.opacity = 1; // still low on page → fully visible
//     } else if (elementTop < fadeEnd) {
//       el.style.opacity = 0; // has moved far up → invisible
//     } else {
//       const opacity = (elementTop - fadeEnd) / (fadeStart - fadeEnd);
//       el.style.opacity = opacity;
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Back-to-top visibility ---------- */
  const toTopBtn = document.getElementById("toTop");
  window.addEventListener(
    "scroll",
    () => {
      toTopBtn.classList.toggle("visible", window.scrollY > 700);
    },
    { passive: true }
  );
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 2. Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navRight = document.getElementById("navRight");
  navToggle.addEventListener("click", () => {
    const isOpen = navRight.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
  navRight.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navRight.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 3. Theme flip: body[data-theme] tracks which section is
     centered in the viewport. CSS handles the actual color transition
     (transition: color .6s), this just flips the flag. ---------- */
  const themedSections = document.querySelectorAll("[data-theme-section]");
  const themeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.body.setAttribute("data-theme", entry.target.dataset.themeSection);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  themedSections.forEach((section) => themeObserver.observe(section));

  /* ---------- 4. Fact cards: pop up on the way in, fade away on the way
     out -- toggled directly by isIntersecting, so it fires both scroll
     directions instead of animating once and stopping. ---------- */
  const factCards = document.querySelectorAll(".fact-card");
  const factObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { rootMargin: "-15% 0px -15% 0px", threshold: 0 }
  );
  factCards.forEach((card) => factObserver.observe(card));

  /* ---------- 5. Mascot quote cycler ---------- */
  const quotes = [
    "Every practice question you finish is one less surprise on test day.",
    "You don't need to feel ready. You just need to start today's set.",
    "Small daily reps beat one long cram session — ask any coach.",
    "Wrong answers are data. Read the explanation, then try one more.",
  ];
  let quoteIndex = 0;
  const quoteEl = document.getElementById("mascotQuote");
  document.getElementById("nextTipBtn").addEventListener("click", () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteEl.style.opacity = 0;
    setTimeout(() => {
      quoteEl.textContent = `"${quotes[quoteIndex]}"`;
      quoteEl.style.opacity = 1;
    }, 200);
  });

  /* ---------- 6. Footer email + year ---------- */
  document.getElementById("emailBtn").addEventListener("click", () => {
    window.location.href = "mailto:hello@studyprepresources.example";
  });
  document.getElementById("year").textContent = new Date().getFullYear();
});
