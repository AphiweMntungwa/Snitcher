import axios from "axios";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showNext } from "../../../app/Redux/Auth/showActions";
import {useNavigate} from 'react-router-dom'


function Profile({ locSt }) {
  const dispatch = useDispatch();
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const authForm = useRef(null);
  const navigate = useNavigate()

  const handleAuth = () => {
    function inp(n) {
      return n.current.value;
    }
    let data = new Object();
    if (inp(input1) && inp(input2) && inp(input3)) {
      data = {
        username: `${locSt("firstName")} ${locSt("lastName")}`,
        profileImage: input1.current.files[0],
        email: inp(input2),
        password: inp(input3),
      };
    }

    let dat = new FormData();
    Object.keys(data).forEach((element) => {
      dat.append(element, data[element]);
    });
    
    axios({
      url: "http://localhost:8080/register",
      method: "POST",
      data: dat,
    })
      .then((res) => {
        console.log(res.data);
        navigate('/')
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <form ref={authForm}>
      <h1
        className="login-header"
        style={{ textAlign: "center", paddingBottom: "8px" }}
      >
        Finish Creating Account
      </h1>
      <input type="file" name="profileImage" ref={input1} />
      <label htmlFor="email">email:</label>
      <input
        type="email"
        className="form-control"
        name="email"
        id="email"
        placeholder="email@email"
        ref={input2}
        required
      />
      <label htmlFor="password">password:</label>
      <input
        type="password"
        className="form-control"
        name="password"
        id="password"
        placeholder="password"
        ref={input3}
        required
      />

      <Button variant="outline-primary" onClick={handleAuth}>
        Submit
      </Button>
      <Button variant="outline-dark" onClick={() => dispatch(showNext(true))}>
        Back &#8592;
      </Button>
    </form>
  );
}

export default Profile;
