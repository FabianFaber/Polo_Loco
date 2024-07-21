class Chicken extends MovableObject {
    height = 70;
    width = 70;
    y = 360;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    isDead = false;
    IMAGES_DEAD='img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

     /**
     * Creates an instance of the Chicken class.
     * @param {number} x - The initial horizontal position of the chicken.
     */
     constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    /**
     * Sets the chicken to the dead state and stops its movement and animation.
     */
    dead() {
        this.isDead = true;
        this.loadImage(this.IMAGES_DEAD);
        clearInterval(this.leftMove);
        clearInterval(this.animationPlay);
    }

    /**
     * Starts the animation and movement for the chicken.
     * Animates the chicken walking and moves it left continuously.
     */
    animate() {
        this.leftMove = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationPlay = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}