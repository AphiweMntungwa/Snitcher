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
import Profile from "./Components/User/Profile/Profile";
import Logout from "./Components/User/Logout/Logout";

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
            </App>{" "}
          </Provider>
        }
      />{" "}
      <Route
        path="/new"
        element={
          <Provider store={store}>
            <App>
              <Newpost />
            </App>{" "}
          </Provider>
        }
      />{" "}
      <Route
        path="/auth"
        element={
          <Provider store={store}>
            <App>
              <Login />
            </App>{" "}
          </Provider>
        }
      />
      <Route
        path="/logout"
        element={
          <Provider store={store}>
            <App>
              <Logout />
            </App>
          </Provider>
        }
      />
      <Route
        path="/chat"
        element={
          <Provider store={store}>
            <App>
              <Chat />
            </App>
          </Provider>
        }
      />{" "}
      <Route
        path="/profile"
        element={
          <Provider store={store}>
            <App>
              <Profile />
            </App>
          </Provider>
        }
      />{" "}
    </Routes>{" "}
  </Router>,
  document.getElementById("root")
);
