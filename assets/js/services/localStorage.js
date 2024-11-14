import { countdownInitialTime } from "./timer.js";

function saveQuiz(score, currentStep, questions, quizProgress) {
  localStorage.setItem("score", score);
  localStorage.setItem("currentQuestion", currentStep);
  localStorage.setItem("questions", JSON.stringify(questions));
  localStorage.setItem("quizProgress", JSON.stringify(quizProgress));
}

function resetSavedQuiz() {
  localStorage.removeItem("score");
  localStorage.removeItem("currentQuestion");
  localStorage.removeItem("questions");
  localStorage.removeItem("quizProgress");
  localStorage.setItem('countdownTime', countdownInitialTime);
}

function loadProgress(quizLength) {

  const score = parseInt(localStorage.getItem("score")) || 0;
  const currentStep = parseInt(localStorage.getItem("currentQuestion")) || 0;
  const questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  const quizProgress = localStorage.getItem("quizProgress")
    ? JSON.parse(localStorage.getItem("quizProgress"))
    : Array(quizLength).fill("unanswered");

  return { score, currentStep, questions, quizProgress };
}

export { saveQuiz, resetSavedQuiz, loadProgress }
