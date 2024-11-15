export const fetchData = async () => {
  const url =
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

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
