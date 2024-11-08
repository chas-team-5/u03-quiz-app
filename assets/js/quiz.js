let category = "";
let quizQuestions = []

// Check if Category exists
if (localStorage.getItem("selectedCategory") === null) {
  window.location.href = "index.html";
} else {
  category = localStorage.getItem("selectedCategory");
  startQuiz();
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
async function startQuiz() {
  quizQuestions = await fetchQuestions(category);
  console.log("Questions loaded:", quizQuestions);
}