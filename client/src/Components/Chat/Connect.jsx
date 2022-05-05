import React, { useContext, useEffect, useState } from "react";
import "./chat.css";
import { SessionContext } from "../../App";
import { receiver } from "./Chat";
import axios from "axios";

function Connect() {
  const [texts, writeText] = useState([]);
  const [refresh, fetchRefresh] = useState(false);

  const session = useContext(SessionContext);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/messages/${session.user[0]._id}/${receiver}`)
      .then((res) => {
        const arr = [];
        res.data.messages.forEach((el) => {
          if (
            el.members.includes(session.user[0]._id) &&
            el.members.includes(receiver)
          ) {
            arr.push(el);
          }
        });
        writeText(arr);
      })
      .catch((err) => console.log(err));
  }, [session.user, refresh]);

  const chatter = (e) => {
    e.preventDefault();
    const message = document.querySelector(".message").value;

    axios
      .post(
        `http://localhost:8080/messages/${session.user[0]._id}/${receiver}`,
        {
          text: message,
        }
      )
      .then(() => {
        fetchRefresh(!refresh);
        document.querySelector(".message").value = ''
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const you = session.user[0]._id;
    const lists = document.querySelectorAll(`li[class="${you}"]`);
    const tok = [...lists];
    tok.forEach((el) => (el.classList.add('mine')));
  }, [texts]);

  return (
    <div className="chatSpace">
      <ul className="messages">
        {texts.map((el, i) => (
          <li key={el._id} className={el.message.sender}>
            {el.message.text}
          </li>
        ))}
      </ul>
      <form action="" className="message-form">
        <div className="d-flex">
          <input type="text" className="form-control message" />
          <button className="btn btn-success send-button" onClick={chatter}>
            send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Connect;
