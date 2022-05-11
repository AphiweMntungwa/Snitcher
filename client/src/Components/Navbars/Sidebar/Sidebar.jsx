import React, { useContext, useEffect, useState } from "react";
import Sideitem from "./Sideitem";
// import "./sidebar.css";
import "../../../styles/Sidebar/sidebar.css";
import { SessionContext } from "../../../App";

let short = `https://img.icons8.com/`;
const sideList = [
  {
    title: "Posts",
    toLink: "/",
    img: `${short}external-soft-fill-juicy-fish/60/000000/external-posts-microservices-soft-fill-soft-fill-juicy-fish.png`,
  },
  {
    title: "New Post",
    toLink: "/new",
    img: `${short}external-flaticons-lineal-color-flat-icons/64/000000/external-write-customer-feedback-flaticons-lineal-color-flat-icons.png`,
  },
  { title: "Chat", toLink: "/chat", img: `${short}doodle/48/000000/chat.png` },
];

const Sidebar = () => {

  const session = useContext(SessionContext);
  // if (session.user) {
  //   sideList[2].toLink = "/chat";
  //   sideList[1].toLink = "/new";
  // } else {
  //   sideList[2].toLink = "/auth";
  //   sideList[1].toLink = "/auth";
  // }
                                                                                             
  return (
    <div className="sidebar">
      <Sideitem liProp={sideList} classUL="sidebar-ul" />
    </div>
  );
};
export default Sidebar;
