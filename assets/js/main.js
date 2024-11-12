import { resetSavedQuiz } from "./services/localStorage.js";
import { setCategory } from "./services/categoryHandler.js";

const startGame = document.getElementById("start-game-section");

function selectCategory(e) {
  resetSavedQuiz();
  setCategory(e);
  window.location.href = "quiz.html";
}

startGame.addEventListener("click", selectCategory);
