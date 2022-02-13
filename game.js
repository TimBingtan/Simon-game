var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern;
var level = 0;
var clickCount;

$(document).keypress(function(){
  if (level < 1){
    nextSequence();
  }
});

$(".btn").click(function(event){
  var userChosenColor = event.target.id;
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
});

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
  $(".pressed").removeClass("pressed")
  }, 100);
}


function nextSequence(){
  level++;
  $("h1").html("Level "+level);
  userClickedPattern = [];
  clickCount = 0;
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#"+randomChosenColor).fadeOut("fast").fadeIn("fast");
  console.log("Game pattern: "+gamePattern);
  console.log("Level: "+level);
}

function playSound(color){
  var audio = new Audio('sounds/'+color+'.mp3');
  audio.play();

}

function checkAnswer(color){
  console.log("User clicked pattern: "+userClickedPattern);
  if (gamePattern[clickCount] === userClickedPattern[clickCount]){
    clickCount++;
    if (clickCount === level){
      setTimeout(function(){
        nextSequence()
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
  $(".game-over").removeClass("game-over")
  }, 100);
  startOver();
  $("h1").html("Game Over, Press Any Key to Restart");
}

function startOver(){
  level = 0;
  gamePattern = [];
}
