import { Link } from "react-router-dom";
// import styles from "./posts.module.css";
// import "./posts.css";
import '../../styles/Posts/Posts.css'
import { SessionContext } from "../../App";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

function Post(props) {
  const {
    element,
    setId,
    comment,
    deletePost,
    tube,
    tuber,
    count,
    setItem,
    setFrame,
    callVote,
    newvote,
  } = props;

  const session = useContext(SessionContext);
  const [ed, setEd] = useState(false);

  const up = useRef(null);
  const down = useRef(null);

  useEffect(() => {
    if (session.user) {
      if (element.likes.user.includes(session.user[0]._id)) {
        up.current.style.fill = "wheat";
        down.current.style.fill = "unset";
      } else if (element.dislikes.user.includes(session.user[0]._id)) {
        down.current.style.fill = "wheat";
        up.current.style.fill = "unset";
      } else {
        up.current.style.fill = "unset";
        down.current.style.fill = "unset";
      }
    }
  }, []);

  const editor = (id) => {
    let arr = [];
    const body = document.querySelector("textarea").value;
    const checks = document.querySelectorAll("input[type=checkbox]");
    for (const check of checks) {
      check.checked && arr.push(check);
    }
    arr = arr.map((e) => e.value);
    console.log(arr)
    axios
      .patch(`http://localhost:8080/index/${id}`, {
        body,
        arr,
      })
      .then((res) => {
        setItem([res.data.post]);
      })
      .catch((e) => console.log(e));
  };
  const framer = (e) => {
    comment && setFrame(e.target.src);
  };
  const vote = (e) => {
    const { id, _state } = e.target;
    const cname =
      _state.currentName === "up-arrow-square"
        ? { like: true }
        : { dislike: true };

    axios
      .post(`/index/${id}/vote`, { ...cname })
      .then((res) => {
        if (res.data.liked) {
          up.current.style.fill = "wheat";
          down.current.style.fill = "unset";
        } else {
          down.current.style.fill = "wheat";
          up.current.style.fill = "unset";
        }
        callVote(!newvote);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {ed ? (
        <>
          <textarea
            name=""
            defaultValue={element.post}
            className="form-control"
          ></textarea>
          <button className="btn" onClick={() => editor(element._id)}>
            edit <span style={{ color: "red" }}>{count}</span>
          </button>
        </>
      ) : (
        <p className=" description">{element.post}</p>
      )}
      <span>
        {element.media.map((el) => (
          <img key={el} src={el} onClick={framer} alt="" />
        ))}
      </span>
      <div className="comment-icons">
        <Link to="/comments">
          <box-icon
            name="message-rounded-add"
            id={element._id}
            onClick={setId}
            className="boxes"
          ></box-icon>
        </Link>
        {session.loggedIn
          ? element.author._id === session.user[0]._id && (
              <box-icon
                name="trash"
                onClick={() => deletePost(element._id)}
              ></box-icon>
            )
          : ""}
        {session.loggedIn && comment
          ? element.author._id === session.user[0]._id && (
              <box-icon
                type="solid"
                name="pencil"
                className="comment-pencil"
                onClick={() => {
                  tube(!tuber);
                  setEd(!ed);
                }}
              ></box-icon>
            )
          : null}
        {session.loggedIn && (
          <div className="votes">
            <box-icon
              type="solid"
              onClick={vote}
              name="up-arrow-square"
              id={element._id}
              ref={up}
            ></box-icon>{" "}
            <span className="likeSpan">
              {element.likes.user && element.likes.user.length}
            </span>
            <box-icon
              type="solid"
              onClick={vote}
              name="down-arrow-square"
              id={element._id}
              ref={down}
            ></box-icon>
            <span className="likeSpan">
              {element.likes.user && element.dislikes.user.length}
            </span>
          </div>
        )}
      </div>
      <footer>
        <span>{element.created.substring(0, 10)}</span>
        <span>{element.author.username}</span>
      </footer>
    </div>
  );
}
export default Post;
