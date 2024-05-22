import { initialLibraryImg } from "./initialLibraryImg";
import { initialRouletteImg } from "./initialRouletteImg";

function formatName(name) {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/(\d)/g, " $1")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const initialGames = [];
const gameNames = Object.keys(initialLibraryImg);

gameNames.forEach((name) => {
  if (initialLibraryImg[name]) {
    initialGames.push({
      name: formatName(name),
      imgRoulette: initialRouletteImg[name],
      imgLibrary: initialLibraryImg[name],
    });
  }
});

export { initialGames };
