import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./HomeContainer";
import PlayContainer from "./PlayContainer";
import ScoreContainer from "./ScoreContainer";
import UrlErrorContainer from "./UrlErrorContainer";
import "../styles/App.scss";
import M from "materialize-css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuestions: [],
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestion: [],
      previousQuestion: [],
      nextQuestion: [],
      options: [],
      correctAnswer: "",
      currentQuestionIndex: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      score: 0,
      quizEnded: false,
      previousButtonDisabled: false,
      nextButtonDisabled: false,
      urlError: false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    let url =
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

    //let url='';
    try {
      const response = await fetch(url, {
        method: "get",
      });
      const data = await response.json();
      const allQuestions = data.results;
      const numberOfQuestions = data.results.length;

      console.log(
        "in the beginning.....all =>",
        allQuestions,
        "state is",
        this.state
      );

      if (numberOfQuestions > 0 && this.state.numberOfAnsweredQuestions === 0) {
        this.setState({
          allQuestions,
          numberOfQuestions,
          urlError: false,
        });

        this.displayQuestions();
      } else if (
        numberOfQuestions > 0 &&
        this.state.numberOfAnsweredQuestions > 0
      ) {
        this.startAgain();
      } else {
        this.setState({
          urlError: true,
        });
      }
    } catch (error) {
      this.setState({
        urlError: true,
      });
    }
  }

  displayQuestions = () => {
    const currentQuestion = this.state.allQuestions[
      this.state.currentQuestionIndex
    ];
    const nextQuestion = this.state.allQuestions[
      this.state.currentQuestionIndex + 1
    ];
    const previousQuestion = this.state.allQuestions[
      this.state.currentQuestionIndex - 1
    ];

    Object.entries(currentQuestion).map((el) => {
      if (el[0] === "incorrect_answers") {
        this.state.options.push(el[1]);
      }
      if (el[0] === "correct_answer") {
        this.state.correctAnswer = el[1];
      }
    });

    const concatOptions = this.state.options.concat(this.state.correctAnswer);
    const allOptions = [].concat.apply([], concatOptions);
    this.shuffleOptionsArray(allOptions);

    this.setState(
      {
        currentQuestion,
        nextQuestion,
        previousQuestion,
        options: allOptions,
      },
      () => {
        this.handleButtonDisable();
      }
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  shuffleOptionsArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML === this.state.correctAnswer) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };

  correctAnswer = () => {
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1300,
    });

    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        options: [],
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.setState({
            quizEnded: true,
          });
        } else {
          this.displayQuestions(
            this.state.allQuestions,
            this.state.currentQuestion,
            this.state.previousQuestion,
            this.state.nextQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1300,
    });

    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        options: [],
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.setState({
            quizEnded: true,
          });
        } else {
          this.displayQuestions(
            this.state.allQuestions,
            this.state.currentQuestion,
            this.state.previousQuestion,
            this.state.nextQuestion
          );
        }
      }
    );
  };

  handlePreviousButtonClick = () => {
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
          options: [],
        }),
        () => {
          this.displayQuestions(
            this.state.allQuestions,
            this.state.currentQuestion,
            this.state.previousQuestion,
            this.state.nextQuestion
          );
        }
      );
    }
  };

  handleNextButtonClick = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          options: [],
        }),
        () => {
          this.displayQuestions(
            this.state.allQuestions,
            this.state.currentQuestion,
            this.state.previousQuestion,
            this.state.nextQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    if (window.confirm("Are you sure?")) {
      window.location.href = "/";
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "next-button":
        this.handleNextButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  handleButtonDisable = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  startAgain = () => {
    this.setState({
      allQuestions: [],
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestion: [],
      previousQuestion: [],
      nextQuestion: [],
      options: [],
      correctAnswer: "",
      currentQuestionIndex: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      score: 0,
      quizEnded: false,
      previousButtonDisabled: false,
      nextButtonDisabled: false,
      urlError: false,
    });
    this.fetchData();
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {" "}
            <HomeContainer isUrlError={this.state.urlError}></HomeContainer>
          </Route>
          <Route path="/play">
            <PlayContainer
              allQuestions={this.state.allQuestions}
              currentQuestion={this.state.currentQuestion}
              previousQuestion={this.state.previousQuestion}
              nextQuestion={this.state.nextQuestion}
              options={this.state.options}
              correctAnswer={this.state.correctAnswer}
              currentQuestionIndex={this.state.currentQuestionIndex}
              numberOfAnsweredQuestions={this.state.numberOfAnsweredQuestions}
              numberOfQuestions={this.state.numberOfQuestions}
              handleClick={this.handleOptionClick}
              handleButtonClick={this.handleButtonClick}
              previousButtonDisabled={this.state.previousButtonDisabled}
              nextButtonDisabled={this.state.nextButtonDisabled}
              quizEnded={this.state.quizEnded}
            ></PlayContainer>
          </Route>
          <Route path="/score">
            <ScoreContainer
              fetchData={this.fetchData}
              score={this.state.score}
              correctAnswers={this.state.correctAnswers}
              wrongAnswers={this.state.wrongAnswers}
            ></ScoreContainer>
          </Route>

          {this.state.urlError && (
            <Route exact path="/error">
              {" "}
              <UrlErrorContainer />{" "}
            </Route>
          )}
        </Switch>
      </Router>
    );
  }
}

export default App;
