import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
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
          <Provider store={store}>
            <App>
              <Posts />
            </App>
          </Provider>
        }
      />{" "}
      <Route
        path="/new"
        element={
          <Provider store={store}> <App>
            <Floater linkTo="/">
              <Newpost />
            </Floater>{" "}
          </App>

          </Provider>
        }
      />{" "}
      <Route
        path="/register"
        element={
          <Provider store={store}> <App>
            <Floater linkTo="/">
              <Register />
            </Floater>{" "}
          </App>

          </Provider>
        }
      />{" "}
      <Route
        path="/login"
        element={
          <Provider store={store}><App>
            <Floater linkTo="/">
              <Login />
            </Floater>{" "}
          </App>
          </Provider>

        }
      />{" "}
      <Route
        path="/comments"
        element={
          <Provider store={store}><App>
            <Floater linkTo="/" classId="comment-class">
              <Comments />
            </Floater>{" "}
          </App>
          </Provider>

        }
      />{" "}
      <Route
        path="/chat"
        element={
          <Provider store={store}><App>
            <Chat />
          </App>
          </Provider>

        }
      />{" "}
      <Route
        path="/chatbox"
        element={
          <Provider store={store}><App>
            <Connect />
          </App>
          </Provider>

        }
      />
    </Routes>
  </Router>,
  document.getElementById("root")
);
