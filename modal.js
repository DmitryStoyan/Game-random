const buttonStart = document.querySelector(".popup__start-button");
const popup = document.querySelector(".popup-hello");
const buttonBlock = document.querySelector(".block-button");
const popupBlockButton = document.querySelector(".popup__block-button");
const popupBlock = document.querySelector(".popup-block");
const popupPunishment = document.querySelector(".popup-punishment");
const popupPunishmentButton = document.querySelector(
  ".popup__punishment-button"
);

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
  }, 17000);
});

popupBlockButton.addEventListener("click", () => {
  popupBlock.classList.add("popup-block");
  popupPunishment.classList.add("popup-punishment-active");
  setTimeout(() => {
    popupPunishment.classList.remove("popup-punishment-active");
    prankMusic.play();
  }, 20000);
});

buttonBlock.addEventListener("click", () => {
  popupBlock.classList.remove("popup-block");
});

const messageOnButton = [
  "Я же говорю, она не работает, чел!!!",
  "Фига ты настырный",
  "Ты мне кнопку решил сломать???",
  "Не выйдет бро",
  "Ну все-все, хорош",
  "Ща прикол будет))",
];
let messageCurrent = 0;

popupPunishment.addEventListener("click", () => {
  popupPunishmentButton.textContent = messageOnButton[messageCurrent];
  messageCurrent += 1;
  if (messageCurrent >= messageOnButton.length) {
    messageCurrent = messageOnButton.length - 1;
  }
});
