class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 50;
    energy = 100; 
    isDead = false;
    

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2300;

        this.animate();
    }

    collide(bottle) {
        if (bottle instanceof ThorableObject) {
            console.log('Endboss getroffen! Energie vorher:', this.energy);
            this.energy -= 20;
            console.log('Energie nachher:', this.energy);
            if (this.energy <= 0 && !this.isDead) {
                this.isDead = true; 
                this.dead(); 
            }
        }
    }

    dead() {
        this.loadImages(this.IMAGES_DEAD);
        this.playAnimation(this.IMAGES_DEAD, () => {
            this.image = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
            setInterval(() => {
                clearInterval(this.deadEndboss);  
            }, 300);
           
        });

        this.deadEndboss = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 100);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
