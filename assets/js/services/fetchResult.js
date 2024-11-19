async function fetchResult(category) {

  try {
    const response = await fetch(`assets/data/result-${category}.json`);

    if (!response.ok) {
      throw new Error("Failed to load result");
    }

    const data = await response.json();
    return data;

  } catch (error) {
      console.error("Error fetching result:", error);
  }
}

export { fetchResult }
