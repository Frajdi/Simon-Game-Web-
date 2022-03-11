var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var keyPress = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  level += 1;
  $("h1").text("Level " + level.toString());
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#" + gamePattern[gamePattern.length - 1]).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + gamePattern[gamePattern.length - 1] + ".mp3");
  audio.play();
};


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  var audio = new Audio("sounds/" + userChosenColour + ".mp3");
  audio.play();
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};


$("body").keypress(function() {
  keyPress += 1;
  if (keyPress == 1) {
    nextSequence();
  } else if (keyPress > 1) {
    startOver();
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel - 1] == userClickedPattern[currentLevel - 1]) {
    console.log("success");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

  }
};


function startOver() {

  level = 0;
  gamePattern = [];
  userClickedPattern = [];

};
