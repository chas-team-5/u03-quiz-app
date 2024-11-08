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
    const saveQuestions = localStorage.getItem('questions');
    const savedCurrentQuestion = localStorage.getItem('currentQuestion');
    const savedScore = localStorage.getItem('score');
}

startGame.addEventListener("click", selectCategory);
