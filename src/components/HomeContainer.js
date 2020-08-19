import React from 'react';
import { Link } from 'react-router-dom';
import game from '../assets/game.png';

const HomeContainer = () => {
    return (
      <div id="home">
        <section className="home-section">
            <div className="how-to">
                <h1>Quiz Game</h1>
                <div className="instructions">
                    <p>Each game has 10 questions</p>
                    <p>Each question has 4 options</p>
                    <img src={game} className="game-screenshot" alt="example screenshot"></img>
                    <p>Take your time! There is no time pressure :)</p>
                    <p>Press "Play" and Enjoy!</p>
                </div>
                <div className="play-button-container">
                    <ul>
                        <li><Link className="play-button" to="/play">Play</Link></li>
                    </ul>
                </div>
            </div>
        </section>
      </div>
    );
  };
  
  export default HomeContainer;