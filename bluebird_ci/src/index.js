import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.REACT_APP_API_SERVER_URL);
console.log(process.env.NODE_ENV);
axios.defaults.baseURL = process.env.REACT_APP_API_SERVER_URL;
// axios.defaults.baseURL = "http://localhost:3005";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
