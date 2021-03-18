# `@suchipi/game-controller`

Wrapper around the Web [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API) that reduces the amount of boilerplate required to support Gamepads in your application.

## Usage

```js
import GameController from "@suchipi/game-controller";

const player1 = new GameController();
// Or, to get a different controller index:
const player2 = new GameController({ id: 1 /* (defaults to 0) */ });

// To listen to buttons going from unpressed to pressed:
player1.addEventListener("buttondown", (name) => {
  console.log(`${name} pressed`);
});

// To listen to buttons going from pressed to unpressed:
player1.addEventListener("buttonup", (name) => {
  console.log(`${name} released`);
});

// To listen to the left analog stick moving around:
player1.addEventListener("leftanalogchange", ({ x, y }) => {
  console.log(`left analog: ${(x, y)}`);
});

// To listen to the right analog stick moving around:
player1.addEventListener("rightanalogchange", ({ x, y }) => {
  console.log(`right analog: ${(x, y)}`);
});

// Or, instead of listening to events, you can read player1.state in your own loop:
console.log(player1.state);
// {
//   "leftStick": {
//     "x": 0,
//     "y": 0
//   },
//   "rightStick": {
//     "x": 0,
//     "y": 0
//   },
//   "pressed": {
//     "cross": false,
//     "circle": false,
//     "square": false,
//     "triangle": false,
//     "l1": false,
//     "r1": false,
//     "l2": false,
//     "r2": false,
//     "select": false,
//     "start": false,
//     "l3": false,
//     "r3": false,
//     "up": false,
//     "down": false,
//     "left": false,
//     "right": false,
//     "ps": false
//   }
// }
```

By default it uses PS3 controller button names regardless of your actual controller, but you can use different button names by specifying them when you construct your `GameController` instance:

```js
const controller = new GameController({
  buttonNames: GameController.BUTTON_NAMES.XBOX,
  // or GameController.BUTTON_NAMES.NINTENDO, or your own array of strings
});
```

## API Documentation

Please see the included [TypeScript types](https://github.com/suchipi/suchipi-game-controller/blob/main/src/index.d.ts) for API documentation.

## License

MIT
