import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import NotesDataContext from "./Components/Context/NotesDataContext.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotesDataContext>
      <App />

      <ToastContainer autoClose={100} />
    </NotesDataContext>
  </React.StrictMode>
);
