import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
// import "./chat.css";
import "../../styles/Chat/Chat.css";
import { SessionContext } from "../../App";
import Connect from "./Connect";
import { useSelector } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import Loader from "../Utils/Loader";
import Profile from "../User/Profile/Profile";

let arr = "";
export let receiver = arr;

function Chat() {
  const [users, callUsers] = useState([]);
  const [loading, load] = useState(false);
  const [messageShow, showMessages] = useState(false);
  const [show, setShow] = useState(false);
  const [otherUser, setOtherUSer] = useState("");
  const [profile, viewProfile] = useState(false);

  const session = useSelector((state) => state.session.userSession);
  useEffect(() => {
    load(true);
    axios
      .get("https://snitcherapp.herokuapp.com/users")
      .then((res) => {
        load(false);
        const otherUsers = session.user
          ? res.data.filter((el) => el._id != session.user._id)
          : res.data;
        callUsers(otherUsers);
      })
      .catch((e) => load(e.message));
  }, []);

  const setId = (e) => {
    session.user ? showMessages(true) : setShow(true);
    arr = e.target.id;
    setOtherUSer(arr);
    if (typeof Storage !== "undefined") {
      localStorage.setItem("array", arr);
    } else {
      console.log(`Sorry! No Web Storage support`);
    }
    receiver = arr;
    return e.target.key;
  };

  return (
    <>
      {!messageShow ? (
        <div className="chat">
          <h3>
            Users
            <box-icon
              type="solid"
              animation="fade-down"
              name="down-arrow-circle"
            ></box-icon>
          </h3>
          {loading && <Loader />}
          {session.user && (
            <div className="userSpan">
              <img
                src={session.user.photo.url.replace(
                  "/upload",
                  "/upload/w_100/h_100"
                )}
                alt=""
              />
              You
            </div>
          )}

          <Alert
            show={show}
            variant="success"
            style={{ fontSize: ".8em", width: "90%", padding: "4%" }}
          >
            You must be signed in to start a chat.
            <Button
              onClick={() => setShow(false)}
              style={{ fontSize: ".6em", marginTop: "4%", padding: "1% 3%" }}
              variant="outline-success"
            >
              close
            </Button>
          </Alert>

          <ul className="user-list">
            {users.length > 0 &&
              users.map((el) => (
                <li key={el._id}>
                  {el.photo && (
                    <img
                      src={el.photo.url.replace(
                        "/upload",
                        "/upload/w_100/h_100"
                      )}
                      alt=""
                    />
                  )}
                  <span> {el.username}</span>
                  <div className="icons">
                    <box-icon
                      name="show-alt"
                      id={el._id}
                      onClick={(e) => {
                        const temp = users.filter((e) => e._id === el._id);
                        setOtherUSer(temp[0]);
                        showMessages(true);
                        viewProfile(true);
                      }}
                    ></box-icon>
                    <box-icon
                      name="message-rounded"
                      id={el._id}
                      onClick={setId}
                    ></box-icon>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <>
          {profile ? (
            <Profile
              setId={setId}
              otherUser={{ user: otherUser }}
              viewProfile={viewProfile}
              showMessages={showMessages}
              setShow={setShow}
            />
          ) : (
            <Connect
              users={users}
              otherUser={otherUser}
              showMessages={showMessages}
            />
          )}
        </>
      )}
    </>
  );
}

export default Chat;
