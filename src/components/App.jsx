import React, {useEffect, useState} from "react";
import { fetchData } from "../utils/dataUtils";
import { Outlet } from 'react-router-dom';
import "../styles/App.scss";
import game from "../assets/game.png";
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

  // const handleScore = () => {
  //   setScore(score + 1);
  // };

  // const handleCorrectAnswer = () => {
  //   setCorrectAnswers(correctAnswers + 1);
  // };

  // const handleWrongAnswer = () => {
  //   setWrongAnswers(wrongAnswers + 1);  
  // };

 const displayQuestions = () => {
  //   const currentQuestion = this.state.allQuestions[
  //     this.state.currentQuestionIndex
  //   ];
  //   const nextQuestion = this.state.allQuestions[
  //     this.state.currentQuestionIndex + 1
  //   ];
  //   const previousQuestion = this.state.allQuestions[
  //     this.state.currentQuestionIndex - 1
  //   ];

  //   Object.entries(currentQuestion).map((el) => {
  //     if (el[0] === "incorrect_answers") {
  //       this.state.options.push(el[1]);
  //     }
  //     if (el[0] === "correct_answer") {
  //       this.state.correctAnswer = el[1];
  //     }
  //   });

  //   const concatOptions = this.state.options.concat(this.state.correctAnswer);
  //   const allOptions = [].concat.apply([], concatOptions);
  //   this.shuffleOptionsArray(allOptions);

  //   this.setState(
  //     {
  //       currentQuestion,
  //       nextQuestion,
  //       previousQuestion,
  //       options: allOptions,
  //     },
  //     () => {
  //       this.handleButtonDisable();
  //     }
  //   );
    return null;
  };

  const shuffleOptionsArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleOptionClick = (e) => {


  //   if (e.target.innerHTML === this.state.correctAnswer) {
  //     this.correctAnswer();
  //   } else {
  //     this.wrongAnswer();
  //   }
    return null;
  };

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

  const handlePreviousButtonClick = () => {
  //   if (this.state.previousQuestion !== undefined) {
  //     this.setState(
  //       (prevState) => ({
  //         currentQuestionIndex: prevState.currentQuestionIndex - 1,
  //         options: [],
  //       }),
  //       () => {
  //         this.displayQuestions(
  //           this.state.allQuestions,
  //           this.state.currentQuestion,
  //           this.state.previousQuestion,
  //           this.state.nextQuestion
  //         );
  //       }
  //     );
  //   }
    return null;
  };

  const handleNextButtonClick = () => {
  //   if (this.state.nextQuestion !== undefined) {
  //     this.setState(
  //       (prevState) => ({
  //         currentQuestionIndex: prevState.currentQuestionIndex + 1,
  //         options: [],
  //       }),
  //       () => {
  //         this.displayQuestions(
  //           this.state.allQuestions,
  //           this.state.currentQuestion,
  //           this.state.previousQuestion,
  //           this.state.nextQuestion
  //         );
  //       }
  //     );
  //   }
    return null;
  };

  const handleQuitButtonClick = () => {
  //   if (window.confirm("Are you sure?")) {
  //     window.location.href = "/";
  //   }
    return null;
  };

  const handleButtonClick = (e) => {
  //   switch (e.target.id) {
  //     case "previous-button":
  //       this.handlePreviousButtonClick();
  //       break;

  //     case "next-button":
  //       this.handleNextButtonClick();
  //       break;

  //     case "quit-button":
  //       this.handleQuitButtonClick();
  //       break;

  //     default:
  //       break;
  //   }
    return null;
  };

  const handleButtonDisable = () => {
  //   if (
  //     this.state.previousQuestion === undefined ||
  //     this.state.currentQuestionIndex === 0
  //   ) {
  //     this.setState({
  //       previousButtonDisabled: true,
  //     });
  //   } else {
  //     this.setState({
  //       previousButtonDisabled: false,
  //     });
  //   }

  //   if (
  //     this.state.nextQuestion === undefined ||
  //     this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
  //   ) {
  //     this.setState({
  //       nextButtonDisabled: true,
  //     });
  //   } else {
  //     this.setState({
  //       nextButtonDisabled: false,
  //     });
  //   }
    return null;
  };

  const startAgain = () => {
  //   this.setState({
  //     allQuestions: [],
  //     numberOfQuestions: 0,
  //     numberOfAnsweredQuestions: 0,
  //     currentQuestion: [],
  //     previousQuestion: [],
  //     nextQuestion: [],
  //     options: [],
  //     correctAnswer: "",
  //     currentQuestionIndex: 0,
  //     correctAnswers: 0,
  //     wrongAnswers: 0,
  //     score: 0,
  //     quizEnded: false,
  //     previousButtonDisabled: false,
  //     nextButtonDisabled: false,
  //     urlError: false,
  //   });
  //   this.fetchData();
  };

  // const button = (
  //   <ul>
  //     <li>
  //       <a href={error ? `/error` : `/play`}>Play</a>
  //     </li>
  //   </ul>
  // );

  return (
    <>
     {/* <div id="home" className="home-section">
          <div className="how-to">
            <h2>Quiz Game</h2>
            <div className="instructions">
              <p>Each game has 10 General Knowledge questions</p>
              <p>Each question has 4 options</p>
              <img
                src={game}
                className="game-screenshot"
                alt="example screenshot"
              ></img>
              <p>Take your time! There is no time pressure :)</p>
              <p>Press "Play" and Enjoy!</p>
            </div>
            <div className="play-button-container">
              {button}
            </div>
          </div>
      </div> */}
      {/* <HomeContainer isUrlError={urlError}
       hello="hello"
       allQuestions={allQuestions}
       currentQuestion={currentQuestion}
       previousQuestion={previousQuestion}
       nextQuestion={nextQuestion}
       options={options}
       correctAnswer={correctAnswer}
       currentQuestionIndex={currentQuestionIndex}
       numberOfAnsweredQuestions={numberOfAnsweredQuestions}
       numberOfQuestions={numberOfQuestions}
       handleClick={handleOptionClick}
       handleButtonClick={handleButtonClick}
       previousButtonDisabled={previousButtonDisabled}
       nextButtonDisabled={nextButtonDisabled}
       quizEnded={quizEnded}
       score={score}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
      ></HomeContainer>
      */}
      
      {/* {urlError && (
        <UrlErrorContainer />
      )} */}
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
    </>
 );
};

export default App;