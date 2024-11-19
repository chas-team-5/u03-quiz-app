import { showSpinner, hideSpinner } from "./loadingScreen.js";

async function fetchQuestions(category) {
  showSpinner();

  try {
    const response = await new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await fetch(`assets/data/${category}.json`));
      }, 500); // Set to 1000 for dev, was 3000
    })

    if (!response.ok) {
      throw new Error("Failed to load questions");
    }

    const data = await response.json();
    return data;

  } catch (error) {
      console.error("Error fetching questions:", error);
  } finally {
    hideSpinner();
  }
}

export { fetchQuestions }
