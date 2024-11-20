import { stepsCurrentEl, stepsTotalEl, questionImageEl, questionTextEl, answerOptionsEl, countdownEl, progressEl, readyNext } from "./utils/elements.js";
import { loadProgress, saveQuiz } from "./services/localStorage.js";
import { fetchQuestions } from "./services/fetchQuestions.js";
import { shuffleArray, goToStart, goToResult } from "./utils/helpers.js";
import { countdownInitialTime, startTimer, stopTimer } from "./services/timer.js";

const totalQuestions = 10;
const countdownTime = countdownInitialTime;
let category = localStorage.getItem("selectedCategory");
let { score, currentStep, questions, quizProgress } = loadProgress(totalQuestions);

let selectedOption;
let correctOption;

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
	let questionImage = `<img src="${questions[currentStep].image}" alt="${questions[currentStep].question}" width="540" height="225">`;

	questionImageEl.innerHTML = questionImage;
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

	updateCorrectOption();
}

// ---

// Hide overlay and progress setup for next question/result
function goToNext() {
	readyNext.style.display = "none";
	// Move to next step
	if (currentStep < totalQuestions - 1) {
		// Update step
		currentStep++;
		showNextQuestion();
	} else {
		goToResult();
	}

	saveQuiz(score, currentStep, questions, totalQuestions, quizProgress); // Maybe move to handleAnswer
}

// ---

// Reset answer indicators and load next question
function showNextQuestion() {
	localStorage.setItem("countdownTime", countdownTime);
	countdownEl.classList.remove("countdown--correct", "countdown--incorrect");
	printQuestion();
	printAnswers();
	startTimer(countdownEl);
}

// ---

// Treat outOfTime as answer
function handleOutOfTime() {
	selectedOption = null;
	checkAnswer();
}

function setSelectedOption(option) {
	if (option.target.tagName === "INPUT") {
		selectedOption = option.target;
		checkAnswer();
	}
}

function updateCorrectOption() {
	correctOption = questions[currentStep].correctAnswer;
}

function checkAnswer() {
	let correctOptionEl = document.getElementById(`option-${correctOption}`).closest("label");

	correctOptionEl.closest("label").classList.add("answer-option--correct");
	stopTimer();

	if (selectedOption === null) {
		// outOfTime
		quizProgress[currentStep] = "incorrect";
		countdownEl.textContent = "Du svarade inte i tid! Klicka för att gå vidare";
		countdownEl.classList.add("countdown--incorrect");
	} else {
		const correct = parseInt(selectedOption.dataset.id) === correctOption;
		selectedOption.closest("label").classList.add("answer-option--selected")

		if (correct) {
			// correct
			quizProgress[currentStep] = "correct";
			countdownEl.textContent = "Rätt svar! Klicka för att gå vidare";
			countdownEl.classList.add("countdown--correct");
			// selectedOption.closest("label").classList.add("answer-option--correct");
			score++;
		} else {
			// incorrect
			quizProgress[currentStep] = "incorrect";
			countdownEl.textContent = "Fel svar! Klicka för att gå vidare";
			countdownEl.classList.add("countdown--incorrect");
			selectedOption.closest("label").classList.add("answer-option--incorrect");
		}
	}

	printProgress();
	readyNext.style.display = "block";
}

answerOptionsEl.addEventListener("click", setSelectedOption);
addEventListener("outOfTime", handleOutOfTime);

// Eventlistener on overlay for click to continue
readyNext.addEventListener("click", goToNext);

// Run this after main loader
startQuiz();
