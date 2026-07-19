import React, { useReducer, useState } from 'react'
import Navbar from './components/Navbar'
import { NavLink } from 'react-router'

const DEFAULT_VALUE = {
  title: "",
  description: "",
  priority: "low",
  status: "to-do",
}

function reducer(state, action) {
  if (action.type === "title") {
    return {
      ...state,
      title: action.data
    }
  }
  else if (action.type === "description") {
    return {
      ...state,
      description: action.data
    }
  }
  else if (action.type === "priority") {
    return {
      ...state,
      priority: action.data
    }
  }
  else if (action.type === "status") {
    return {
      ...state,
      status: action.data
    }
  }

  else {
    return state
  }
}

function Edit() {

  const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE)
  const [state2, setState2] = useState(DEFAULT_VALUE)

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <NavLink to="/">Back To Home Page</NavLink>
        <h1>Edit Task</h1>
        <div>reducer : {JSON.stringify(state)}</div>
        <form className="form-container">
          <label htmlFor="title">Title</label>
          <input id="title" type='text' onChange={(event) => {
            dispatch({
              type: "title",
              data: event.target.value
            })
          }}/>
          <label htmlFor="description">Description</label>
          <textarea id="description" onChange={(event) => {
            dispatch({
              type: "description",
              data: event.target.value
            })
          }}/>
          <label htmlFor="priority">Priority</label>
          <select id="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label htmlFor="status">Status</label>
          <select id="status">
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </form>
      </div>
    </div>
  )
}

export default Edit