import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../../../styles/Profile/Profile.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { sessionThunk } from "../../../app/Redux/session/sessionActions";

function Profile({ user }) {
  const dispatch = useDispatch();
  const [description, editDescription] = useState(false);
  const [desc, describe] = useState("");
  const [newDP, setNew] = useState(false);
  const profimg = useRef(null);
  const session = useSelector((state) => state.session.userSession);

  const handleChange = (e) => {
    let data = new FormData();
    if (profimg.current.files.length && session.user) {
      data.append("profileImage", profimg.current.files[0]);
      const id = session.user._id;
      const url = `http://localhost:8080/profile/${id}`;
      axios({
        url,
        method: "POST",
        data,
      })
        .then(() => setNew(!newDP))
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    dispatch(sessionThunk());
  }, [newDP]);

  const handleDescribe = () => {
    const id = session.user._id;
    const url = `http://localhost:8080/profile/${id}`;
    axios
      .patch(url, { description: desc })
      .then(() => {
        setNew(!newDP);
        editDescription(false);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div className="profile">
      <h5>{session.user.username} </h5>
      <div className="prof-img">
        <img
          src={session.user.photo.url.replace("/upload", "/upload/w_150/h_200")}
          alt=""
        />
        <Tooltip
          html={
            <>
              <input type="file" name="profileImage" ref={profimg} />
              <hr />
              <Button
                onClick={handleChange}
                variant="outline-primary"
                style={{ padding: "2px" }}
              >
                Change
              </Button>
            </>
          }
          position="top"
          trigger="mouseenter"
          arrow={true}
          interactive={true}
          distance={4}
        >
          <h6 style={{textDecoration:'underline'}}>Change Your Profile Image.</h6>
        </Tooltip>
      </div>
      <section>
        <span onClick={() => editDescription(!description)}>
          description <box-icon name="pencil"></box-icon>
        </span>
        {description ? (
          <>
            <textarea
              className="form-control"
              defaultValue={session.user.description}
              onChange={(e) => describe(e.target.value)}
            ></textarea>
            <Button
              style={{ padding: "1% 3%", marginTop: "1%" }}
              onClick={handleDescribe}
            >
              Describe
            </Button>
          </>
        ) : (
          <p>{session.user.description}</p>
        )}
      </section>
    </div>
  );
}

export default Profile;
