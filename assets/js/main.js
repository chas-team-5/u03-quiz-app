import { setCategory } from './services/categoryHandler.js';

const startGame = document.getElementById("start-game-section");

let questions = [];
let currentQuestion = 0;
let score = 0;

function selectCategory(e) {
  setCategory(e);
  window.location.href = "quiz.html";
}

function saveProgress() {
  localStorage.setItem('questions', JSON.stringify(questions));
  localStorage.setItem('currentQuestion', currentQuestion);
  localStorage.setItem('score', score);
}

function loadProgress() {
  questions = localStorage.getItem('questions');
  currentQuestion = localStorage.getItem('currentQuestion');
  score = localStorage.getItem('score');
}

startGame.addEventListener("click", selectCategory);
