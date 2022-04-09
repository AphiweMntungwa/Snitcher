import React from "react";

const Box = ({ boxClass, children }) => {
  return <div className={boxClass}>{children}</div>;
};

export default Box;
