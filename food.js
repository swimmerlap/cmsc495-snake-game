var createFood = function() {
          food = {
            //Generate random numbers.
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }
        
        //Look at the position of the snake's body.
        for (var i=0; i>snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;
            
             if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }
   
