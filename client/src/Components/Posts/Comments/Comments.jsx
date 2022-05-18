import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import "../../../styles/Comments/Comments.css";
// import "./comment.css";
import Loader from "../../Utils/Loader";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { useSelector } from "react-redux";

function Comments({ sendComment, commentRef, element, newFetch }) {
  const session = useSelector((state) => state.session.userSession);
  const [text, setText] = useState("");
  const [commentsAlt, setComments] = useState([]);
  const [loading, load] = useState(false);
  const [deleted, deleter] = useState(false);

  const up = useRef(null);
  const down = useRef(null);

  function start() {
    if (session.user) {
      commentsAlt.forEach((el) => {
        if (el.likes.user.includes(session.user._id)) {
          if (up.current) {
            const icons = document.querySelectorAll(
              'box-icon[name="up-arrow-square"]'
            );
            const arr = [...icons];
            arr.forEach((element) => {
              if (element.id === el._id) {
                console.log(element);
                element.style.fill = "blue";
              }
            });
          }
        } else if (el.dislikes.user.includes(session.user._id)) {
          if (down.current) {
            const icons = document.querySelectorAll(
              'box-icon[name="down-arrow-square"]'
            );
            const arr = [...icons];
            arr.forEach((element) => {
              if (element.id === el._id) {
                console.log(element);
                element.style.fill = "blue";
              }
            });
          }
        }
      });
    }
  }

  useEffect(() => {
    start();
  }, [commentsAlt]);

  useEffect(() => {
    load(true);
    axios
      .get(`https://snitcherapp.herokuapp.com/index/${element._id}/comments`)
      .then((res) => {
        load(false);
        let comments = [...res.data.comments].reverse();
        setComments(comments);
      })
      .catch((e) => load(e.message));
  }, [newFetch, deleted]);

  const deleteComment = (commentId) => {
    axios
      .delete(
        `https://snitcherapp.herokuapp.com/index/${element._id}/comments/${commentId}`
      )
      .then((res) => {
        deleter(!deleted);
      })
      .catch((e) => console.log(e));
  };

  const vote = ({ target }) => {
    const { _state, id } = target;
    const cname =
      _state.currentName === "up-arrow-square"
        ? { like: true }
        : { dislike: true };

    axios
      .post(`https://snitcherapp.herokuapp.com/index/${id}/comments/vote`, {
        ...cname,
      })
      .then((res) => {
        deleter(!deleted);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {false ? null : (
        <div className="comment-content">
          <form className="">
            <textarea
              name="comment"
              className="form-control comment"
              placeholder="Leave a comment"
              rows="2"
              ref={commentRef}
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
            <div className="buttons">
              <Button
                variant="outline-success"
                onClick={() => {
                  sendComment(setText);
                }}
              >
                Send
              </Button>
              <Button
                variant="outline-danger"
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  setText("");
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
          {loading === true ? (
            <Loader />
          ) : (
            <ul className="comment-list">
              {commentsAlt &&
                commentsAlt.map((el) => (
                  <li key={el._id}>
                    <div className="like-comments">
                      <span className="comText">{el.body}</span>
                      <span className="like-system">
                        <span className={`likeSpan`}>
                          <sup></sup>
                          {el.likes.user && el.likes.user.length}
                        </span>
                        <box-icon
                          type="solid"
                          onClick={vote}
                          name="up-arrow-square"
                          ref={up}
                          id={el._id}
                          animation="tada-hover"
                        ></box-icon>

                        <span className={`likeSpan`}>
                          <sup></sup>
                          {el.likes.user && el.dislikes.user.length}
                        </span>
                        <box-icon
                          type="solid"
                          onClick={vote}
                          name="down-arrow-square"
                          ref={down}
                          id={el._id}
                          animation="tada-hover"
                        ></box-icon>
                      </span>
                    </div>
                    <div className="comment-owner">
                      <i>- {el.author.username}</i>
                      <Tooltip
                        html={
                          <>
                            {session.user &&
                            session.user._id === el.author._id ? (
                              <Button
                                variant="outline-secondary"
                                onClick={() => deleteComment(el._id)}
                                style={{
                                  fontSize: ".8em",
                                  padding: ".1em .2em",
                                }}
                              >
                                Are You Sure?
                              </Button>
                            ) : (
                              <h6>Not Allowed</h6>
                            )}
                          </>
                        }
                        position="left"
                        trigger="mouseenter"
                        arrow={true}
                        interactive={true}
                        distance={5}
                      >
                        <span>delete</span>
                      </Tooltip>
                    </div>
                  </li>
                ))}
            </ul>
          )}
          {typeof loading === "string" && (
            <Loader error={loading} errorMsg={loading} />
          )}
        </div>
      )}
    </div>
  );
}

export default Comments;
