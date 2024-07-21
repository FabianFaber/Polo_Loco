/**
 * Represents the state of keyboard inputs.
 * 
 * This class tracks the status of various keys on the keyboard, indicating whether they are currently pressed or not.
 * It is typically used in game development or applications that require real-time keyboard input handling.
 * 
 * @class
 */
class Keyboard {
    /**
     * @constructor
     * Initializes the state of all keys to `false`, indicating that none of the keys are pressed.
     */
    constructor() {
        /**
         * Indicates whether the LEFT arrow key is pressed.
         * @type {boolean}
         */
        this.LEFT = false;

        /**
         * Indicates whether the RIGHT arrow key is pressed.
         * @type {boolean}
         */
        this.RIGHT = false;

        /**
         * Indicates whether the UP arrow key is pressed.
         * @type {boolean}
         */
        this.UP = false;

        /**
         * Indicates whether the DOWN arrow key is pressed.
         * @type {boolean}
         */
        this.DOWN = false;

        /**
         * Indicates whether the SPACE key is pressed.
         * @type {boolean}
         */
        this.SPACE = false;

        /**
         * Indicates whether the ATTACK key is pressed.
         * @type {boolean}
         */
        this.ATTACK = false;
    }
}
