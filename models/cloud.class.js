/**
 * Represents a cloud object that moves from right to left across the screen.
 * Extends the MovableObject class.
 */
class Cloud extends MovableObject {
    /**
     * The vertical position of the cloud.
     * @type {number}
     */
    y = 20;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 400;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * Constructs a Cloud object, initializing its image and position.
     */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        /**
         * The horizontal position of the cloud, randomized between 0 and 500.
         * @type {number}
         */
        this.x = Math.random() * 500;

        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left at a constant speed.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
