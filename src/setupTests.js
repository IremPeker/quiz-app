// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
//import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import "@inrupt/jest-jsdom-polyfills";
import "mutationobserver-shim";
import fetchMock from "jest-fetch-mock";

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
  takeRecords() {
    return [];
  }
};

global.React = require("react");

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  console.warn.mockRestore();
});
