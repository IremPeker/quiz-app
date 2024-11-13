import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';

const PlayContainer = () => {

  const { allQuestions } = useOutletContext();

  const [previousQuestion, setPreviousQuestion] = useState([]);
  const [nextQuestion, setNextQuestion] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [isUrlError, setIsUrlError] = useState(false);

  useEffect(() => {
    if (allQuestions.length > 0) {
      const currentQuestion = allQuestions[currentQuestionIndex].question;
      setNumberOfQuestions(allQuestions.length);
      setCurrentQuestion(currentQuestion);

      const incorrectAnswers = allQuestions[currentQuestionIndex].incorrect_answers; // array of incorrect answers
      const correctAnswer = allQuestions[currentQuestionIndex].correct_answer; // correct answer
      setCorrectAnswer(correctAnswer);
      const allAnswers = [...incorrectAnswers, correctAnswer];
      const randomIndex = Math.floor(Math.random() * allAnswers.length);
      const shuffledAnswers = allAnswers.slice(0, randomIndex).concat(correctAnswer, allAnswers.slice(randomIndex));
      setCurrentOptions(shuffledAnswers);
     }
  }, [allQuestions, currentQuestionIndex]);
  
  const handleOptionClick = (option) => {
    if (option === currentQuestion.correct_answer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
      setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
    }
  };

  const handleButtonClick = (buttonType) => {
    if (buttonType === "previous") {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setCurrentQuestion(allQuestions[currentQuestionIndex - 1].question);
      //setPreviousButtonDisabled(false);
      setNextButtonDisabled(false);
      setPreviousButtonDisabled(currentQuestionIndex === 0);
    } else if (buttonType === "next") {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestion(allQuestions[currentQuestionIndex + 1].question);
      setPreviousButtonDisabled(false);
      //setNextButtonDisabled(false);
      setNextButtonDisabled(currentQuestionIndex === numberOfQuestions - 1);
    } else if (buttonType === "quit") {
      setQuizEnded(true);
    }
  }
    
  return (
  <div id="play"><section className="play-section">
    {quizEnded ? (
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
        <h5>{currentQuestion}</h5>
        <p className="fraction">
          {currentQuestionIndex + 1}/{numberOfQuestions}
        </p>
        <div className="options">
          {currentOptions.map((option, index) => {
            return (
              <p className="option" key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </p>
            );
          })}
        </div>
        <div className="button-container">
          <button
            id="previous-button"
            className={previousButtonDisabled ? "disabled-button" : ""}
            onClick={() => handleButtonClick("previous")}
          >
            Previous
          </button>
          <button
            id="next-button"
            className={nextButtonDisabled ? "disabled-button" : ""}
            onClick={() => handleButtonClick("next")}
          >
            Next
          </button>
          <button id="quit-button" onClick={() => handleButtonClick("quit")}>
            Quit
          </button>
          ;
        </div>
      </div>
    )}
  </section>
</div>);
};

export default PlayContainer;