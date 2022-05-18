import React from "react";
import Sideitem from "./Sideitem";
import "../../../styles/Sidebar/sidebar.css";

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
                                                                                             
  return (
    <div className="sidebar">
      <Sideitem liProp={sideList} classUL="sidebar-ul" />
    </div>
  );
};
export default Sidebar;
