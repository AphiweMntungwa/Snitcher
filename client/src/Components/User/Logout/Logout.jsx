import React, { useState } from "react";
import "../../../styles/Auth/Auth.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const [res, setRes] = useState(false);
  const session = useSelector((state) => state.session.userSession);
  const navigate = useNavigate();

  const logOut = () => {
    axios
      .get("https://snitcherapp.herokuapp.com/logout")
      .then(() => {
        setRes(true);
      })
      .catch((e) => {
        setRes(false);
      });
  };

  return (
    <div className="logout">
      {session.loggedIn ? (
        <div>
          {res === true ? (
            <>
              <h6>You Were Logged Out Successfully.</h6>
              <Button variant="outline-primary" onClick={() => navigate("/")}>
                Home
              </Button>
            </>
          ) : (
            <>
              <h6>Log Out {session.user.username} </h6>
              <Button variant="outline-danger" onClick={logOut}>
                Confirm
              </Button>
            </>
          )}
        </div>
      ) : (
        <>
          <p>
            "You Cannot Log Out If you are not Logged In" - Albert Einstein.
          </p>
          <div>
            <Button variant="outline-primary" onClick={() => navigate("/")}>
              Home
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Logout;
