import { countdownInitialTime } from "./timer.js";

function saveQuiz(score, currentStep, questions, totalQuestions, quizProgress) {
  localStorage.setItem("score", score);
  localStorage.setItem("currentStep", currentStep);
  localStorage.setItem("questions", JSON.stringify(questions));
  localStorage.setItem("totalQuestions", totalQuestions);
  localStorage.setItem("quizProgress", JSON.stringify(quizProgress));
}

function resetQuiz() {
  localStorage.removeItem("selectedCategory");
  localStorage.removeItem("score");
  localStorage.removeItem("currentStep");
  localStorage.removeItem("questions");
  localStorage.removeItem("totalQuestions");
  localStorage.removeItem("quizProgress");
  localStorage.setItem("countdownTime", countdownInitialTime);
}

function loadProgress(totalQuestions) {

  const score = parseInt(localStorage.getItem("score")) || 0;
  const currentStep = parseInt(localStorage.getItem("currentStep")) || 0;
  const questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  localStorage.getItem("totalQuestions");
  const quizProgress = localStorage.getItem("totalQuestions")
    ? JSON.parse(localStorage.getItem("quizProgress"))
    : Array(totalQuestions).fill("unanswered");

  return { score, currentStep, questions, quizProgress };
}

export { saveQuiz, resetQuiz, loadProgress }
