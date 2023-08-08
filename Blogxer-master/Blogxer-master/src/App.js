import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import PrimaryRoutes from "./Components/Routes/PrimaryRoutes";
import { useDispatch } from "react-redux";
import { getUser } from "./features/Auth/authSlice";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`${mode ? "" : "dark-mode"}`}>
      {/* <div className="mode">
        {" "}
        <a onClick={() => setMode(!mode)}>
          {mode ? (
            <span
              className="material-symbols-outlined p-2 bg-dark rounded-circle text-white"
              style={{ fontSize: "36px" }}
            >
              dark_mode
            </span>
          ) : (
            <span
              className="material-symbols-outlined p-2 bg-white rounded-circle text-dark"
              style={{ fontSize: "36px" }}
            >
              dark_mode
            </span>
          )}
        </a>
      </div> */}
      <ToastContainer />
      <Router>
        <PrimaryRoutes />
      </Router>
    </div>
  );
}

export default App;
