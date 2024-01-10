const buttonStart = document.querySelector(".popup__button");
const popup = document.querySelector(".popup-hello");
const buttonBlock = document.querySelector(".block-button");
const popupBlockButton = document.querySelector(".popup__block-button");
const popupBlock = document.querySelector(".popup-block");
let prankMusic = new Audio("zvuki-orgazm.mp3");

if (
  window.matchMedia("(display-mode: fullscreen)").matches ||
  !window.matchMedia("(max-width: 768px)").matches
) {
  popup.classList.remove("popup-active");
} else {
  popup.classList.add("popup-active");
}

buttonStart.addEventListener("click", () => {
  popup.classList.add("popup-active");
  setTimeout(() => {
    buttonBlock.classList.add("button-active");
  }, 13000);
});

popupBlockButton.addEventListener("click", () => {
  alert(
    "А теперь, в знак наказания, жди 10 сек пока эта хуйня закроектся!!! \nТам тебя еще один прикол ждет))"
  );
  setTimeout(() => {
    popupBlock.classList.add("popup-block");
    prankMusic.play();
  }, 3000);
});

buttonBlock.addEventListener("click", () => {
  popupBlock.classList.remove("popup-block");
});
