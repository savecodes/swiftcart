const menu = document.getElementById("mobile-menu");
const openBtn = document.getElementById("menu-toggle");
const closeBtn = document.getElementById("close-menu");

openBtn.addEventListener("click", () => {
  menu.style.right = "0";
});

closeBtn.addEventListener("click", () => {
  menu.style.right = "-100%";
});
