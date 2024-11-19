import fetchMock from "jest-fetch-mock";
import { fetchWithDelay } from "../utils/dataUtils";
import { mockedData } from "../mocks/mockUtils";

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const errorMock = jest.spyOn(console, "error").mockImplementation(() => {});

afterEach(() => {
  errorMock.mockRestore();
});

describe("App", () => {
  test("1. Data is fetched correctly", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedData));
    const data = await fetchWithDelay(9, "easy");
    expect(data).toEqual(mockedData);
  });
});
