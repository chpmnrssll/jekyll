let parallax = document.querySelector(".header__parallax"), scrollTop = 0;

// Parallax header image (2D - not fast enough)
if(parallax) {
  window.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
      scrollTop = window.pageYOffset >> 2;
      parallax.style.backgroundPosition = `center ${ -scrollTop }px`;
    });
  }, { passive: true });
}
