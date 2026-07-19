import { use, useEffect, useState } from "react"
import { handleClickConsole } from "../helpers/click"
import { useNavigate } from "react-router"

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

  let navigation = useNavigate()

  function handleNavigationToEdit () {
    navigation("/edit")
  }

  return (
    <div className="card">
      <p>Title</p>
      <p>Description</p>
      <p>Priority</p>
      <div className="card-footer">
        <button onClick={handleNavigationToEdit}>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Card