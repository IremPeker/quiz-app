import React from "react";
import game from "../assets/game.png";

const HomeContainer = () => {
  return (
    <div id="home">
      <div className="home-section">
        <h1>Quiz Game</h1>
        <div className="instructions">
          <p className="title">
            Each game has 10 questions.
            <br /> The category of question can vary from General Knowledge to
            Films, Musics and even Anime Charachters.
            <br /> The difficulty can be easy, medium or hard.
            <br /> Each question has 4 options. The questions look like this:{" "}
          </p>
          <img
            src={game}
            className="game-screenshot"
            alt="example screenshot"></img>
          <p className="title">
            Take your time! There is no time pressure :)
            <br />
            Click on "Start Game" and Enjoy!
          </p>
        </div>
        <div className="play-button-container">
          <a href="/play" className="play-button">
            Start Game
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
