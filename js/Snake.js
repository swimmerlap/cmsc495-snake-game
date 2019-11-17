/* * * * * * * * * * * * * * * * *
 *    CMST 495 6380 Group 2      *
 * * * * * * * * * * * * * * * * *
 *
 * Name: Snake.js
 * Author: Rachael Schutzman, Selamawit Asfaw, Danny Ramirez, Gilda Hogan, Gavin Spain
 * Description: Handles the snake's creation, movement, and collision.
 *
 */

/* Revision History
 * 11/17/2019 - Initially created.
 * (Danny Ramirez)
 * 
 * 
 */

class Snake {

    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        };
        this.direction = {
            x: 1,
            y: 0
        };
        this.size = 20;
        this.speed = 5;
        this.tail = [];
        this.tailSize = 0; 

        this.setDirection(1, 0);
    }

    move() {
        this.tail.push({position:{x: this.position.x, y: this.position.y}});
        while (this.tail.length > this.tailSize) {
            this.tail.shift();
        }

        switch (heading) {
            case RIGHT:
                this.setDirection(1, 0);
                break;
            case LEFT:
                this.setDirection(-1, 0);
                break;
            case UP:
                this.setDirection(0, -1);
                break;
            case DOWN:
                this.setDirection(0, 1);
                break;
        }

        this.position.x += this.direction.x;
        this.position.y += this.direction.y;

        this.wrapAround(true, true, gridSize - 1);

    }

    setDirection(x, y) {
        this.direction.x = x;
        this.direction.y = y;
    }

    wrapAround(hor, vert, margin) {
        if (hor) {
            if (this.position.x < 0) {
                this.position.x = margin;
            } else if (this.position.x > margin) {
                this.position.x = 0;
            }
        }
        if (vert) {
            if (this.position.y < 0) {
                this.position.y = margin;
            } else if (this.position.y > margin) {
                this.position.y = 0;
            }
        } 
    }

    collides(obj) {
        if (this.position.x === obj.position.x &&
            this.position.y === obj.position.y) {
                return true;
            }
        return false;
    }
}