// // Получаем элемент, который будет менять класс в зависимости от режима экрана
// const popup = document.querySelector("popup"); // Замените 'popup' на ваш ID элемента

// // Проверяем, открыто ли приложение на полный экран
// if (window.matchMedia("(display-mode: fullscreen)").matches) {
//   // Если приложение открыто на полный экран, добавляем класс 'active'
//   console.log("123");
//   popup.classList.remove("popup-active");
// } else {
//   console.log("321");
//   // Если не открыто на полный экран, убираем класс 'active'
//   popup.classList.add("popup-active");
// }

// const buttonStart = document.querySelector(".popup__start-button");

// buttonStart.addEventListener("click", () => {
//   console.log("popup");
//   popup.classList.add("popup-active");
// });

// popup.addEventListener("click", () => {
//   console.log("333");
// });
