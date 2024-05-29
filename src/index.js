import "./index.css";
import { initialGames } from "./initialGames";
import { initialRouletteImg } from "./initialRouletteImg";
import {
  selectGameButton,
  gameSelectionPopup,
  startButton,
  swapThemeButton,
  body,
  app,
  menu,
  burgerButton,
  menuCloseButton,
  gameSelectionCloseButton,
  preloader,
  gameLibrary,
  selectedGames,
  gameSearchInput,
  gameSortingSelect,
  warning,
  startRecordingButton,
  stopRecordingButton,
} from "./constants";

export let isContentLoad = false;
let recognition;
let isRecognizing = false;

// if (
//   !("webkitSpeechRecognition" in window) &&
//   !("SpeechRecognition" in window)
// ) {
//   alert("Ваш браузер не поддерживает API распознавания речи.");
//   return;
// }

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new SpeechRecognition();
recognition.lang = "ru-RU";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true;

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript
    .trim()
    .toLowerCase();
  handleVoiceCommand(transcript);
};

recognition.onerror = (event) => {
  console.error("Ошибка распознавания речи: ", event.error);
  if (event.error === "no-speech" || event.error === "audio-capture") {
    stopRecognition();
  }
};

recognition.onend = () => {
  if (isRecognizing) {
    recognition.start();
  }
};

function startRecognition() {
  recognition.start();
  isRecognizing = true;
  startRecordingButton.disabled = true;
  stopRecordingButton.disabled = false;
}

function stopRecognition() {
  recognition.stop();
  isRecognizing = false;
  startRecordingButton.disabled = false;
  stopRecordingButton.disabled = true;
}

startRecordingButton.addEventListener("click", startRecognition);
stopRecordingButton.addEventListener("click", stopRecognition);

function handleVoiceCommand(command) {
  if (command.includes("рулетка крутись")) {
    start();
    console.log("Ты сказал крутить");
  } else if (command.includes("рулетка открой библиотеку")) {
    openedPopup(gameSelectionPopup);
    console.log("Ты сказал открой библиотеку");
  } else if (command.includes("рулетка закрой библиотеку")) {
    closedPopup(gameSelectionPopup);
    console.log("Ты сказал закрой библиотеку");
  } else if (command.startsWith("рулетка выбери игру")) {
    const gameName = command.replace("рулетка выбери игру", "").trim();
    selectGameByName(gameName);
    console.log(`Ты сказал выбери игру: ${gameName}`);
  }
}

function selectGameByName(gameName) {
  const gameCards = document.querySelectorAll(".game-library__item");
  gameCards.forEach((card) => {
    const image = card.querySelector(".game-library__img");
    if (image.alt.toLowerCase() === gameName.toLowerCase()) {
      const overlay = card.querySelector(".overlay");
      overlay.classList.add("overlay_active");
      if (!selectedGames.includes(image.alt)) {
        selectedGames.push(image.alt);
      }
    }
  });
  generateItems();
  checkSelectedGames();
}

const cells = 243;

// export function closePreloader() {
//   isContentLoad = true;
//   preloader.remove();
// }

// window.addEventListener("load", () => {
//   setTimeout(() => {
//     if (isContentLoad) {
//       closePreloader();
//     } else {
//       setTimeout(closePreloader, 500);
//     }
//   }, 500);
// });

function getItem() {
  if (selectedGames.length === 0) {
    return { name: "secret", img: initialRouletteImg.secret };
  }

  const randomIndex = Math.floor(Math.random() * selectedGames.length);
  const selectedGameName = selectedGames[randomIndex].replace(/\s+(\d)/g, "$1");
  return {
    name: selectedGameName,
    img: initialRouletteImg[selectedGameName.toLowerCase()],
  };
}

let observer;

function generateItems() {
  document.querySelector(".list")?.remove();
  document.querySelector(".scope").innerHTML = `<ul class='list'></ul>`;

  const list = document.querySelector(".list");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // chopSound.pause();
          // chopSound.currentTime = 0;
          // chopSound.play();
        }
      });
    },
    {
      root: document.querySelector(".scope"),
      threshold: 0.9,
    }
  );

  for (let i = 0; i < cells; i++) {
    const item = getItem();
    const li = document.createElement("li");

    li.setAttribute("data-item", JSON.stringify(item));
    li.classList.add("list__item");
    li.innerHTML = `<img class='list__item-image' src='${item.img}' alt='${item.name}'>`;

    list.append(li);

    observer.observe(li);
  }
}

function checkSelectedGames() {
  if (selectedGames.length <= 1) {
    startButton.classList.add("start-button_disabled");
  } else {
    startButton.classList.remove("start-button_disabled");
  }
}

let isStarted = false;

