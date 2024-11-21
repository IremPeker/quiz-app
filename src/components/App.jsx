import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchData } from "../utils/dataUtils";
import { getRandomCategory, getRandomDifficulty } from "../utils/apiUtils";
import { decodeEntities } from "../utils/stringUtils";
import { SnackbarProvider } from "notistack";
import "../styles/App.scss";

const App = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    if (!allQuestions.length) {
      const categoryNumber = getRandomCategory();
      const difficulty = getRandomDifficulty();
      setDifficulty(difficulty);
      fetchData(categoryNumber, difficulty)
        .then((data) => {
          setAllQuestions(data.results);
          setNumberOfQuestions(data.results.length);
          const decodedCategory = decodeEntities(data.results[0].category);
          setCategory(decodedCategory);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [allQuestions.length]);

  const handleEndGame = () => {
    setAllQuestions([]);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
  };

  return (
    <>
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <Outlet
          context={{
            allQuestions,
            numberOfQuestions,
            category,
            difficulty,
            score,
            setScore,
            correctAnswers,
            setCorrectAnswers,
            wrongAnswers,
            setWrongAnswers,
            error,
            handleEndGame,
          }}
        />
      </SnackbarProvider>
    </>
  );
};

export default App;
