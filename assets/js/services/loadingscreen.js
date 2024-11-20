const category = localStorage.getItem("selectedCategory");
const loadingScreenEl = document.getElementById("loading-screen");
const loadingTextEl = document.getElementById("loading-text");
let categoryText;

if (category === "djur-och-natur") {
    categoryText = "Gör dig redo för 'Djur & Natur'";
}   else if (category === "teknik") {
    categoryText = "Gör dig redo för 'Teknik'";
}

function showSpinner(loadingText) {
    let text = loadingText ?? categoryText;

    loadingScreenEl.classList.remove("hidden");
    loadingTextEl.innerHTML = text;
}

function hideSpinner() {
    loadingScreenEl.classList.add("hidden");
}

export { showSpinner, hideSpinner }
