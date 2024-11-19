import { startGameEl } from "./utils/elements.js";
import { resetQuiz } from "./services/localStorage.js";
import { selectCategory } from "./services/categoryHandler.js";

resetQuiz();

startGameEl.addEventListener("click", selectCategory);
