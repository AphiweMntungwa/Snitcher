import React from "react";
import { Link } from "react-router-dom";

const Sideitem = ({ liProp, classUL }) => {
  return (
    <ul className={classUL}>
      {liProp.map((el) => {
        return (
          <li key={el.id}>
            <Link to={el.toLink}>
              <i className={el.classIcon}></i>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sideitem;
