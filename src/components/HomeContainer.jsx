import React, { useState } from "react";
import PlayContainer from "./PlayContainer";
import ScoreContainer from "./ScoreContainer";
import { Outlet } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
import game from "../assets/game.png";

const HomeContainer = (props) => {

  const { allQuestions } = useOutletContext();

  const button = (
    <ul>
      <li>
        <a href={props.isUrlError ? `/error` : `/play`}>Play</a>
      </li>
    </ul>
  );

    
    return (
      <div id="home">
        <section className="home-section">
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
        </section>
        {/* <Outlet context={{ props }} /> */}
        {/* {playOnClick && ( */}
        {/* <>
        <PlayContainer
        // hello="hello"
        // allQuestions={allQuestions}
        // currentQuestion={currentQuestion}
        // previousQuestion={previousQuestion}
        // nextQuestion={nextQuestion}
        // options={options}
        // correctAnswer={correctAnswer}
        // currentQuestionIndex={currentQuestionIndex}
        // numberOfAnsweredQuestions={numberOfAnsweredQuestions}
        // numberOfQuestions={numberOfQuestions}
        // handleClick={handleOptionClick}
        // handleButtonClick={handleButtonClick}
        // previousButtonDisabled={previousButtonDisabled}
        // nextButtonDisabled={nextButtonDisabled}
        // quizEnded={quizEnded}
        {...props}
      ></PlayContainer>
      <ScoreContainer
        // fetchData={fetchData}
        // score={score}
        // correctAnswers={correctAnswers}
        // wrongAnswers={wrongAnswers}
        {...props}
      ></ScoreContainer>
      </> */}
      {/* )} */}
      </div>
    );
  }


export default HomeContainer;
