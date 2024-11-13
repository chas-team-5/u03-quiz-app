let countdown;
let timer;

function startTimer(countdownDisplay) {
  clearInterval(countdown);
  clearTimeout(timer);
  let timeLeft = parseInt(localStorage.getItem('countdownTime')) || 20;

  printCountdown();

  function printCountdown() {
    countdownDisplay.textContent = `Tid kvar: ${timeLeft} sekunder`;
    timeLeft--;

    localStorage.setItem('countdownTime', timeLeft);

    if (timeLeft < 0) {
      clearInterval(countdown);
      handleTimeout(countdownDisplay);
    }
  }

  countdown = setInterval(printCountdown, 1000);
  timer = setTimeout(() => handleTimeout(countdownDisplay), 20000);
}

function handleTimeout(countdownDisplay) {
  countdownDisplay.textContent = "Inget svar! Klicka för att gå vidare";
  localStorage.removeItem('countdownTime');
}

export { countdown, timer, startTimer };
