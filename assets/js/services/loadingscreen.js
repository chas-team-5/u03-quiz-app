const category = localStorage.getItem("selectedCategory");
const loadingTextElement = document.getElementById('loading__text');
const loadingScreen = document.getElementById('loading__screen');

if (category === 'djur-och-natur') {
    loadingTextElement.innerHTML = "Gör dig redo för 'Djur & Natur'";
}   else if (category === 'teknikens-varld') {
    loadingTextElement.innerHTML = "Gör dig redo för 'Teknik'";
}

function showSpinner() {
    loadingScreen.classList.remove('hidden');
}

function hideSpinner() {
    loadingScreen.classList.add('hidden');
}

export { showSpinner, hideSpinner }
