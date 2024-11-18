import { resetSavedQuiz } from "./services/localStorage.js";
import { setCategory } from "./services/categoryHandler.js";

const startGame = document.getElementById("category-selection");

// Added if statement to ensure questions aren't loaded without a selected catagory
function selectCategory(e) {
  resetSavedQuiz();
  setCategory(e);
  window.location.href = "quiz.html";
}

startGame.addEventListener("click", selectCategory);
