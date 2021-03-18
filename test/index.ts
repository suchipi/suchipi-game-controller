import GameController from "../src";
// @ts-ignore
window.GameController = GameController;

const g = new GameController();

// @ts-ignore
window.g = g;

g.addEventListener("buttondown", (name) => console.log("buttondown", name));
g.addEventListener("buttonup", (name) => console.log("buttonup", name));
g.addEventListener("leftanalogchange", ({ x, y }) =>
  console.log("leftanalogchange", x, y)
);
g.addEventListener("rightanalogchange", ({ x, y }) =>
  console.log("rightanalogchange", x, y)
);

document.write(
  "Open the console and test out the 'GameController' class and 'g' instance"
);
