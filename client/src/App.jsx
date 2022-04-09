import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Components/Navbars/Sidebar/Sidebar";
import Topbar from "./Components/Navbars/Topbar/Topbar";
import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const SessionContext = createContext();

function App({ children }) {
  axios.defaults.withCredentials = true;
  const [session, getSession] = useState("");

  //getting login information
  useEffect(() => {
    axios
      .get("https://snitcher-server.herokuapp.com/login")
      .then((response) => {
        getSession(response.data);
      });
  }, []);

  return (
    <div className="App">
      <SessionContext.Provider value={session}>
        <Topbar func={getSession} />
        <main>
          <Sidebar />
          {children}
        </main>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
