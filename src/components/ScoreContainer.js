import React from "react";
import { Link } from 'react-router-dom';

class ScoreContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const score = this.props.score;
      const numberOfCorrectAnswers = this.props.numberOfCorrectAnswers;
      const numberOfWrongAnswers = this.props.numberOfWrongAnswers;
      return (
        <div id="score">
          <section className="score-section">
            <h3>The Quiz is finished</h3>
            <h4>Your score is {score}</h4>
            <h3>You have answered {numberOfCorrectAnswers} questions correctly.</h3>
            <h3>And {numberOfWrongAnswers} questions wrong</h3>
            <div className="home-button-container">
              <ul>
                <li><Link className="home-button" to="/">Home Page</Link></li>
              </ul>
            </div>
          </section>
          </div>
      );
    } 
}

export default ScoreContainer;