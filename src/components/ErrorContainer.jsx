import React from "react";
import GoBackHome from "./reusables/GoBackHome";
import fail from "../assets/fail.webp";

const ErrorContainer = () => {
  return (
    <div data-testid="errorContainer" id="error">
      <div className="error-section">
        <p className="error-message">
          Sorry! Something is wrong! <br /> Please contact with me so that I can
          correct it <br /> irem.peker@gmx.de
        </p>
        <img className="fail-message" src={fail} alt="fail"></img>
        <GoBackHome />
      </div>
    </div>
  );
};

export default ErrorContainer;
