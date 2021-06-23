import React from "react";
import ToDo from "./components/todo/todo.js";
import "./components/todo/todo.scss";
import Header from "./components/Header/Header.jsx";
import PreferencesProvider from "./contexts/preferences-context.jsx";
import AuthContextProvider from "./contexts/authContext.jsx";


function App(props) {
  return (
    <PreferencesProvider>
      <AuthContextProvider>
        <Header />
        <ToDo />
      </AuthContextProvider>
    </PreferencesProvider>
  );
}

export default App;
