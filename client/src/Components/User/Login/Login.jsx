import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Register from "../Register/Register";
import Profile from "../Register/Profile";
// import './login.css'
import "../../../styles/Auth/Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { showNext } from "../../../app/Redux/Auth/showActions";

const Login = () => {
  const show = useSelector((state) => state.auth.showAuth);
  const dispatch = useDispatch();
  
  function locSt(get, set) {
    if (set) {
      localStorage.setItem(get, set);
    }
    return localStorage.getItem(get);
  }

  return (
    <div className="auth">
      {show ? (
        show === "final" ? (
          <Profile locSt={locSt} />
        ) : (
          <Register locSt={locSt} />
        )
      ) : (
        <form action="http://localhost:8080/login" method="post">
          <h1 className="login-header">Sign In</h1>
          <div>
            <label htmlFor="email">Enter email:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="email@email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Enter password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="password"
              id="password"
              required
            />
          </div>
          <Button variant="outline-success">Log In</Button>
          <Button
            variant="outline-primary"
            onClick={() => dispatch(showNext(true))}
          >
            Sign Up
          </Button>
          <footer>
            <a href="">forgot password?</a>
          </footer>
        </form>
      )}
    </div>
  );
};

export default Login;
