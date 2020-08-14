import React from "react";

class PlayContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div className="questions">
            <h5>First question will come right here dynamically</h5>
            <div className="options">
              <p className="option">something</p>
              <p className="option">something else</p>
              <p className="option">anything</p>
              <p className="option">nothing</p>
            </div>
            <div className="button-container">
              <button>Previous</button>
              <button>Next</button>
              <button>Quit</button>
            </div>
        </div>
        
      );
    }
    
}

export default PlayContainer;