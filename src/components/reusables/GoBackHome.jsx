import React from "react";
import { Link } from "react-router-dom";

const GoBackHome = () => {
  return (
    <div className="back-home-button-container">
      <Link to="/" className="back-home-button">
        Home Page
      </Link>
    </div>
  );
};

export default GoBackHome;
