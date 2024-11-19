import { stepsCurrentEl, stepsTotalEl, questionTextEl, answerOptionsEl, countdownEl, progressEl } from "./utils/elements.js";
import { loadProgress, saveQuiz } from "./services/localStorage.js";
import { fetchQuestions } from "./services/fetchQuestions.js";
import { shuffleArray, goToStart, goToResult } from "./utils/helpers.js";
import { countdownInitialTime, startTimer, stopTimer } from "./services/timer.js";

const totalQuestions = 10;
const countdownTime = countdownInitialTime;
let category = localStorage.getItem("selectedCategory");
let { score, currentStep, questions, quizProgress } = loadProgress(totalQuestions);

async function generateQuestions(category) {
	questions = shuffleArray([...await fetchQuestions(category)]);
	saveQuiz(score, currentStep, questions, totalQuestions, quizProgress);
	printProgress();
	printQuestion();
	printAnswers();
}

// Start Quiz if category is set
async function startQuiz() {
	if (category) {
		if (!questions.length) {
			await generateQuestions(category);
		}

		printProgress();
		printQuestion();
		printAnswers();
		startTimer(countdownEl);

	} else {
		goToStart();
	}
}

function printProgress() {
	progressEl.innerHTML = "";

	quizProgress.forEach((step) => {
		const li = document.createElement("li");
		li.classList.add(`progress-answer--${step}`);

		if (step === "correct") {
			li.innerHTML = `<i class="fas fa-circle-check"></i>`

		} else if (step === "incorrect") {
			li.innerHTML = `<i class="fas fa-circle-xmark"></i>`

		} else {
			li.innerHTML = `<i class="fas fa-circle"></i>`
		}

		progressEl.appendChild(li);
	});
}

function printQuestion() {
	if (!questions[currentStep]) return;

	stepsCurrentEl.textContent = currentStep + 1;
	questionTextEl.textContent = questions[currentStep].question;
	stepsTotalEl.textContent = totalQuestions;
}

function printAnswers() {
	if (!questions[currentStep]) return;

	let answerOptions = questions[currentStep].options.map((option, index) => ({
		text: option,
		optionIndex: index
	}));

	answerOptionsEl.innerHTML = "";
	answerOptions = shuffleArray(answerOptions);

	answerOptions.forEach((item) => {
		answerOptionsEl.innerHTML += `
			<label class="answer-option">
				<input type="radio" name="options" value="${item.text.toLowerCase()}" id="option-${item.optionIndex}" data-id="${item.optionIndex}">
				<span>${item.text}</span>
			</label>
		`;
	});
}

function checkAnswer(e) {
	if (e.target.tagName === "INPUT" && e.target.type === "radio") {
		let userAnswer = parseInt(e.target.dataset.id);
		let correctAnswer = questions[currentStep].correctAnswer;
		e.target.closest("label").classList.add("selected");

		// Update score
		if (userAnswer === correctAnswer) {
			quizProgress[currentStep] = "correct";
			countdownEl.textContent = "Rätt svar Klicka för att gå vidare";
			score++;
		} else {
			quizProgress[currentStep] = "incorrect";
			countdownEl.textContent = "Fel svar! Klicka för att gå vidare";
		}

		// Move to next step
		// Update step
    if (currentStep < totalQuestions - 1) {
      currentStep++;
			stopTimer();
      goToNext();
    } else {

      // To result on quiz end
      goToResult();
    }

		saveQuiz(score, currentStep, questions, totalQuestions, quizProgress);
    console.log("Score: ", score);
	}
}

function goToNext() {
	localStorage.setItem("countdownTime", countdownTime);
	printProgress();
	printQuestion();
	printAnswers();
	startTimer(countdownEl);
}

answerOptionsEl.addEventListener("click", checkAnswer);

// Run this after main loader
startQuiz();

export { stepsCurrentEl, stepsTotalEl }
