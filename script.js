//Made by Penguin Bob (Guille Gonzalez)

var cummulativeMilliseconds = 0;
var offset = Date.now();

let interval = null;

let timerIsRunning = false;
const iDPlayPause = "playPause";
const idDisplayText = "displayText";

function stopWatch() {

    cummulativeMilliseconds += delta();

    document.getElementById(idDisplayText).innerHTML = displayTimeFormatter(cummulativeMilliseconds);

    document.title = "Stopwatch " + titleTimeFormatter(cummulativeMilliseconds);

    function delta() {
        var now = Date.now();
        var timePassed = new Date(now) - offset;
        offset = now;
        return timePassed;
    }

    function displayTimeFormatter(formattedTime) {

        var totalTimeInSeconds = Math.round(cummulativeMilliseconds / 10) / 100;
        var roundedTotalTimeInSeconds = Math.floor(cummulativeMilliseconds / 1000);

        var seconds = Math.round((totalTimeInSeconds % 60) * 100) / 100;
        var minutes = Math.round(Math.floor(roundedTotalTimeInSeconds / 60) % 60);
        var hours = Math.round(Math.floor(roundedTotalTimeInSeconds / 3600) % 24);
        var days = Math.round(Math.floor(roundedTotalTimeInSeconds / 86400));

        var displaySeconds = seconds.toString();
        var displayMinutes = minutes.toString();
        var displayHours = hours.toString();

        function formatSecondsAddZeroBeforeSeconds() {
            if (totalTimeInSeconds > 60 && seconds < 10) {
                displaySeconds = "0" + displaySeconds;
            }
        }

        if (totalTimeInSeconds > 3600 && displayMinutes.length === 1) {
            displayMinutes = "0" + displayMinutes;
        }

        if (days > 0 && displayHours.length === 1) {
            displayHours = "0" + displayHours;
        }

        if (days > 0) {
            displaySeconds = (Math.round(roundedTotalTimeInSeconds % 60)).toString();
            formatSecondsAddZeroBeforeSeconds();
        }
        else if (hours > 0) {
            displaySeconds = ((Math.round(seconds * 10) / 10) % 60).toString();
            formatSecondsAddZeroBeforeSeconds();
            if (displaySeconds.length === 2) {
                displaySeconds += ".0";
            }
        }
        else {
            formatSecondsAddZeroBeforeSeconds();
            if (totalTimeInSeconds > 10) {
                if (displaySeconds.length === 2) {
                    displaySeconds += ".00";
                }
                else if (displaySeconds.length === 4) {
                    displaySeconds += "0";
                }
            }
            else {
                if (displaySeconds.length === 1) {
                    displaySeconds += ".00";
                }
                else if (displaySeconds.length === 3) {
                    displaySeconds += "0";
                }
            }
        }

        if (days > 0) {
            return days.toString() + ":" + displayHours + ":" + displayMinutes + ":" + displaySeconds;
        }
        else if (hours > 0) {
            return displayHours + ":" + displayMinutes + ":" + displaySeconds;
        }
        else if (minutes > 0) {
            return displayMinutes + ":" + displaySeconds;
        }
        else {
            return displaySeconds;
        }
    }

    function titleTimeFormatter(formattedTime){
        
        var roundedTotalTimeInSeconds = Math.floor(cummulativeMilliseconds / 1000);

        var seconds = Math.round(roundedTotalTimeInSeconds % 60);
        var minutes = Math.round(Math.floor(roundedTotalTimeInSeconds / 60) % 60);
        var hours = Math.round(Math.floor(roundedTotalTimeInSeconds / 3600) % 24);
        var days = Math.round(Math.floor(roundedTotalTimeInSeconds / 86400));

        var displaySeconds = seconds.toString();
        var displayMinutes = minutes.toString();
        var displayHours = hours.toString();

        if (seconds < 10) {
            displaySeconds = "0" + displaySeconds;
        }
        
        if (displayMinutes.length === 1) {
            displayMinutes = "0" + displayMinutes;
        }

        if (displayHours.length === 1) {
            displayHours = "0" + displayHours;
        }

        if (days > 0) {
            return days.toString() + ":" + displayHours + ":" + displayMinutes + ":" + displaySeconds;
        }
        else if (hours > 0) {
            return displayHours + ":" + displayMinutes + ":" + displaySeconds;
        }
        else{
            return displayMinutes + ":" + displaySeconds;
        }
    }
}

function playPause() {
    if (timerIsRunning === false) {
        offset = Date.now();
        interval = window.setInterval(stopWatch, 10);
        document.getElementById(iDPlayPause).innerHTML = "Pause";
        timerIsRunning = true;
    } else {
        window.clearInterval(interval);
        document.getElementById(iDPlayPause).innerHTML = "Play";
        timerIsRunning = false;
        document.title += " (Paused)";
    }
}

function reset() {
    window.clearInterval(interval);
    timerIsRunning = false;
    cummulativeMilliseconds = 0;
    document.title = "Stopwatch";
    document.getElementById(idDisplayText).innerHTML = "0.00";
    document.getElementById(iDPlayPause).innerHTML = "Play";
}