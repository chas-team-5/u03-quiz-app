function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

function goToStart() {
  window.location.href = "index.html";
}

function goToResult() {
  window.location.href = "result.html";
}

function goToQuiz() {
  window.location.href = "quiz.html";
}

export { shuffleArray, goToStart, goToQuiz, goToResult }
