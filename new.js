var gamePattern = [];
var colors = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];

var started = false;
var level = 0;

// this function starts up the whole game by asking the user to press any key on the key-board
$(document).keydown(function () {
  if (!started) {
    $("h1").text("level " + level);
    random();
    started = true;
  }
});

// it's the click function that stores the users input inside the array mentioned on the top called "userClickedPattern"
$(".same").click(function () {
  var userChooseColor = $(this).attr("id");
  userClickedPattern.push(userChooseColor);

  //   here we use the functions to play the sound and animate the buttons
  playSound(userChooseColor);
  animatePress(userChooseColor);
  checkAnswer(userClickedPattern.length - 1);
});

// this function checks if the users input array i.e "userClickedPattern" is the same as the "gamePattern" array
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        random();
      }, 1000);
    }
  } else {
    //   here we show the user that he/she has gone wrong and they have to start over again.
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    document.querySelector(".area").classList.add("wrong");

    setTimeout(function () {
      document.querySelector(".area").classList.remove("wrong");
    }, 700);

    // calling startOver function .
    startOver();
  }
}

// the startOver function.
function startOver() {
  level = 0;
  $("h1").html("Enter a key to restart ");
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

// here we create random numbers and according to the numbers we store random colors inside the "gamePattern" array.
function random() {
  level++;
  $("h1").text("level " + level);

  var a = Math.floor(Math.random() * 4);
  var randomColor = colors[a];
  gamePattern.push(randomColor);
  var b = $("#" + randomColor);
  b.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //   this will do the animation and play the sound from the very start to give the user the first color to click
  playSound(randomColor);
  animatePress(randomColor);
  //   after this we empty the user's array i.e "userClickedPattern" so that user had to remember the sequence and click the first button to the end.
  userClickedPattern = [];
}

// here are the functions that plays the sound and animates the button respectively.
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

document.querySelector(".icon").addEventListener("click", function () {
  // console.log("clicked");
  document.querySelector(".gamePattern").classList.toggle("toggle-gameP");
  document.querySelector(".icon").classList.toggle("reIcon");
});
