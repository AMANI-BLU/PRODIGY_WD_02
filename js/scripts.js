let startTime;
let updatedTime;
let difference = 0;
let running = false;
let interval;
const laps = [];

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateTime, 10);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(interval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    running = false;
    difference = 0;
    updateDisplay(0, 0, 0);
    laps.length = 0; // Clear laps
    lapsContainer.innerHTML = ''; // Clear lap display
}

function recordLap() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerText = formatTime(lapTime);
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const milliseconds = Math.floor((difference % 1000) / 10);
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    updateDisplay(minutes, seconds, milliseconds);
}

function updateDisplay(minutes, seconds, milliseconds) {
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    document.getElementById('milliseconds').innerText = String(milliseconds).padStart(2, '0');
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}
