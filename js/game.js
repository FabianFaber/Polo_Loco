let canvas;
let world;
let keyboard = new Keyboard();
const fullScreenButton = document.getElementById('FULLSCREEN');
let isFullScreen = false;

function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();
}

function showStartScreen() {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let startScreenImage = new Image();
    startScreenImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    startScreenImage.onload = function () {
        ctx.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height);
        addButtonToCanvas("Start Game", startGame);
    };
}

function addButtonToCanvas(text, callback) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.style.position = 'absolute';
    button.style.top = canvas.offsetTop + 50 + 'px'; 
    button.style.left = canvas.offsetLeft + (canvas.width / 2 - 50) + 'px'; 
    button.style.zIndex = 2;
    document.body.appendChild(button);
    button.onclick = () => {
        callback();
        document.body.removeChild(button);
    };
}

function startGame() {
    world = new World(canvas, keyboard);
    world.setWorld();
    world.run();
    world.draw();
}

fullScreenButton.addEventListener('click', async () => {
    try {
      await canvas.requestFullscreen();
    } catch (error) {
      console.error('Error entering full screen mode:', error);
    }
  });

document.addEventListener("keydown", (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(event.keyCode == 38) {
        keyboard.UP = true;
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(event.keyCode == 68) {
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if(event.keyCode == 87) {
        keyboard.UP = true;
    }

    if(event.keyCode == 83) {
        keyboard.DOWN = true;
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(event.keyCode == 81) {
        keyboard.ATTACK = true;
    }
});

document.addEventListener("keyup", (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(event.keyCode == 38) {
        keyboard.UP = false;
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(event.keyCode == 68) {
        keyboard.RIGHT = false;
    }

    if(event.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if(event.keyCode == 87) {
        keyboard.UP = false;
    }

    if(event.keyCode == 83) {
        keyboard.DOWN = false;
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(event.keyCode == 81) {
        keyboard.ATTACK = false;
    }
});