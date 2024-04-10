
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];


 
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
var gameNotStarted = true;
var level = 0;

$(document).keydown(function(){
    if (gameNotStarted){
        $("#level-title").text("Level "+ level);
        nextSequence();
        gameNotStarted = false;
     }
    
  });

  

  function checkAnswer(currentLevel){
        
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        console.log("user clicked " + userClickedPattern)

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
            nextSequence();
            }, 1000);
            
        }
    }
    else  {
        var wrongAnswer = new Audio("sounds/wrong.mp3");
        wrongAnswer.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
         }, 200);
         $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    
        
       }
    }
   
   
  


function nextSequence(){
    userClickedPattern = [];
   
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour)

     $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);
    
   
}

function playSound(name){
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
 
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);

    }

    function startOver(){
        level = 0;
        gamePattern = [];
        gameNotStarted = true;
    }