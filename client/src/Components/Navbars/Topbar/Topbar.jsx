import React, { useContext, useState } from "react";
import { SessionContext } from "../../../App";
import Box from "../../Box/Box";
import "./topbar.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Topbar = ({ func }) => {
  const session = useContext(SessionContext);
  const logOut = () => {
    axios.get('https://snitcher-server.herokuapp.com/login').then(() => {
      func({ loggedIn: false });
    });
  };
  let isDisabled = session.loggedIn
    ? { pointerEvents: "none", opacity: ".25" }
    : {};
  let logOutButton = session.loggedIn
    ? {}
    : {
        pointerEvents: "none",
        opacity: ".25",
      };

  const thumbnail = () => {
    return session.user[0].photo.url.replace("/upload", "/upload/w_100/h_100");
  };

  return (
    <Box boxClass="snitcher-header">
      <nav className="navbar navbar-expand-lg navbar-black bg-black">
        <a className="navbar-brand" href="#">
          &#x1D54A;&#x1D55F;&#x1D55A;&#x1D565;&#x1D554;&#x1D559;&#x1D556;&#x1D563;
        </a>
        {session.loggedIn && (
          <div className="profile-bar">
            {session.user[0].photo ? (
              <img src={thumbnail()} alt="" className="pro-img" />
            ) : (
              <i className="fas fa-user"></i>
            )}
            <span className="username">
              {session.user[0] && session.user[0].username}
            </span>
          </div>
        )}

        <button
          className="navbar-toggler navbar-dark"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <ul className="navbar-nav mr-auto">
            <li className="nav-item" style={isDisabled}>
              <Link className="nav-link" to="/register" style={isDisabled}>
                Sign Up
              </Link>
            </li>
            <li className="nav-item" style={isDisabled}>
              <Link className="nav-link" to="/login" style={isDisabled}>
                Log In
              </Link>
            </li>
            <li className="nav-item" style={logOutButton}>
              <a className="nav-link" style={logOutButton} onClick={logOut}>
                Log out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Box>
  );
};
export default Topbar;
