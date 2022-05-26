const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 150
canvas.height = 150




// function that start and control the game
const gameController = (()=> {
    let gameSpeed = 45;

    class Snake {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.xVelocity = 0;
            this.yVelocity = 0;
        }


        move() {
            this.x += this.xVelocity;
            this.y += this.yVelocity;
        }  
    }

    class Apple {
        constructor() {
            this.x;
            this.y;
        }

        generateNewApple() {
            this.x = Math.floor(Math.random() * (canvas.width - 10));
            this.y = Math.floor(Math.random() * (canvas.height - 10));
            // generate only number that are multiple of five
            this.x = Math.round(this.x / 5) * 5;
            this.y = Math.round(this.y / 5) * 5;
        }
    }

    const snake = new Snake();
    const apple = new Apple(); 
    

    // snake moviment
    document.body.addEventListener("keydown", e => {    
        // up
        if (e.key === "ArrowUp") {
            if (snake.yVelocity === 1 || snake.yVelocity === -1) {
                return;
            }
            snake.x = Math.round(snake.x / 5) * 5;
            snake.xVelocity = 0;
            snake.yVelocity = -1; 
        }            
        // down
        else if (e.key === "ArrowDown") {
            if (snake.yVelocity === -1 || snake.yVelocity === 1) {
                return;
            }
            snake.x = Math.round(snake.x / 5) * 5;
            snake.xVelocity = 0;
            snake.yVelocity = 1;
        }
        // left
        else if (e.key === "ArrowLeft") {
            if (snake.xVelocity === 1) {
                return;
            } 
            snake.y = Math.round(snake.y / 5) * 5;
            snake.xVelocity = -1;
            snake.yVelocity = 0;
        }      
        // right 
        else if (e.key === "ArrowRight") {
            if (snake.xVelocity === -1) {
                return;
            } 
            snake.y = Math.round(snake.y / 5) * 5;
            snake.xVelocity = 1;
            snake.yVelocity = 0;
        }             
    })
    


    function drawSnake() {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "green";
        ctx.fillRect(snake.x,snake.y,5,5);
    }

    function appleCollision() {
        
    }
 
    // loop function
    function draw() {
        setTimeout(draw, 1000 / gameSpeed);
        drawSnake(); 
        snake.move();
        
    } 
    draw();
})();

