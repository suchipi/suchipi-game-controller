const Gamepad = require("../src");
window.Gamepad = Gamepad;

const g = new Gamepad();
window.g = g;

g.addEventListener("buttondown", (name) => console.log("down", name));
g.addEventListener("buttonup", (name) => console.log("up", name));
g.addEventListener("leftanalogchange", ({ x, y }) => console.log("left", x, y));
g.addEventListener("rightanalogchange", ({ x, y }) =>
  console.log("right", x, y)
);

document.write(
  "Open the console and test out the 'Gamepad' class and 'g' instance"
);
