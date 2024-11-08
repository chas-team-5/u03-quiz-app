import {shuffleArray} from "./utils/helpers.js"

let category = "";
let quizQuestions = [];
let currentQuestion = 0; // Change this to test Quiz init vs Localstorage
let score = 0;

// Check if Category exists & Init Quiz
if (localStorage.getItem("selectedCategory") !== null) {

  category = localStorage.getItem("selectedCategory");

  // If Quiz not started, generate new question Array.
  if (currentQuestion === 0) {
    generateQuestions(category);

  } else {

    // Get from localstorage
    quizQuestions = localStorage.getItem('quizQuestions');
    quizQuestions = JSON.parse(quizQuestions);

    console.log("Localstored array: ", quizQuestions);
  }
} else {
  window.location.href = "index.html";
}

// Fetch questions depending on category
async function fetchQuestions(category) {
  try {
    const response = await fetch(`assets/data/${category}.json`);

    if (!response.ok) {
      throw new Error("Failed to load questions");
    }

    const data = await response.json();
    return data;

  } catch (error) {
      console.error("Error fetching questions:", error);
  }
}

// Init Quiz
async function generateQuestions(category) {
  quizQuestions = await fetchQuestions(category);
  quizQuestions = shuffleArray(quizQuestions);

  console.log("Manipulated array: ", quizQuestions);

  // Store in localstorage
  localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));
}
