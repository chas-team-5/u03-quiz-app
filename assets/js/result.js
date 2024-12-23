import { startGameEl, stepsTotalEl, answersCorrectEl, resultEl, resultNameEl, resultTextEl } from "./utils/elements.js";
import { fetchResult } from "./services/fetchResult.js";
import { selectCategory } from "./services/categoryHandler.js";
import { goToStart } from "./utils/helpers.js";
import { loadProgress, resetQuiz } from "./services/localStorage.js";

let { questions, score, currentStep } = loadProgress();
let category = localStorage.getItem("selectedCategory");

answersCorrectEl.textContent = score;
stepsTotalEl.textContent = questions.length;
let resultId = getResultId(score);

function getResultId(score) {
  switch (true) {
    case score === 10:
      return 1;
    case score >= 8 && score <= 9:
      return 2;
    case score >= 6 && score <= 7:
      return 3;
    case score >= 3 && score <= 5:
      return 4;
    case score >= 0 && score <= 2:
      return 5;
    default:
      throw new Error("Ogiltig poäng");
  }
}

if (category && currentStep === questions.length -1) {
  displayResult(category);
} else {
  goToStart();
}

async function displayResult(category) {
  const result = await fetchResult(category);
  const img = document.createElement("img");
  const character = result.find(item => item.id === resultId);
  const resultLinkHtml = `<span class="result-text-footer">Läs mer om: <a href="${character.link}" target="_blank" rel="noopener noreferrer"> ${character.name}</a><span>`;
  var confettiCanvas = document.createElement("canvas");
  confettiCanvas.classList.add("confetti");

  img.src = character.image;
  img.alt = character.name;
  img.width = 316;
  img.height = 316;

  resultEl.prepend(img);
  resultNameEl.textContent = character.name + "!";
  resultTextEl.innerHTML = character.text.replace(/\n/g, '<br>');
  resultTextEl.innerHTML += resultLinkHtml;

  resultEl.prepend(confettiCanvas);
  const confettiFire = confetti.create(confettiCanvas, { resize: true });

  confettiFire({
    particleCount: 100,
    startVelocity: 30,
    spread: 90
  });
  setTimeout(() => {
    confettiFire.reset();
  }, 5000);
}

startGameEl.addEventListener("click", (e) => {
  resetQuiz();
  selectCategory(e);
});
