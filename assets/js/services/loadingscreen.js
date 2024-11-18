document.addEventListener('DOMContentLoaded', () => {
    const category = localStorage.getItem("selectedCategory");
    const loadingTextElement = document.getElementById('loading__text');
    const loading__screen = document.getElementById('loading__screen');

    if (category === 'djur-och-natur') {
        loadingTextElement.innerHTML = "Gör dig redo för 'Djur & Natur'!<br>DU har 20 sekunder per fråga, så var snabb med svaren!";
}   else if (category === 'teknikens-varld') {
    loadingTextElement.innerHTML = "Gör dig redo för 'Teknik'!<br>Du har 20 sekunder per fråga, så var snabb med svaren!";
}

loading__screen.style.display = 'block';

document.addEventListener('questionsLoaded', () => {
    document.getElementById('loading__screen').style.display = 'none';
});
} );
