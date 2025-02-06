alert("its a memory game so try to memorize the pattern then repeat the pattern for next rounds")

let colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let playerSequence = [];
let gameStarted = false;

$(document).on("keydown", function () {
    if (!gameStarted) {
        gameStarted = true;
        let startSound = new Audio("./sounds/start.mp3");
        startSound.play();        

        // Wait for 1 second before starting the game
        setTimeout(function() {
            startGame();
        }, 2000); // 1000ms = 1 second
    }
});

function startGame() {
    $("h1").text("Level 1");
    nextRound();
}

function nextRound() {
    playerSequence = [];
    let randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    
    $("h1").text("Level " + gameSequence.length);
    
    setTimeout(function () {
        playButtonAnimation(randomColor);
    }, 500);
}

function playButtonAnimation(color) {
    let button = $("." + color);
    let sound = new Audio("./sounds/" + color + ".mp3");

    button.addClass("pressed");
    sound.play();

    setTimeout(() => {
        button.removeClass("pressed");
    }, 100);
}

$(".btn").on("click", function () {
    let clickedColor = $(this).attr("class").split(" ")[1];
    playerSequence.push(clickedColor);
    playButtonAnimation(clickedColor);

    if (!checkPlayerSequence()) {
        gameOver();
    } else if (playerSequence.length === gameSequence.length) {
        setTimeout(nextRound, 1000);
    }
});

function checkPlayerSequence() {
    let index = playerSequence.length - 1;
    return playerSequence[index] === gameSequence[index];
}

function gameOver() {
    $("h1").text("Game Over! Press Any Key to Restart");
    $("body").css("backgroundColor", "red");

    // Play game over sound
    let gameOverSound = new Audio("./sounds/mariodie.wav");
    gameOverSound.play();

    setTimeout(() => {
        $("body").css("backgroundColor", "");
    }, 200);

    resetGame();
}


function resetGame() {
    gameSequence = [];
    playerSequence = [];
    gameStarted = false;
}
