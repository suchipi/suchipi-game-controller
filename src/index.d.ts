declare type BUTTON_NAMES = {
  PLAYSTATION: [
    "cross",
    "circle",
    "square",
    "triangle",
    "l1",
    "r1",
    "l2",
    "r2",
    "select",
    "start",
    "l3",
    "r3",
    "up",
    "down",
    "left",
    "right",
    "ps"
  ];
  XBOX: [
    "a",
    "b",
    "x",
    "y",
    "lb",
    "rb",
    "lt",
    "rt",
    "select",
    "start",
    "lthumb",
    "rthumb",
    "up",
    "down",
    "left",
    "right",
    "xbox"
  ];
  NINTENDO: [
    "b",
    "a",
    "y",
    "x",
    "l",
    "r",
    "zl",
    "zr",
    "select",
    "start",
    "lthumb",
    "rthumb",
    "up",
    "down",
    "left",
    "right",
    "home"
  ];
};

declare type ButtonState<ButtonNames extends Array<string>> = {
  leftStick: {
    x: number;
    y: number;
  };
  rightStick: {
    x: number;
    y: number;
  };
  pressed: {
    [buttonName in ButtonNames[number]]: boolean;
  };
};

declare class GameController<
  ButtonNames extends Array<string> = BUTTON_NAMES["PLAYSTATION"]
> {
  static BUTTON_NAMES: BUTTON_NAMES;

  state: ButtonState<ButtonNames>;
  prevState: ButtonState<ButtonNames>;

  /**
   * GameController constructor.
   *
   * @param options
   * - `id`: The gamepad index to use, eg 0 for player 1, 1 for player 2, etc. Defaults to `0`.
   * - `buttonNames`: The button names to use in gamepad state objects and event listener callbacks. Defaults to `GameController.BUTTON_NAMES.PLAYSTATION`. See `GameController.BUTTON_NAMES` for button names for common gamepad layouts.
   * - `deadzoneLeft`: The center deadzone for the left analog stick; a value from 0 to 1. Defaults to `0.1`.
   * - `deadzoneRight`: The center deadzone for the right analog stick; a value from 0 to 1. Defaults to `0.1`.
   */
  constructor(options?: {
    /** The gamepad index to use, eg 0 for player 1, 1 for player 2, etc. Defaults to `0`. */
    id?: number;
    /** The button names to use in gamepad state objects and event listener callbacks. Defaults to `GameController.BUTTON_NAMES.PLAYSTATION`. See `GameController.BUTTON_NAMES` for button names for common gamepad layouts. */
    buttonNames?: ButtonNames;
    /** The center deadzone for the left analog stick; a value from 0 to 1. Defaults to `0.1`. */
    deadzoneLeft?: number;
    /** The center deadzone for the right analog stick; a value from 0 to 1. Defaults to `0.1`. */
    deadzoneRight?: number;
  });

  /**
   * Whether the gamepad is currently connected. Note that most browsers don't
   * consider a gamepad connected until you press one of its buttons. On
   * PlayStation controllers, you have to press a face button.
   */
  readonly present: boolean;

  /**
   * Starts the requestAnimationFrame-based loop for updates to gamepad state.
   * This is automatically called by the constructor, so you only need to call
   * this if you previously called `stopListening`.
   */
  startListening(): void;

  /**
   * Stops the requestAnimationFrame-based loop for updates to gamepad state.
   * When you are done using a gamepad, you should call this.
   */
  stopListening(): void;

  /**
   * Registers the provided callback such that it is run when the event associated with the provided eventName occurs.
   *
   * @param eventName The name of the event; one of "buttondown", "buttonup", "leftanalogchange", or "rightanalogchange".
   * @param callback The callback to run. It will receive relevant information about the event as its first argument.
   */
  addEventListener(
    eventName: "buttondown",
    callback: (name: ButtonNames[number]) => any
  ): void;
  addEventListener(
    eventName: "buttonup",
    callback: (name: ButtonNames[number]) => any
  ): void;
  addEventListener(
    eventName: "leftanalogchange",
    callback: (leftAnalog: { x: number; y: number }) => any
  ): void;
  addEventListener(
    eventName: "rightanalogchange",
    callback: (rightAnalog: { x: number; y: number }) => any
  ): void;

  removeEventListener(
    eventName: "buttondown",
    callback: (name: ButtonNames[number]) => any
  ): void;
  removeEventListener(
    eventName: "buttonup",
    callback: (name: ButtonNames[number]) => any
  ): void;
  removeEventListener(
    eventName: "leftanalogchange",
    callback: (leftAnalog: { x: number; y: number }) => any
  ): void;
  removeEventListener(
    eventName: "rightanalogchange",
    callback: (rightAnalog: { x: number; y: number }) => any
  ): void;
}

export = GameController;
