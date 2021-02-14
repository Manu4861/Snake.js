console.log("Helo world");
var dx, dy;
dx = 0;
dy = 0;
let x = 0;
let y = 0;
let length = 1;
let snake = [];
let head = { x: 1, y: 1 };
let direction = "Right";
const size = 10;
const c = document.getElementById("can");
const ctx = c.getContext("2d");
let cont = document.getElementById("contact");
let fx, fy;
let intrval;
let score = 0;
let sc_con = document.getElementById('score');
let speed = 300;
function gameEngin() {
    intrval = setInterval(() => {
        MoveSnake();
        speed += 10;
    }, speed);
}
gameEngin();

pickLocation(400, 400);
function MoveSnake() {
    switch (direction) {
        case 'Up':
            dy = -1;
            dx = 0;
            break;
        case 'Down':
            dy = 1;
            dx = 0;
            break;
        case 'Left':
            dx = -1;
            dy = 0;
            break;
        case 'Right':
            dx = 1;
            dy = 0;
            break;

    }
    if (length == snake.length) {
        for (let i = 0; i < length - 1; i++) {
            snake[i] = snake[i + 1];
        }
    }
    snake[length - 1] = { x: x, y: y };

    x += dx * size;
    y += dy * size;

    ctx.clearRect(0, 0, 400, 400);
    if (x == fx && y == fy) {
        length++;
        console.log('eat');
        pickLocation(400, 400);
        score += 10;
    }
    sc_con.innerHTML = `${score}`;
    drawFood(fx, fy);
    drawSnke();
    // console.log(snake);
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y == y) {
            console.log('game over');
            length = 0;
            snake = [];
            clearInterval(intrval);
            ctx.fillStyle = "rgba(255,0,0,0.3)";
            ctx.fillRect(0, 0, 400, 400);
            cont.innerHTML = `Game Over <button onclick="gameover()">Restart</button>`;
        }

    }

}


document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        // length++;
        // x *= -1;
        direction = "Left";
    }
    else if (e.key == "ArrowRight") {
        // x *= 1;
        direction = "Right";

    }
    else if (e.key == "ArrowUp") {
        // y *= 1;
        direction = "Up";

    }
    else if (e.key == "ArrowDown") {
        // y *= -1;
        direction = "Down";

    }
});

console.log(x, y);

function drawSnke() {
    if (x >= 400) {
        x = 0;
    }
    else if (x < 0) {
        x = 400;
    }
    else if (y < 0) {
        y = 400;
    }
    else if (y >= 400) {
        y = 0;
    }
    for (let i = 0; i < snake.length; i++) {
        ctx.strokeRect(snake[i].x, snake[i].y, size, size)
        ctx.fillStyle = "#ff6";
        ctx.fillRect(snake[i].x, snake[i].y, size, size);
    }
    ctx.fillStyle = "#f7f";
    ctx.fillRect(x, y, size, size);
}

function drawFood(cx, cy) {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(cx, cy, size, size);
}

function pickLocation(cx, cy) {
    let row = Math.floor(cx / size);
    let col = Math.floor(cy / size);
    fx = Math.floor(Math.floor(Math.random() * row) * size);
    fy = Math.floor(Math.floor(Math.random() * col) * size);
};

function increase_speed(current) {
    speed += Math.floor(current * 0.5);
}

//increasing game speed
function gameover() {
    speed = 300;
    score = 0;
    gameEngin();
    cont.innerHTML = "";
}





