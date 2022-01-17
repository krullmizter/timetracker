// Variables from the HTML
const timer     = document.getElementById('timer');
const startBtn  = document.getElementById('start');
const stopBtn   = document.getElementById('stop');
const resetBtn  = document.getElementById('reset');

// Set the initial clock values
let hr  = 0;
let min = 0;
let sec = 0;
 
let interval;

/* Three even listeners for the three buttons
*  The startBtn event will set an interval to run each 1000ms (1sec) and run the startTimer function
*/
startBtn.addEventListener('click', () => {
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
});

/* Handles all the time after the time has started
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
