import { fetchQuestions } from "./services/fetchQuestions.js";
import { shuffleArray } from "./utils/helpers.js";

const stepsCurrent = document.getElementById("steps-current");
const stepsTotal = document.getElementById("steps-total");
const questionText = document.getElementById("question-text");
const answerOptionsElement = document.getElementById("answer-options");

let score = 0;
let currentQuestion = 0;
let category = localStorage.getItem("selectedCategory");
let storedQuizQuestions = localStorage.getItem('quizQuestions');
let quizQuestions = storedQuizQuestions ? JSON.parse(storedQuizQuestions) : [];
let answerOptions = [];

// Start Quiz if Category else redirect to home
if (category) {

  // Generate new questions if quizQuestions[] is empty
  if (!quizQuestions.length) {
    generateQuestions(category);
  } else {
    printQuestion();
    printAnswers();
  };

} else {
  window.location.href = "index.html";
}

// Generate new questions
async function generateQuestions(category) {
  quizQuestions = await fetchQuestions(category);
  quizQuestions = shuffleArray(quizQuestions);
  printQuestion();
  printAnswers();

  localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));
}

function printQuestion() {
  stepsCurrent.textContent = currentQuestion + 1;
  questionText.textContent = quizQuestions[currentQuestion].question;
  stepsTotal.textContent = quizQuestions.length;
}

function printAnswers() {
  answerOptions = quizQuestions[currentQuestion].options;

  answerOptions.forEach((item, index) => {
    const option = document.createElement("button");
    option.classList.add("answer-option");
    option.textContent = answerOptions[index];

    if (index === quizQuestions[currentQuestion].correctAnswer) {
      option.setAttribute("data-answer", "correct");
    }

    answerOptionsElement.appendChild(option)
  });
}

answerOptionsElement.addEventListener("click", printAnswers);
