import { stepsTotalEl, answersCorrectEl, resultEl, resultNameEl, resultTextEl } from "./utils/elements.js";
import { fetchResult } from "./services/fetchResult.js"
import { goToStart } from "./utils/helpers.js";
import { loadProgress } from "./services/localStorage.js";

let { questions, score, currentStep } = loadProgress();
let category = localStorage.getItem("selectedCategory");

answersCorrectEl.textContent = score;
stepsTotalEl.textContent = questions.length;
let resultId = getResultId(score);

function getResultId(score) {
	switch (true) {
		case score >= 0 && score <= 1:
			return 4;
		case score >= 2 && score <= 3:
			return 3;
		case score >= 4 && score <= 6:
			return 2;
		case score >= 7 && score <= 8:
			return 1;
		case score >= 9 && score <= 10:
			return 0;
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
	const img = document.createElement('img');
	img.src = result[resultId].image;
	img.alt = result[resultId].name;
	img.width = 316;
	img.height = 316;

	resultEl.insertBefore(img, resultNameEl);
	resultNameEl.textContent = result[resultId].name + "!";
	resultTextEl.textContent = result[resultId].text;
}
