function saveQuiz(score, currentStep, questions) {
  localStorage.setItem("score", score);
  localStorage.setItem("currentQuestion", currentStep);
  localStorage.setItem("questions", JSON.stringify(questions));
}

function resetSavedQuiz() {
  localStorage.setItem("score", 0);
  localStorage.setItem("currentQuestion", 0);
  localStorage.setItem("questions", JSON.stringify([]));
  localStorage.setItem('countdownTime', 20);
}

function loadProgress() {
  const score = parseInt(localStorage.getItem("score")) || 0;
  const currentStep = parseInt(localStorage.getItem("currentQuestion")) || 0;
  const questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];

  return { score, currentStep, questions };
}

export { saveQuiz, resetSavedQuiz, loadProgress }
