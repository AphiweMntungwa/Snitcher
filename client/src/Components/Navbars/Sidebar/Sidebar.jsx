import React, { useContext } from "react";
import Sideitem from "./Sideitem";
import Box from "../../Box/Box";
// import "./sidebar.css";
import '../../../styles/Sidebar/sidebar.css'
import { SessionContext } from "../../../App";

let short = `https://img.icons8.com/`
const sideList = [
  { title: "Posts", toLink: "/", img:`${short}external-soft-fill-juicy-fish/60/000000/external-posts-microservices-soft-fill-soft-fill-juicy-fish.png` },
  { title: "New Post", toLink: "/new", img:`${short}external-flaticons-lineal-color-flat-icons/64/000000/external-write-customer-feedback-flaticons-lineal-color-flat-icons.png` },
  { title: "Chat", toLink: "/chat", img:`${short}doodle/48/000000/chat.png` },
  { title: "Sign in", toLink: "/register", img:`${short}external-flaticons-lineal-color-flat-icons/64/000000/external-sign-up-web-store-flaticons-lineal-color-flat-icons-3.png` },
  { title: "Log in", toLink: "/login", img:`${short}external-bearicons-outline-color-bearicons/64/000000/external-log-in-call-to-action-bearicons-outline-color-bearicons.png` },
];

const Sidebar = () => {
  const session = useContext(SessionContext);
  if (session.user) {
    sideList[2].toLink = "/chat";
    sideList[1].toLink = "/new";
  } else {
    sideList[2].toLink = "/login";
    sideList[1].toLink = "/login";
  }

  return (
    <div className="sidebar">
      <Sideitem liProp={sideList} classUL="sidebar-ul" />
    </div>
  );
};
export default Sidebar;
