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
      questions: [],
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
      const allQuestions = await response.json();
      const seeQuestions = allQuestions.results;

      console.log("questions are", allQuestions);
      

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
          <Route path="/play"> <PlayContainer randomPhotos={this.state.randomPhotos}></PlayContainer></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;