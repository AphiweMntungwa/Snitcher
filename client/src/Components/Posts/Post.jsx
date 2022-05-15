import "../../styles/Posts/Posts.css";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import Comments from "./Comments/Comments";
import { Tooltip } from "react-tippy";
import { sessionThunk } from "../../app/Redux/session/sessionActions";
import "react-tippy/dist/tippy.css";
import { postThunk } from "../../app/Redux/posts/postActions";

function Post(props) {
  const { element, setId, deletePost, count, setItem } = props;
  const [commentShow, showComments] = useState(false);
  const [isUser, checkUser] = useState("");
  const [alerter, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [showB, setShowB] = useState(false);
  const [owner, checkOwner] = useState("");
  const session = useSelector((state) => state.session.userSession);
  const [ed, setEd] = useState(false);
  const [newFetch, refresh] = useState(false);
  const [frame, setFrame] = useState("");
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState("");
  const [onePost, setOnePost] = useState(false);
  const dispatch = useDispatch();

  const up = useRef(null);
  const down = useRef(null);
  const commentRef = useRef(null);

  function start() {
    if (session.user) {
      if (element.likes.user.includes(session.user._id)) {
        up.current.style.fill = "blue";
        down.current.style.fill = "unset";
      } else if (element.dislikes.user.includes(session.user._id)) {
        down.current.style.fill = "blue";
        up.current.style.fill = "unset";
      } else {
        up.current.style.fill = "unset";
        down.current.style.fill = "unset";
      }
    }
  }
  useEffect(() => {
    start();
    element.likes.user && setDislikes(element.dislikes.user.length);
    element.likes.user && setLikes(element.likes.user.length);
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

  const vote = (e) => {
    const { _state } = e.target;
    const cname =
      _state.currentName === "up-arrow-square"
        ? { like: true }
        : { dislike: true };

    axios
      .post(`http://localhost:8080/index/${element._id}/vote`, { ...cname })
      .then((res) => {
        axios
          .get(`http://localhost:8080/index/${element._id}`)
          .then((response) => {
            console.log(response);
            setOnePost(response.data);
          });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (onePost) {
      setLikes(onePost.likes.user.length);
      setDislikes(onePost.dislikes.user.length);

      if (onePost.likes.user.includes(session.user._id)) {
        up.current.style.fill = "blue";
        down.current.style.fill = "unset";
      } else if (onePost.dislikes.user.includes(session.user._id)) {
        down.current.style.fill = "blue";
        up.current.style.fill = "unset";
      } else {
        up.current.style.fill = "unset";
        down.current.style.fill = "unset";
      }
    }
  }, [onePost]);

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

  const sendComment = (setText) => {
    if (!session.user) {
      commentRef.current.value = "You Must Be Signed In To Comment.";
      return null;
    }
    commentRef.current.value &&
      axios
        .post(`http://localhost:8080/index/${element._id}/comments`, {
          body: commentRef.current.value,
        })
        .then(() => {
          refresh(!newFetch);
          setText('')
        })
        .catch((e) => console.log(e));
  };

  return (
    <div className="post">
      <Alert show={showB} variant="success"  style={{ padding: "0.3rem" }}>
        {frame.length != 0 && (
          <div>
            <iframe
              src={`https://www.youtube.com/embed/${frame.slice(23, 34)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <Button onClick={() => setShowB(false)} variant="outline-success">
          close
        </Button>
      </Alert>

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
          <img
            key={el}
            src={el}
            onClick={(e) => {
              setFrame(e.target.src);
              setShowB(true);
            }}
            alt=""
          />
        ))}
      </div>
      <footer>
        <span>{element.created.substring(0, 17)}</span>
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
            <span className="likeSpan">{likes}</span>
            <box-icon
              type="solid"
              onClick={vote}
              name="up-arrow-square"
              ref={up}
            ></box-icon>
            <span className="likeSpan">{dislikes}</span>

            <box-icon
              type="solid"
              onClick={vote}
              name="down-arrow-square"
              ref={down}
            ></box-icon>
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
        {commentShow ? (
          <Comments
            sendComment={sendComment}
            commentRef={commentRef}
            element={element}
            newFetch={newFetch}
          />
        ) : null}
      </footer>
    </div>
  );
}
export default Post;
