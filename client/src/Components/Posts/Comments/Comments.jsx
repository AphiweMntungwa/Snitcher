import axios from "axios";
import React, { useEffect, useState, useContext, useRef } from "react";
import Posts from "../Posts";
import { globe } from "../Posts";
import "./comment.css";
import Youtube from "../../Newpost/Youtube";
import { SessionContext } from "../../../App";

function Comments() {
  const [comments, showComments] = useState([]);
  const [count, setCount] = useState(0);
  const [tuber, setTuber] = useState(false);
  const [frame, setFrame] = useState("");
  const [del, deleteMe] = useState(false);
  const [newvote, callVote] = useState(false);
  const session = useContext(SessionContext);
  const up = useRef(null);
  const down = useRef(null);

  useEffect(() => {
    axios
      .get(`https://snitcher-server.herokuapp.com/index/${globe}/comments`)
      .then((res) => {
        showComments(res.data.comments);

        if (session.user.length && res.data.comments) {
          const comment = res.data.comments;
          comment.forEach((el, i) => {
            const com = document.querySelectorAll(
              `box-icon[id='${comment[i]._id}']`
            );
            el.likes.user.length && el.likes.user.includes(session.user[0]._id)
              ? (com[0].style.fill = "white")
              : (com[0].style.fill = "unset");

            el.dislikes.user.length && el.dislikes.user.includes(session.user[0]._id)
              ? (com[1].style.fill = "white")
              : (com[1].style.fill = "unset");
          });
        }
      })
      .catch((e) => {
        console.log("please don't panic", e);
      });
  }, [del, newvote]);

  const postComment = (e) => {
    e.preventDefault();
    axios
      .post(`https://snitcher-server.herokuapp.com/index/${globe}/comments`, {
        body: document.querySelector(".comment").value,
      })
      .then(() => {
        deleteMe(!del);
      })
      .catch((e) => console.log(`uh oohh don't panic ${e}`));
  };

  const deleteComment = (id) => {
    axios
      .delete(`https://snitcher-server.herokuapp.com/index/${globe}/comments/${id}`)
      .then(() => {
        deleteMe(!del);
      })
      .catch((e) => console.log("failed, reason:", e));
  };

  const vote = (e) => {
    const { id, _state } = e.target;
    const cname =
      _state.currentName === "up-arrow-square"
        ? { like: true }
        : { dislike: true };

    axios
      .post(`https://snitcher-server.herokuapp.com/index/${id}/comments/vote`, { ...cname })
      .then(() => {
        callVote(!newvote);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Posts
        comment
        tube={setTuber}
        tuber={tuber}
        count={count}
        setFrame={setFrame}
      />
      {tuber ? (
        <Youtube fetchMe={setCount} />
      ) : (
        <div className="comment-content">
          <form className="">
            <textarea
              name="comment"
              className="form-control comment"
              placeholder="leave a comment"
            ></textarea>
            <div className="buttons">
              <button className="btn btn-success" onClick={postComment}>
                Send
              </button>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("textarea").value = "";
                }}
              >
                Cancel
              </button>
            </div>
          </form>
          <ul className="d-flex flex-column comment-list">
            {comments &&
              comments.map((el) => (
                <li key={el._id}>
                  <span className="comText">{el.body}</span>
                  {session.loggedIn && (
                    <span className="like-system">
                      <box-icon
                        type="solid"
                        onClick={vote}
                        name="up-arrow-square"
                        id={el._id}
                        ref={up}
                        className="voteroll"
                      ></box-icon>
                      <span className="likeSpan">
                        {el.likes.user && el.likes.user.length}
                      </span>
                      <box-icon
                        type="solid"
                        onClick={vote}
                        name="down-arrow-square"
                        id={el._id}
                        className="voteroll"
                        ref={down}
                      ></box-icon>
                      <span className="likeSpan">
                        {el.likes.user && el.dislikes.user.length}
                      </span>
                    </span>
                  )}
                  {session.user
                    ? el.author._id == session.user[0]._id && (
                        <box-icon
                          name="trash"
                          onClick={() => deleteComment(el._id)}
                        ></box-icon>
                      )
                    : null}
                  <div style={{ width: "100%" }}>
                    <i style={{ color: "orangered", fontSize: ".6em" }}>
                      - {el.author.username}
                    </i>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
      {frame.length !=0 && (
        <div className="card" style={{ maxWidth: "250px" }}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${frame.slice(23, 34)}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Comments;
