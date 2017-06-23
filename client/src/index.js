import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// making every fetch use this to get the header
// const oldFetch = window.fetch;
// window.fetch = function fetch(url, settings) {
//   const headers = Object.assign(settings ? settings.headers : {},
//   {authorization: localStorage.getItem("token")});
//   settings = settings || {};
//   settings.headers = headers;
//   return oldFetch(url, settings);
// };


ReactDOM.render(
  <App />,
  document.getElementById("root")
);
