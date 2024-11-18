
const countdownInitialTime = 20;
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
  timeOut = setTimeout(() => handleTimeout(countdownDisplay), countdownInitialTime * 1000);
}

function stopTimer() {
  clearInterval(countdownInterval);
  clearTimeout(timeOut);
}

function handleTimeout(countdownDisplay) {
  countdownDisplay.textContent = "Inget svar! Klicka för att gå vidare";
  stopTimer();
}

export { timeOut, countdownInterval, countdownInitialTime, startTimer, stopTimer };
