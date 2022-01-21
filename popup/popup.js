// Elements from the HTML popup
const displayDate = document.getElementById('displayDate');
const timer       = document.getElementById('timer');
const startBtn    = document.getElementById('start');
const pauseBtn    = document.getElementById('pause');
const resetBtn    = document.getElementById('reset');

let hr  = 0;
let min = 0;
let sec = 0;

let storedTime;
let interval;
let timerAlreadyRunning = false;

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
if (!timerAlreadyRunning) {
    startBtn.addEventListener('click', () => {
        timerStartedAt();
        intervalController(true, handleTime, 1000);
    });
}

/* 
 *  Main time logic, checks if the initially storedTime (when the user first starts the timer) is stored or not.
 *  If it is found begin to calculate the difference between the current time and the stored time to find the seconds.
*/ 
function handleTime() {
    storedTime = localStorage.getItem('startTime');
    
    if (storedTime === null)
        localStorage.setItem('startTime', Date.now());
    else {
        hr  = parseInt(hr);
        min = parseInt(min);
        sec = parseInt((Date.now() - storedTime) / 1000);

        if (sec == 60) {
            min += 1;
            sec = 0;
        } else if (min == 60) {
            hr += 1;
            min = 0;
            sec = 0;
        }
    
        if (sec < 10) {
            sec = '0' + sec;
        } 
        
        if (min < 10) {
            min = '0' + min;
        } 
        
        if (hr < 10) {
            hr = '0' + hr;
        }

        console.log(sec)

        timer.innerHTML = hr + ':' + min + ':' + sec;
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
    timer.innerHTML = '00:00:00';
    displayDate.innerHTML = '';
});

// Find the time of when the functions is used, used in the start event.
function timerStartedAt() {
    const date = new Date();

    const hr  = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    displayDate.innerHTML = 'Timer started ' + hr + ':' + min;
}