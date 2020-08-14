import React from 'react';
import { Link } from 'react-router-dom';
import spontago from '../assets/spontago.png';

const Home = () => {
    return (
      <div id="home">
        <section>
            <div className="how-to">
                <h1>Quiz Game</h1>
                <div className="instructions">
                    <p>Duration of the game is 15 minutes</p>
                    <p>Each game has 15 questions</p>
                    <p>Each question has 3 options
                        <img src={spontago} class="example-screenshot" alt="example screenshot"></img>
                    </p>
                </div>
                <div className="play-button-container">
                    <button className="play-button"><Link to="play">Play</Link></button>
                </div>
            </div>
        </section>
      </div>
    );
  };
  
  export default Home;