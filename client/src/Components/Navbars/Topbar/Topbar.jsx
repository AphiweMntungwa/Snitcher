import React, { useContext, useState } from "react";
import { SessionContext } from "../../../App";
// import Box from "../../Box/Box";
// import "./topbar.css";
import "../../../styles/Navbar/Navbar.css";
import { toggleBurger } from "../../../app/Redux/topbar/topbarActions";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Topbar = ({ func }) => {
  const session = useContext(SessionContext);
  const toggler = useSelector((state) => state.topbar.toggler);
  const dispatch = useDispatch();

  const logOut = () => {
    axios.get("http://localhost:8080/login").then(() => {
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
  const toggleIcon = toggler ? "nav-on" : "";

  return (
    <nav className="topbar">
      <div className="header">
        &#x1D54A;&#x1D55F;&#x1D55A;&#x1D565;&#x1D554;&#x1D559;&#x1D556;&#x1D563;
      </div>

      {/* {session.loggedIn && (
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
      )} */}

      <div
        className={`nav-toggle ${toggleIcon}`}
        onClick={() => {
          dispatch(toggleBurger(!toggler));
        }}
      >
        <div>
          <span style={{ opacity: 0 }}>y</span>
        </div>
      </div>

      {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
      </div> */}
    </nav>
  );
};
export default Topbar;
