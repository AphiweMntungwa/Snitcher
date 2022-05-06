import React from "react";
import { Link } from "react-router-dom";

const Sideitem = ({ liProp, classUL }) => {
  return (
    <ul className={classUL}>
      {liProp.map((el) => {
        return (
          <li key={el.title}>
            <Link to={el.toLink}>{el.title}</Link>
            <img src={el.img} />
          </li>
        );
      })}
    </ul>
  );
};

export default Sideitem;
