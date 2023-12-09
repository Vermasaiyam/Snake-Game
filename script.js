// Gme constants and variables
let inputDir = { x: 0, y: 0 };
let eating = new Audio("./Music/eating.mp3");
let crash = new Audio("./Music/crash.mp3");
let bgmusic = new Audio("./Music/bgmusic.mp3")
let success = new Audio("./Music/success.mp3")
let move = new Audio("./Music/move.mp3")
let lastPaintTime = 0;
let speed = 9;
let score = 0;

let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 5, y: 6 };

// localStorage.clear();
//Game Functions
bgmusic.play();
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if collide into urself
    for (let i = 1; i < snakeArr.length; i++) {
        if ((snake[0].x === snakeArr[i].x) && (snake[0].y === snakeArr[i].y)) {
            crash.play();
            score = 0;
            document.getElementsByClassName("score")[0].innerText = "Score: " + score;
            return true;
        }
    }
    if ((snake[0].x >= 18) || (snake[0].y >= 18) || (snake[0].x <= 0) || (snake[0].y <= 0)) {
        crash.play();
        score = 0;
        document.getElementsByClassName("score")[0].innerText = "Score: " + score;
        return true;
    }


}

let c = 0;
function gameEngine() {
    // Part 1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    //if snake has eaten the food
    if ((snakeArr[0].x === food.x) && (snakeArr[0].y === food.y)) {
        eating.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score = score + 1;
        document.getElementsByClassName("score")[0].innerText = "Score: " + score;
        if (highScoreValue < score){
            highScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue));
            document.getElementsByClassName("highScore")[0].innerText = "High Score: " + highScoreValue;
            c++;
            if (c===1){
                success.play();
            }
        }
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // move.play();

    // Part 2: Displaying the snake and the food
    // Displaying the snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
            // snakeArr[0] = {...snakeElement};
        }
        else {
            snakeElement.classList.add('body');
        }
        board.appendChild(snakeElement);
    })
    // Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



// Main Logic
let highScore = localStorage.getItem("highScore");
highScoreValue = 0;
if (highScore === null){
    localStorage.setItem("highScore", JSON.stringify(highScoreValue));
}
else{
    highScoreValue = JSON.parse(highScore);
    document.getElementsByClassName("highScore")[0].innerText = "High Score: " + highScoreValue;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            // move.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log('ArrowDown');
            // move.play();
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log('ArrowLeft');
            // move.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log('ArrowRight');
            // move.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;

    }
})