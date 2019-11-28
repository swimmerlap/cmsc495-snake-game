/* * * * * * * * * * * * * * * * *
 *    CMST 495 6380 Group 2      *
 * * * * * * * * * * * * * * * * *
 *
 * Name: sketch.js
 * Author: Rachael Schutzman, Selamawit Asfaw, Danny Ramirez, Gilda Hogan, Gavin Spain
 * Description: Holds the "main" functions and variables for the game, 
 * and calls the other classes and their functions as needed.
 *
 */

/* Revision History
 * 11/17/2019 - Initially created.
 * (Danny Ramirez)
 * 
 * 11/18/2019  - Added initial version of the Snake class.
 * (Danny Ramirez)
 * 
 * 11/18/2019  - Added Game State machine and sound effects.
 * (Danny Ramirez)
 * 
 * 11/25/2019  - Changed the parent canvas container
 * (Danny Ramirez)
 * 
 * 11/28/2019  - Added debugging options (collision, game state, input)
 *             - Fixed the background music which was not looping.
 *             - Added game pause feature
 * (Danny Ramirez)
 *              
 */

// Declare variables
let snake, inputLeft, inputRight, inputUp, inputDown, inputDebug, inputRestart,inputMute, inputPause;
let score, highScore;

// Game state
let gameState = "welcome";

// Initialize game constants
const gameWidth = 800;
const gameHeight = 800;
const LEFT = 1;
const UP = 2;
const RIGHT = 3;
const DOWN = 4;
const borderRadius = 6;


// Initialize game variables
let heading = RIGHT;
let debugOn = true;

// Initialize music and sound
let music;
let soundTurn;
let soundCollect;
let soundOver;


// Initialize grid variables
let gridSize = 40;
let cellSize = 20;
const MAX_ROWS = 40;
const MAX_COLS = 40;

// Initialize food variables
let food = {
    position: {
        x: 0,
        y: 0
    },
    size: 20
};

function preload() {
    if (debugOn) {
        console.log("Debug Mode ON");
        console.log("Preloading assets...");
    }

    music = loadSound("assets/bgMusic.wav");
    music.setVolume(0.5);
    soundTurn = loadSound("assets/snakeTurn.wav");
    soundCollect = loadSound("assets/collect.wav");
    soundOver = loadSound("assets/gameOver.wav");

    if (debugOn) {
        console.log("Preload complete!");
    }
}

function setup() {
    if (debugOn) {
        console.log("Loading game...");
        console.log("Game State =", gameState);
    }
    let canvas = createCanvas(gameWidth, gameHeight);
    
    // Position the canvas inside of .canvas-container
    canvas.parent("#canvas-container");

    frameRate(10);

    resetGame();

    if (debugOn) {
        console.log("Loading complete!");
    }

}

function update() {
    if (gameState === "playing") {

        snake.move();


        if (snake.collides(food)) {
            if (debugOn) {
                console.log("Food collected!");
            }
            soundCollect.play();
            snake.tailSize++;
            score++;
            spawnFood();
        }
    
        for (let i = 0; i < snake.tail.length; i++) {
            if (snake.collides(snake.tail[i])) {
                console.log("Snake crashed!");
                soundOver.play();
                gameState = "over";
                console.log("Game State =", gameState);

            }
        }
    }

    if (gameState === "over") {
        music.stop();
        console.log("Game Over!");
    }

}

function keyPressed() {
    let keyWasPressed = false;

    switch (keyCode) {
        case inputLeft:
            if (heading !== RIGHT) {
                heading = LEFT;
                keyWasPressed = true;

            }
            break;
        case inputRight:
            if (heading !== LEFT) {
                heading = RIGHT;
                keyWasPressed = true;
            }
            break;
        case inputUp:
            if (heading !== DOWN) {
                heading = UP;
                keyWasPressed = true;
            }
            break;
        case inputDown:
            if (heading !== UP) {
                heading = DOWN;
                keyWasPressed = true;
            }
            break;
        
    }

    if (keyWasPressed) {
        soundTurn.play();

        if (debugOn) {
            console.log("Key pressed:", heading);
        }
    }

    if (key === inputPause) {
        if (gameState !== "pause") {
            console.log("Game paused!");
            gameState = "pause";
            if (music.isPlaying()) {
                music.pause();
            }

        } else {
            console.log("Game unpaused!");
            gameState = "playing";
            if (music.isPaused()) {
                music.play();
            }
        }
    }

    // Debug
    if (debugOn) {
        switch (key) {
            case inputRestart:
                console.log("Reset game!");
                resetGame();
                break;
            case inputMute:
                if (music.isPaused()) {
                    console.log("Music unmuted!");
                    music.play();
                } else {
                    console.log("Music muted!");
                    music.pause();
                } 
        }
    }

    if (keyCode === inputDebug) {
        debugOn = !debugOn;
        console.log("Debug Mode ON:", debugOn);
    }
}

function draw() {
    background(22, 22, 22);

    update();

    displayGrid();
    // displayBoxScore();
    // displayScore();
    // displayHighScore();

    displaySnakeTail();
    displaySnakeHead();
    displayFood();
}

function resetGame() {
    if (debugOn) {
        console.log("Resetting game...");
    }
    initControls();

    if (highScore < score) {
        highScore = score;
    } else {
        highScore = 0;
    }
    score = 0;
    gameState = "playing";
    spawnFood();

    snake = new Snake(floor(random(0, gridSize)), floor(random(0, gridSize)));

    if (!music.isPlaying()) {
        music.play();
        music.setLoop(true);
    }

    if (debugOn) {
        console.log("Game State =", gameState);
        console.log("Reset complete!");
    }
}

function displaySnakeHead() {
    fill(251, 203, 28);
    rect(snake.position.x * cellSize, snake.position.y * cellSize, snake.size, snake.size, borderRadius);
}

function displaySnakeTail() {
    for (let i = 0; i < snake.tail.length; i++) {
        fill(251, 170, 0);
        rect(snake.tail[i].position.x * cellSize, snake.tail[i].position.y * cellSize, snake.size, snake.size, borderRadius);
    }
}

function displayGrid() {
    for (let row = 0; row < MAX_ROWS; row++) {
        for (let column = 0; column < MAX_COLS; column++) {
            fill(34, 34, 34);
            stroke(22, 22, 22);
            rect(column * cellSize, row * cellSize, cellSize, cellSize, borderRadius);
        }
    }

}

function initControls() {
    inputLeft = LEFT_ARROW;
    inputRight = RIGHT_ARROW;
    inputUp = UP_ARROW;
    inputDown = DOWN_ARROW;
    inputRestart = "r";
    inputDebug = 192;
    inputPause = "p";
}

function spawnFood() {
    food.position.x = floor(random(0, gridSize));
    food.position.y = floor(random(0, gridSize));
}

function displayFood() {
    fill(252, 83, 63);
    rect(food.position.x * cellSize, food.position.y * cellSize, food.size, food.size, borderRadius);
}

function displayScore() {
    fill(255);
    textSize(26);
    textFont("Impact");
    text("Score", 2 * cellSize, 2 * cellSize);
    text(score, 3 * cellSize, 4 * cellSize);
}

function displayHighScore() {
    fill(255);
    textSize(26);
    textFont("Impact");
    text("High Score", cellSize * 31  , 2 * cellSize);
    text(highScore, cellSize * 33  , 4 * cellSize);
}

function displayBoxScore() {
    fill(22, 22, 22);
    rect(0, 0, gameWidth, 6 * cellSize);
}
