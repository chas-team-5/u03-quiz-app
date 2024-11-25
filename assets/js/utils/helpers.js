function shuffleArray(array) {
  const randomizedArray = [];
  while (array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    randomizedArray.push(array.splice(randomIndex, 1)[0]);
  }
  return randomizedArray;
}

function goToStart() {
  window.location.href = "index.html";
}

function goToResult() {
  window.location.href = "resultat.html";
}

function goToQuiz() {
  window.location.href = "quiz.html";
}

export { shuffleArray, goToStart, goToQuiz, goToResult }
