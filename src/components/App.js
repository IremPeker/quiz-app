import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom';
import HomeContainer from './HomeContainer';
import PlayContainer from './PlayContainer';
import '../styles/App.scss';

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
      correctAnswer: [],
      currentQuestionIndex: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      score: 0,
      urlError: false
    };

    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    let url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple';
    
    try {
      const response = await fetch(url, {
        method: "get"
      });
      const data = await response.json();
      const allQuestions = data.results;
      //console.log(allQuestions);
      
      const numberOfQuestions = data.results.length;
    
      if (numberOfQuestions > 0) {
        
        const currentQuestion = allQuestions[this.state.currentQuestionIndex];
        const nextQuestion = allQuestions[this.state.currentQuestionIndex + 1];
        const previousQuestion = allQuestions[this.state.currentQuestionIndex -1];
        const optionsArray = [];
        const correctAnswerArray = [];

        Object.entries(currentQuestion).map(el => {
      
          if(el[0]==="incorrect_answers") {
            //console.log("el is", el[1]);
           optionsArray.push(el[1]); // el[1][0] gives the first el in array
          } else if (el[0]==="correct_answer") {
            //console.log("el is", el[1]);
           correctAnswerArray.push(el[1]); // el[1][0] gives the first el in array
          }
        });

        const concatOptions = optionsArray.concat(correctAnswerArray); 
        const allOptions = [].concat.apply([], concatOptions);

        //console.log("current option state in app.js",this.state.options, "correct answer", this.state.correctAnswer, "all options", allOptions);
        this.setState({
          allQuestions, 
          numberOfQuestions,
          currentQuestion,
          nextQuestion,
          previousQuestion,
          options:allOptions,
          urlError: false

        });
        
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

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/"> <HomeContainer /> </Route>
          <Route path="/play"> <PlayContainer 
          allQuestions={this.state.allQuestions}
          currentQuestion={this.state.currentQuestion}
          previousQuestion={this.state.previousQuestion}
          nextQuestion={this.state.nextQuestion}
          options={this.state.options}
          correctAnswer={this.state.correctAnswer}
          ></PlayContainer></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;