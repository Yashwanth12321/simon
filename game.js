
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[];
var level =0;

var started=false;



$(document).keydown(function(){
    if (!started) {
        $("h1").html("level "+ level );
        started=true;
        nextSequence();
    }
})


$(".btn").click(function () {
    var userChosenColour=$(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour); 
    checkAnswer(userClickedPattern.length-1)   
});




function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("sucess")
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        $("body").addClass("game-over");
        playsound('wrong')
        setTimeout(function () {
            $("body").removeClass("game-over");;
          }, 200);
          $("h1").html("Gameover press any key to restart")
          startover();
    }
}


function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed")
    },100);
}


function nextSequence() {
    userClickedPattern=[];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColour);
  level++;
  $("h1").html("level "+ level );
}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startover(){
    level=0;
    gamePattern=[];
    started=false;
}