function start() {
  if (isStarted) return;

  checkSelectedGames();

  if (selectedGames.length <= 1) {
    warning.classList.add("popup_opened");
    setTimeout(() => {
      warning.classList.remove("popup_opened");
    }, 4000);
    return;
  }

  isStarted = true;
  generateItems();
  const list = document.querySelector(".list");

  setTimeout(() => {
    list.style.left = "50%";
    list.style.transform = "translate3d(-50%, 0, 0)";
  }, 0);

  list.addEventListener("transitionend", () => {
    isStarted = false;
    observer.disconnect();
    const items = list.querySelectorAll(".list__item");
    const centerItemIndex = Math.floor(items.length / 2);
    const centerItem = items[centerItemIndex];

    if (centerItem) {
      // winSound.play();
      const data = JSON.parse(centerItem.getAttribute("data-item"));
      console.log("Итоговый элемент:", data);
      centerItem.classList.add("active");
    }
  });
}

startButton.addEventListener("click", () => {
  start();
});

swapThemeButton.addEventListener("click", () => {
  const pointer = document.querySelector(".pointer");
  body.classList.toggle("body__theme_light");
  startButton.classList.toggle("start-button__theme_light");
  swapThemeButton.classList.toggle("swap-theme-button__theme_light");
  pointer.classList.toggle("pointer-theme-dark");
  pointer.classList.toggle("pointer-theme-light");
});

function openedPopup(popup) {
  popup.classList.add("popup_opened");
}

function closedPopup(popup) {
  popup.classList.remove("popup_opened");
}

burgerButton.addEventListener("click", () => {
  openedPopup(menu);
});

menuCloseButton.addEventListener("click", () => {
  closedPopup(menu);
});

selectGameButton.addEventListener("click", () => {
  openedPopup(gameSelectionPopup);
  const cards = gameLibrary.querySelectorAll(".game-library__item");
  cards.forEach((card) => {
    const image = card.querySelector(".game-library__img");
    const overlay = card.querySelector(".overlay");
    if (selectedGames.includes(image.alt)) {
      overlay.classList.add("overlay_active");
    } else {
      overlay.classList.remove("overlay_active");
    }
  });
});

gameSelectionCloseButton.addEventListener("click", () => {
  closedPopup(gameSelectionPopup);
  const cards = gameLibrary.querySelectorAll(".game-library__item");
  cards.forEach((card) => {
    const overlay = card.querySelector(".overlay");
    overlay.classList.remove("overlay_active");
  });
});

let contentItemTemplate;

function createCard(card) {
  contentItemTemplate = gameLibrary.querySelector("#place-template").content;
  const newCard = contentItemTemplate
    .querySelector(".game-library__item")
    .cloneNode(true);
  const image = newCard.querySelector(".game-library__img");
  const overlay = newCard.querySelector(".overlay");

  image.alt = card.name;
  image.src = card.imgLibrary;

  if (selectedGames.includes(card.name)) {
    overlay.classList.add("overlay_active");
  }

  image.addEventListener("click", () => {
    isStarted = false;
    overlay.classList.toggle("overlay_active");
    const gameIndex = selectedGames.indexOf(image.alt);
    if (gameIndex === -1) {
      selectedGames.push(image.alt);
    } else {
      selectedGames.splice(gameIndex, 1);
    }
    console.log(selectedGames);
    generateItems();
    checkSelectedGames();
  });

  overlay.addEventListener("click", () => {
    isStarted = false;
    overlay.classList.remove("overlay_active");

    const gameIndex = selectedGames.indexOf(image.alt);
    if (gameIndex !== -1) {
      selectedGames.splice(gameIndex, 1);
    }
    console.log(selectedGames);
    generateItems();
    checkSelectedGames();
  });

  return newCard;
}

const collator = new Intl.Collator(["ru", "en"], { sensitivity: "base" });
// Функция для отображения игр в библиотеке
function displayGames(games) {
  const template = document.querySelector("#place-template").outerHTML;
  gameLibrary.innerHTML = template;

  games.forEach((game) => {
    gameLibrary.append(createCard(game));
  });
}

gameSortingSelect.addEventListener("change", (event) => {
  const sortValue = event.target.value;

  if (sortValue === "selected-game") {
    const selectedGameList = initialGames.filter((game) =>
      selectedGames.includes(game.name)
    );
    displayGames(selectedGameList);
  } else if (sortValue === "by-name") {
    const sortedGames = [...initialGames].sort((a, b) =>
      collator.compare(a.name, b.name)
    );
    displayGames(sortedGames);
  } else {
    displayGames(initialGames);
  }
});

displayGames(initialGames);
checkSelectedGames();

gameSearchInput.addEventListener("input", () => {
  const gameSearchValue = gameSearchInput.value.trim().toLowerCase();

  const filteredGames = initialGames.filter((game) =>
    game.name.toLowerCase().includes(gameSearchValue)
  );
  displayGames(filteredGames);
});

initialGames.forEach((card) => {
  gameLibrary.prepend(createCard(card));
});

const downloadButton = document.querySelector(".download-button");
let defaultInstallEvent = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  defaultInstallEvent = event;
  console.log("Событие beforeinstallprompt сработало");
});

downloadButton.addEventListener("click", () => {
  console.log("click on downloadButton");
  defaultInstallEvent.prompt();
});

generateItems();
