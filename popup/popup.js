// Elements from the HTML popup
const displayDate = document.getElementById('displayDate');
const timer       = document.getElementById('timer');
const startBtn    = document.getElementById('start');
const stopBtn     = document.getElementById('stop');
const resetBtn    = document.getElementById('reset');

let hr  = 0;
let min = 0;
let sec = 0;

startBtn.addEventListener('click', () => {
    const date = new Date();

    const hr  = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    displayDate.innerHTML = 'Timer started ' + hr + ':' + min;
});

function handleTime() {
    var storageTime = localStorage.getItem('startTime');

    if (storageTime === null) {
        localStorage.setItem('startTime', Date.now());
    } else {
        hr  = parseInt(hr);
        min = parseInt(min);
        sec = parseInt((Date.now() - storageTime) / 1000);

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
}

setInterval(handleTime, 1000);

//stopBtn.addEventListener('click', () => {});
resetBtn.addEventListener('click', () => {
    clearInterval(handleTime);
    localStorage.removeItem('startTime');
    timer.innerHTML = '00:00:00';
    displayDate.innerHTML = '';
});