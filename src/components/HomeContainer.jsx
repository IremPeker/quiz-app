import React from "react";
import game from "../assets/game.png";

const HomeContainer = () => {
  return (
    <div id="home">
      <div className="home-section">
        <h1>Quiz Game</h1>
        <div className="instructions">
          <p>Each game has 10 General Knowledge questions </p>
          <p>Each question has 4 options. The questions look like this: </p>
          <img
            src={game}
            className="game-screenshot"
            alt="example screenshot"
          ></img>
          <p>Take your time! There is no time pressure :)</p>
          <p>Press "Play" and Enjoy!</p>
        </div>
        <div className="play-button-container">
          <a href="/play" class="play-button">Start Game</a>
        </div>
      </div>
    </div>
  );
}


export default HomeContainer;
