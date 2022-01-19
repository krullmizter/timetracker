// Variables from the HTML
const timer     = document.getElementById('timer');
const displayDate = document.getElementById('displayDate');
const startBtn  = document.getElementById('start');
const stopBtn   = document.getElementById('stop');
const resetBtn  = document.getElementById('reset');

console.log(startBtn);

/*
 *  Handles the communication between the popup page and the background page.
 *  This lets you send data between the "frontend" page and the background logic managing
*/
function handleRes(msg) {
    console.log(`Message from the background script:  ${msg.response}`);
}

function handleErr(err) {
    console.error(`Handle Error: ${err}`);
}

function notifyBackgroundPage() {
    const sending = browser.runtime.sendMessage({
        startBtn: startBtn.msg
    });
    sending.then(handleRes, handleErr);
}

startBtn.addEventListener('click', notifyBackgroundPage);