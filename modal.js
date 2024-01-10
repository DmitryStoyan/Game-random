const buttonStart = document.querySelector(".popup__start-button");
const popup = document.querySelector(".popup");

if (window.matchMedia("(display-mode: fullscreen)").matches) {
  popup.classList.remove("popup-active");
} else {
  popup.classList.add("popup-active");
}

buttonStart.addEventListener("click", () => {
  console.log("popup");
  popup.classList.add("popup-active");
});

popup.addEventListener("click", () => {
  console.log("333");
});
