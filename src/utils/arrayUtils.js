export const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length + 1);
};

export const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
  const randomIndex = getRandomIndex(incorrectAnswers);
  return incorrectAnswers
    .slice(0, randomIndex)
    .concat(correctAnswer, incorrectAnswers.slice(randomIndex));
};
