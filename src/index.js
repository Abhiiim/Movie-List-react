import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/styles.css';
import App from './components/App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import LikedMovies from './components/LikedMovies';
import MyComponent from './components/MyComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/liked-movies",
    element: <LikedMovies />,
  },
  {
    path: "/practice",
    element: <MyComponent />,
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

