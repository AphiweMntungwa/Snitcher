import React, { useState, useEffect } from "react";
import styles from "./posts.module.css";
import Post from "./Post";
import Box from "../Box/Box";
import axios from "axios";

let arr = "";
export let globe = arr;

function Posts(props) {
  const [items, setItem] = useState([]);
  const [newvote, callVote] = useState(false);

  arr = localStorage.getItem("array");

  const setId = (e) => {
    arr = e.target.id;
    if (typeof Storage !== "undefined") {
      localStorage.setItem("array", arr);
    } else {
      console.log(`Sorry! No Web Storage support`);
    }
    globe = arr;
    return e.target.id;
  };

  const deletePost = (id) => {
    axios
      .delete(`https://snitcher-server.herokuapp.com/index/${id}`)
      .then((res) => {
        setItem(res.data.list);
      })
      .catch((e) => console.log("oh boy", e));
  };

  useEffect(() => {
    axios('https://snitcher-server.herokuapp.com/index') 
      .then((response) => {
        const { list } = response.data;
        const posts = [];
        list.forEach((el, i) => {
          posts.push(el);
        });
        setItem(posts);
      })
      .catch((e) => console.log("ERROR ON FETCH"));
  }, [newvote]);

  const show = (
    <Box boxClass={styles.postList}>
      <ul className={styles.listUl}>
        {(props.comment ? items.filter((el) => el._id === arr) : items).map(
          (el) => (
            <li className={styles.listItem} key={el._id}>
              <Post
                element={el}
                setId={setId}
                comment={props.comment}
                deletePost={deletePost}
                tube={props.tube}
                tuber={props.tuber}
                count={props.count}
                setFrame={props.setFrame}
                setItem={setItem}
                newvote={newvote}
                callVote={callVote}
              />
            </li>
          )
        )}
      </ul>
    </Box>
  );

  return show;
}
export default Posts;
