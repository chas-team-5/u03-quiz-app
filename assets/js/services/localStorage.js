function saveProgress(score, currentStep, quizQuestions) {
  localStorage.setItem('currentScore', score);
  localStorage.setItem('currentQuestion', currentStep);
  localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));
}

function resetProgress() {
  localStorage.setItem('currentScore', 0);
  localStorage.setItem('currentQuestion', 0);
  localStorage.setItem('quizQuestions', []);
}

function loadProgress() {
  console.log("LOADED!");
}

export { saveProgress, resetProgress, loadProgress }
