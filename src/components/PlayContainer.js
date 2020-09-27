import React from "react";
import { Link } from "react-router-dom";

class PlayContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const current = this.props.currentQuestion;
    const options = this.props.options;
    const currentQuestionIndex = this.props.currentQuestionIndex;
    const totalNumberOfQuestions = this.props.numberOfQuestions;
    const isPreviousDisabled = this.props.previousButtonDisabled;
    const isNextDisabled = this.props.nextButtonDisabled;
    const isQuizEnded = this.props.quizEnded;

    return (
      <div id="play">
        <section className="play-section">
          {isQuizEnded ? (
            <div className="end-button-container">
              <ul>
                <li>
                  <Link className="end-quiz-button" to="/score">
                    End Quiz
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="questions">
              <h5>{current.question}</h5>
              <p className="fraction">
                {currentQuestionIndex + 1}/{totalNumberOfQuestions}
              </p>
              <div className="options">
                <div className="options-left">
                  <p className="option" onClick={this.props.handleClick}>
                    {options[0]}
                  </p>
                  <p className="option" onClick={this.props.handleClick}>
                    {options[1]}
                  </p>
                </div>
                <div className="options-right">
                  <p className="option" onClick={this.props.handleClick}>
                    {options[2]}
                  </p>
                  <p className="option" onClick={this.props.handleClick}>
                    {options[3]}
                  </p>
                </div>
              </div>
              <div className="button-container">
                <button
                  id="previous-button"
                  className={isPreviousDisabled ? "disabled-button" : ""}
                  onClick={this.props.handleButtonClick}
                >
                  Previous
                </button>
                <button
                  id="next-button"
                  className={isNextDisabled ? "disabled-button" : ""}
                  onClick={this.props.handleButtonClick}
                >
                  Next
                </button>
                <button id="quit-button" onClick={this.props.handleButtonClick}>
                  Quit
                </button>
                ;
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default PlayContainer;
