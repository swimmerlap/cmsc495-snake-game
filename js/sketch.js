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
 * 11/25/2019  - Changed the parent canvas container.
 * (Danny Ramirez)
 * 
 * 11/28/2019  - Added debugging options (collision, game state, input)
 *             - Fixed the background music which was not looping.
 *             - Added game pause feature.
 * (Danny Ramirez)
 * 
 * 11/29/2019  - Repositioned the grid to include the score and high score
 *             - Changed the file format of the sounds from .wav to .mp3 in 
 *               order to increase performance and decrease file size.
 * (Danny Ramirez)
 *             
 * 11/30/2019 - Created if statement to change displays depending on gameState variable to allow welcome
 *              screen before start of game. Only if statement container for welcome page for now. Added if
 *              to check if a key was pressed to change gameState to in game to start. Commented out 
 *              gameState variable change in reset() function to allow if statement for display change to work
 *              in draw() function.
 * (Rachael Schutzman)
 *
 * 12/01/2019 - Added if else statements to draw() for pause and over game states to show paused or stopped game 
 *              with box and text stating the state of the game (paused or game over) over top paused or stopped 
 *              game. Bug introduced due to removal of game state change in update(). Fixed with gameState change 
 *              to switch case for restart button (r) being pressed and added text to game over screen to prompt 
 *              user to select R to play again.
 *              Added placeholder title and text to welcome page.
 * (Rachael Schutzman)           
 * 
 * 12/02/2019 - Fixed paused game state from not showing grid
 *            - Changed resetGame with new game state check.
 * (Danny Ramirez)
 */

// Declare variables
let snake, display, 
inputLeft, inputRight, inputUp, inputDown, inputDebug, inputRestart,inputMute, inputPause;
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
let gridStartX = 0;
let gridStartY = 120;
let cellSize = 20;
const MAX_ROWS = 35;
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

    regFont = loadFont('assets/fonts/ka1.woff');
    music = loadSound("assets/bgMusic.mp3");
    music.setVolume(0.5);
    soundTurn = loadSound("assets/snakeTurn.mp3");
    soundCollect = loadSound("assets/collect.mp3");
    soundOver = loadSound("assets/gameOver.mp3");

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
            console.log("Game State =", gameState);
            if (music.isPlaying()) {
                music.pause();
            }

        } else {
            console.log("Game unpaused!");
            gameState = "playing";
            console.log("Game State =", gameState);
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
                gameState = "playing";
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
    // If statement to test gameState and display accordingly
    if (gameState === "welcome") {
       // placeholder text
       textFont(regFont);
       fill(255);
       textSize(26);
       text("Click Enter to play", 200, 300);

       // if any button is pressed game starts
       if (keyIsPressed === true) {
           gameState = "playing";
           if (debugOn) {
               console.log("Game State =", gameState);
           }
       }
    } else if (gameState === "pause") {
        // displays box with "Paused" text over paused game
        display.grid();
        display.score();
        display.highScore(); 
        display.snakeTail();
        display.snakeHead();
        display.food();
       
        fill(22, 22, 22);
        rect(cellSize * 12, cellSize * 18, cellSize * 16, cellSize * 6);
        textSize(26);
	textFont(regFont);
        fill(255);
        text("- Paused -", cellSize * 17, cellSize * 21);
   } else if (gameState === "over") {        
        // displays box with "Game Over" text over ended game and prompts user to press
        // "R" to restart
        display.grid();
	display.score();
        display.highScore(); 
        display.snakeTail();
        display.snakeHead();
        display.food();

        fill(22, 22, 22);
        rect(cellSize * 12, cellSize * 18, cellSize * 16, cellSize * 6);
        textSize(26);
        fill(255);
	textFont(regFont);
        text("- Game Over! -", cellSize * 16, cellSize * 21);
        textSize(20);
        fill(255);
	textFont(regFont);
        text(" Press R to play again", cellSize *15, cellSize* 22);
   } else if (gameState ==="playing") {
	display.grid();
        display.score();
        display.highScore(); 
        display.snakeTail();
        display.snakeHead();
        display.food();
   }
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

    if (gameState !== "welcome") {
        gameState = "playing";
    }
    spawnFood();

    display = new Display();
    snake = new Snake(floor(random(0, MAX_COLS)), floor(random(0, MAX_ROWS)));

    if (!music.isPlaying()) {
        music.play();
        music.setLoop(true);
    }

    if (debugOn) {
        console.log("Game State =", gameState);
        console.log("Reset complete!");
    }
}

function initControls() {
    inputLeft = LEFT_ARROW;
    inputRight = RIGHT_ARROW;
    inputUp = UP_ARROW;
    inputDown = DOWN_ARROW;
    inputPause = "p";
    inputDebug = 192;
    inputRestart = "r";
    inputMute = "m";
}

function spawnFood() {
    food.position.x = floor(random(0, MAX_COLS));
    food.position.y = floor(random(0, MAX_ROWS - 1));
}
