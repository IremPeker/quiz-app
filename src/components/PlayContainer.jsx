import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { decodeEntities } from "../utils/stringUtils";
import Score from "./Score";
import EndGame from "./EndGame";
import GoBackHome from "./reusables/GoBackHome";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";

const PlayContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    allQuestions,
    score,
    setScore,
    correctAnswers,
    wrongAnswers,
    setCorrectAnswers,
    setWrongAnswers,
  } = useOutletContext();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [endGame, setEndGame] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (allQuestions.length > 0 && !endGame) {
      setIsLoading(false);

      const currentQuestion = allQuestions[currentQuestionIndex].question;

      setNumberOfQuestions(allQuestions.length);
      setCurrentQuestion(decodeEntities(currentQuestion));

      const incorrectAnswers =
        allQuestions[currentQuestionIndex].incorrect_answers;
      const correctAnswer = allQuestions[currentQuestionIndex].correct_answer;
      setCorrectAnswer(correctAnswer);
      const randomIndex = Math.floor(
        Math.random() * incorrectAnswers.length + 1
      );
      const shuffledAnswers = incorrectAnswers
        .slice(0, randomIndex)
        .concat(correctAnswer, incorrectAnswers.slice(randomIndex));
      setCurrentOptions(
        shuffledAnswers.map((answer) => decodeEntities(answer))
      );
    }
  }, [allQuestions, currentQuestionIndex, endGame]);

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 5000);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
      setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
      enqueueSnackbar("Correct Answer!", { variant: "success" });
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
      enqueueSnackbar("Wrong Answer!", { variant: "error" });
    }
  };

  const handleButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setCurrentQuestion(allQuestions[currentQuestionIndex].question);
    setSelectedOption(null);
  };

  // const handleGoBackClick = () => {
  //   navigate("/");
  // };

  return isLoading ? (
    <div id="loader" className="loader-container">
      <PulseLoader color="#ffff" size={50} />
      {showButton && (
        <div className="go-back-message">
          <h3>Took too long to load? :(</h3>
          <GoBackHome />
        </div>
      )}
    </div>
  ) : endGame ? (
    <EndGame
      score={score}
      correctAnswers={correctAnswers}
      wrongAnswers={wrongAnswers}
      numberOfQuestions={numberOfQuestions}
    />
  ) : (
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
                  className={
                    selectedOption && selectedOption === decodedOption
                      ? "option not-clickable"
                      : "option"
                  }
                  disabled={selectedOption && selectedOption !== decodedOption}>
                  {decodedOption}
                </button>
              );
            })}
          </div>
          <div className="button-container">
            <button
              id="next-button"
              disabled={currentQuestionIndex + 1 === numberOfQuestions}
              onClick={() => handleButtonClick()}>
              Next
            </button>
            <button id="quit-button" onClick={() => setEndGame(true)}>
              End Game
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
// update readme
// add tests
