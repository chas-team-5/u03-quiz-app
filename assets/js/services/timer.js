
let timeOut;
let countdownInterval;
let countdownInitialTime = 20;

function startTimer(countdownDisplay) {
  clearInterval(countdownInterval);
  clearTimeout(timeOut);
  let timeLeft = parseInt(localStorage.getItem('countdownTime')) || countdownInitialTime;

  printCountdown();

  function printCountdown() {
    countdownDisplay.textContent = `Tid kvar: ${timeLeft} sekunder`;
    timeLeft--;

    localStorage.setItem('countdownTime', timeLeft);

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      handleTimeout(countdownDisplay);
    }
  }

  countdownInterval = setInterval(printCountdown, 1000);
  timeOut = setTimeout(() => handleTimeout(countdownDisplay), countdownInitialTime * 1000);
}

function handleTimeout(countdownDisplay) {
  countdownDisplay.textContent = "Inget svar! Klicka för att gå vidare";
  localStorage.removeItem('countdownTime');
}

export { timeOut, countdownInterval, countdownInitialTime, startTimer };
