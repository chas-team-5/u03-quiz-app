const outOfTimeEvent = new CustomEvent("outOfTime");

const countdownInitialTime = 5; // Set to 5 for dev, was 20
let timeOut;
let countdownInterval;

function startTimer(countdownDisplay) {
  clearInterval(countdownInterval);
  clearTimeout(timeOut);

  let timeLeft = parseInt(localStorage.getItem("countdownTime"));

  printCountdown();

  function printCountdown() {
    countdownDisplay.textContent = `Tid kvar: ${timeLeft} sekunder`;
    localStorage.setItem("countdownTime", timeLeft);
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      handleTimeout(countdownDisplay);
    }
  }

  countdownInterval = setInterval(printCountdown, 1000);
  timeOut = setTimeout(() => handleTimeout(countdownDisplay), countdownInitialTime * 1000); // Do we need timeOut?
}

function stopTimer() {
  clearInterval(countdownInterval);
  clearTimeout(timeOut);
}

function handleTimeout() {
  stopTimer();
  dispatchEvent(outOfTimeEvent);
}

export { countdownInterval, countdownInitialTime, startTimer, stopTimer };
