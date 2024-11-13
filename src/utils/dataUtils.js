export const fetchData = async() => {
    const url =
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

    try {
    //   const response = await fetch(url, {
    //     method: "get",
    //   });
         const response = await fetch(url);
         if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    //   const allQuestions = data.results;
    //   const numberOfQuestions = data.results.length;

    //   if (numberOfQuestions > 0 && this.state.numberOfAnsweredQuestions === 0) {
    //     this.setState({
    //       allQuestions,
    //       numberOfQuestions,
    //       urlError: false,
    //     });

    //     this.displayQuestions();
    //   } else if (
    //     numberOfQuestions > 0 &&
    //     this.state.numberOfAnsweredQuestions > 0
    //   ) {
    //     this.startAgain();
    //   } else {
    //     this.setState({
    //       urlError: true,
    //     });
    //   }
    } catch (error) {
        console.error('Error during fetch:', error);
        return null;
    }
  }