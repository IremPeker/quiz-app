import React from "react";
import { Link } from 'react-router-dom';

class PlayContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const current = this.props.currentQuestion;
    const options = this.props.options;
    const currentQuestionIndex = this.props.currentQuestionIndex;
    const totalNumberOfQuestions = this.props.numberOfQuestions;
    const nextQuestion = this.props.nextQuestion;
    const isPreviousDisabled = this.props.previousButtonDisabled;
    const isNextDisabled = this.props.nextButtonDisabled;
    
    let previousButton;
    let nextButton;
    let quitButton;
    let endQuizButton;
    if (!isNextDisabled) {
      previousButton = <Link 
      id="previous-button" 
      className={isPreviousDisabled ? 'disabled-button' : ''}
      onClick={this.props.handleButtonClick}>
        Previous
        </Link>
      nextButton = <Link 
      id="next-button"
      className={isNextDisabled ? 'disabled-button' : ''} 
      onClick={this.props.handleButtonClick}>
        Next
        </Link>
      quitButton = <Link id="quit-button" onClick={this.props.handleButtonClick}>Quit</Link>;
    } else {
      endQuizButton = <Link id="end-button" to="/score">End Quiz</Link>;
    }
    
      return (
        <div id="play">
          <section className="play-section">
            <div className="questions">
                <h4>{current.question}</h4>
                <p className="fraction">{currentQuestionIndex+1}/{totalNumberOfQuestions}</p>
                <div className="options">
                  <div className="options-left">
                  <p className="option" onClick={this.props.handleClick}>{options[0]}</p>
                  <p className="option" onClick={this.props.handleClick}>{options[1]}</p>
                  </div>
                  <div className="options-right">
                  <p className="option" onClick={this.props.handleClick}>{options[2]}</p>
                  <p className="option" onClick={this.props.handleClick}>{options[3]}</p>
                  </div>
                </div>
                <div className="button-container">
                  <ul>
                      <li>{previousButton}</li>
                      <li>{nextButton}</li>
                      <li>{quitButton}</li>
                      <li>{endQuizButton}</li>
                  </ul>
                </div>
            </div>
          </section>
          </div>
      );
    } 
}

export default PlayContainer;