import React from "react";
import { useOutletContext } from 'react-router-dom';

const ScoreContainer = () => {

  const { score, correctAnswers, wrongAnswers } = useOutletContext();

    return (
      <div id="score">
        <div className="score-section">
          <h3>Quiz is finished</h3>
          <h5>Your score is {score}</h5>
          <h5>You have answered {correctAnswers} questions correctly.</h5>
          <h5>And {wrongAnswers} questions wrong</h5>
          <div className="home-button-container">
            <a href="/" class="home-button">Go Back Home</a>
          </div>
        </div>
      </div>
    );
}

export default ScoreContainer;
