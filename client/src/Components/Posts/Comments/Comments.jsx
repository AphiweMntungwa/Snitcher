import React, { useEffect, useState, useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import '../../../styles/Comments/Comments.css'
// import "./comment.css";
import Youtube from "../../Newpost/Youtube";

function Comments({ comments }) {
  return (
    <div>
      {false ? null : (
        <div className="comment-content">
          <form className="">
            <textarea
              name="comment"
              className="form-control comment"
              placeholder="leave a comment"
            ></textarea>
            <div className="buttons">
              <Button variant="outline-success">Send</Button>
              <Button
                variant="outline-danger"
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("textarea").value = "";
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
          <ul className="comment-list">
            {comments &&
              comments.map((el) => (
                <li key={el._id}>
                  <span className="comText">{el.body}</span>
                  <span className="like-system">
                    <box-icon
                      type="solid"
                      // onClick={vote}
                      name="up-arrow-square"
                      id={el._id}
                      className="voteroll"
                    ></box-icon>
                    <span className="likeSpan">
                      {el.likes.user && el.likes.user.length}
                    </span>
                    <box-icon
                      type="solid"
                      // onClick={vote}
                      name="down-arrow-square"
                      id={el._id}
                      className="voteroll"
                    ></box-icon>
                    <span className="likeSpan">
                      {el.likes.user && el.dislikes.user.length}
                    </span>
                  </span>
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
      {/* {frame.length !=0 && (
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
      )} */}
    </div>
  );
}

export default Comments;
