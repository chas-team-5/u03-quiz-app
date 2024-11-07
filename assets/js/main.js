import { setCategory } from './services/categoryHandler.js';

let questions = [];
let currentQuestion = 0;
let score = 0;
let selectCategory = '';
const startGame = document.getElementById("start-game-section");

startGame.addEventListener("click", startHandler);

function startHandler(e) {
  setCategory(e);
  window.location.href = "quiz.html";
}


function saveProgress() {
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('score', score);
    localStorage.setItem('selectCategory', selectCategory);
}

function loadProgress() {
    const saveQuestions = localStorage.getItem('questions');
    const savedCurrentQuestion = localStorage.getItem('currentQuestion');
    const savedScore = localStorage.getItem('score');
    const savedSelectCategory = localStorage.getItem('selectCategory');
}





