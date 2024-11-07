let questions = [];
let currentQuestion = 0;
let score = 0;
let selectCategory = '';

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





