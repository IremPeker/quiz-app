import React from "react";

class PlayContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    //const data = this.props.allQuestions;
    const current = this.props.currentQuestion;
    const options = this.props.options;

    console.log("options inside play.js", options, "current", current.question);
    
      return (
        <div id="play">
          <section className="play-section">
            <div className="questions">
                <h4>{current.question}</h4>
                <div className="options">
                  <div className="options-left">
                  <p className="option">{options[0]}</p>
                  <p className="option">{options[1]}</p>
                  </div>
                  <div className="options-right">
                  <p className="option">{options[2]}</p>
                  <p className="option">{options[3]}</p>
                  </div>
                </div>
                <div className="button-container">
                  <button>Previous</button>
                  <button>Next</button>
                  <button>Quit</button>
                </div>
            </div>
          </section>
          </div>
      );
    }


    
}

export default PlayContainer;