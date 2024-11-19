import { render, screen, waitFor } from "@testing-library/react";
import PlayContainer from "../components/PlayContainer";
import { useOutletContext } from "react-router-dom";
import { mockedData } from "../mocks/mockUtils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
}));

jest.mock("goober", () => ({
  css: jest.fn(),
  setup: jest.fn(),
}));

describe("PlayContainer renders correctly", () => {
  beforeEach(() => {
    useOutletContext.mockReturnValue({
      allQuestions: mockedData.results,
      score: 0,
      setScore: jest.fn(),
      correctAnswers: 0,
      wrongAnswers: 0,
      setCorrectAnswers: jest.fn(),
      setWrongAnswers: jest.fn(),
    });
    render(<PlayContainer />);
  });
  it("should render the scoreContainer and question", () => {
    expect(screen.getByTestId("scoreContainer")).toBeInTheDocument();
    expect(screen.getByTestId("question")).toBeInTheDocument();
  });
  it("should render the options with 4 option button", () => {
    const optionsContainer = screen.getByTestId("options");
    expect(optionsContainer).toBeInTheDocument();
    const optionItems = screen.getAllByTestId("option", {
      container: optionsContainer,
    });
    expect(optionItems).toHaveLength(4);
  });
  it("should render buttons container with next and quit buttons", () => {
    const buttonsContainer = screen.getByTestId("buttons");
    expect(buttonsContainer).toBeInTheDocument();
    const nextButton = screen.getByTestId("next-button");
    const quitButton = screen.getByTestId("quit-button");
    expect(nextButton).toBeInTheDocument();
    expect(quitButton).toBeInTheDocument();
  });
});

describe("Play container renders loader container and goBack message", () => {
  beforeEach(() => {
    useOutletContext.mockReturnValue({
      allQuestions: [],
      score: 0,
      setScore: jest.fn(),
      correctAnswers: 0,
      wrongAnswers: 0,
      setCorrectAnswers: jest.fn(),
      setWrongAnswers: jest.fn(),
    });
    render(<PlayContainer />);
  });
  it("should render loader container", () => {
    expect(screen.getByTestId("loaderContainer")).toBeInTheDocument();
  });
  it("should render goBack message if there is no data after 6 seconds", async () => {
    await waitFor(
      () => {
        expect(screen.getByTestId("goBackMessage")).toBeInTheDocument();
      },
      { timeout: 7000 }
    );
  }, 7000);
});
