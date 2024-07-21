/**
 * Represents a drawable object that can be rendered on a canvas.
 * 
 * @class
 */
class DrawableObject {
    /**
     * Creates an instance of DrawableObject.
     * 
     * @constructor
     */
    constructor() {

        this.x = 120;
        this.y = 280;
        this.height = 150;
        this.width = 100;
        this.img = null;
        this.imageCache = {};

        this.currentImage = 0;
    }

    /**
     * Loads an image from the specified path and sets it to the object's image property.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths and caches them.
     * 
     * @param {string[]} arr - An array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a frame around the object if it's an instance of Character, Chicken, or Endboss.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
    //         ctx.beginPath();
    //         ctx.lineWidth = 5; // Corrected from 'lineWitdh' to 'lineWidth'
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    /**
     * Draws the object's image onto the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
