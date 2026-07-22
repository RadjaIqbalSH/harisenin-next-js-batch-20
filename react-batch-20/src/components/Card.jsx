import { use, useEffect, useState, useContext } from "react"
import { handleClickConsole } from "../helpers/click"
import { useNavigate } from "react-router"
import Button from "./Button"

import { ThemeContext } from "../App"

const exampleArray = [
  {
    name: "Cat"
  }, 
  {
    name: "Dog"
  }, 
  {
    name: "Duck"
  }, 
  {
    name: "Ant"
  }
]

function Card () {

  const state = useContext(ThemeContext);

  let navigation = useNavigate()

  function handleNavigationToEdit () {
    navigation("/edit")
  }

  return (
    <div className={`card card--${state.theme}`}>
      <p>Title</p>
      <p>Description</p>
      <p>Priority</p>
      <div className="card-footer">
        <Button
          onClick={handleNavigationToEdit}
        >
          Edit
        </Button>
        <Button
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default Card