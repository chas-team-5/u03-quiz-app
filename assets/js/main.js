import { setCategory } from './services/categoryHandler.js';

const startGame = document.getElementById("start-game-section");

startGame.addEventListener("click", startHandler);

function startHandler(e) {
  setCategory(e);
  window.location.href = "quiz.html";
}
