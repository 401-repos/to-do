import React from "react";
import ToDo from "./components/todo/todo.js";
import "./components/todo/todo.scss";
import Header from "./components/Header/Header.jsx";

function App(props) {
  return (
    <>
      <Header />
      <ToDo />
    </>
  );
}

export default App;
