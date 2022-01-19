// Elements from the HTML popup
const displayDate = document.getElementById('displayDate');
const timer     = document.getElementById('timer');
const startBtn  = document.getElementById('start');
const stopBtn   = document.getElementById('stop');
const resetBtn  = document.getElementById('reset');

/*
 *  The functions below handles the communication between the popup and the background script
 *  notifyBackgroundPage() sends the element that was clicked as an object to the background script
*/
function handleRes(msg) {
    console.info(`From the background script:  ${msg.response}`);
}

function handleErr(err) {
    console.error(`Handle Error: ${err}`);
}

function notifyBackgroundPage(element) {
    const sending = browser.runtime.sendMessage({
        action: element.id
    });
    sending.then(handleRes, handleErr);
}

// Here each popup btn press gets passed to the function that notifies the background script with the data
startBtn.addEventListener('click', notifyBackgroundPage(startBtn));
stopBtn.addEventListener('click', notifyBackgroundPage(stopBtn));
resetBtn.addEventListener('click', notifyBackgroundPage(resetBtn));