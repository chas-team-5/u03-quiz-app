function shuffleArray(array) {
  const randomizedArray = [];
  while (array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    randomizedArray.push(array.splice(randomIndex, 1)[0]);
  }
  return randomizedArray;
}

function redirectToStartPage() {
  window.location.href = "index.html";
}

export { shuffleArray, redirectToStartPage }
