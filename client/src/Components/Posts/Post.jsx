import { Link } from "react-router-dom";
// import styles from "./posts.module.css";
// import "./posts.css";
import "../../styles/Posts/Posts.css";
import { SessionContext } from "../../App";
import { useContext, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import Comments from "./Comments/Comments";
import { Tooltip } from "react-tippy";
import { sessionThunk } from "../../app/Redux/session/sessionActions";
import "react-tippy/dist/tippy.css";

function Post(props) {
  const {
    element,
    setId,
    comment,
    deletePost,
    count,
    setItem,
    setFrame,
    callVote,
    newvote,
  } = props;

  const [commentShow, showComments] = useState(false);
  const [isUser, checkUser] = useState("");
  const [alerter, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [owner, checkOwner] = useState("");
  const session = useSelector((state) => state.session.userSession);
  const [ed, setEd] = useState(false);
  const dispatch = useDispatch();

  const up = useRef(null);
  const down = useRef(null);

  useEffect(() => {
    // if (session.user) {
    //   if (element.likes.user.includes(session.user[0]._id)) {
    //     up.current.style.fill = "wheat";
    //     down.current.style.fill = "unset";
    //   } else if (element && element.dislikes.user.includes(session.user[0]._id)) {
    //     down.current.style.fill = "wheat";
    //     up.current.style.fill = "unset";
    //   } else {
    //     up.current.style.fill = "unset";
    //     down.current.style.fill = "unset";
    //   }
    // }
  }, []);

  const editor = (id) => {
    let arr = [];
    const body = document.querySelector("textarea").value;
    const checks = document.querySelectorAll("input[type=checkbox]");
    for (const check of checks) {
      check.checked && arr.push(check);
    }
    arr = arr.map((e) => e.value);
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

  useEffect(() => {
    dispatch(sessionThunk());
    if (session.user) {
      if (session.user._id === element.author._id) {
        checkUser("isUser");
      } else {
        checkOwner("isNot");
      }
    }
  }, []);

  return (
    <div className="post">
      {alerter ? (
        <Alert show={show} variant="success" className="header-div">
          <p style={{ fontSize: ".7em" }}>{alerter}</p>
          <Button onClick={() => setShow(false)} variant="outline-success">
            close
          </Button>
        </Alert>
      ) : null}
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
          <div>
            <Button
              variant="outline-success"
              onClick={() => editor(element._id)}
            >
              edit <span style={{ color: "red" }}>{count}</span>
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                setEd(!ed);
              }}
            >
              cancel <span style={{ color: "red" }}>{count}</span>
            </Button>
          </div>
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
        <div
          className={`${"other-icons"} ${isUser}`}
          onClick={() => {
            if (!session.user) {
              setAlert("You Must Be Signed In.");
              setShow(true);
            }
          }}
        >
          <Tooltip
            html={
              <>
                {session.user && session.user._id === element.author._id ? (
                  <Button
                    variant="outline-secondary"
                    onClick={() => deletePost(element._id)}
                    style={{ fontSize: ".8em", padding: ".1em .2em" }}
                  >
                    Are You Sure?
                  </Button>
                ) : (
                  <h6>Not Allowed</h6>
                )}
              </>
            }
            position="top"
            trigger="mouseenter"
            arrow={true}
            interactive={true}
            distance={5}
          >
            <box-icon name="trash" style={{ marginRight: ".2em" }}></box-icon>
          </Tooltip>

          <box-icon
            type="solid"
            name="pencil"
            onClick={() => {
              setEd(!ed);
            }}
          ></box-icon>
          <span className={`${owner} votes`}>
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
        <div className="post-icons" onClick={() => showComments(!commentShow)}>
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
