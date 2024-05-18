import "./index.css";

import { initialGames } from "./initialGames";
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
} from "./constants";

import left4Dead2Image from "@/images/game/left-4-dead-2.jpeg";
import cs16Image from "@/images/game/cs1.6.png";
import dayOfDefeatImage from "@/images/game/day-of-defeat.png";
import dayzImage from "@/images/game/dayz.png";
import fortniteImage from "@/images/game/fortnite.jpeg";
import gta5Image from "@/images/game/gta5.png";
import phasmophobiaImage from "@/images/game/phasmophobia.png";
import mudrunnerImage from "@/images/game/mudrunner.png";
import pubgImage from "@/images/game/pubg.png";
import cs2Image from "@/images/game/cs2.png";

export let isContentLoad = false;

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

const cells = 243;

const items = [
  {
    name: "left-4-dead-2",
    img: left4Dead2Image,
    chance: 0.1,
    color: "#ff0200",
  },
  {
    name: "cs1.6",
    img: cs16Image,
    chance: 0.4,
    color: "#ffcc01",
  },
  {
    name: "day-of-defeat",
    img: dayOfDefeatImage,
    chance: 1,
    color: "#ff03ff",
  },
  {
    name: "dayz",
    img: dayzImage,
    chance: 1.1,
    color: "#993367",
  },
  {
    name: "fortnite",
    img: fortniteImage,
    chance: 2,
    color: "#ff03ff",
  },
  { name: "gta5", img: gta5Image, chance: 3, color: "#993367" },
  {
    name: "phasmophobia",
    img: phasmophobiaImage,
    chance: 13,
    color: "#1800ff",
  },
  {
    name: "mudrunner",
    img: mudrunnerImage,
    chance: 20,
    color: "#9accff",
  },
  {
    name: "pubg",
    img: pubgImage,
    chance: 24,
    color: "#9accff",
  },
  { name: "cs2", img: cs2Image, chance: 34, color: "#808080" },
];

function getItem() {
  let item;
  while (!item) {
    const chance = Math.floor(Math.random() * 100000);
    items.forEach((elm) => {
      if (chance < elm.chance * 1000 && !item) {
        item = elm;
      }
    });
  }
  return item;
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
    const listChanceColor = document.createElement("div");
    listChanceColor.className = "list__chance-color";
    listChanceColor.style.backgroundColor = item.color;
    listChanceColor.style.boxShadow = `0px -4px 10px ${item.color}`;

    li.setAttribute("data-item", JSON.stringify(item));
    li.classList.add("list__item");
    li.innerHTML = `<img class='list__item-image' src='${item.img}' alt=''>`;
    li.appendChild(listChanceColor);
    list.append(li);

    observer.observe(li);
  }
}

let isStarted = false;

function start() {
  if (isStarted) return;
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

startButton.addEventListener("click", start);

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
});

gameSelectionCloseButton.addEventListener("click", () => {
  closedPopup(gameSelectionPopup);
});

// const downloadButton = document.querySelector(".download-button");
// let defaultInstallEvent = null;
// window.addEventListener("beforeinstallprompt", (event) => {
//   event.preventDefault();
//   defaultInstallEvent = event;
//   console.log("Событие beforeinstallprompt сработало");
// });

// downloadButton.addEventListener("click", () => {
//   console.log("click on downloadButton");
//   defaultInstallEvent.prompt();
// });

function createCard(card) {
  const contentItemTemplate =
    gameLibrary.querySelector("#place-template").content;
  const newCard = contentItemTemplate
    .querySelector(".game-library__item")
    .cloneNode(true);
  const image = newCard.querySelector(".game-library__img");
  const overlay = newCard.querySelector(".overlay");

  image.alt = card.name;
  image.src = card.url;

  image.addEventListener("click", (event) => {
    overlay.classList.toggle("overlay_active");
    console.log("game select image click");
  });

  return newCard;
}

initialGames.forEach((card) => {
  gameLibrary.prepend(createCard(card));
});

generateItems();
