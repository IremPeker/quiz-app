import React from "react";
import { useOutletContext } from "react-router-dom";
import GoBackHome from "./reusables/GoBackHome";
import celebrate from "../assets/celebrate.webp";
import tryAgain from "../assets/try-again.webp";

const EndGame = () => {
  const { score, correctAnswers, wrongAnswers, numberOfQuestions } =
    useOutletContext();

  return (
    <div id="end-game">
      <div className="endGame-section">
        <h1>Quiz is finished</h1>
        <p className="title">
          Your score is{" "}
          <span className={score >= 6 ? "green" : "red"}>{score}</span> out of{" "}
          {numberOfQuestions}
          <br /> You have answered {correctAnswers} questions correctly and
          <br /> {wrongAnswers} questions wrong
        </p>
        <div className="end-game-wrapper">
          <h2 className="end-game-message">
            {score >= 6
              ? "CONGRATULATIONS! You did it!"
              : "Next time you will do better!"}
          </h2>
          <img
            src={score >= 6 ? celebrate : tryAgain}
            alt={score >= 6 ? "Celebrate Giphy" : "Try Again Giphy"}
            className="end-game-giphy"
          />
        </div>
        <GoBackHome />
      </div>
    </div>
  );
};

export default EndGame;
