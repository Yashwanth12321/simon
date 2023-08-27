var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var level = 0;

var started = false;
var clickCount=0;

$(document).on("click",function () {
  clickCount++;
  if (clickCount === 2 && !started) {
    started = true;
    nextSequence();
  }
});

$(".btn").on("click",function () {
  if (started) {
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("sucess");
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playsound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    
    
    startover();
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playsound(randomChosenColour);
  level++;
  $("h1").html("level " + level);
  $("h2").html("remember the previous pattern");
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startover() {
  $("h2").html("Your score is "+ (level-1));
  $("h1").html("click anywhere to restart");
  level = 0;
  gamePattern = [];
  started = false;
  clickCount = 0;
  
}


