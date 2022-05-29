const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 125;
canvas.height = 125;




// function that start and control the game
const gameController = (() => {
    const snakePart = [];
    let gameSpeed = 20;
    let snakeTailLenght = 0;

    class Snake {
        constructor() {
            this.x = 50;
            this.y = 50;
            this.xVelocity = 0;
            this.yVelocity = 0;
        }


        move() {
            this.x += this.xVelocity;
            this.y += this.yVelocity;
        }
    }

    class SnakePart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Apple {
        constructor() {
            this.x = 75;
            this.y = 60;
        }

        generateNewApple() {
            this.x = Math.floor(Math.random() * (canvas.width - 10));
            this.y = Math.floor(Math.random() * (canvas.height - 10));
            // generate only number that are multiple of five
            this.x = Math.round(this.x / 5) * 5;
            this.y = Math.round(this.y / 5) * 5;
        }
    }

    const head = new Snake();
    const apple = new Apple();

    // snake moviment
    document.body.addEventListener("keydown", e => {    
        // up
        if (e.key === "ArrowUp") {
            if (head.yVelocity === 1 || head.yVelocity === -1) {
                return;
            }
            // if was going right 
            if (head.xVelocity === 1) {
                head.x = Math.ceil(head.x / 5) * 5;
                head.xVelocity = 0;
                head.yVelocity = -1;  
            }
            // if was going left
            else {
                head.x = Math.floor(head.x / 5) * 5;
                head.xVelocity = 0;
                head.yVelocity = -1;
            } 
        }      

        // down
        else if (e.key === "ArrowDown") {
            if (head.yVelocity === -1 || head.yVelocity === 1) {
                return;
            }
            // if was going right 
            if (head.xVelocity === 1) {
                head.x = Math.ceil(head.x / 5) * 5;
                head.xVelocity = 0;
                head.yVelocity = 1;  
            }
            // if was going left
            else {
                head.x = Math.floor(head.x / 5) * 5;
                head.xVelocity = 0;
                head.yVelocity = 1;
            }
        }

        // left
        else if (e.key === "ArrowLeft") {
            if (head.xVelocity === 1 || head.xVelocity === -1) {
                return;
            }
            // if was going up
            if (head.yVelocity === -1) {
                head.y = Math.ceil(head.y / 5) * 5;
                head.xVelocity = -1;
                head.yVelocity = 0;
            }
            // if was goind down
            else {
                head.y = Math.floor(head.y / 5) * 5;
                head.xVelocity = -1;
                head.yVelocity = 0;    
            }
        } 

        // right 
        else if (e.key === "ArrowRight") {
            if (head.xVelocity === 1 || head.xVelocity === -1) {
                return;
            } 
            // if was going up
            if (head.yVelocity === -1) {
                head.y = Math.ceil(head.y / 5) * 5;
                head.xVelocity = 1;
                head.yVelocity = 0;
            }
            // if was goind down
            else {
                head.y = Math.floor(head.y / 5) * 5;
                head.xVelocity = 1;
                head.yVelocity = 0;
            }
        }             
    })


    // loop function
    function draw() {
        setTimeout(draw, 1000 / gameSpeed);
        appleCollision();
        drawSnake();
        head.move();
    }


    function appleCollision() {
        if (head.x === apple.x && head.y=== apple.y) {
            apple.generateNewApple();
            snakeTailLenght += 10;
        }
    }

    function drawSnake() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "green";
        
        // draw new snake part
        for (let i = 0; i < snakePart.length; i++) {
            let part = snakePart[i];
            part.x = Math.round(part.x / 5) * 5;
            part.y = Math.round(part.y / 5) * 5;
            ctx.fillRect(part.x, part.y,5,5);
        }

        snakePart.push(new SnakePart(head.x,head.y));
        
        if (snakePart.length > snakeTailLenght) {
            snakePart.shift();
        }
        
        ctx.fillRect(head.x, head.y, 5, 5);

        ctx.fillStyle = "red";
        ctx.fillRect(apple.x, apple.y, 5, 5);
    }


    draw();
})();

