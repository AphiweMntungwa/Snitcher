import React, { useState, useEffect } from "react";
import Post from "./Post";
import Box from "../Box/Box";
import axios from "axios";
import { postThunk } from "../../app/Redux/posts/postActions";
import Loader from "../Utils/Loader";
import { useSelector, useDispatch } from "react-redux";

let arr = "";
export let globe = arr;

function Posts(props) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.posts);
  const posts = post ? [...post].reverse() : [];
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
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
      .delete(`http://localhost:8080/index/${id}`)
      .then((res) => {
        setItem(res.data.list);
      })
      .catch((e) => console.log("oh boy", e));
  };

  useEffect(() => {
    dispatch(postThunk());
  }, [items]);


  const show = (
    <Box boxClass={`postList`}>
      {!loading && !posts.length ? <Loader error={error} errorMsg={error} /> : null}
      {loading ? (
        <Loader />
      ) : (
        <ul className={`listUl`}>
          {posts.length>0 &&
            (props.comment ? posts.filter((el) => el._id === arr) : posts).map(
              (el) => (
                <li className={`list-item`} key={el._id}>
                  <Post
                    element={el}
                    setId={setId}
                    comment={props.comment}
                    deletePost={deletePost}
                    tube={props.tube}
                    tuber={props.tuber}
                    count={props.count}
                    setItem={setItem}
                    newvote={newvote}
                    callVote={callVote}
                  />
                </li>
              )
            )}
        </ul>
      )}
    </Box>
  );

  return show;
}
export default Posts;
