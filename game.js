var hasGameStarted = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    userClickedPattern = [];
    $("#level-title").html("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(document).on("keypress", function () {
    if (hasGameStarted === false) {
        hasGameStarted = true;
        nextSequence();
    }

});

$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentIndex) {
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex])
        console.log("Success");
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }

}

function startOver() {
    hasGameStarted = false;
    level = 0;
    gamePattern = [];
}


