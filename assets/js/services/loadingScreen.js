const category = localStorage.getItem("selectedCategory");
const currentStep = localStorage.getItem("currentStep");
const loadingScreenEl = document.getElementById("loading-screen");
const loadingTextEl = document.getElementById("loading-text");
let categoryText;

if (currentStep === null || currentStep === "") {
  if (category === "djur-och-natur") {
    categoryText = `Gör dig redo för <span class="no-wrap-text">'Djur & Natur'!</span>`;
  }   else if (category === "teknik") {
    categoryText = `Gör dig redo för <span class="no-wrap-text">'Teknik'!</span>`;
  }
}

function showSpinner() {
  loadingScreenEl.classList.remove("hidden");

  if (categoryText !== undefined) {
    loadingTextEl.innerHTML = categoryText;
  }
}

function hideSpinner() {
  loadingScreenEl.classList.add("hidden");
}

export { showSpinner, hideSpinner }
