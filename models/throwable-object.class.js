class ThorableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = y;
        this.y = x;
        this.height = 100;
        this.width = 60;
        this.throw();
    }

    throw() {
        this.speedY = 30;
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);
        }

    
}