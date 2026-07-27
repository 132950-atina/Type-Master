// ==========================
// TYPEMASTER
// Session 1
// ==========================

// ELEMENTS

const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const time = document.getElementById("time");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");

const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");

const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const bootScreen = document.getElementById("bootScreen");
const bootText = document.getElementById("bootText");
const progressBar = document.getElementById("progressBar");
// ==========================
// BACKGROUND MUSIC
// ==========================

const backgroundMusic = new Audio("sounds/music.mp3");

backgroundMusic.loop = true;

backgroundMusic.volume = 0.25;
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");

// BOOT SEQUENCE
// ==========================

const bootLines = [

"> Initializing TypeMaster...",

"> Loading hacker interface...",

"> Checking keyboard...",

"> Loading typing database...",

"> Access Granted."

];
// ==========================
// GAME DATA
// ==========================

const texts = [

"The quick brown fox jumps over the lazy dog.",

"Practice makes perfect when you never give up.",

"Small projects lead to big achievements.",

"Typing fast requires focus and accuracy.",

"Consistency beats talent when talent does not work hard."

];

let currentText = "";

let timer = null;

let timeLeft = 30;
const gameTime = 30;

let startTime = 0;
let totalTyped = 0;
let highScore = localStorage.getItem("highScore") || 0;
// ==========================
// START GAME
// ==========================

startBtn.addEventListener("click", function () {
   backgroundMusic.play().catch(() => {});

    welcomeScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    currentText = texts[Math.floor(Math.random() * texts.length)];

    textDisplay.innerHTML = "";

currentText.split("").forEach(letter => {

    const span = document.createElement("span");

    span.innerText = letter;

    textDisplay.appendChild(span);

});

    textInput.value = "";
    progressBar.style.width = "0%";
    totalTyped = 0;
    textInput.focus();

    timeLeft = 30;

    time.innerHTML = timeLeft;
    startTime = Date.now();

    timer = setInterval(function () {

        timeLeft--;

        time.innerHTML = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            finishGame(false);
        }

    }, 1000);

});

// ==========================
// FINISH GAME
// ==========================

function finishGame(completed) {

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    gameScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    resultScreen.classList.remove("hidden");
const elapsedMinutes = (Date.now() - startTime) / 60000;

const words = currentText.trim().split(" ").length;

const finalSpeed = Math.round(words / elapsedMinutes);
let correctLetters = 0;

const letters = textDisplay.querySelectorAll("span");

letters.forEach(letter => {

    if(letter.classList.contains("correct")){

        correctLetters++;

    }

});

const finalAccuracyPercent =
Math.round((correctLetters / currentText.length) * 100);
    if(completed){
        
      winSound.currentTime = 0;
      winSound.play();
       

    if(finalSpeed > highScore){

        highScore = finalSpeed;

        localStorage.setItem("highScore", highScore);

        finalWpm.innerHTML =
        "🏆 NEW HIGH SCORE!<br><br>⚡ WPM : " + finalSpeed;

    }

    else{

        finalWpm.innerHTML =
        "⚡ WPM : " + finalSpeed +
        "<br><br>🏆 High Score : " + highScore;

    }

   finalAccuracy.innerHTML =
"🎯 Accuracy : " + finalAccuracyPercent + "%" +
"<br><br>✅ You typed the entire text correctly.";

    }

    else{
         loseSound.currentTime = 0;
          loseSound.play();
       
        finalWpm.innerHTML="⏰ Time's Up!";

        finalAccuracy.innerHTML="You didn't finish the text.";

    }

}

// ==========================
// PLAY AGAIN
// ==========================
restartBtn.addEventListener("click", function () {

    location.reload();

});
// ==========================
// CHECK TYPING
// ==========================

textInput.addEventListener("input", function () {
   
    totalTyped = textInput.value.length;
const progress =
(textInput.value.length / currentText.length) * 100;

progressBar.style.width = progress + "%";
    const letters = textDisplay.querySelectorAll("span");

    const typed = textInput.value.split("");

    let correct = true;

    letters.forEach((letter, index) => {

        letter.classList.remove("correct");
        letter.classList.remove("wrong");
        letter.classList.remove("current");

        if (typed[index] == null) {

            if (correct) {
                letter.classList.add("current");
            }

            correct = false;

        }

        else if (typed[index] === letter.innerText) {

            letter.classList.add("correct");

        }

        else {

            letter.classList.add("wrong");

            correct = false;

        }

    });

    if (textInput.value === currentText) {

        clearInterval(timer);

        finishGame(true);

    }

});
// ==========================
// BOOT ANIMATION
// ==========================

welcomeScreen.classList.add("hidden");

let bootIndex = 0;

function bootAnimation(){

    if(bootIndex < bootLines.length){

       bootText.innerHTML =
bootLines.slice(0, bootIndex + 1).join("\n") +
'<span class="cursor">█</span>';

        bootIndex++;

        setTimeout(bootAnimation,600);

    }

    else{

        setTimeout(function(){

            bootScreen.classList.add("hidden");

            welcomeScreen.classList.remove("hidden");

        },700);

    }

}

if (!sessionStorage.getItem("bootPlayed")) {

    sessionStorage.setItem("bootPlayed", "true");

    bootAnimation();

} else {

    bootScreen.classList.add("hidden");

    welcomeScreen.classList.remove("hidden");

}
// ==========================
// ANTI CHEAT
// ==========================

// Disable Paste
textInput.addEventListener("paste", function (event) {

    event.preventDefault();

    alert(
`⚠ ACCESS DENIED

Paste is disabled.

Real hackers type. ⌨️`
    );

});

// Disable Copy
textInput.addEventListener("copy", function (event) {

    event.preventDefault();

    alert(
`⚠ ACCESS DENIED

Copy is disabled.

Nice try. 😏`
    );

});

// Disable Cut
textInput.addEventListener("cut", function (event) {

    event.preventDefault();

    alert(
`⚠ ACCESS DENIED

Cut is disabled.

Mission integrity protected. 🛡️`
    );

});

document.addEventListener("contextmenu", function(event){

    event.preventDefault();

    alert(
`🚫 RIGHT CLICK BLOCKED

This terminal is protected.

Proceed by typing only.`
    );

});