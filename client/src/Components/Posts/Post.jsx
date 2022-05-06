import { Link } from "react-router-dom";
// import styles from "./posts.module.css";
// import "./posts.css";
import "../../styles/Posts/Posts.css";
import { SessionContext } from "../../App";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Comments from "./Comments/Comments";

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

  const [commentShow, showComments] = useState(false)
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
    console.log(arr);
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
    <div className="post">
      <div className="header">
        <img src={element.author.photo.url} alt={element.author.username} />
        <h6>{element.author.username}</h6>
      </div>
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
      <div className="media">
        {element.media.map((el) => (
          <img key={el} src={el} onClick={framer} alt="" />
        ))}
      </div>
      <footer>
        <span>{element.created.substring(0, 10)}</span>
        <div className="other-icons">
              <box-icon
                name="trash"
                onClick={() => deletePost(element._id)}
              ></box-icon>
              <box-icon
                type="solid"
                name="pencil"
                className="comment-pencil"
                onClick={() => {
                  setEd(!ed);
                }}
              ></box-icon>
          <span className="votes">
            <box-icon
              type="solid"
              // onClick={vote}
              name="up-arrow-square"
              
            ></box-icon>
            {/* <span className="likeSpan">
              {element.likes.user && element.likes.user.length}
            </span> */}
            <box-icon
              type="solid"
              // onClick={vote}
              name="down-arrow-square"
              id={element._id}
              // ref={down}
            ></box-icon>
            {/* <span className="likeSpan">
              {element.likes.user && element.dislikes.user.length}
            </span> */}
          </span>
        </div>
        <div className="post-icons" onClick={()=> showComments(!commentShow)}>
          <box-icon
            name="message-rounded"
            id={element._id}
            onClick={setId}
            className="boxes"
          ></box-icon>
          <h6>Comments</h6>
        </div>
        {commentShow ? <Comments comments={element.comments} /> : null}
      </footer>
    </div>
  );
}
export default Post;
