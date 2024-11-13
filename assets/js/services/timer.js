let countdown;
let timer;

function startTimer(countdownDisplay, handleTimeout) {
  clearInterval(countdown);
  clearTimeout(timer);
  let countdownTime = 20;

  printCountdown();

  function printCountdown() {
    countdownDisplay.textContent = `Tid kvar: ${countdownTime} sekunder`;
    countdownTime--;

    if (countdownTime < 0) {
      clearInterval(countdown);
    }
  }

  countdown = setInterval(printCountdown, 1000);
  timer = setTimeout(handleTimeout, 20000);
}

function handleTimeout() {
  console.log("Tiden är ute!");
}

export { countdown, timer, startTimer, handleTimeout };
