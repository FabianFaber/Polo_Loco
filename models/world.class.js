class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar(this.character.IMAGES_HEALTH, 20, 0);
    statusBarCoins = new StatusBar(this.character.IMAGES_COINS, 20, 40);
    statusBarBottles = new StatusBar(this.character.IMAGES_BOTTLES, 20, 80);

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.translate(this.camera_x, 0);
    
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
    
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
    
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    addObjectsToMap(objects) {
        if (objects && Array.isArray(objects)) {
            objects.forEach(o => {
                this.addToMap(o);
            });
        }
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setHealthPercentage(this.character.energy);
                }
            });

            this.level.coin.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.level.coin.splice(this.level.coin.indexOf(coin), 1);
                    this.character.collectCoin();
                    this.statusBarCoins.addPoints(10);
                } 
            });
            

            this.level.bottles.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                    this.character.collectBottle();
                    this.statusBarBottles.addBottlesPoints(10); 
                }
            });
        }, 200);
    }

}