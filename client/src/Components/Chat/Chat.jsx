import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./chat.css";
import { SessionContext } from "../../App";

let arr = "";
export let receiver = arr;

function Chat() {
  const [users, callUsers] = useState([]);
  const session = useContext(SessionContext);
  useEffect(() => {
    axios.get("http://localhost:8080/users").then((res) => {
      const otherUsers = res.data.filter((el) => el._id != session.user[0]._id);
      callUsers(otherUsers);
    });
  }, []);

  const setId = (e) => {
    arr = e.target.id;
    if (typeof Storage !== "undefined") {
      localStorage.setItem("array", arr);
    } else {
      console.log(`Sorry! No Web Storage support`);
    }
    receiver = arr;
    return e.target.key;
  };

  return (
    <div className="chatbox">
      <span
        style={{
          display: "flex",
          width: "500px",
          justifyContent: "space-evenly",
        }}
      >
        <h3>Chatbox </h3>
        <span className="userSpan" style={{ color: "orange" }}>
          {session.user[0].username}
          {session.user[0].photo && <img
            src={session.user[0].photo.url.replace(
              "/upload",
              "/upload/w_100/h_100"
            )}
            alt=""
          />}
        </span>
      </span>

      <ul className="user-list">
        {users.length &&
          users.map((el) => (
            <Link to="/chatbox" key={el._id} id={el._id}>
              <li id={el._id} onClick={setId}>
                {el.photo && (
                  <img
                    src={el.photo.url.replace("/upload", "/upload/w_100/h_100")}
                    alt=""
                  />
                )}
                {el.username}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}

export default Chat;
