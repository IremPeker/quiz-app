import React from "react";
import { Link } from "react-router-dom";

class ScoreContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("inside score container render....");

    const score = this.props.score;
    const numberOfQuestions = this.props.numberOfQuestions;
    const numberOfAnsweredQuestions = this.props.numberOfAnsweredQuestions;
    const correctAnswers = this.props.correctAnswers;
    const wrongAnswers = this.props.wrongAnswers;
    return (
      <div id="score">
        <section className="score-section">
          <h3>The Quiz is finished</h3>
          <p>Your score is {score}</p>
          <p>You have answered {correctAnswers} questions correctly.</p>
          <p>And {wrongAnswers} questions wrong</p>
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
