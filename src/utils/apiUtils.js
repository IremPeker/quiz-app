export const getRandomCategory = () => {
  const min = 9;
  const max = 32;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomDifficulty = () => {
  const difficulties = ["easy", "medium", "hard"];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
};
