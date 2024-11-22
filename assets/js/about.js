import { resetQuiz } from "./services/localStorage.js";
import { selectCategory } from "./services/categoryHandler.js";

const buttons = document.querySelectorAll(".cta");

buttons.forEach(button => button.addEventListener("click", startNewQuiz));

function startNewQuiz(e) {
  resetQuiz();
  selectCategory(e);
}
