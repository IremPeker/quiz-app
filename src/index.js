import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './components/App';
import HomeContainer from './components/HomeContainer';
import PlayContainer from './components/PlayContainer';
import EndGame from './components/EndGame';
import ErrorContainer from './components/ErrorContainer';
import * as serviceWorker from './serviceWorker';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorContainer />,
    children: [
      {
        index: true,
        element: <HomeContainer />,
      },
      {
        path: "play",
        element: <PlayContainer />,
      },
      {
        path: "score",
        element: <EndGame />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
