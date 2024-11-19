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

const quizLength = 10;
const countdownTime = countdownInitialTime;
let category = localStorage.getItem("selectedCategory");
let { score, currentStep, questions, quizProgress } = loadProgress(quizLength);

async function generateQuestions(category) {
	questions = shuffleArray([...await fetchQuestions(category)]);
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

function checkAnswer(e) {
	if (e.target.tagName === "INPUT" && e.target.type === "radio") {
		let userAnswer = parseInt(e.target.dataset.id);
		let correctAnswer = questions[currentStep].correctAnswer;
		e.target.closest("label").classList.add("selected");

		// Update score
		if (userAnswer === correctAnswer) {
			quizProgress[currentStep] = "correct";
			countdownDisplay.textContent = "Rätt svar Klicka för att gå vidare";
			score++;
		} else {
			quizProgress[currentStep] = "incorrect";
			countdownDisplay.textContent = "Fel svar! Klicka för att gå vidare";
		}

		// Move to next step
		// Update step
    if (currentStep < quizLength - 1) {
      currentStep++;
			stopTimer();
      proceedToNext();
    } else {

      // To result on quiz end
      window.location.href = "result.html";
    }

		saveQuiz(score, currentStep, questions, quizProgress);
    console.log("Score: ", score);
	}
}

function proceedToNext() {
	localStorage.setItem("countdownTime", countdownTime);
	printProgress();
	printQuestion();
	printAnswers();
	startTimer(countdownDisplay);
}

answerOptionsDisplay.addEventListener("click", checkAnswer);

// Run this after main loader
startQuiz();
