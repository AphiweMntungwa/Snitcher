import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="registry col-8">
      <h1
        className="login-header"
        style={{ textAlign: "center", paddingBottom: "8px" }}
      >
        Sign Up
      </h1>
      <form
        action='http://localhost:8080/Register'
        className="reg-form"
        method="post"
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="username"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="email@email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};
export default Register;
