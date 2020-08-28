import React from "react";

class PlayContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const current = this.props.currentQuestion;
    const options = this.props.options;
    
      return (
        <div id="play">
          <section className="play-section">
            <div className="questions">
                <h4>{current.question}</h4>
                <div className="options">
                  <div className="options-left">
                  <p className="option" onClick={this.props.handleClick}>{options[0]}</p>
                  <p className="option" onClick={this.props.handleClick}>{options[1]}</p>
                  </div>
                  <div className="options-right">
                  <p className="option" onClick={this.props.handleClick}>{options[2]}</p>
                  <p className="option" onClick={this.props.handleClick}>{options[3]}</p>
                  </div>
                </div>
                <div className="button-container">
                  <button id="previous-button" onClick={this.props.handleButtonClick}>Previous</button>
                  <button id="next-button" onClick={this.props.handleButtonClick}>Next</button>
                  <button id="quit-button" onClick={this.props.handleButtonClick}>Quit</button>
                </div>
            </div>
          </section>
          </div>
      );
    } 
}

export default PlayContainer;