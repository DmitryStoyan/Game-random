const startButton = document.querySelector(".start-button");
const swapThemeButton = document.querySelector(".swap-theme-button");
const body = document.querySelector(".body");
const app = document.querySelector(".app");
const chopSound = new Audio("click.wav");
const winSound = new Audio("win2.mp3");

const cells = 243;

const items = [
  {
    name: "left-4-dead-2",
    img: "images/game/left-4-dead-2.jpeg",
    chance: 0.1,
    color: "#ff0200",
  },
  {
    name: "cs1.6",
    img: "images/game/cs1.6.png",
    chance: 0.4,
    color: "#ffcc01",
  },
  {
    name: "day-of-defeat",
    img: "images/game/day-of-defeat.png",
    chance: 1,
    color: "#ff03ff",
  },
  { name: "dayz", img: "images/game/dayz.png", chance: 1.1, color: "#993367" },
  {
    name: "fortnite",
    img: "images/game/fortnite.jpeg",
    chance: 2,
    color: "#ff03ff",
  },
  { name: "gta5", img: "images/game/gta5.png", chance: 3, color: "#993367" },
  {
    name: "phasmophobia",
    img: "images/game/phasmophobia.png",
    chance: 13,
    color: "#1800ff",
  },
  {
    name: "mudrunner",
    img: "images/game/mudrunner.png",
    chance: 20,
    color: "#9accff",
  },
  { name: "pubg", img: "images/game/pubg.png", chance: 24, color: "#9accff" },
  { name: "cs2", img: "images/game/cs2.png", chance: 34, color: "#808080" },
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
          clickingRouletteSound();
          chopSound.pause();
          chopSound.currentTime = 0;
          chopSound.play();
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
      winSound.play();
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
  pointer.src = pointer.src.endsWith("pointer-theme-dark.png")
    ? "./images/pointer.png"
    : "./images/pointer-theme-dark.png";
});

const downloadButton = document.querySelector(".download-button");
let defaultInstallEvent = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  defaultInstallEvent = event;
});
downloadButton.addEventListener("click", () => {
  defaultInstallEvent.prompt();
});

generateItems();
