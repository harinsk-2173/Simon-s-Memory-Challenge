var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[]; 

//to handle the event of starting the game
var gameStarted=false;
var level= 0;

//checking keypress for starting game
$(document).keypress(function(){
  if(!gameStarted){
    $("#level-title").text("level "+level);
    nextSequence();
    gameStarted=true;
  }
});


//check button click and handle event
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    //adding id color chosen in the userpattern array
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){

            
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        }
else if(userClickedPattern[currentLevel] !== gamePattern[currentLevel])
      {
        var incAudio=new Audio("sounds/wrong.mp3");
        incAudio.play();
        //playSound("wrong");

        $("h1").text("Gameover,Press any key to replay");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
         startOver();
      }
   // if startover is called here then that'll be of another game.
    //startOver();
    }


function nextSequence(){

    userClickedPattern=[];

    level++;

    $("#level-title").text("level "+level);

var randNum=Math.floor(Math.random()*4);
var randColor=buttonColours[randNum];

//adding the random color chosen in the gamepattern array for the sequence
gamePattern.push(randColor);

//for the flash effect on the color chosen
 $("#"+randColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound( randColor);
} 

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

//adding pressed class to the idcolor chosen 
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    //removing effect after certain time
setTimeout(function(){
   $("#"+currentColor).removeClass("pressed");
  },100);
}
 function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
 }


 


