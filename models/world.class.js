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
    endbossEnergy = new StatusBar(this.character.IMAGES_HEALTHBAR, 500, 40);
    throwableObjects = [];
    canThrow = true;
    gameOverScreenShown = false;
    gameWon = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
    }

    addButtonToListen(text, callback) {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.onclick = callback;
        document.body.appendChild(button);
    }

    showStartScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(startScreenImage, 0, 0, this.canvas.width, this.canvas.height);
        this.addButtonToListen("Start Game", this.startGame);
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

        if (this.gameOver) {
            this.showGameOverScreen();
        } else if (this.gameWon) {
            this.showWinScreen();  
        } else {
            requestAnimationFrame(() => this.draw());  
        }
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
        if (this.keyboard.ATTACK && this.canThrow) {
            if (this.character.throwBottle()) {
                let bottle = new ThorableObject(this.character.x + 50, this.character.y);
                this.throwableObjects.push(bottle);
                this.canThrow = false; 
                this.statusBarBottles.addBottlesPoints(-10); 
            }
        }
        if (!this.keyboard.ATTACK) {
            this.canThrow = true; 
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
                    
                    if (this.character.energy <= 0) {
                        this.gameOver = true;
                        this.showGameOverScreen();
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
                        this.endbossEnergy.setHealthPercentage(enemy.energy);
                        if (enemy.isDead) {
                            this.gameWon = true;
                            this.showWinScreen();
                        }
                    }
                }
            });
        });
    }

    showGameOverScreen() {
        if (this.gameOverScreenShown) return;
        this.gameOverScreenShown = true;
    
        const gameOverImage = new Image();
        gameOverImage.src = 'img/9_intro_outro_screens/game_over/game over!.png';
        
        gameOverImage.onload = () => {
            const imageWidth = gameOverImage.width / 2;
            const imageHeight = gameOverImage.height / 2;
            const centerX = (this.canvas.width - imageWidth) / 2;
            const centerY = (this.canvas.height - imageHeight) / 2;
            
            this.ctx.drawImage(gameOverImage, centerX, centerY, imageWidth, imageHeight);
    
            this.clearButtons();
            this.createCenteredButton("Retry", () => location.reload(), 520, 280); 
        };
    
        gameOverImage.onerror = () => {
            console.error('Failed to load image:', gameOverImage.src);
        };
    }

    showWinScreen() {
        const winImage = new Image();
        winImage.src = 'img/9_intro_outro_screens/win/win_1.png';
        winImage.onload = () => {
            const imageWidth = winImage.width / 2; 
            const imageHeight = winImage.height / 2; 
            const centerX = (this.canvas.width - imageWidth) / 2;
            const centerY = (this.canvas.height - imageHeight) / 2;
            this.ctx.drawImage(winImage, centerX, centerY, imageWidth, imageHeight);

            this.clearButtons();
            this.createCenteredButton("Retry", () => location.reload(), 450 , 280);
            this.createCenteredButton("Next Level", () => this.loadNextLevel(), 550 , 280);
        };
    }

    createCenteredButton(text, callback, x, y) {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.style.position = "absolute";
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
        button.onclick = callback;
        document.body.appendChild(button);
    }

    clearButtons() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.remove());
    }

    loadNextLevel() {
        // Hier die Logik für das Laden des nächsten Levels einfügen
        console.log('Loading next level...');
    }
}