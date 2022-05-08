import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleBurger } from "../../../app/Redux/topbar/topbarActions";

const Sideitem = ({ liProp, classUL }) => {
  const dispatch = useDispatch();
  return (
    <ul className={classUL}>
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
    </ul>
  );
};

export default Sideitem;
