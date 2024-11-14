import React, {useEffect, useState} from "react";
import { Outlet } from 'react-router-dom';
import { fetchData } from "../utils/dataUtils";
import { SnackbarProvider } from 'notistack'
import "../styles/App.scss";

const App = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (allQuestions.length === 0) {
 
      fetchData().then((data) => {
        setAllQuestions(data.results);
      })
      .catch((error) => {
        setError(true);
      });
    }
  }, [allQuestions.length]);

  return (
    <>
    <SnackbarProvider autoHideDuration={2000}>
      <Outlet context={{ 
        allQuestions,
        score, 
        setScore, 
        correctAnswers, 
        setCorrectAnswers, 
        wrongAnswers, 
        setWrongAnswers,
        error
      }} />
    </SnackbarProvider>
    </>
 );
};

export default App;