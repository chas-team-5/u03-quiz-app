async function fetchQuestions(category) {
  showSpinner();
  let data;
  try {
    const response = await new Promise((resolve) => { 
      setTimeout(async () => {
        resolve(await fetch(`assets/data/${category}.json`));
      }, 1500);
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
  document.getElementById('spinner').style.display = 'block';
}

function hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
}

export {fetchQuestions}