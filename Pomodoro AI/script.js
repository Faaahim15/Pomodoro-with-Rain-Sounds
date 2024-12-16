let focusDuration;
let shortBreakDuration;
let longBreakDuration;
let pomodoroCycles;
let interval;
let currentCycle = 0;
let isFocus = true;
let isPaused = false;
let rainSound; // Variable to hold the rain sound

function startTimer() {
    console.log('Start button clicked');
    focusDuration = parseInt(document.getElementById('focus-duration').value) * 60;
    shortBreakDuration = parseInt(document.getElementById('short-break-duration').value) * 60;
    longBreakDuration = parseInt(document.getElementById('long-break-duration').value) * 60;
    pomodoroCycles = parseInt(document.getElementById('pomodoro-cycles').value);
    currentCycle = 0;
    isFocus = true;
    isPaused = false;
    updateTimerDisplay(focusDuration);
    clearInterval(interval);
    interval = setInterval(tick, 1000);
    document.getElementById('pause-button').style.display = 'inline-block';
    document.getElementById('quit-button').style.display = 'inline-block';
}

function pauseTimer() {
    isPaused = !isPaused;
    if (!isPaused) {
        interval = setInterval(tick, 1000);
    } else {
        clearInterval(interval);
    }
}

function quitTimer() {
    clearInterval(interval);
    resetTimers();
    updateTimerDisplay(0);
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('quit-button').style.display = 'none';
}

function resetTimers() {
    focusDuration = 0;
    shortBreakDuration = 0;
    longBreakDuration = 0;
    currentCycle = 0;
    isFocus = true;
    isPaused = false;
}

function tick() {
    if (!isPaused) {
        if (isFocus) {
            focusDuration--;
            updateTimerDisplay(focusDuration);
            if (focusDuration <= 0) {
                currentCycle++;
                isFocus = false;
                if (currentCycle < pomodoroCycles) {
                    setBreak(shortBreakDuration);
                } else {
                    setBreak(longBreakDuration);
                }
            }
        } else {
            if (currentCycle < pomodoroCycles) {
                shortBreakDuration--;
                updateTimerDisplay(shortBreakDuration);
                if (shortBreakDuration <= 0) {
                    isFocus = true;
                    focusDuration = parseInt(document.getElementById('focus-duration').value) * 60;
                    updateTimerDisplay(focusDuration);
                }
            } else {
                longBreakDuration--;
                updateTimerDisplay(longBreakDuration);
                if (longBreakDuration <= 0) {
                    clearInterval(interval);
                    alert('Pomodoro session complete!');
                }
            }
        }
    }
}

function setBreak(duration) {
    isFocus = false;
    focusDuration = parseInt(document.getElementById('focus-duration').value) * 60;
    updateTimerDisplay(duration);
}

function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startRainSound() {
    if (!rainSound) {
        rainSound = new Audio('https://www.youtube.com/watch?v=aUm_OogP1nM?si=5ig_iHre2a5qAPKy');
        rainSound.loop = true; // Loop the sound
    }
    rainSound.play();
}

function stopRainSound() {
    if (rainSound) {
        rainSound.pause();
        rainSound.currentTime = 0; // Reset the audio to the start
    }
}

function adjustVolume() {
    const volume = document.getElementById('volume-control').value;
    if (rainSound) {
        rainSound.volume = volume; // Set the volume based on the slider
    }
}