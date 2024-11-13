import React from "react";
import { Link } from 'react-router-dom';
import fail from "../assets/fail.webp";

const UrlErrorContainer = () => {
  return (
    <div id="url-error">
        <section className="url-error-section">
            <p className="error-message">Sorry! Something is wrong with the url! <br /> Please contact with me so that I can correct it <br /> irem.peker@gmx.de</p>
            <img className="fail-message" src={fail} alt="fail"></img>
            <div className="home-button-container">
                    <ul>
                        <li><Link className="home-button" to="/">Home Page</Link></li>
                    </ul>
                </div>
        </section>
    </div>
  );
};

export default UrlErrorContainer;