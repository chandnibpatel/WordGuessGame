var userKey;
var firstTime = true;
var dashWord = "";
var playWord = "";
var charArr = [];
var usedChars="";
var totalChance=0;
var mySound;
window.onload=function (e){
    document.getElementById("contents").hidden = true;
    document.getElementById("gameguess").hidden = true;

   
}
document.onkeyup = function (event) {
    userKey = event.key.toLowerCase();
    if (firstTime == true) {
        startGame();
        canvas();
        firstTime = false;
    } else {
        if ((totalChance >0) && (usedChars.indexOf(userKey)==-1) && (dashWord.indexOf("_")!=-1) )
        searchLetter(userKey);
    }
    displayStat();
    
}

function startGame() {
    document.getElementById("hideKey").hidden = true;
    document.getElementById("contents").hidden = false;
    document.getElementById("gameguess").hidden = false;

    mySound = new sound("./assets/music/jingle_bells.mp3");
    mySound.play();
    var gameWords = ["festive", "chestnuts", "gingerbread", "nutcracker", "mittens", "snowman", "wintertime", "xmas", "bells"];

    var randomNo = Math.random();
    playWord = gameWords[Math.floor(randomNo * gameWords.length)];

    console.log(playWord);

    totalChance=10;
    for (i = 0; i < playWord.length; i++) {
    charArr[i] = "_";
    }
}
function searchLetter(userKey) {

    if (usedChars == "")
        usedChars = userKey;
    else 
    usedChars = usedChars + "  ,  " + userKey;
    
    if (playWord.indexOf(userKey) == -1) {
        totalChance=totalChance-1;
        animate();
    }
    else {
        for (i = 0; i < playWord.length; i++) {
            if (playWord[i] == userKey) {
                charArr[i] = userKey;
            }
        }

    }
}
function displayStat() {
    dashWord = charArr[0];
    for (i = 1; i < charArr.length; i++) {
        dashWord = dashWord + " " + charArr[i];
    }
    document.getElementById("guessWord").innerHTML = dashWord;
    document.getElementById("usedChar").innerHTML = usedChars;
    document.getElementById("chancesLeft").innerHTML=totalChance;
    if (totalChance==0)
    {
        document.getElementById("resultMsg").innerHTML="You loose the Game!!";  
    }
    if((totalChance >0) && (dashWord.indexOf("_")==-1) )
    {
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
    context.strokeStyle = "#111";
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
 