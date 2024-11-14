import React from "react";
import { useOutletContext } from 'react-router-dom';

const Score = () => {
  const { score, correctAnswers, wrongAnswers } = useOutletContext();
  return (
    <div className="score-container">
      <div>
        Correct Answers: {correctAnswers}
      </div>
      <div>
        Wrong Answers: {wrongAnswers}
      </div>
    </div>
  )
}

export default Score;