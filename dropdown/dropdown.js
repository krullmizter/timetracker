// Variables from the HTML
const timer     = document.getElementById('timer');
const displayDate = document.getElementById('displayDate');
const startBtn  = document.getElementById('start');
const stopBtn   = document.getElementById('stop');
const resetBtn  = document.getElementById('reset');

// Set the initial clock values
let hr  = 0;
let min = 0;
let sec = 0;
 
let interval;

/* 
*  Three even listeners for the three buttons
*  The startBtn event will set an interval to run each 1000ms (1sec) and run the startTimer function
*  timerStartedAt function will also run och the btn event
*/
startBtn.addEventListener('click', () => {
    timerStartedAt();
    clearInterval(interval);
    interval = setInterval(startTimer, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(interval);
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    hr  = 0;
    min = 0;
    sec = 0;
    timer.innerHTML = '00:00:00';
    displayDate.innerHTML = ''
});

// Here we get the current time, that is used to display when the timer was started
function timerStartedAt() {
    const date = new Date();

    const hr  = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    displayDate.innerHTML = 'Timer started: ' + hr + ':' + min;
}

/* 
*  startTimer handles all the timer
*  We begin with parsing the clock string values to integers
*  The logic later handles the sec, min and hours like a digital clock
*/
function startTimer() {
    hr  = parseInt(hr);
    min = parseInt(min);
    sec = parseInt(sec);

    sec++;

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

    timer.innerHTML = hr + ':' + min + ':' + sec;
}
