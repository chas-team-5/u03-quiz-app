import { loadProgress, saveQuiz } from "./services/localStorage.js";
import { fetchQuestions } from "./services/fetchQuestions.js";
import { shuffleArray, redirectToStartPage } from "./utils/helpers.js";
import { startTimer, handleTimeout } from "./services/timer.js";

const stepsCurrent = document.getElementById("steps-current");
const stepsTotal = document.getElementById("steps-total");
const questionText = document.getElementById("question-text");
const answerOptionsDisplay = document.getElementById("answer-options");
const countdownDisplay = document.getElementById("countdown");

const quizLength = 10;
let category = localStorage.getItem("selectedCategory");
let { score, currentStep, questions } = loadProgress();

async function generateQuestions(category) {
  questions = shuffleArray( await fetchQuestions(category) );
  saveQuiz(score, currentStep, questions)
  printQuestion();
  printAnswers();
}

// Start Quiz if category is set
async function startQuiz() {
  if (category) {
    if (!questions.length) {
      await generateQuestions(category);
    }

    printQuestion();
    printAnswers();
    startTimer(countdownDisplay, handleTimeout);

  } else {
    redirectToStartPage();
  }
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
      console.log("Correct!");
      score++;
    }

    // Update step
    if (currentStep < quizLength - 1) {
      currentStep++;
      proceedToNext();
    } else {

      // To result on quiz end
      window.location.href = "result.html";
    }

    saveQuiz(score, currentStep, questions);
    console.log("Score: ", score);
  }
}

function proceedToNext() {
  printQuestion();
  printAnswers();
  startTimer();
}

answerOptionsDisplay.addEventListener("click", checkAnswer);

// Run this after main loader
startQuiz();
