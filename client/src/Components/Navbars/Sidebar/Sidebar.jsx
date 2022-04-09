import React, { useContext } from "react";
import Sideitem from "./Sideitem";
import Box from "../../Box/Box";
import "./sidebar.css";
import { SessionContext } from "../../../App";

const sideList = [
  { id: 1, title: "Posts", classIcon: "fas fa-home", toLink: "/" },
  { id: 2, title: "New Post", classIcon: "fas fa-pen", toLink: "/new" },
  { id: 3, title: "Chat", classIcon: "fas fa-comments", toLink: "/chat" },
];
const Sidebar = () => {
  const session = useContext(SessionContext);
  if(session.user){
    sideList[2].toLink = "/chat"
    sideList[1].toLink = "/new"
  }
  else{
    sideList[2].toLink = "/login"
    sideList[1].toLink = "/login"
  }

  return (
    <Box boxClass="sidebar-box">
      <Sideitem liProp={sideList} classUL="sidebar-ul" />
    </Box>
  );
};
export default Sidebar;
