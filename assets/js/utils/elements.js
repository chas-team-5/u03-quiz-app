const totalQuestions = 10;
const startGameEl = document.getElementById("category-selection");
const stepsCurrentEl = document.getElementById("steps-current");
const stepsTotalEl = document.getElementById("steps-total");
const questionImageEl = document.getElementById("question-img");
const questionTextEl = document.getElementById("question-text");
const answerOptionsEl = document.getElementById("answer-options");
const countdownEl = document.getElementById("countdown");
const progressEl = document.getElementById("progress");
const answersCorrectEl = document.getElementById("answers-correct");
const readyNext = document.getElementById("ready-next");
const resultEl = document.querySelectorAll(".result-content")[0];
const resultNameEl = document.getElementById("result-name");
const resultTextEl = document.getElementById("result-text");

export { totalQuestions, startGameEl, stepsCurrentEl, stepsTotalEl, questionImageEl, questionTextEl, answerOptionsEl, countdownEl, progressEl, answersCorrectEl, readyNext, resultEl, resultNameEl, resultTextEl }
