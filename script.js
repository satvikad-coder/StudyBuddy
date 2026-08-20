const fadeElements = document.querySelectorAll(".fade-scroll");

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;

  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elementTop = rect.top;

    const fadeStart = windowHeight * 0.2; // start fading when near top
    const fadeEnd = windowHeight * 0.9; // fully faded when closer to top

    if (elementTop > fadeStart) {
      el.style.opacity = 1; // still low on page → fully visible
    } else if (elementTop < fadeEnd) {
      el.style.opacity = 0; // has moved far up → invisible
    } else {
      const opacity = (elementTop - fadeEnd) / (fadeStart - fadeEnd);
      el.style.opacity = opacity;
    }
  });
});
const left = document.querySelector(".mission-left");
const boxes = document.querySelectorAll(".fact-box");
const missionSection = document.querySelector(".mission-section");
const footer = document.querySelector(".site-footer");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /* --- LEFT SIDE FIXED UNTIL FOOTER --- */
  const sectionBottom = missionSection.offsetTop + missionSection.offsetHeight;
  const leftHeight = left.offsetHeight;

  if (scrollY > 180 && scrollY + leftHeight + 200 < sectionBottom) {
    left.classList.add("fixed");
    left.classList.remove("stop");
  } else if (scrollY + leftHeight + 200 >= sectionBottom) {
    left.classList.remove("fixed");
    left.classList.add("stop");
  } else {
    left.classList.remove("fixed");
    left.classList.remove("stop");
  }

  /* --- REVEAL BOXES --- */
  boxes.forEach((box) => {
    const rect = box.getBoundingClientRect();
    const middle = window.innerHeight * 0.65;

    if (rect.top < middle) {
      box.classList.add("visible");
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Navbar: shrink + background on scroll ---------- */
  const navbar = document.getElementById("navbar");
  const toTopBtn = document.getElementById("toTop");

  function onScroll() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle("scrolled", scrolled);
    toTopBtn.classList.toggle("visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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

  // Close mobile menu after choosing a link
  navRight.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navRight.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 3. Scroll-reveal for any .fade-scroll element ---------- */
  const revealTargets = document.querySelectorAll(".fade-scroll");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- 4. Animated stat counters (run once, on view) ---------- */
  const counters = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 1200; // ms
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------- 5. Orbit bubbles: click a subject for a quick tip ---------- */
  const tips = {
    math: "Math tip: redo missed problems by hand before checking the solution — the fix has to come from you.",
    reading: "Reading tip: read the questions first, then hunt the passage for evidence instead of re-reading it all.",
    shsat: "SHSAT tip: the exam is scored by scaled score, not raw percent right — pacing matters more than perfection.",
    sat: "SAT tip: the digital SAT adapts by section — a strong first module unlocks harder (higher-value) questions next.",
  };
  const orbitButtons = document.querySelectorAll(".orbit-blob");
  const calloutText = document.getElementById("orbitCalloutText");

  orbitButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      orbitButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.dataset.subject;
      calloutText.textContent = tips[key] || "Tap a bubble to get a quick study tip.";
    });
  });

  /* ---------- 6. Mascot quote cycler ---------- */
  const quotes = [
    "Every practice question you finish is one less surprise on test day.",
    "You don't need to feel ready. You just need to start today's set.",
    "Small daily reps beat one long cram session — ask any coach.",
    "Wrong answers are data. Read the explanation, then try one more.",
  ];
  let quoteIndex = 0;
  const quoteEl = document.getElementById("mascotQuote");
  const nextTipBtn = document.getElementById("nextTipBtn");

  nextTipBtn.addEventListener("click", () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteEl.style.opacity = 0;
    setTimeout(() => {
      quoteEl.textContent = `"${quotes[quoteIndex]}"`;
      quoteEl.style.opacity = 1;
    }, 200);
  });

  /* ---------- 7. Footer email button ---------- */
  const emailBtn = document.getElementById("emailBtn");
  emailBtn.addEventListener("click", () => {
    window.location.href = "mailto:hello@studyprepresources.example";
  });

  /* ---------- 8. Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
});
