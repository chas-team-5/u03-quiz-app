import { loadProgress, saveQuiz } from "./services/localStorage.js";
import { fetchQuestions } from "./services/fetchQuestions.js";
import { shuffleArray, redirectToStartPage } from "./utils/helpers.js";
import { startTimer, countdownInitialTime } from "./services/timer.js";

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
    const option = document.createElement("button");
    option.classList.add("answer-option");
    // TODO: Add class
    option.textContent = item.text;
    option.setAttribute("data-id", item.optionIndex);

    answerOptionsDisplay.appendChild(option);
  });
}

function checkAnswer(e) {
  e.preventDefault();

  if (e.target.tagName === "BUTTON") {
    let userAnswer = parseInt(e.target.dataset.id);
    let correctAnswer = questions[currentStep].correctAnswer;

    // Update score
    if (userAnswer === correctAnswer) {
      quizProgress[currentStep] = "correct";
      score++;
      // TODO: Add CSS-class to button
      e.target.classList.add("answer-option--correct");
    } else {
      quizProgress[currentStep] = "incorrect";
    }

    // Update step
    if (currentStep < quizLength - 1) {
      currentStep++;
      // TODO: Add timeout before proceedToNext
      // .addEventListener("click", () => { proceedToNext(); });
      // proceedToNext();
    } else {

      // To result on quiz end
      window.location.href = "result.html";
    }

    saveQuiz(score, currentStep, questions, quizProgress);
    console.log("Score: ", score);
  }
}

function proceedToNext() {
  localStorage.setItem('countdownTime', countdownTime);
  printProgress();
  printQuestion();
  printAnswers();
  startTimer(countdownDisplay);
}

answerOptionsDisplay.addEventListener("click", checkAnswer);
// TODO: checkAnswer efter timeout

// Run this after main loader
startQuiz();
