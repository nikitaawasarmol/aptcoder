// Initial position 
let startGame = {x: 0, y: 0}; 


// audio files
const foodSound = new Audio('crunchy-bite.mp3');
const gameOverSound = new Audio('gave over.mp3');
const turningSound = new Audio('move.mp3');
const musicSound = new Audio('bg-music.mp3');


let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeInitPosition = [
    {x: 17, y: 7}
];

food = {x: 7, y: 6};

// main Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    startTheGame();
}

function isCollide(snake) {
    // bumping into itself 
    for (let i = 1; i < snakeInitPosition.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //bumping into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function startTheGame(){
    musicSound.play();
    //Updating the snake array & Food
    if(isCollide(snakeInitPosition)){
        gameOverSound.play();
        musicSound.pause();
        startGame =  {x: 0, y: 0}; 
        alert("Game Over!! Press any ok to play again.");
        snakeInitPosition = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // increment the score and regenerate the food
    if(snakeInitPosition[0].y === food.y && snakeInitPosition[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>highScoreval){
            highScoreval = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreval));
            highScoreBox.innerHTML = "highScore: " + highScoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeInitPosition.unshift({x: snakeInitPosition[0].x + startGame.x, y: snakeInitPosition[0].y + startGame.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeInitPosition.length - 2; i>=0; i--) { 
        snakeInitPosition[i+1] = {...snakeInitPosition[i]};
    }

    snakeInitPosition[0].x += startGame.x;
    snakeInitPosition[0].y += startGame.y;

    //rendery the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeInitPosition.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic
musicSound.play();
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreval = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreval))
}
else{

    highScoreval = JSON.parse(highScore);
    highScoreBox.innerHTML = "highScore: " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    startGame = {x: 0, y: 1} // Start the game
    turningSound.play();
    switch (e.key) {

        case "ArrowUp":
            console.log("ArrowUp");
            startGame.x = 0;
            startGame.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            startGame.x = 0;
            startGame.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            startGame.x = -1;
            startGame.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            startGame.x = 1;
            startGame.y = 0;
            break;

        default:
            break;
    }

});