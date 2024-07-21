/**
 * Represents a level in the game.
 * 
 * @class
 * @param {Array} enemies - An array of enemy objects in the level.
 * @param {Array} clouds - An array of cloud objects in the level.
 * @param {Array} backgroundObjects - An array of background objects (e.g., trees, rocks) in the level.
 * @param {Array} coin - An array of coin objects in the level.
 * @param {Array} bottles - An array of bottle objects in the level.
 */
class Level {
    /**
     * Creates an instance of the Level class.
     * 
     * @param {Array} enemies - An array of enemy objects.
     * @param {Array} clouds - An array of cloud objects.
     * @param {Array} backgroundObjects - An array of background objects.
     * @param {Array} coin - An array of coin objects.
     * @param {Array} bottles - An array of bottle objects.
     */
    constructor(enemies, clouds, backgroundObjects, coin, bottles) {
        /**
         * @type {Array}
         * @description An array of enemy objects in the level.
         */
        this.enemies = enemies;
        
        /**
         * @type {Array}
         * @description An array of cloud objects in the level.
         */
        this.clouds = clouds;
        
        /**
         * @type {Array}
         * @description An array of background objects in the level.
         */
        this.backgroundObjects = backgroundObjects;
        
        /**
         * @type {Array}
         * @description An array of coin objects in the level.
         */
        this.coin = coin;
        
        /**
         * @type {Array}
         * @description An array of bottle objects in the level.
         */
        this.bottles = bottles;
        
        /**
         * @type {number}
         * @description The x-coordinate position where the level ends.
         */
        this.level_end_x = 2200;
    }
}
