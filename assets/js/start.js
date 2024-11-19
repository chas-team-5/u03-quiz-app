import { goToQuiz } from "./utils/helpers.js"
import { resetQuiz } from "./services/localStorage.js";
import { setCategory } from "./services/categoryHandler.js";

const startGame = document.getElementById("category-selection");
resetQuiz();

function selectCategory(e) {
	setCategory(e);
	goToQuiz();
}

startGame.addEventListener("click", selectCategory);
