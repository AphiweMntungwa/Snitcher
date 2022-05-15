import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../../../styles/Profile/Profile.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { Button } from "react-bootstrap";
import axios from "axios";

function Profile({ user }) {
  const [description, editDescription] = useState(false);
  const profimg = useRef(null);
  const session = useSelector((state) => state.session.userSession);

  const handleChange = (e) => {
    let data = new FormData();
    if (profimg.current.files.length && session.user) {
      data.append("profileImage", profimg.current.files[0]);
      const id = session.user._id;
      axios
        .post({
          url: `http://localhost:8080/users/profile-img/${id}`,
          method: "POST",
          data,
        })
        .then((res) => console.log("yes", res))
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className="profile">
      <h5>{session.user.username} </h5>
      <div className="prof-img">
        <img
          src={session.user.photo.url.replace("/upload", "/upload/w_150/h_150")}
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
          <h6>Change Your Profile Image.</h6>
        </Tooltip>
      </div>
      <section>
        <span onClick={() => editDescription(!description)}>
          description <box-icon name="pencil"></box-icon>
        </span>
        {description ? <textarea className="form-control"></textarea> : <p></p>}
      </section>
    </div>
  );
}

export default Profile;
