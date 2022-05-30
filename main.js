const scoreDiv = document.querySelector(".score");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


canvas.width = 165;
canvas.height = 165;




// function that start and control the game
const gameController = (() => {
    const scl = 5;
    let snakePart = [];
    let score = 0;
    let gameSpeed = 10;
    let snakeTailLenght = 0;

    class Snake {
        constructor() {
            this.x = 50;
            this.y = 50;
            this.xVelocity = 0;
            this.yVelocity = 0;
        }


        move() {
            this.x += this.xVelocity * scl;
            this.y += this.yVelocity * scl;
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
        switch (e.key) {
            case "ArrowUp":
                if (head.yVelocity === 1 || head.yVelocity === -1) {
                    return;
                }
                head.xVelocity = 0;
                head.yVelocity = -1;
                break;

            case "ArrowDown":
                if (head.yVelocity === -1 || head.yVelocity === 1) {
                    return;
                }
                head.xVelocity = 0;
                head.yVelocity = 1;
                break;

            case "ArrowLeft":
                if (head.xVelocity === 1 || head.xVelocity === -1) {
                    return;
                }
                head.xVelocity = -1;
                head.yVelocity = 0;
                break;

            case "ArrowRight":
                if (head.xVelocity === 1 || head.xVelocity === -1) {
                    return;
                }
                head.xVelocity = 1;
                head.yVelocity = 0;
                break;
        }
    })


    // loop function
    function draw() {
        setTimeout(draw, 1000 / gameSpeed);
        checkCollision();       // game over
        appleCollision();
        drawSnake();
        head.move();
    }

    function checkCollision() {
        if (head.x < 0 || head.x > 160) {
            gameOver();
        }
        if (head.y < 0 || head.y > 160) {
            gameOver();
        }

        snakePart.forEach(element => {
            if (head.x === element.x && head.y === element.y) {
                gameOver();
            }
        })

        function gameOver() {
            score = 0;
            scoreDiv.textContent = "Score: " + score;
            snakeTailLenght = 0;
            snakePart = [];
            head.x = 50;
            head.y = 50;
        }
    }

    function appleCollision() {
        if (head.x === apple.x && head.y === apple.y) {
            apple.generateNewApple();
            snakeTailLenght += 2;
            updateScore();
        }

        function updateScore() {
            score++;
            scoreDiv.textContent = "Score: " + score;
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
            ctx.fillRect(part.x, part.y, 5, 5);
        }

        snakePart.push(new SnakePart(head.x, head.y));
        if (snakePart.length > snakeTailLenght) {
            snakePart.shift();
        }

        ctx.fillRect(head.x, head.y, 5, 5);
        ctx.fillStyle = "red";
        ctx.fillRect(apple.x, apple.y, 5, 5);
    }


    draw();
})();


