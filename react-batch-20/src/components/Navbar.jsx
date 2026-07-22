import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";

import { ThemeContext } from "../App";


function Navbar (props) {

  let navigate = useNavigate();

  const state = useContext(ThemeContext);

  function handleClick () {
    navigate("/create");
  }

  function handleChangeThemeMode () {
    state.setTheme(state.theme === "dark" ? "light" : "dark")
  }

  return (
    <div className={`navbar navbar--${state.theme}`}>
      <p className="navbar-title">Logo</p>
      <div className="navbar-side">
        <Button
          onClick={handleChangeThemeMode}
        >
          Change to {state.theme === "dark" ? "light" : "dark" } mode
        </Button>
        <Button
          onClick={handleClick} 
        >
          Add Task
        </Button>
      </div>
    </div>
  )
}

export default Navbar