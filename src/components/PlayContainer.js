import React from "react";

class PlayContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div id="play">
          <section className="play-section">
            <div className="questions">
                <h4>First question will come right here dynamically</h4>
                <div className="options">
                    <div className="options-left">
                      <p className="option">something</p>
                      <p className="option">something else</p>
                    </div>
                    <div className="options-right">
                      <p className="option">anything</p>
                      <p className="option">nothing</p>
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