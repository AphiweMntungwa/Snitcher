import React from "react";
import './login.css'

const Login = () => {
  return (
      <div className="">
        <h1 className="login-header">Log In</h1>
        <form action="https://snitcher-server.herokuapp.com/login" className="cs-validate" method="post">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="username"
              id="username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="password"
              id="password"
              required
            />
          </div>
          <button className="btn btn-success">Log In</button>
        </form>
      </div>
  );
};

export default Login;
