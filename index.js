var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var blue = new Audio("sounds/blue.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");
var userSequence = [];
var compSequence = [];


var j;

var answer;

$(".btn").click(function(event) {

  var userChoice = (event.currentTarget.id);
  makeSound(userChoice);

  j = compSequence.length;

  // alert("User Sequence length: " + userSequence.length);
  //Initial button press.
  if (j == 0) {
    $("h1").text("Level " + j);
    compSequence.push(userChoice);
    userSequence.push(userChoice);

  }


  // Build user sequence without adding to sequence in memory
  if (j > userSequence.length) {


    userSequence.push(userChoice);


    if (check(userSequence, compSequence, userSequence.length - 1) == 0) {

      startOver(compSequence, userSequence);
      $("h1").text("Game Over!");
      setTimeout(function() {
        $("h1").text("Game resetting...");
      }, 2000);
      setTimeout(function() {
        $("h1").text("Choose a button to start");
      }, 4000);
    }
  }
  if (compSequence.length == userSequence.length && (check(userSequence, compSequence, j - 1) == 1) && (compSequence.length > 0)) {

    // Generate next in Sequence
    compSequence.push(generateNext());

    $("h1").text("Level " + (compSequence.length - 1));


    // Clear the user's Sequence
    for (i = 0; userSequence.length; i++) {
      userSequence.pop();
    }

    // Display the saved sequence

    setTimeout(function() {
      displaySequence(compSequence, 0);
    }, 1000);

  }

  if (compSequence.length == userSequence.length && (check(userSequence, compSequence, j - 1) == 0)) {


    startOver(compSequence, userSequence);
    alert(compSequence);
    $("h1").text("Game Over!");
    setTimeout(function() {
      $("h1").text("Game resetting...");
    }, 2000);
    setTimeout(function() {
      $("h1").text("Choose a button to start");
    }, 4000);

  }

});


function check(checkUSequence, checkCSequence, j) {
  var answer;

  if (checkUSequence[j] === checkCSequence[j]) {

    answer = 1;
    // alert("Correct");

  } else {
    answer = 0;


  }
  return answer;
}


function generateNext() {
  var next = Math.round(Math.random() * 4);
  // alert(next);

  switch (next) {

    case 1:

      ret = "red";
      break;

    case 2:

      ret = "green";
      break;

    case 3:

      ret = "yellow";
      break;

    case 4:

      ret = "blue";
      break;

  }

  return ret;

}


function makeSound(whichBtn) {
  switch (whichBtn) {

    case "green":

      green.play();
      $(".green").addClass("pressed");
      setTimeout(function() {
        $(".green").removeClass("pressed");
      }, 200);
      break;

    case "red":

      red.play();
      $(".red").addClass("pressed");
      setTimeout(function() {
        $(".red").removeClass("pressed");
      }, 200);
      break;

    case "yellow":
      $(".yellow").addClass("pressed");
      setTimeout(function() {
        $(".yellow").removeClass("pressed");
      }, 200);
      yellow.play();

      break;

    case "blue":
      $(".blue").addClass("pressed");
      setTimeout(function() {
        $(".blue").removeClass("pressed");
      }, 200);
      blue.play();

      break;
  }
}

function displaySequence(compSequence, i) {

  for (var i = 0; i < compSequence.length; i++) {
    (function(i) {
      setTimeout(function() {
        makeSound(compSequence[i]);
      }, i * 1000);
    })(i);
  }

}

function startOver(compSequence, userSequence) {
  var i = 0;
  for (i = 0; compSequence.length; i++) {
    compSequence.pop();
  }
  for (i = 0; userSequence.length; i++) {
    userSequence.pop();
  }

}
