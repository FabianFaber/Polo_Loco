/**
 * Represents the game world.
 * @class
 */
class World {
    character = new Character();
    level = level1;
    endbossInstance;
    endboss = this.level.enemies.length - 1;
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
    background_sound = new Audio('audio/background-musik.ogg');
    coin_sound = new Audio('audio/coin.ogg');
    gameOver_sound = new Audio('audio/game over.ogg');
    gameWin_sound = new Audio('audio/game-win.ogg');
    charHurt_sound = new Audio('audio/hurt char.ogg');
    enemyHurt_sound = new Audio('audio/hurt chicken.ogg');
    jump_sound = new Audio('audio/jump.ogg');
    throwBottle_sound = new Audio('audio/throw_bottle.ogg');


    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element for the game.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.background_sound.play();
    }

    /**
     * Adds a button to the document body with a specified text and callback function.
     * @param {string} text - The text displayed on the button.
     * @param {Function} callback - The function to call when the button is clicked.
     */
    addButtonToListen(text, callback) {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.onclick = callback;
        document.body.appendChild(button);
    }

    /**
     * Displays the start screen.
     */
    showStartScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(startScreenImage, 0, 0, this.canvas.width, this.canvas.height);
        this.addButtonToListen("Start Game", this.startGame);
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Draws the game world and UI elements.
     */
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

    /**
     * Adds multiple objects to the map.
     * @param {Array<Object>} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        if (objects && Array.isArray(objects)) {
            objects.forEach(o => {
                this.addToMap(o);
            });
        }
    }

    /**
     * Adds a single object to the map.
     * @param {Object} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally.
     * @param {Object} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips an image back to its original orientation.
     * @param {Object} mo - The object whose image is to be flipped back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Starts the game logic.
     */
    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
        }, 50);
    }

    /**
     * Checks if objects can be thrown and manages the throwing logic.
     */
    checkThrowObjects() {
        if (this.keyboard.ATTACK && this.canThrow) {
            if (this.character.throwBottle()) {
                let bottle = new ThorableObject(this.character.x + 50, this.character.y);
                this.throwableObjects.push(bottle);
                this.throwBottle_sound.play();
                this.canThrow = false;
                this.statusBarBottles.addBottlesPoints(-10);
            }
        }
        if (!this.keyboard.ATTACK) {
            this.canThrow = true;
        }
    }

    /**
     * Moves the endboss towards the character if conditions are met.
     */
    moveEndbossTowardsCharacter() {
        if (this.endbossInstance && this.character.x >= 1500 && !this.endbossInstance.isDead) {
            const direction = this.character.x < this.endbossInstance.x ? -1 : 1;
            this.endbossInstance.x += direction * 2;
        }
    }

    /**
     * Checks for collisions between the character and other objects.
     */
    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                this.endbossInstance = enemy;
            }
    
            if (this.character.isColliding(enemy)) {
                if (!enemy.isDead) {
                    if (enemy instanceof Endboss) {
                        this.character.energy -= 100;
                        this.statusBar.setHealthPercentage(this.character.energy);
                        this.charHurt_sound.play();
    
                        if (this.character.energy <= 0) {
                            this.character.energy = 0;
                            this.gameOver = true;
                            this.gameOver_sound.play();
                            this.showGameOverScreen();
                        }
                    } else if (this.character.y + this.character.height > enemy.y &&
                        this.character.y + this.character.height < enemy.y + enemy.height) {
                        enemy.dead();
                        this.character.speedY = 25;
                        enemy.speed = 0;
                        this.enemyHurt_sound.play();
                        setTimeout(() => {
                            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                        }, 1000);
                    } else {
                        this.character.hit();
                        this.statusBar.setHealthPercentage(this.character.energy);
                        this.charHurt_sound.play();
    
                        if (this.character.energy <= 0) {
                            this.gameOver = true;
                            this.gameOver_sound.play();
                            this.showGameOverScreen();
                        }
                    }
                }
            }
        });
    
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.level.coin.splice(this.level.coin.indexOf(coin), 1);
                this.character.collectCoin();
                this.statusBarCoins.addPoints(10);
                this.coin_sound.play();
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
                            enemy.dead();
                            this.enemyHurt_sound.play();
    
                            setTimeout(() => {
                                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                                this.gameWon = true;
                                this.gameWin_sound.play();
                                this.showWinScreen();
                            }, 2000);
                        }
                    }
                }
            });
        });
    
        this.moveEndbossTowardsCharacter();
    }

    /**
     * Displays the game over screen.
     */
    showGameOverScreen() {
        if (this.gameOverScreenShown) return;
        this.gameOverScreenShown = true;

        const gameOverImage = new Image();
        gameOverImage.src = 'img/9_intro_outro_screens/game_over/game over!.png?' + new Date().getTime();

        gameOverImage.onload = () => {
            const imageWidth = gameOverImage.width / 2;
            const imageHeight = gameOverImage.height / 2;
            const centerX = (this.canvas.width - imageWidth) / 2;
            const centerY = (this.canvas.height - imageHeight) / 2;

            this.ctx.drawImage(gameOverImage, centerX, centerY, imageWidth, imageHeight);

            this.clearButtons();
            this.createCenteredButton("Retry", () => location.reload(), 300, 100);
        };

        gameOverImage.onerror = () => {
            console.error('Failed to load image:', gameOverImage.src);
        };
    }

    /**
     * Displays the win screen.
     */
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
            this.createCenteredButton("Retry", () => location.reload(), 200, 100);
            this.createCenteredButton("Next Level", () => this.loadNextLevel(), 400, 100);
        };
    }

    /**
     * Creates a button centered on the canvas.
     * @param {string} text - The text displayed on the button.
     * @param {Function} callback - The function to call when the button is clicked.
     * @param {number} x - The x-coordinate for the button's position.
     * @param {number} y - The y-coordinate for the button's position.
     */
    createCenteredButton(text, callback, x, y) {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.className = "game-button";
        button.style.position = "absolute";
        button.style.border = "none";
        button.style.padding = "10px";

        const updateButtonPosition = () => {
            const canvasRect = this.canvas.getBoundingClientRect();
            button.style.left = `${canvasRect.left + x}px`;
            button.style.top = `${canvasRect.top + y}px`;
        };

        updateButtonPosition();

        window.addEventListener('resize', updateButtonPosition);

        button.onclick = callback;
        document.body.appendChild(button);
    }

    /**
     * Removes all buttons from the document body.
     */
    clearButtons() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.remove());
    }

    /**
     * Loads the next level.
     */
    loadNextLevel() {
        console.log('Loading next level...');
    }
}
