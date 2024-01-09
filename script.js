const cells = 31;

// From 0.001 to 100
const items = [
  { name: "cs1.6", img: "images/game/cs1.6.png", chance: 1 },
  { name: "left-4-dead-2", img: "images/game/left-4-dead-2.jpeg", chance: 2 },
  { name: "day-of-defeat", img: "images/game/day-of-defeat.png", chance: 3 },
  { name: "fortnite", img: "images/game/fortnite.jpeg", chance: 4 },
  { name: "dayz", img: "images/game/dayz.png", chance: 5 },
  { name: "gta5", img: "images/game/gta5.png", chance: 7 },
  { name: "phasmophobia", img: "images/game/phasmophobia.png", chance: 20 },
  { name: "pubg", img: "images/game/pubg.png", chance: 24 },
  { name: "cs2", img: "images/game/cs2.png", chance: 29 },
];

function getItem() {
  let item;

  while (!item) {
    const chance = Math.floor(Math.random() * 100000);

    items.forEach((elm) => {
      if (chance < elm.chance && !item) {
        item = elm;
      }
    });
  }
  return item;
}

function generateItems() {
  document.querySelector(".list").remove();
  document.querySelector(".scope").innerHTML = `
    <ul class='list'></ul>
  `;

  const list = document.querySelector(".list");

  for (let i = 0; i < cells; i++) {
    const item = getItem();

    const li = document.createElement("li");

    li.setAttribute("data-item", JSON.stringify(item));
    li.classList.add("list__item");
    li.innerHTML = `
      <img class='list__item-image' src='${item.img}' alt=''>
    `;
    list.append(li);
  }
}

generateItems();

let isStarted = false;

function start() {
  if (isStarted) {
    return;
  } else {
    isStarted = true;
  }
  generateItems();
  const list = document.querySelector(".list");

  setTimeout(() => {
    list.style.left = "50%";
    list.style.transform = "translate3d(-50%, 0, 0)";
  }, 0);

  const item = list.querySelectorAll("li")[15];

  list.addEventListener("transitionend", () => {
    isStarted = false;
    item.classList.add("active");
    const data = JSON.parse(item.getAttribute("data-item"));
    console.log(data);
  });
}

const downloadButton = document.querySelector(".download-button");
// Установка
let defaultInstallEvent = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  defaultInstallEvent = event;
  console.log("11111");
});
downloadButton.addEventListener("click", (event) => {
  defaultInstallEvent.prompt();
  console.log("22222");
});
