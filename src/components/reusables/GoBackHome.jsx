import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const GoBackHome = () => {
  const { handleEndGame } = useOutletContext();
  return (
    <div className="back-home-button-container">
      <Link to="/" className="back-home-button" onClick={handleEndGame}>
        Home Page
      </Link>
    </div>
  );
};

export default GoBackHome;
