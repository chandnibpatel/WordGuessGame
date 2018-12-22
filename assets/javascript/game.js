// Declaring all the Global Variables
var userKey;
var userKey1;
var firstTime = true;
var dashWord = "";
var playWord = "";
var usedChars="";
var totalChance=0;
var mySound;

//Declaring Arrays
var charArr = [];
var gameWords = ["Festive", "Chestnuts", "Gingerbread", "Nutcracker", "Mittens", "Snowman", "Wintertime", "Xmas", "Bells"];

//Declare all functions here
function startGame() {

  //set the property of the Html elements based on visibility needed while starting the game
  document.getElementById("hideKey").hidden = true;
  document.getElementById("contents").hidden = false;
  document.getElementById("gameguess").hidden = false;
  document.getElementById("playBtn").hidden = false;
  document.getElementById("resultMsg").hidden=true;
  usedChars = "";

  mySound.play();

  //Use the below logic to pic the random word from the array of game word
  var randomNo = Math.random();
  playWord = gameWords[Math.floor(randomNo * gameWords.length)];

  //Total chances are 10 while starting the game
  totalChance=10;
  for (i = 0; i < playWord.length; i++) {
      charArr[i]="_";
  }
  dashWord = charArr.join(' ');
  // Below Console is for debugging purpose
  console.log(playWord);
}
function searchLetter(userKey,userKey1) {

  if (usedChars == "")
      usedChars = userKey;
  else 
  usedChars = usedChars + "  ,  " + userKey;
  
  if (playWord.indexOf(userKey) == -1 && playWord.indexOf(userKey1)== -1) {
      totalChance=totalChance-1;
      animate();
  }
  else {
      for (i = 0; i < playWord.length; i++) {
          if (playWord[i] == userKey) {
              charArr[i] = userKey;
          }else if(playWord[i] == userKey1){
            charArr[i] = userKey1;
        }
      }

  }
}
function displayStat() {
  dashWord = charArr[0];
    for (i = 1; i < playWord.length; i++) {
        dashWord = dashWord + " " + charArr[i];
    }
  document.getElementById("guessWord").innerHTML = dashWord;
  document.getElementById("usedChar").innerHTML = usedChars;
  document.getElementById("chancesLeft").innerHTML=totalChance;
  if (totalChance==0)
  {
    document.getElementById("resultMsg").hidden=false;
      document.getElementById("resultMsg").innerHTML="You loose the Game!!";  
  }
  if((totalChance >0) && (dashWord.indexOf("_")==-1) )
  {
    document.getElementById("resultMsg").hidden=false;
      document.getElementById("resultMsg").innerHTML="You win the Game !!";   
  }
  
}
// Hangman
var animate = function () {
  var drawMe = totalChance ;
  drawArray[drawMe]();
}


 // Hangman
canvas =  function(){

  myStickman = document.getElementById("stickman");
  context = myStickman.getContext('2d');
  context.beginPath();
  context.strokeStyle = "#ff0000";
  context.lineWidth = 2;
};

  head = function(){
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  }
  
draw = function(pathFromx, pathFromy, pathTox, pathToy) {
  
  context.moveTo(pathFromx, pathFromy);
  context.lineTo(pathTox, pathToy);
  context.stroke(); 
}
canvasClear=function(){

var myStickman = document.getElementById("stickman");
 var context = myStickman.getContext('2d');
context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
 frame1 = function() {
   draw (0, 150, 150, 150);
 };
 
 frame2 = function() {
   draw (10, 0, 10, 600);
 };

 frame3 = function() {
   draw (0, 5, 70, 5);
 };

 frame4 = function() {
   draw (60, 5, 60, 15);
 };

 torso = function() {
   draw (60, 36, 60, 70);
 };

 rightArm = function() {
   draw (60, 46, 100, 50);
 };

 leftArm = function() {
   draw (60, 46, 20, 50);
 };

 rightLeg = function() {
   draw (60, 70, 100, 100);
 };

 leftLeg = function() {
   draw (60, 70, 20, 100);
 };

drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.setAttribute("loop","true");
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function playAgain(){
  startGame();
  canvasClear();
  displayStat();
};


//Main Process
window.onload=function (e){
    document.getElementById("contents").hidden = true;
    document.getElementById("gameguess").hidden = true;
    document.getElementById("playBtn").hidden = true;
    mySound = new sound("./assets/music/jingle_bells.mp3");
    $("#playBtn").on("click",playAgain);
    
}
document.onkeyup = function (event) {
    userKey = event.key.toLowerCase();
    userKey1 = event.key.toUpperCase();
    userKeyCode=event.keyCode;
    if (firstTime == true) {
        startGame();
        canvas();
        firstTime = false;
    } else {
      if ((userKeyCode > 64 && userKeyCode < 91) || (userKeyCode > 96 && userKeyCode < 123))
      {
        if ((totalChance >0) && (usedChars.indexOf(userKey)==-1) && (dashWord.indexOf("_")!=-1) )
        searchLetter(userKey, userKey1);
      }
     else {
        alert("Use alphabets only");
        return 0;
      }
    }
    displayStat();
    
    
    
}

