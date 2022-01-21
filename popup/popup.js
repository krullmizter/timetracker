//Elements from the HTML popup
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

function intervalController(bool, todo, time) {
    if (bool) {
        interval = setInterval(todo, time);
        timerAlreadyRunning = bool;
    } else {
        clearInterval(interval);
        timerAlreadyRunning = bool;
    }
}

if (!timerAlreadyRunning) {
    startBtn.addEventListener('click', () => {
        timerStartedAt();
        intervalController(true, handleTime, 1000);
    });
}

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

function timerStartedAt() {
    const date = new Date();

    const hr  = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    displayDate.innerHTML = 'Timer started ' + hr + ':' + min;
}