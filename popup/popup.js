// Elements from the HTML popup
const displayDate = document.getElementById('displayDate');
const timer       = document.getElementById('timer');
const startBtn    = document.getElementById('start');
const pauseBtn    = document.getElementById('pause');
const resetBtn    = document.getElementById('reset');

let hr  = 0;
let min = 0;
let sec = 0;

let interval;
let timerAlreadyRunning = false;

/*  
 *  Find the time of when the functions is used, used in the start event
 *  Add leading zeros with padStart
*/
function timerStartedAt() {
    const date = new Date();

    const hr  = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    displayDate.textContent = 'Timer started ' + hr + ':' + min;
}

// Checks whether to start or stop the interval that runs the timer logic
function intervalController(bool, todo, time) {
    if (bool) {
        interval = setInterval(todo, time);
        timerAlreadyRunning = bool;
    } else {
        clearInterval(interval);
        timerAlreadyRunning = bool;
    }
}

// Checks if the timer is running, if not, and on btn press, start the interval (handleTime logic) every 1sec
startBtn.addEventListener('click', () => {
    if (!timerAlreadyRunning) {
        timerStartedAt();
        intervalController(true, handleTime, 1000);
    }
});

/* 
 *  Main time logic, checks if the initially storedTime (when the user first starts the timer) is stored or not
 *  If it is found begin to calculate the difference between the current time and the stored time to find the seconds
 *  The stored time gets stringified and later parsed when reading to always store each value as a number
 *  The parseInt just removed any decimal points.
*/

// This function adds leading zeros to all time values below 9
const zeros = (t) => {
    if (t < 10 && t >= 0) {
        return '0' + t;   
    }
    else {
        return t;
    }
}

function handleTime() {
    let storedTime = JSON.parse(localStorage.getItem('startTime'));
    
    if (storedTime === null)
        JSON.stringify(localStorage.setItem('startTime', Date.now()));
    else {
        const elapsedTime = Date.now() - storedTime;
        hr  = parseInt(elapsedTime / (1000 * 3600) % 60);
        min = parseInt(elapsedTime / (1000 * 60) % 60);
        sec = parseInt((elapsedTime / 1000) % 60);

        console.log(sec);

        timer.textContent = zeros(hr) + ':' + zeros(min) + ':' + zeros(sec);
    }
}

// The pause and reset btn events both stops the interval, the reset clears the UI and localStorage saved time
pauseBtn.addEventListener('click', () => {
    intervalController(false);
});

resetBtn.addEventListener('click', () => {
    hr  = 0;
    min = 0;
    sec = 0;
    intervalController(false);
    localStorage.removeItem('startTime');
    timer.textContent = '00:00:00';
    displayDate.textContent = '';
    reset = true;
});