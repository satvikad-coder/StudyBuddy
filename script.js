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
});
