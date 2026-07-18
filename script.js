const welcomeScreen = document.getElementById("welcome-screen");
const loadingScreen = document.getElementById("loading-screen");
const missionScreen = document.getElementById("mission-screen");

const startBtn = document.getElementById("startBtn");
const loadingBar = document.querySelector(".loading-progress");
const loadingText = document.getElementById("loading-text");

// Hide screens when the page loads
loadingScreen.style.display = "none";
missionScreen.style.display = "none";

// Start button
startBtn.addEventListener("click", function () {

    welcomeScreen.style.display = "none";
    loadingScreen.style.display = "block";

    let progress = 0;

    const timer = setInterval(function () {

        progress += 2;

        loadingBar.style.width = progress + "%";

        if (progress >= 30) {
            loadingText.textContent = "Connecting to NASA...";
        }

        if (progress >= 60) {
            loadingText.textContent = "Loading Mission...";
        }

        if (progress >= 90) {
            loadingText.textContent = "Mission Ready...";
        }

        if (progress >= 100) {

            clearInterval(timer);

            loadingScreen.style.display = "none";
            missionScreen.style.display = "block";
        }

    }, 40);

});