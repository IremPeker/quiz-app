import React from "react";
import GoBackHome from "./reusables/GoBackHome";
import celebrate from "../assets/celebrate.webp";
import tryAgain from "../assets/try-again.webp";

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
        {score >= 6 ? (
          <div data-testid="congrats" className="congrats">
            <h2>CONGRATULATIONS! You did it!</h2>
            <img
              src={celebrate}
              alt="Celebrate Giphy"
              className="celebrate-giphy"
            />
          </div>
        ) : (
          <div data-testid="tryAgain" className="try-again">
            <h2>Next time you will do better!</h2>
            <img
              src={tryAgain}
              alt="Try Again Giphy"
              className="try-again-giphy"
            />
          </div>
        )}
        <GoBackHome />
      </div>
    </div>
  );
};

export default EndGame;
