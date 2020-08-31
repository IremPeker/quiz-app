import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
} from 'react-router-dom';
import HomeContainer from './HomeContainer';
import PlayContainer from './PlayContainer';
import UrlErrorContainer from "./UrlErrorContainer";
import '../styles/App.scss';
import M from 'materialize-css';

class App extends React.Component  {

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
      previousButtonDisabled: false,
      nextButtonDisabled: false,
      urlError: false
    };

    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    let url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple';
    
    //let url='';
    try {
      const response = await fetch(url, {
        method: "get"
      });
      const data = await response.json();
      const allQuestions = data.results;
      const numberOfQuestions = data.results.length;

      console.log("all =>", allQuestions);
      
    
      if (numberOfQuestions > 0) {
        
        this.setState({
          allQuestions, 
          numberOfQuestions,
          urlError: false
        });

        this.displayQuestions();
        
      } else {
        this.setState({
          urlError: true
        });
      }
    } catch (error) {
      this.setState({
        urlError: true
      });
    }
  }

  displayQuestions = () => {

    console.log("########### DISPLAY QUESTIONS #############");
    const currentQuestion = this.state.allQuestions[this.state.currentQuestionIndex];
    const nextQuestion = this.state.allQuestions[this.state.currentQuestionIndex + 1];
    const previousQuestion = this.state.allQuestions[this.state.currentQuestionIndex -1];

        console.log("current question", currentQuestion, "next question", nextQuestion, "previous question", previousQuestion)
        
        console.log("CURRENT QUESTION INDEX IS IN THE BEGINNING", this.state.currentQuestionIndex);

    Object.entries(currentQuestion).map(el => {
      
      if(el[0]==="incorrect_answers") {
        this.state.options.push(el[1]); 
      }
      if (el[0]==="correct_answer") {
        this.state.correctAnswer = el[1]; 
      }
    });

    const concatOptions = this.state.options.concat(this.state.correctAnswer); 
    const allOptions = [].concat.apply([], concatOptions);
    this.shuffleOptionsArray(allOptions);
    
    this.setState({
      currentQuestion,
      nextQuestion,
      previousQuestion,
      options:allOptions
    }, ()=> {
      this.handleButtonDisable();
    });
  }

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
    if(e.target.innerHTML === this.state.correctAnswer) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };

  correctAnswer = () => {
    M.toast({
      html: 'Correct Answer!',
      classes: 'toast-valid',
      displayLength:1300
    });

    console.log("correct answers before", this.state.correctAnswers);

    this.setState(prevState => ({
      score: prevState.score + 1 ,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      options: []
    }), ()=> {
      this.displayQuestions(this.state.allQuestions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion); // the callback to executed after prevState in the setState method
    });  

    console.log("correct answers after", this.state.correctAnswers);
  };

  wrongAnswer = () => {
    M.toast({
      html: 'Wrong Answer!',
      classes: 'toast-invalid',
      displayLength:1300
    });

    console.log("wrong answers before", this.state.wrongAnswers);
    

    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1 ,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      options: []
    }), ()=> {
      this.displayQuestions(this.state.allQuestions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion);
    });  
    
    console.log("wrong answers after", this.state.wrongAnswers);
  };

  handlePreviousButtonClick = () => {

    if(this.state.previousQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1,
        options: []
      }), ()=> {
        this.displayQuestions(this.state.allQuestions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion);
      });    

      console.log("CURRENT QUESTION INDEX AFTER PREVIOUS", this.state.currentQuestionIndex);
    }
  };

  handleNextButtonClick = () => {

    if(this.state.nextQuestion !== undefined) {
      
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        options: []
      }), ()=> {
        this.displayQuestions(this.state.allQuestions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion);
      });    

      console.log("CURRENT QUESTION INDEX AFTER NEXT", this.state.currentQuestionIndex);
        
    }

  };

  handleQuitButtonClick = () => {
    if(window.confirm("Are you sure?")){
      window.location.href="/";
    }
  };

  handleButtonClick = (e) => {
    switch(e.target.id) {
      case 'previous-button':
        this.handlePreviousButtonClick();
        break;

      case 'next-button':
        this.handleNextButtonClick();
        break;

      case 'quit-button':
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  }

  handleButtonDisable = () => {
    if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
      this.setState({
        previousButtonDisabled: true
      })
    } else {
      this.setState({
        previousButtonDisabled: false
      })
    }

    if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
      this.setState({
        nextButtonDisabled: true
      })
    } else {
      this.setState({
        nextButtonDisabled: false
      })
    }
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/"> <HomeContainer
          isUrlError={this.state.urlError}  
          ></HomeContainer></Route>
          <Route path="/play"><PlayContainer 
          allQuestions={this.state.allQuestions}
          currentQuestion={this.state.currentQuestion}
          previousQuestion={this.state.previousQuestion}
          nextQuestion={this.state.nextQuestion}
          options={this.state.options}
          correctAnswer={this.state.correctAnswer}
          currentQuestionIndex={this.state.currentQuestionIndex}
          numberOfAnsweredQuestions={this.state.numberOfAnsweredQuestions}
          handleClick={this.handleOptionClick}
          handleButtonClick={this.handleButtonClick}
          previousButtonDisabled={this.state.previousButtonDisabled}
          nextButtonDisabled={this.state.nextButtonDisabled}
          ></PlayContainer></Route>
          { this.state.urlError && 
          <Route exact path="/error"> <UrlErrorContainer /> </Route>
        }
        </Switch>
      </Router>
    );
  }
}

export default App;


