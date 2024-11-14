import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';

const PlayContainer = () => {

  const { allQuestions, score, setScore, correctAnswers, wrongAnswers, setCorrectAnswers, setWrongAnswers } = useOutletContext();

  const [previousQuestion, setPreviousQuestion] = useState([]);
  const [nextQuestion, setNextQuestion] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

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
    console.log("option clicked, option is", option, "correct answer is", correctAnswer);
    
    if (option === correctAnswer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
      setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
    }
  };

  const handleButtonClick = (buttonType) => {
    console.log("handle button clikced, button type is", buttonType);
    
    if (buttonType === "previous") {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setCurrentQuestion(allQuestions[currentQuestionIndex - 1].question);
      setNextButtonDisabled(false);
      setPreviousButtonDisabled(currentQuestionIndex === 0);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestion(allQuestions[currentQuestionIndex + 1].question);
      setPreviousButtonDisabled(false);
      setNextButtonDisabled(currentQuestionIndex === numberOfQuestions - 1);
    } 
  }
    
  return (
  <div id="play">
    <div className="play-section">
        <div className="questions">
          <h2>{currentQuestion}</h2>
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
            <div className="play-button-container">
              <a href="/score" class="play-button">Quit</a>
            </div>
          </div>
        </div>
    </div>
  </div>);
};

export default PlayContainer;