import { showSpinner, hideSpinner } from "./loadingScreen.js";

async function fetchResult(category) {
  showSpinner('Hämtar resultat…!');

  try {
    const response = await new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await fetch(`assets/data/result-${category}.json`));
      }, 3000);
    })

    if (!response.ok) {
      throw new Error("Failed to load result");
    }

    const data = await response.json();
    return data;

  } catch (error) {
      console.error("Error fetching result:", error);
  } finally {
    hideSpinner();
  }
}

export { fetchResult }
