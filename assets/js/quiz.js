import { loadProgress, saveQuiz } from "./services/localStorage.js";
import { fetchQuestions } from "./services/fetchQuestions.js";
import { shuffleArray, redirectToStartPage } from "./utils/helpers.js";
import { countdownInitialTime, startTimer, stopTimer } from "./services/timer.js";

const stepsCurrent = document.getElementById("steps-current");
const stepsTotal = document.getElementById("steps-total");
const questionText = document.getElementById("question-text");
const answerOptionsDisplay = document.getElementById("answer-options");
const countdownDisplay = document.getElementById("countdown");
const progressDisplay = document.getElementById("progress");
const readyCheck = document.getElementById("readyCheck");

const quizLength = 10;
const countdownTime = countdownInitialTime;
let category = localStorage.getItem("selectedCategory");
let { score, currentStep, questions, quizProgress } = loadProgress(quizLength);

let selectedOption;
let correctOption;

async function generateQuestions(category) {
	questions = shuffleArray( await fetchQuestions(category) );
	saveQuiz(score, currentStep, questions, quizProgress);
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
		startTimer(countdownDisplay);

	} else {
		redirectToStartPage();
	}
}

function printProgress() {
	progressDisplay.innerHTML = "";

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

		progressDisplay.appendChild(li);
	});
}

function printQuestion() {
	if (!questions[currentStep]) return;

	stepsCurrent.textContent = currentStep + 1;
	questionText.textContent = questions[currentStep].question;
	stepsTotal.textContent = quizLength;
}

function printAnswers() {
	if (!questions[currentStep]) return;

	let answerOptions = questions[currentStep].options.map((option, index) => ({
		text: option,
		optionIndex: index
	}));

	answerOptionsDisplay.innerHTML = "";
	answerOptions = shuffleArray(answerOptions);

	answerOptions.forEach((item) => {
		answerOptionsDisplay.innerHTML += `
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
function proceedToNext() {
	readyCheck.style.display = "none";
	// Move to next step
	if (currentStep < quizLength - 1) {
		// Update step
		currentStep++;
		nextQuestion();
	} else {
		// To result on quiz end
		window.location.href = "result.html";
	}

	saveQuiz(score, currentStep, questions, quizProgress); // Maybe move to handleAnswer
}

// ---

// Reset answer indicators and load next question
function nextQuestion() {
	localStorage.setItem("countdownTime", countdownTime);
	countdownDisplay.classList.remove("countdown--correct", "countdown--incorrect");
	printQuestion();
	printAnswers();
	startTimer(countdownDisplay);
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

	stopTimer();

	if (selectedOption === null) {
		// outOfTime
		quizProgress[currentStep] = "incorrect";
		countdownDisplay.textContent = "Du svarade inte i tid! Klicka för att gå vidare";
		countdownDisplay.classList.add("countdown--incorrect");
	} else {
		const correct = parseInt(selectedOption.dataset.id) === correctOption;

		selectedOption.closest("label").classList.add("answer-option--selected")

		if (correct) {
			// correct
			quizProgress[currentStep] = "correct";
			countdownDisplay.textContent = "Rätt svar! Klicka för att gå vidare";
			countdownDisplay.classList.add("countdown--correct");
			selectedOption.closest("label").classList.add("answer-option--correct");
			score++;
		} else {
			// incorrect
			quizProgress[currentStep] = "incorrect";
			countdownDisplay.textContent = "Fel svar! Klicka för att gå vidare";
			countdownDisplay.classList.add("countdown--incorrect");
			selectedOption.closest("label").classList.add("answer-option--incorrect");
		}
	}

	printProgress();
	readyCheck.style.display = "block";
}

answerOptionsDisplay.addEventListener("click", setSelectedOption);
addEventListener("outOfTime", handleOutOfTime);

// Eventlistener on overlay for click to continue
readyCheck.addEventListener("click", proceedToNext);

// Run this after main loader
startQuiz();
