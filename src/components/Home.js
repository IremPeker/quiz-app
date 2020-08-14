import React from 'react';
import { Link } from 'react-router-dom';
import spontago from '../assets/spontago.png';

const Home = () => {
    return (
      <div id="home">
        <section>
            <div className="how-to">
                <h1>Quiz Game</h1>
                <ul>Here are the instructions
                    <li>Duration of the game is 15 minutes</li>
                    <li>Each game has 15 questions</li>
                    <li>Each question has 3 options
                        <img src={spontago} class="example-screenshot" alt="example screenshot"></img>
                    </li>
                </ul>
                <div className="play-button-container">
                    <button className="play-button"><Link to="play">Play</Link></button>
                </div>
            </div>
        </section>
      </div>
    );
  };
  
  export default Home;