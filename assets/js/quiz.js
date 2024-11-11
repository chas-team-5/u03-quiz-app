import { saveProgress, loadProgress, resetProgress } from "./services/localStorage.js";
import { fetchQuestions } from "./services/fetchQuestions.js";
import { shuffleArray } from "./utils/helpers.js";

const stepsCurrent = document.getElementById("steps-current");
const stepsTotal = document.getElementById("steps-total");
const questionText = document.getElementById("question-text");
const answerOptionsElement = document.getElementById("answer-options");

let score = 0;
let storedCurrentStep = localStorage.getItem('currentQuestion');
let currentStep = storedCurrentStep ? JSON.parse(storedCurrentStep) : 0;
let category = localStorage.getItem("selectedCategory");
let storedQuizQuestions = localStorage.getItem('quizQuestions');
let quizQuestions = storedQuizQuestions ? JSON.parse(storedQuizQuestions) : [];

// Generate new questions
async function generateQuestions(category) {
  quizQuestions = await fetchQuestions(category);
  quizQuestions = shuffleArray(quizQuestions);
  printQuestion();
  printAnswers();

  localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));
}

function printQuestion() {
  stepsCurrent.textContent = currentStep + 1;
  questionText.textContent = quizQuestions[currentStep].question;
  stepsTotal.textContent = quizQuestions.length;
}

function printAnswers() {
  let answerOptions = quizQuestions[currentStep].options.map((option, index) => ({
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

function checkAnswer(e) {
  e.preventDefault();

  let correctAnswer = quizQuestions[currentStep].correctAnswer;
  let userAnswer;

  if (e.target.tagName === "BUTTON") {
    userAnswer = parseInt(e.target.dataset.id);

    if (userAnswer === correctAnswer) {
      userAnswer === correctAnswer && console.log("Correct!");
      score++;
    }

    if (currentStep < 9) {
      currentStep++;
      console.log("STEP: ", currentStep);

      // Move this to on click next
      printQuestion();
      printAnswers();
    } else {
      window.location.href = "index.html";
    }

    saveProgress(score, currentStep, quizQuestions);


    console.log("Score: ", score);
  }
}

answerOptionsElement.addEventListener("click", checkAnswer);
