import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleBurger } from "../../../app/Redux/topbar/topbarActions";
import { sessionThunk } from "../../../app/Redux/session/sessionActions";

const Sideitem = ({ liProp, classUL }) => {
  const [prof, setProf] = useState({});
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.userSession);

  useEffect(() => {
    dispatch(sessionThunk())
    if (session.user) {
      setProf({
        title: session.user.username,
        toLink: "/profile",
        img: session.user.photo.url,
      });
    }
  }, []);

  let short = `https://img.icons8.com/`;

  return (
    <ul className={classUL}>
      {Object.keys(prof).length>0 && (
        <li key={prof.title} onClick={() => dispatch(toggleBurger(false))}>
          <Link to={prof.toLink}>
            <span> {prof.title}</span>
            <img src={prof.img.replace("/upload", "/upload/w_90/h_90")} />
          </Link>
        </li>
      )}
      {liProp.map((el) => {
        return (
          <li key={el.title} onClick={() => dispatch(toggleBurger(false))}>
            <Link to={el.toLink}>
              <span> {el.title}</span>
              <img src={el.img.replace("/upload", "/upload/w_90/h_90")} />
            </Link>
          </li>
        );
      })}
      {session.user ? (
        <li key="Sign Out" onClick={() => dispatch(toggleBurger(false))}>
          <Link to="/logout">
            <span>Sign Out</span>
            <img
              src={`${short}external-kmg-design-outline-color-kmg-design/32/000000/external-log-out-user-interface-kmg-design-outline-color-kmg-design.png`}
            />
          </Link>
        </li>
      ) : (
        <li key="Sign In" onClick={() => dispatch(toggleBurger(false))}>
          <Link to="/auth">
            <span>Sign In</span>
            <img
              src={`${short}external-flaticons-lineal-color-flat-icons/64/000000/external-sign-up-web-store-flaticons-lineal-color-flat-icons-3.png`}
            />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Sideitem;
