import React from "react";
import { useOutletContext } from "react-router-dom";

const Score = () => {
  const { correctAnswers, wrongAnswers } = useOutletContext();
  return (
    <div data-testid="scoreContainer" className="score-container">
      <div data-testid="scoreCorrect" className="score-correct">
        <p>Correct Answers:</p>
        <p className="score-correct-number">{correctAnswers}</p>
      </div>
      <div data-testid="scoreWrong" className="score-wrong">
        <p>Wrong Answers:</p>
        <p className="score-wrong-number">{wrongAnswers}</p>
      </div>
    </div>
  );
};

export default Score;
