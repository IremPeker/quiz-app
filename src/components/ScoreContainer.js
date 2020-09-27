import React from "react";
import { Link } from "react-router-dom";

class ScoreContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const score = this.props.score;
    const correctAnswers = this.props.correctAnswers;
    const wrongAnswers = 10 - correctAnswers;
    return (
      <div id="score">
        <section className="score-section">
          <h3>Quiz is finished</h3>
          <h5>Your score is {score}</h5>
          <h5>You have answered {correctAnswers} questions correctly.</h5>
          <h5>And {wrongAnswers} questions wrong</h5>
          <div className="home-button-container">
            <ul>
              <li>
                <Link
                  className="home-button"
                  to="/"
                  onClick={() => {
                    this.props.fetchData();
                  }}
                >
                  Home Page
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default ScoreContainer;
