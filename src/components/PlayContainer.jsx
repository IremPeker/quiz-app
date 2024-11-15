import React, {useEffect, useState} from "react";
import { useOutletContext } from 'react-router-dom';
import { decodeEntities } from "../utils/stringUtils";
import Score from "./Score";
import EndGame from "./EndGame";
import { useSnackbar } from 'notistack';

const PlayContainer = () => {

  const { enqueueSnackbar } = useSnackbar();

  const { allQuestions, score, setScore, correctAnswers, wrongAnswers, setCorrectAnswers, setWrongAnswers } = useOutletContext();

  const [currentOptions, setCurrentOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    if (allQuestions.length > 0 && !endGame) {
      const currentQuestion = allQuestions[currentQuestionIndex].question;
     
      setNumberOfQuestions(allQuestions.length);
      setCurrentQuestion(decodeEntities(currentQuestion));

      const incorrectAnswers = allQuestions[currentQuestionIndex].incorrect_answers; // array of incorrect answers
      const correctAnswer = allQuestions[currentQuestionIndex].correct_answer; // correct answer
      setCorrectAnswer(correctAnswer);
      const randomIndex = Math.floor(Math.random() * incorrectAnswers.length + 1);
      const shuffledAnswers = incorrectAnswers.slice(0, randomIndex).concat(correctAnswer, incorrectAnswers.slice(randomIndex));
      setCurrentOptions(shuffledAnswers.map((answer) => decodeEntities(answer)));
     }
  }, [allQuestions, currentQuestionIndex, endGame]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
      setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
      enqueueSnackbar('Correct Answer!', { variant: 'success' });
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
      enqueueSnackbar('Wrong Answer!', { variant: 'error' });
    }
  };

  const handleButtonClick = () => {
    if (currentQuestionIndex + 1 === numberOfQuestions) {
      setEndGame(true);
    }
    
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setCurrentQuestion(allQuestions[currentQuestionIndex].question);
    setSelectedOption(null);
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
            <button
              id="next-button"
              disabled={nextButtonDisabled}
              onClick={() => handleButtonClick()}
            >
              {currentQuestionIndex + 1 === numberOfQuestions ? "End Game" : "Next"}
            </button>
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


// things to do
// add breakpoints fix styles for tablet and mobile
// add context api
// add the option to chosse the hardship level of the questions