const outOfTimeEvent = new CustomEvent("outOfTime");

const countdownInitialTime = 20;
let timeOut;
let countdownInterval;

function startTimer(countdownEl) {
  clearInterval(countdownInterval);
  clearTimeout(timeOut);

  let timeLeft = parseInt(localStorage.getItem("countdownTime"));

  printCountdown();

  function printCountdown() {
    localStorage.setItem("countdownTime", timeLeft);
    timeLeft--;

    countdownEl.innerHTML = `Tid kvar: <span id="countdown-time">${timeLeft}</span> sekunder`;

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      handleTimeout(countdownEl);
    }
  }

  countdownInterval = setInterval(printCountdown, 1000);
  timeOut = setTimeout(() => handleTimeout(countdownEl), countdownInitialTime * 1000);
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
