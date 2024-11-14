import React, {useEffect, useState} from "react";
import { Outlet } from 'react-router-dom';
import { fetchData } from "../utils/dataUtils";
import "../styles/App.scss";
import M from "materialize-css";

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

  console.log("inside app.js, correct answers is", correctAnswers, "wrong answers is", wrongAnswers, "score is", score);
  


  const correctAnswer = () => {
  //   M.toast({
  //     html: "Correct Answer!",
  //     classes: "toast-valid",
  //     displayLength: 1300,
  //   });

  //   this.setState(
  //     (prevState) => ({
  //       score: prevState.score + 1,
  //       correctAnswers: prevState.correctAnswers + 1,
  //       currentQuestionIndex: prevState.currentQuestionIndex + 1,
  //       numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
  //       options: [],
  //     }),
  //     () => {
  //       if (this.state.nextQuestion === undefined) {
  //         this.setState({
  //           quizEnded: true,
  //         });
  //       } else {
  //         this.displayQuestions(
  //           this.state.allQuestions,
  //           this.state.currentQuestion,
  //           this.state.previousQuestion,
  //           this.state.nextQuestion
  //         );
  //       }
  //     }
  //   );
    return null;
  };

  const wrongAnswer = () => {
  //   M.toast({
  //     html: "Wrong Answer!",
  //     classes: "toast-invalid",
  //     displayLength: 1300,
  //   });

  //   this.setState(
  //     (prevState) => ({
  //       wrongAnswers: prevState.wrongAnswers + 1,
  //       currentQuestionIndex: prevState.currentQuestionIndex + 1,
  //       numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
  //       options: [],
  //     }),
  //     () => {
  //       if (this.state.nextQuestion === undefined) {
  //         this.setState({
  //           quizEnded: true,
  //         });
  //       } else {
  //         this.displayQuestions(
  //           this.state.allQuestions,
  //           this.state.currentQuestion,
  //           this.state.previousQuestion,
  //           this.state.nextQuestion
  //         );
  //       }
  //     }
  //   );
    return null;
  };

  return (
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
 );
};

export default App;