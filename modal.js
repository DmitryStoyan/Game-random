const buttonStart = document.querySelector(".popup__start-button");
const popup = document.querySelector(".popup");

buttonStart.addEventListener("click", () => {
  console.log("popup");
  popup.classList.add("popup-active");
});
