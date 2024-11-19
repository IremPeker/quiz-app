const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async (category, difficulty) => {
  const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};

export const fetchWithDelay = async (category, difficulty) => {
  await delay(5000);
  return fetchData(category, difficulty);
};
