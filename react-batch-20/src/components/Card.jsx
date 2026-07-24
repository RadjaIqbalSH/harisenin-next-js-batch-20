import { use, useEffect, useState, useContext } from "react"
import { handleClickConsole } from "../helpers/click"
import { useNavigate } from "react-router"
import Button from "./Button"

import { ThemeContext } from "../App"

function Card (props) {

  const {
    title,
    description,
    priority,
    status,
    id,
    handleDelete,
  } = props;

  const state = useContext(ThemeContext);

  let navigation = useNavigate()

  function handleNavigationToEdit () {
    navigation(`/edit/${id}`)
  }

  return (
    <div className={`card card--${state.theme}`}>
      <p>Title : {title}</p>
      <p>Description : {description}</p>
      <p>Priority : {priority}</p>
      <p>Status : {status}</p>
      <div className="card-footer">
        <Button
          onClick={handleNavigationToEdit}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDelete(id)
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default Card