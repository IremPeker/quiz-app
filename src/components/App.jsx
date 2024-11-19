import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchWithDelay } from "../utils/dataUtils";
import { getRandomCategory, getRandomDifficulty } from "../utils/apiUtils";
import { decodeEntities } from "../utils/stringUtils";
import { SnackbarProvider } from "notistack";
import "../styles/App.scss";

const App = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const categoryNumber = getRandomCategory();
      const difficulty = getRandomDifficulty();
      setDifficulty(difficulty);
      fetchWithDelay(categoryNumber, difficulty)
        .then((data) => {
          setAllQuestions(data.results);
          const decodedCategory = decodeEntities(data.results[0].category);
          setCategory(decodedCategory);
          setDataFetched(true);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [category, difficulty]);

  return (
    <>
      <SnackbarProvider autoHideDuration={2000}>
        <Outlet
          context={{
            allQuestions,
            category,
            difficulty,
            score,
            setScore,
            correctAnswers,
            setCorrectAnswers,
            wrongAnswers,
            setWrongAnswers,
            error,
          }}
        />
      </SnackbarProvider>
    </>
  );
};

export default App;