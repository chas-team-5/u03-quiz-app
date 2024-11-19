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
const overlay = document.getElementById("overlay");

const quizLength = 10;
const countdownTime = countdownInitialTime;
let category = localStorage.getItem("selectedCategory");
let { score, currentStep, questions, quizProgress } = loadProgress(quizLength);

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
}

// ---

// Read answer from radioButton options
function getUserAnswer(e) {
	const selectedOption = e.target;

	if (selectedOption.tagName === "INPUT" && selectedOption.type === "radio") {
		let userAnswer = parseInt(e.target.dataset.id);
		// let correctAnswer = questions[currentStep].correctAnswer;
		// const isCorrect = userAnswer === correctAnswer;

		selectedOption.closest("label").classList.add("answer-option--selected"); // TODO: Move to handleAnswer

		handleAnswer(checkAnswer(userAnswer), selectedOption); // Possibly call checkAnswer from within handleAnswer
		// alt handleAnswer(userAnswer === correctAnswer);
	}
}

function checkAnswer(answer) {
	const correctAnswer = questions[currentStep].correctAnswer;
	return answer === correctAnswer;
}

function handleAnswer(correct, selectedOption) {
	stopTimer();

	if (correct) {
		quizProgress[currentStep] = "correct";
		countdownDisplay.textContent = "Rätt svar! Klicka för att gå vidare";
		countdownDisplay.classList.add("countdown--correct");
		score++;
		selectedOption.closest("label").classList.add("answer-option--correct");
	} else {
		quizProgress[currentStep] = "incorrect";
		countdownDisplay.classList.add("countdown--incorrect");
		// TODO: Reveal correct answer
		questions[currentStep].options.forEach((option) => {
			console.log("forEach ", option.optionIndex);
			if (checkAnswer(option))
				option.closest("label").classList.add("answer-option--correct");
		})

		if (selectedOption === "outOfTime") {
			countdownDisplay.textContent = "Du svarade inte i tid! Klicka för att gå vidare";
		} else {
			selectedOption.closest("label").classList.add("answer-option--incorrect");
			countdownDisplay.textContent = "Fel svar! Klicka för att gå vidare";
		}
	}
	printProgress();
	// TODO: Change to click instead of timer
	// setTimeout(proceedToNext, 5000);
	overlay.style.display = "block";
}

// function handleAnswer(correct, selectedOption) {
// 	switch (correct) {
// 		case true:
// 			console.log("true");

// 			quizProgress[currentStep] = "correct";
// 			countdownDisplay.textContent = "Rätt svar! Klicka för att gå vidare";
// 			countdownDisplay.classList.add("countdown--correct");
// 			score++;
// 			selectedOption.closest("label").classList.add("answer-option--correct");

// 			break;

// 		case false:
// 			console.log("false");

// 			quizProgress[currentStep] = "incorrect";
// 			countdownDisplay.classList.add("countdown--incorrect");

// 			selectedOption.closest("label").classList.add("answer-option--incorrect");
// 			countdownDisplay.textContent = "Fel svar! Klicka för att gå vidare";

// 			break;

// 		case "outOfTime":
// 			console.log("Out of time");

// 			quizProgress[currentStep] = "incorrect";
// 			countdownDisplay.classList.add("countdown--incorrect");

// 			countdownDisplay.textContent = "Du svarade inte i tid! Klicka för att gå vidare";

// 			// TODO: Add answer-option--correct till rätt svar

// 			break;
// 	}
// 	// proceedToNext();
// 	stopTimer();
// 	printProgress();
// 	setTimeout(proceedToNext, 5000); // TODO: Change to click instead of timer
// }

// Hide overlay and progress setup for next question or result
function proceedToNext() {
	overlay.style.display = "none";
	// Move to next step
	// Update step
	if (currentStep < quizLength - 1) {
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
	// printProgress();
	printQuestion();
	printAnswers();
	startTimer(countdownDisplay);
}

// ---

// Treat outOfTime as answer
function handleOutOfTime() {
	handleAnswer(false, "outOfTime");
}

answerOptionsDisplay.addEventListener("click", getUserAnswer);
// TODO: checkAnswer efter timeout
addEventListener("outOfTime", handleOutOfTime);
// Eventlistener on overlay for click to continue
overlay.addEventListener("click", proceedToNext);

// Run this after main loader
startQuiz();
