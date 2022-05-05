import "./App.css";
import { store } from "./app/store";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Components/Navbars/Sidebar/Sidebar";
import Topbar from "./Components/Navbars/Topbar/Topbar";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { sessionThunk } from "./app/Redux/session/sessionActions";

export const SessionContext = createContext();

function App({ children }) {
  // axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.userSession);
  const toggler = useSelector((state) => state.topbar.toggler);

  //getting login information
  useEffect(() => {
    dispatch(sessionThunk());
  }, []);

  return (
    <div className="App">
      <SessionContext.Provider value={session}>
        <Topbar />
        <main>
          {toggler ? <Sidebar /> : children}
        </main>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
