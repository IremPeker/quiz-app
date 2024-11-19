import React from "react";

const GameInformation = ({ category, difficulty }) => {
  return (
    <div className="game-information">
      <div className="game-information-item">
        <p className="title">Category:</p>
        <p className="category">{category}</p>
      </div>
      <div className="game-information-item">
        <p className="title">Difficulty:</p>
        <p className="difficulty">{difficulty}</p>
      </div>
    </div>
  );
};

export default GameInformation;
