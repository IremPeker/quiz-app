import React from "react";

const EndGame = ({ score, correctAnswers, wrongAnswers, numberOfQuestions }) => {

  return (
    <div id="end-game">
      <div className="endGame-section">
        <h3>Quiz is finished</h3>
        <h5>Your score is {score} out of {numberOfQuestions}</h5>
        <h5>You have answered {correctAnswers} questions correctly.</h5>
        <h5>And {wrongAnswers} questions wrong</h5>
        <div className="home-button-container">
          <a href="/" className="home-button">Go Back Home</a>
        </div>
      </div>
    </div>
  );
}

export default EndGame;
