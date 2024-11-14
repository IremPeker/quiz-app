import React, {useEffect, useState} from "react";
import { useOutletContext } from 'react-router-dom';
import Score from "./Score";
import EndGame from "./EndGame";

const PlayContainer = () => {

  const { allQuestions, score, setScore, correctAnswers, wrongAnswers, setCorrectAnswers, setWrongAnswers } = useOutletContext();

  // const [previousQuestion, setPreviousQuestion] = useState([]);
  // const [nextQuestion, setNextQuestion] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  // const [previousButtonDisabled, setPreviousButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    if (allQuestions.length > 0) {
      const currentQuestion = allQuestions[currentQuestionIndex].question;
      setNumberOfQuestions(allQuestions.length);
      setCurrentQuestion(decodeEntities(currentQuestion));

      const incorrectAnswers = allQuestions[currentQuestionIndex].incorrect_answers; // array of incorrect answers
      const correctAnswer = allQuestions[currentQuestionIndex].correct_answer; // correct answer
      setCorrectAnswer(correctAnswer);
      // const allAnswers = [...incorrectAnswers, correctAnswer];
      // console.log("all answers are", allAnswers);
      
      const randomIndex = Math.floor(Math.random() * incorrectAnswers.length + 1);
      const shuffledAnswers = incorrectAnswers.slice(0, randomIndex).concat(correctAnswer, incorrectAnswers.slice(randomIndex));
      console.log("shuffled answers are", shuffledAnswers);
      
      setCurrentOptions(shuffledAnswers.map((answer) => decodeEntities(answer)));
     }
  }, [allQuestions, currentQuestionIndex, endGame]);

  const decodeEntities = (str) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
  }

  const handleOptionClick = (option) => {
    console.log("option clicked, option is", option, "correct answer is", correctAnswer);
    setSelectedOption(option);
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
    
    // if (buttonType === "previous") {
    //   setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    //   setCurrentQuestion(allQuestions[currentQuestionIndex - 1].question);
    //   setNextButtonDisabled(false);
    //   // setPreviousButtonDisabled(currentQuestionIndex === 0);
    // } else {
    //   setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    //   setCurrentQuestion(allQuestions[currentQuestionIndex + 1].question);
    //   // setPreviousButtonDisabled(false);
    //   setSelectedOption(null);
    //   setNextButtonDisabled(currentQuestionIndex === numberOfQuestions - 1);
    // } 
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setCurrentQuestion(allQuestions[currentQuestionIndex + 1].question);
    setSelectedOption(null);
    setNextButtonDisabled(currentQuestionIndex === numberOfQuestions - 1);
  }
    
  return (
    endGame ?
      <EndGame 
        score={score} 
        correctAnswers={correctAnswers} 
        wrongAnswers={wrongAnswers} 
        numberOfQuestions={numberOfQuestions}
      /> 
      :
      <div id="play">
      <div className="play-section">
        <Score />
        <div className="questions">
          <h2>{currentQuestion}</h2>
          <p className="fraction">
            {currentQuestionIndex + 1}/{numberOfQuestions}
          </p>
          <div className="options">
            {currentOptions.map((option, index) => {
              const decodedOption = decodeEntities(option);
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={selectedOption && selectedOption === decodedOption ? 'option not-clickable' : 'option'}
                  disabled={selectedOption && selectedOption !== decodedOption}
                >
                  {decodedOption}
                </button>
              );
            })}
          </div>
          <div className="button-container">
              {/* <button
                id="previous-button"
                className={previousButtonDisabled ? "disabled-button" : ""}
                onClick={() => handleButtonClick("previous")}
              >
                Previous
              </button> */}
            <button
              id="next-button"
              // className={nextButtonDisabled ? "disabled-button" : ""}
              disabled={nextButtonDisabled}
              onClick={() => handleButtonClick("next")}
            >
              Next
            </button>
            {/* <div className="play-button-container">
              <a href="/score" className="play-button">Quit</a>
            </div> */}
            <button
              id="quit-button"
              onClick={() => setEndGame(true)}
            >
              Quit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayContainer;