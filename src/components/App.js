import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom';
import HomeContainer from './HomeContainer';
import PlayContainer from './PlayContainer';
import '../styles/App.scss';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"> <HomeContainer /> </Route>
        <Route path="/play"> <PlayContainer /> </Route>
      </Switch>
    </Router>
  );
}

