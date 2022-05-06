import React from "react";
import loadingSun from "../../Assets/loading-sun.gif";
import errorImg from "../../Assets/error.png";

function Loader({ error, errorMsg = "Loading..." }) {
  const img = error ? errorImg : loadingSun;
  return (
    <div className="loader">
      <img src={img} alt="loading" />
      <h6>{errorMsg}</h6>
    </div>
  );
}

export default Loader;
