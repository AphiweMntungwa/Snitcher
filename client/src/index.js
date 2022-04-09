import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Posts from "./Components/Posts/Posts";
import Details from "./Components/Details/Details";
import Newpost from "./Components/Newpost/Newpost";
import Floater from "./Components/Floater/Floater";
import Register from "./Components/User/Register/Register";
import Login from "./Components/User/Login/Login";
import Comments from "./Components/Posts/Comments/Comments";
import Chat from "./Components/Chat/Chat";
import Connect from "./Components/Chat/Connect"

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Routes>
      <Route
        path="/"
        element={
          <App>
            <Posts />
          </App>
        }
      />{" "}
      <Route
        path="/new"
        element={
          <App>
            <Floater linkTo="/">
              <Newpost />
            </Floater>{" "}
          </App>
        }
      />{" "}
      <Route
        path="/register"
        element={
          <App>
            <Floater linkTo="/">
              <Register />
            </Floater>{" "}
          </App>
        }
      />{" "}
      <Route
        path="/login"
        element={
          <App>
            <Floater linkTo="/">
              <Login />
            </Floater>{" "}
          </App>
        }
      />{" "}
      <Route
        path="/comments"
        element={
          <App>
            <Floater linkTo="/" classId="comment-class">
              <Comments />
            </Floater>{" "}
          </App>
        }
      />{" "}
      <Route
        path="/chat"
        element={
          <App>
            <Chat />
          </App>
        }
      />{" "}
      <Route
        path="/chatbox"
        element={
          <App>
            <Connect />
          </App>
        }
      />
    </Routes>
  </Router>,
  document.getElementById("root")
);
