import React from "react";
import { Link } from "react-router-dom";
import game from "../assets/game.png";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isUrlError = this.props.isUrlError;

    let button;
    if (isUrlError) {
      button = (
        <Link className="play-button" to="/error">
          Play
        </Link>
      );
    } else {
      button = (
        <Link className="play-button" to="/play">
          Play
        </Link>
      );
    }
    return (
      <div id="home">
        <section className="home-section">
          <div className="how-to">
            <h2>Quiz Game</h2>
            <div className="instructions">
              <p>Each game has 10 General Knowledge questions</p>
              <p>Each question has 4 options</p>
              <img
                src={game}
                className="game-screenshot"
                alt="example screenshot"
              ></img>
              <p>Take your time! There is no time pressure :)</p>
              <p>Press "Play" and Enjoy!</p>
            </div>
            <div className="play-button-container">
              <ul>
                <li>{button}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeContainer;
