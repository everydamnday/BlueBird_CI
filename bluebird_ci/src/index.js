import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.REACT_APP_API_SERVER_URL);
const { REACT_APP_API_SERVER_URL } = process.env;
console.log(REACT_APP_API_SERVER_URL);
console.log(ENV1);
// console.log(`${ENV}`);
// console.log($ENV);

axios.defaults.baseURL = REACT_APP_API_SERVER_URL;
// axios.defaults.baseURL = "http://localhost:3005";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
