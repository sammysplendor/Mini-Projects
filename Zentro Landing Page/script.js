// Hamburger functionality ----------

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".navlinks-and-cta");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});
