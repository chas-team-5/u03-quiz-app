async function fetchQuestions(category) {
  try {
    const response = await fetch(`assets/data/${category}.json`);

    if (!response.ok) {
      throw new Error("Failed to load questions");
    }

    const data = await response.json();
    return data;

  } catch (error) {
      console.error("Error fetching questions:", error);
  }
}

export {fetchQuestions}