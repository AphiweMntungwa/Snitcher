import React, { useContext } from "react";
import Sideitem from "./Sideitem";
import Box from "../../Box/Box";
// import "./sidebar.css";
import { SessionContext } from "../../../App";

const sideList = [
  { title: "Posts", toLink: "/" },
  { title: "New Post", toLink: "/new" },
  { title: "Chat", toLink: "/chat" },
  { title: "Sign in", toLink: "/login" },
  { title: "Log in", toLink: "/register" },
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
    <Box boxClass="sidebar-box">
      <Sideitem liProp={sideList} classUL="sidebar-ul" />
    </Box>
  );
};
export default Sidebar;
