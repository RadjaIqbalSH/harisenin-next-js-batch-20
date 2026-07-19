import { use, useEffect, useState } from "react"
import { handleClickConsole } from "../helpers/click"

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

  const [state, setState] = useState(1)
  const [show, setShow] = useState("show")

  function handleClick () {
    setState(state + 1)
  }

  function handleClick2 () {
    setState(state - 1)
  }

  function handleShow () {
    setShow("none")
  }

  useEffect(() => {
    console.log("LOGGING")
  }, [state])

  return (
    <div className="card">
      <p>Count : {state}</p>
      <p>
        {
          state > 9 ? "success" : "error"
        }
      </p>
      
      <button onClick={handleClick}>Click +1</button>
      <button onClick={handleClick2}>Click -1</button>

      <button style={{
        display: show
      }} onClick={handleShow}>Click to Remove</button>

      

      {
        exampleArray.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))
      }
    </div>
  )
}

export default Card