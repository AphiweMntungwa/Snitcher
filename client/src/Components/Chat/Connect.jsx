import React, { useContext, useEffect, useState } from "react";
import { receiver } from "./Chat";
import axios from "axios";
import { useSelector } from "react-redux";

function Connect({ users, otherUser, showMessages }) {
  const [texts, writeText] = useState([]);
  const [refresh, fetchRefresh] = useState(false);
  const [other, setOther] = useState(false);
  const [message, setMessage] = useState(false);

  // const session = useContext(SessionContext);
  const session = useSelector((state) => state.session.userSession);
  useEffect(() => {
    axios
      .get(`https://snitcherapp.herokuapp.com/messages/${session.user._id}/${receiver}`)
      .then((res) => {
        const arr = [];
        res.data.messages.forEach((el) => {
          if (
            el.members.includes(session.user._id) &&
            el.members.includes(receiver)
          ) {
            arr.push(el);
          }
        });

        writeText(arr.reverse());
      })
      .catch((err) => console.log(err));
  }, [session, refresh]);

  const chatter = (e) => {
    e.preventDefault();
    const message = document.querySelector(".message").value;

    axios
      .post(`https://snitcherapp.herokuapp.com/messages/${session.user._id}/${receiver}`, {
        text: message,
      })
      .then(() => {
        fetchRefresh(!refresh);
        document.querySelector(".message").value = "";
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const you = session.user._id;
    const lists = document.querySelectorAll(`li[class="${you}"]`);
    const tok = [...lists];
    tok.forEach((el) => el.classList.add("mine"));
    const temp = users.filter((e) => e._id === otherUser);
    setOther(temp);
  }, [texts, users]);

  return (
    <div className="chatSpace">
      <div className="members">
        <img
          src={session.user.photo.url.replace("/upload", "/upload/w_100/h_100")}
          alt=""
        />
        You,
        {other.length && (
          <>
            <img
              src={other[0].photo.url.replace("/upload", "/upload/w_100/h_100")}
              alt=""
            />
            {other[0].username}
          </>
        )}
      </div>
      <ul className="messages">
        {texts.map((el, i) => (
          <li key={el._id} className={el.message.sender}>
            <div>{el.message.text}</div>
            <h6>{el.created.substring(11, 16)}</h6>
          </li>
        ))}
      </ul>
      <form className="message-form">
        <div>
          <input
            placeholder="write new message"
            type="text"
            className="message"
            onChange={(e) =>
              e.target.value ? setMessage(true) : setMessage(false)
            }
          />
        </div>
        <div className="message-pointer">
          <box-icon
            type="solid"
            animation="tada-hover"
            name="left-arrow-circle"
            onClick={() => showMessages(false)}
          ></box-icon>
          {message && (
            <box-icon name="send" animation="tada" onClick={chatter}></box-icon>
          )}
        </div>
      </form>
    </div>
  );
}

export default Connect;
