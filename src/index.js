const BUTTON_NAMES = {
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
    "home",
  ],
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
    "xbox",
  ],
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
    "home",
  ],
};

class GameController {
  constructor({
    id = 0,
    buttonNames = BUTTON_NAMES.PLAYSTATION,
    deadzoneLeft = 0.1,
    deadzoneRight = 0.1,
  } = {}) {
    this._id = id;
    this._buttonNames = buttonNames;
    this._deadzoneLeft = deadzoneLeft;
    this._deadzoneRight = deadzoneRight;

    this.prevState = {
      leftStick: {
        x: 0,
        y: 0,
      },
      rightStick: {
        x: 0,
        y: 0,
      },
      pressed: {},
    };
    this.state = {
      leftStick: {
        x: 0,
        y: 0,
      },
      rightStick: {
        x: 0,
        y: 0,
      },
      pressed: {},
    };

    buttonNames.forEach((name) => {
      this.state.pressed[name] = false;
    });

    this._eventListenerCallbacks = {
      buttondown: new Set(),
      buttonup: new Set(),
      leftanalogchange: new Set(),
      rightanalogchange: new Set(),
    };

    this.startListening();
  }

  get present() {
    const gamepad = navigator.getGamepads()[this._id];
    return gamepad != null;
  }

  startListening() {
    if (this._rafId != null) return;

    const cb = () => {
      this._onFrame();
      this._rafId = requestAnimationFrame(cb);
    };
    this._rafId = requestAnimationFrame(cb);
  }

  stopListening() {
    if (this._rafId != null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  addEventListener(eventName, callback) {
    const set = this._eventListenerCallbacks[eventName];
    if (!set) {
      throw new Error(
        `Invalid eventName: '${eventName}'. Valid event names are: ${Object.keys(
          this._eventListenerCallbacks
        )
          .map((str) => JSON.stringify(str))
          .join(", ")}`
      );
    }
    set.add(callback);
  }

  removeEventListener(eventName, callback) {
    const set = this._eventListenerCallbacks[eventName];
    if (!set) {
      throw new Error(
        `Invalid eventName: '${eventName}'. Valid event names are: ${Object.keys(
          this._eventListenerCallbacks
        )
          .map((str) => JSON.stringify(str))
          .join(", ")}`
      );
    }
    set.delete(callback);
  }

  _onFrame() {
    const gamepad = navigator.getGamepads()[this._id];

    if (gamepad == null) {
      return;
    }

    const prevState = this.prevState;
    const state = this.state;

    state.leftStick.x = gamepad.axes[0];
    if (Math.abs(state.leftStick.x) < this._deadzoneLeft) {
      state.leftStick.x = 0;
    }

    state.leftStick.y = gamepad.axes[1];
    if (Math.abs(state.leftStick.y) < this._deadzoneLeft) {
      state.leftStick.y = 0;
    }

    if (
      state.leftStick.x !== prevState.leftStick.x ||
      state.leftStick.y !== prevState.leftStick.y
    ) {
      for (const callback of this._eventListenerCallbacks.leftanalogchange) {
        try {
          callback(state.leftStick);
        } catch (err) {
          console.error(err);
        }
      }
    }

    state.rightStick.x = gamepad.axes[2];
    if (Math.abs(state.rightStick.x) < this._deadzoneLeft) {
      state.rightStick.x = 0;
    }

    state.rightStick.y = gamepad.axes[3];
    if (Math.abs(state.rightStick.y) < this._deadzoneLeft) {
      state.rightStick.y = 0;
    }

    if (
      state.rightStick.x !== prevState.rightStick.x ||
      state.rightStick.y !== prevState.rightStick.y
    ) {
      for (const callback of this._eventListenerCallbacks.rightanalogchange) {
        try {
          callback(state.rightStick);
        } catch (err) {
          console.error(err);
        }
      }
    }

    gamepad.buttons.forEach((button, index) => {
      const name = this._buttonNames[index] || "unknown button";
      if (button.pressed) {
        state.pressed[name] = true;
      } else {
        state.pressed[name] = false;
      }

      if (!prevState.pressed[name] && state.pressed[name]) {
        for (const callback of this._eventListenerCallbacks.buttondown) {
          try {
            callback(name);
          } catch (err) {
            console.error(err);
          }
        }
      }

      if (prevState.pressed[name] && !state.pressed[name]) {
        for (const callback of this._eventListenerCallbacks.buttonup) {
          try {
            callback(name);
          } catch (err) {
            console.error(err);
          }
        }
      }
    });

    prevState.leftStick.x = state.leftStick.x;
    prevState.leftStick.y = state.leftStick.y;
    prevState.rightStick.x = state.rightStick.x;
    prevState.rightStick.y = state.rightStick.y;
    this._buttonNames.forEach((name) => {
      prevState.pressed[name] = state.pressed[name];
    });
  }
}

GameController.BUTTON_NAMES = BUTTON_NAMES;

module.exports = GameController;
