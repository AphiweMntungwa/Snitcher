import React from "react";
import "../../../styles/Navbar/Navbar.css";
import { toggleBurger } from "../../../app/Redux/topbar/topbarActions";
import { useSelector, useDispatch } from "react-redux";

const Topbar = () => {
  const toggler = useSelector((state) => state.topbar.toggler);
  const dispatch = useDispatch();

  const toggleIcon = toggler ? "nav-on" : "";

  return (
    <nav className="topbar">
      <div className="header">
        &#x1D54A;&#x1D55F;&#x1D55A;&#x1D565;&#x1D554;&#x1D559;&#x1D556;&#x1D563;
      </div>

      <div
        className={`nav-toggle ${toggleIcon}`}
        onClick={() => {
          dispatch(toggleBurger(!toggler));
        }}
      >
        <div>
          <span style={{ opacity: 0 }}>y</span>
        </div>
      </div>

    </nav>
  );
};
export default Topbar;
