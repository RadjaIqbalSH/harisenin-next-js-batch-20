import React, { use, useCallback, useEffect, useMemo, useRef, useState, useContext, useReducer } from 'react'
import Navbar from './components/Navbar'
import { NavLink, useNavigate } from "react-router";

import { ThemeContext } from './App';
import { useStoreTheme } from "../src/store/theme"
import axios from 'axios';


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

function Create() {

  const navigation = useNavigate()

  const [loading, setLoading] = useState(false)
  const [data, dispatch] = useReducer(reducer, DEFAULT_VALUE)

  const [state, setState] = useState()
  // const data = useRef(3000);

  const storeTheme = useStoreTheme()

  const example = useCallback(() => {
    console.log()
  }, [state])

  const example2 = useMemo(() => {
    const a = 10
    const b = 20
    const result = a + b
    return result
  }, [state])

  async function postData(data) {
    setLoading(true)
    await axios.post("https://6a635d61b30b52361e1a3009.mockapi.io/kanban", data)
    .then(() => {
      console.log("Success create task")
      navigation("/")
    })
    .catch(() => {
      console.log("Failed create data")
    })
    .finally(() => {
      setLoading(false)
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    postData(data)
    console.log("Submit => ", data)
  }

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <NavLink to="/">Back To Home Page</NavLink>
        <h1>Craete Task</h1>
        <form onSubmit={handleSubmit} className="form-container">
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
          <select 
            id="priority"
            onChange={() => {
              dispatch({
                type: "priority",
                data: event.target.value
              })
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label htmlFor="status">Status</label>
          <select 
            id="status"
            onChange={() => {
              dispatch({
                type: "status",
                data: event.target.value
              })
            }}
          >
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button type='submit'>{loading ? "Loading" : "Submit"}</button>
        </form>
      </div>
    </div>
  )
}

export default Create