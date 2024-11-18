async function fetchQuestions(category) {
  showSpinner();
  let data;
  try {
    const response = await new Promise((resolve) => { 
      setTimeout(async () => {
        resolve(await fetch(`assets/data/${category}.json`));
      }, 30000);
    })

    if (!response.ok) {
      throw new Error("Failed to load questions");
    }

  data = await response.json();

  } catch (error) {
      console.error("Error fetching questions:", error);
  } finally {
    hideSpinner();
  }
  return data;
}

function showSpinner() {
  document.getElementById('loading__screen').style.display = 'block';
}

function hideSpinner() {
  document.getElementById('loading__screen').style.display = 'none';
}

document.dispatchEvent(new Event('questionsLoaded'));

export {fetchQuestions}
