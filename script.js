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
