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

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 1200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    dead(){
        this.isDead = true;
        this.loadImage(this.IMAGES_DEAD);
        clearInterval(this.leftMove);
        clearInterval(this.animationPlay);
    };

    animate() {
        this.leftMove = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationPlay = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
