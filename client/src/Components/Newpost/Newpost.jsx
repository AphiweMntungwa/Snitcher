import Box from "../Box/Box";
import axios from "axios";
import "./newpost.css";
import Youtube from "./Youtube";
import { useState } from "react";

const Newpost = () => {
  const [count, setCount] = useState(0);

  const sendPost = () => {
    let arr = [];
    const text = document.querySelector("textarea").value;
    const checks = document.querySelectorAll("input[type=checkbox]");
    for (const check of checks) {
      check.checked && arr.push(check);
    }
    arr = arr.map((e) => e.value);
    axios
      .post("https://snitcher-server.herokuapp.com/index", {
        text,
        arr,
      })
      .then((res) => console.table(res))
      .catch((e) => console.log(e));
  };

  return (
    <Box boxClass="new-post">
      <Box boxClass="card create-box">
        <textarea
          className="card-body form-control"
          placeholder="Post..."
        ></textarea>
        <div>
          <button className="btn post-button" onClick={() => sendPost()}>
            Post
          </button>
          <i className="fab fa-youtube"></i>
          <span className="resNum">+{count}</span>
        </div>
      </Box>
      <Youtube fetchMe={setCount} />
    </Box>
  );
};
export default Newpost;
