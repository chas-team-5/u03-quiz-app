import { showSpinner, hideSpinner } from "./loadingscreen.js";

async function fetchQuestions(category) {
  showSpinner();

  try {
    const response = await new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await fetch(`assets/data/${category}.json`));
      }, 3000);
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
