import React from "react";
import ToDo from "./components/todo/todo.js";
import "./components/todo/todo.scss";
import Header from "./components/Header/Header.jsx";
import PreferencesProvider from "./contexts/preferences-context.jsx";


function App(props) {
  return (
      <PreferencesProvider>
        <Header />
        <ToDo />
      </PreferencesProvider>
  );
}

export default App;
