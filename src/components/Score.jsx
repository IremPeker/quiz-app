import React from "react";
import { useOutletContext } from "react-router-dom";

const Score = () => {
  const { correctAnswers, wrongAnswers } = useOutletContext();
  return (
    <div data-testid="scoreContainer" className="score-container">
      <div data-testid="scoreCorrect" className="number-wrapper">
        <p className="title">Correct Answers:</p>
        <p className="score-correct-number">{correctAnswers}</p>
      </div>
      <div data-testid="scoreWrong" className="number-wrapper">
        <p className="title">Wrong Answers:</p>
        <p className="score-wrong-number">{wrongAnswers}</p>
      </div>
    </div>
  );
};

export default Score;
