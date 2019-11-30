/* * * * * * * * * * * * * * * * *
 *    CMST 495 6380 Group 2      *
 * * * * * * * * * * * * * * * * *
 *
 * Name: Display.js
 * Author: Rachael Schutzman, Selamawit Asfaw, Danny Ramirez, Gilda Hogan, Gavin Spain
 * Description: Holds the Display class.
 *
 */

/* Revision History
 * 11/17/2019 - Initially created.
 * (Danny Ramirez)
 * 
 * 11/22/2019 - New class file created for Display class.
 * (Rachael Schutzman)
 * 
 * 11/17/2019 - Changed snake and grid methods to accomodate a more flexible
 *              grid.
 * (Danny Ramirez)
 */

class Display {

    snakeHead() {
        fill(251, 203, 28);
        rect(gridStartX + snake.position.x * cellSize, gridStartY + snake.position.y * cellSize, snake.size, snake.size, borderRadius);
    }
    
    snakeTail() {
        for (let i = 0; i < snake.tail.length; i++) {
            fill(251, 170, 0);
            rect(gridStartX + snake.tail[i].position.x * cellSize, gridStartY + snake.tail[i].position.y * cellSize, snake.size, snake.size, borderRadius);
        }
    }
    
    grid() {
        for (let row = 0; row < MAX_ROWS; row++) {
            for (let column = 0; column < MAX_COLS; column++) {
                fill(34, 34, 34);
                stroke(22, 22, 22);
                rect(gridStartX + column * cellSize, gridStartY + row * cellSize, cellSize, cellSize, borderRadius);
            }
        }
    
    }

    food() {
        fill(252, 83, 63);
        rect(gridStartX + food.position.x * cellSize, gridStartY + food.position.y * cellSize, food.size, food.size, borderRadius);
    }
    
    score() {
        fill(255);
        textSize(26);
        textFont("Impact");
        text("Score", 2 * cellSize, 2 * cellSize);
        text(score, 3 * cellSize, 4 * cellSize);
    }
    
    highScore() {
        fill(255);
        textSize(26);
        textFont("Impact");
        text("High Score", cellSize * 31  , 2 * cellSize);
        text(highScore, cellSize * 33  , 4 * cellSize);
    }
}