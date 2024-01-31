const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav1");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// --------------------------- cart
