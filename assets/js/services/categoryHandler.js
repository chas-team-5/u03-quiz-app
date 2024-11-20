import { goToQuiz } from "../utils/helpers.js"

function setCategory(e) {
  let category = e.target.getAttribute("data-category");
  saveCategory(category);
}

function saveCategory(category) {
  localStorage.setItem("selectedCategory", category);
}

function selectCategory(e) {
  setCategory(e);
  goToQuiz();
}

export { setCategory, selectCategory }
