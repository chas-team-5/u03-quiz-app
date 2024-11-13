import { loadProgress, saveQuiz } from "./services/localStorage.js";
import { fetchQuestions } from "./services/fetchQuestions.js";
import { shuffleArray, redirectToStartPage } from "./utils/helpers.js";

const quizLength = 10;
const stepsCurrent = document.getElementById("steps-current");
const stepsTotal = document.getElementById("steps-total");
const questionText = document.getElementById("question-text");
const answerOptionsElement = document.getElementById("answer-options");

let category = localStorage.getItem("selectedCategory");
let { score, currentStep, questions } = loadProgress();

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

  answerOptionsElement.innerHTML = "";
  answerOptions = shuffleArray(answerOptions);

  answerOptions.forEach((item) => {
    const option = document.createElement("button");
    option.classList.add("answer-option");
    option.textContent = item.text;
    option.setAttribute("data-id", item.optionIndex);

    answerOptionsElement.appendChild(option);
  });
}

async function generateQuestions(category) {
  questions = shuffleArray( await fetchQuestions(category) );
  saveQuiz(score, currentStep, questions)
  printQuestion();
  printAnswers();
}

// Start Quiz if category is set
function startQuiz() {
  if (category) {
    if (!questions.length) {
      generateQuestions(category);
      return;
    }

    printQuestion();
    printAnswers();

  } else {
    redirectToStartPage();
  }
}

function checkAnswer(e) {
  e.preventDefault();

  if (e.target.tagName === "BUTTON") {
    let userAnswer = parseInt(e.target.dataset.id);
    let correctAnswer = questions[currentStep].correctAnswer;

    if (userAnswer === correctAnswer) {
      console.log("Correct!");
      score++;
    }

    if (currentStep < quizLength - 1) {
      currentStep++;
      console.log("STEP: ", currentStep);

      // Move this to on click next
      printQuestion();
      printAnswers();
    } else {
      window.location.href = "index.html";
    }

    saveQuiz(score, currentStep, questions);
    console.log("Score: ", score);
  }
}

answerOptionsElement.addEventListener("click", checkAnswer);

// Run this after loader
startQuiz();
