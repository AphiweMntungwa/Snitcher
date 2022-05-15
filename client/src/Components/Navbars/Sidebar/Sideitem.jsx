import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleBurger } from "../../../app/Redux/topbar/topbarActions";

const Sideitem = ({ liProp, classUL }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.userSession);

  const profile = session.loggedIn
    ? {
        title: session.user.username,
        toLink: "/profile",
        img: session.user.photo.url,
      }
    : {};

  let short = `https://img.icons8.com/`;

  return (
    <ul className={classUL}>
      {session.user && (
        <li key={profile.title} onClick={() => dispatch(toggleBurger(false))}>
          <Link to={profile.toLink}>
            <span> {profile.title}</span>
            <img src={profile.img} />
          </Link>
        </li>
      )}
      {liProp.map((el) => {
        return (
          <li key={el.title} onClick={() => dispatch(toggleBurger(false))}>
            <Link to={el.toLink}>
              <span> {el.title}</span>
              <img src={el.img} />
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
