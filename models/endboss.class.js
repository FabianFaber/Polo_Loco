/**
 * Class representing the Endboss.
 * Extends the MovableObject class to include specific properties and methods for the Endboss character.
 */
class Endboss extends MovableObject {
    
    // Properties defining the dimensions and initial position of the Endboss
    height = 400;
    width = 250;
    y = 50;
    energy = 100; 
    isDead = false;
    
    // Arrays holding the image paths for different Endboss states
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Constructs the Endboss object, loads images, and initiates animation.
     */
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2300;

        this.animate();
    }

    /**
     * Handles the Endboss getting hurt.
     * Temporarily plays the hurt animation and then resumes walking animation.
     */
    hurt() {
        this.loadImages(this.IMAGES_HURT);
        this.playAnimation(this.IMAGES_HURT, () => {
            this.loadImages(this.IMAGES_WALKING);
            this.animate(); 
        });
    }

    /**
     * Handles collision with a throwable object.
     * Reduces energy, checks for death, and plays appropriate animations.
     * @param {Object} bottle - The object that collided with the Endboss.
     */
    collide(bottle) {
        if (bottle instanceof ThorableObject) {
            this.energy -= 20;
            if (this.energy <= 0 && !this.isDead) {
                this.isDead = true; 
                this.dead(); 
            } else {
                this.hurt(); 
            }
        }
    }

    /**
     * Initiates the animation sequences for the Endboss.
     * Handles walking and movement.
     */
    animate() {
        this.enbossMovingId = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        this.moveLeftIntervalId = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.movingIntervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 100);
    }

    /**
     * Handles the Endboss death sequence.
     * Stops other animations and starts the death animation.
     */
    dead() {
        this.deadIntervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 150);

        clearInterval(this.enbossMovingId);
        clearInterval(this.moveLeftIntervalId);
        clearInterval(this.movingIntervalId);
    }
}
