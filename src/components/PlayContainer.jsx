import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { decodeEntities } from "../utils/stringUtils";
import { shuffleAnswers } from "../utils/arrayUtils";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import Score from "./Score";
import EndGame from "./EndGame";
import GoBackHome from "./reusables/GoBackHome";
import GameInformation from "./GameInformation";

const PlayContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    allQuestions,
    category,
    difficulty,
    score,
    setScore,
    correctAnswers,
    wrongAnswers,
    setCorrectAnswers,
    setWrongAnswers,
  } = useOutletContext();

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

      // incorrect answers array
      const incorrectAnswers =
        allQuestions[currentQuestionIndex].incorrect_answers;
      // correct answer
      const correctAnswer = allQuestions[currentQuestionIndex].correct_answer;
      setCorrectAnswer(correctAnswer);

      //concat and shuffle answers
      const shuffledAnswers = shuffleAnswers(correctAnswer, incorrectAnswers);
      setCurrentOptions(
        shuffledAnswers.map((answer) => decodeEntities(answer))
      );
    }
  }, [allQuestions, currentQuestionIndex, endGame]);

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 6000);
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

  const optionItem = currentOptions.map((option, index) => {
    const decodedOption = decodeEntities(option);
    return (
      <button
        key={index}
        data-testid="option"
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
  });

  return isLoading ? (
    <div data-testid="loaderContainer" id="loader" className="loader-container">
      <PulseLoader color="#ffff" size={50} />
      {showButton && (
        <div data-testid="goBackMessage" className="go-back-message">
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
        <GameInformation category={category} difficulty={difficulty} />
        <Score />
        <div className="questions">
          <h2 data-testid="question">{currentQuestion}</h2>
          <p className="fraction">
            {currentQuestionIndex + 1}/{numberOfQuestions}
          </p>
          <div data-testid="options" className="options">
            {optionItem}
          </div>
          <div data-testid="buttons" className="button-container">
            <button
              data-testid="next-button"
              id="next-button"
              disabled={currentQuestionIndex + 1 === numberOfQuestions}
              onClick={() => handleButtonClick()}>
              Next
            </button>
            <button
              data-testid="quit-button"
              id="quit-button"
              onClick={() => setEndGame(true)}>
              End Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayContainer;
