import Box from "../Box/Box";
import axios from "axios";
import { Button } from "react-bootstrap";
// import "./newpost.css";
import "../../styles/Newpost/Newpost.css";
import { postThunk } from "../../app/Redux/posts/postActions";
import Youtube from "./Youtube";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Utils/Loader";
import { useDispatch } from "react-redux";

const Newpost = () => {
  const [loading, load] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [num, setNum] = useState(0);
  const [checkers, keepCheck] = useState([]);

  const check = (e) => {
    if (e.target.checked) {
      keepCheck([...checkers, e.target.value])
      setNum(num + 1);
    } else {
      setNum(num - 1);
    }
  };

  const sendPost = () => {
    const text = document.querySelector("textarea").value;
    load(true);
    axios
      .post("https://snitcherapp.herokuapp.com/index", {
        text,
        checkers,
      })
      .then((res) => {
        console.log(res.data);
        load(false);
        navigate("/");
      })
      .catch((e) => {
        if (e.message.includes("401")) {
          load("You Must Be Signed In");
        } else if (e.message.includes("400")) {
          load("empty field?");
        } else {
          load(e.message);
        }
      });
  };

  return (
    <Box boxClass="new-post">
      <h1>New Post </h1>
      {typeof loading === "string" && (
        <div className="post-loader">
          <Loader error={loading} errorMsg={loading} />
        </div>
      )}
      {loading === true && (
        <div className="post-loader">
          <Loader />
        </div>
      )}
      <div className="create-box">
        <textarea placeholder="say something..."></textarea>
        <div>
          <Button variant="outline-primary" onClick={() => sendPost()}>
            Post
          </Button>
          <i className="fab fa-youtube"></i>
          <span className="resNum">+{num}</span>
        </div>
      </div>
      <Youtube check={check} />
    </Box>
  );
};
export default Newpost;
