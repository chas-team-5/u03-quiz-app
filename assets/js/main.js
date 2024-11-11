import { resetProgress } from "./services/localStorage.js";
import { setCategory } from './services/categoryHandler.js';

const startGame = document.getElementById("start-game-section");

function selectCategory(e) {
  resetProgress();
  setCategory(e);
  window.location.href = "quiz.html";
}

// // TODO: This block should be moved to Quiz.js
// function loadProgress() {
//   currentQuestion = localStorage.getItem('currentQuestion');
//   score = localStorage.getItem('score');
// }

startGame.addEventListener("click", selectCategory);
