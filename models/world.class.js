class World {
    character = new Character();
    level = level1;
    endboss = this.level.enemies.length - 1;;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar(this.character.IMAGES_HEALTH, 20, 0);
    statusBarCoins = new StatusBar(this.character.IMAGES_COINS, 20, 40);
    statusBarBottles = new StatusBar(this.character.IMAGES_BOTTLES, 20, 80);
    endbossEnergy = new StatusBar(this.character.IMAGES_HEALTHBAR, 500, 10);
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
        this.run();
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
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.endbossEnergy);

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

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
        }, 50);
    }

    checkThrowObjects() {
        if (this.keyboard.ATTACK && this.character.throwBottle()) {
            let bottle = new ThorableObject(this.character.x + 50, this.character.y);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!enemy.isDead) {
                    if (this.character.y + this.character.height > enemy.y &&
                        this.character.y + this.character.height < enemy.y + enemy.height) {
                        enemy.dead();
                        this.character.speedY = 25;
                        enemy.speed = 0;
                        setTimeout(() => {
                            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                
                        }, 1000);
                    } else {
                        this.character.hit();
                        this.statusBar.setHealthPercentage(this.character.energy);
                    }
                }
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

        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        enemy.collide(bottle);
                        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                        this.endbossEnergy.setHealthPercentage(enemy.energy); // Update endbossEnergy here
                        setTimeout(() => {
                            this.level.enemies = this.level.enemies.filter(enemy => {
                                if (enemy instanceof Endboss && enemy.isDead) {
                                    return false; 
                                }
                                return true; 
                            });           
                        }, 1000);
                    }
                }
            });
        });;
    }
}