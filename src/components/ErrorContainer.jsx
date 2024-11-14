import React from "react";
import fail from "../assets/fail.webp";

const ErrorContainer = () => {
  return (
    <div id="url-error">
      <div className="url-error-section">
        <p className="error-message">Sorry! Something is wrong! <br /> Please contact with me so that I can correct it <br /> irem.peker@gmx.de</p>
        <img className="fail-message" src={fail} alt="fail"></img>
        <div className="home-button-container">
          <ul>
            <li><a className="home-button" href={`/`}>Home Page</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorContainer;