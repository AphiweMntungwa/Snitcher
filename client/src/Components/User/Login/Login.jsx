import React, { useRef, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import Register from "../Register/Register";
import Profile from "../Register/Profile";
import "../../../styles/Auth/Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { showNext } from "../../../app/Redux/Auth/showActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const show = useSelector((state) => state.auth.showAuth);
  const [showB, setShow] = useState(false);
  const [alerter, setAlert] = useState("wrong password or username");
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  function locSt(get, set) {
    if (set) {
      localStorage.setItem(get, set);
    }
    return localStorage.getItem(get);
  }
  function handleLogIn(e) {
    function inp(n) {
      return n.current.value;
    }
    let data = new Object();
    if (inp(email) == false || inp(password).length == false) {
      setAlert("Empty Fields!!");
      setShow(true);
      return "error";
    }
    data = { email: inp(email), password: inp(password) };

    axios({
      url: "http://localhost:8080/login",
      method: "POST",
      data,
    })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((e) => {
        setShow(true);
        e.message === "Request failed with status code 400"
          ? setAlert("Wrong Username or Password")
          : setAlert(e.message);
      });
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
        <>
          <Alert show={showB} variant="success" className="header-div">
            <p>{alerter}</p>
            <Button onClick={() => setShow(false)} variant="outline-success">
              close
            </Button>
          </Alert>
          <form>
            <h1 className="login-header">Sign In</h1>
            <div>
              <label htmlFor="email">Enter email:</label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="email@email"
                id="email"
                ref={email}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Enter password:</label>
              <input
                type="password"
                className="form-control"
                ref={password}
                name="password"
                placeholder="password"
                id="password"
                required
              />
            </div>
            <Button variant="outline-success" onClick={handleLogIn}>
              Log In
            </Button>
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
        </>
      )}
    </div>
  );
};

export default Login;
