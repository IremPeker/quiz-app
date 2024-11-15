import React from "react";

const EndGame = ({
  score,
  correctAnswers,
  wrongAnswers,
  numberOfQuestions,
}) => {
  return (
    <div id="end-game">
      <div className="endGame-section">
        <h1>Quiz is finished</h1>
        <p>
          Your score is{" "}
          <spam className={score >= 6 ? "green" : "red"}>{score}</spam> out of{" "}
          {numberOfQuestions}
          <br /> You have answered {correctAnswers} questions correctly and
          <br /> {wrongAnswers} questions wrong
        </p>
        <div className="home-button-container">
          <a href="/" className="home-button">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
