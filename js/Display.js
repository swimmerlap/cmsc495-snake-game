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
 */
class Display {
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
}
