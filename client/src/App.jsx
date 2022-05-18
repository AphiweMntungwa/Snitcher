// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/App/App.css'
import Sidebar from "./Components/Navbars/Sidebar/Sidebar";
import Topbar from "./Components/Navbars/Topbar/Topbar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sessionThunk } from "./app/Redux/session/sessionActions";
import {
  largeWindowSize,
  smallWindowSize,
} from "./app/Redux/window/windowActions";

function App({ children }) {
  const dispatch = useDispatch();
  const [size, resize] = useState();
  const toggler = useSelector((state) => state.topbar.toggler);
  const largeWindow = useSelector((state) => state.window.largeWindow);

  window.onresize = () => {
    resize(window.innerWidth);
  };

  useEffect(() => {
    window.innerWidth > 750
      ? dispatch(largeWindowSize(true))
      : dispatch(smallWindowSize());
  }, [size]);

  const appId = largeWindow ? "large-app" : "";

  //getting login information
  useEffect(() => {
    dispatch(sessionThunk());
  }, [toggler]);

  return (
    <div className="App" id={appId}>
      {largeWindow ? <Sidebar /> : <Topbar />}
      <main>  {toggler && !largeWindow ? <Sidebar /> : children}</main>
    </div>
  );
}

export default App;
