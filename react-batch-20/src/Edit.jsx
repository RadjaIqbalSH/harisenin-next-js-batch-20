import React, { useEffect, useReducer, useState } from 'react'
import Navbar from './components/Navbar'
import { NavLink, useNavigate, useParams } from 'react-router'
import axios from 'axios'

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

  else if (action.type === "all") {
    return {
      ...action.data
    }
  }

  else {
    return state
  }
}

function Edit() {

  const params = useParams();
  const navigation = useNavigate();

  // console.log("params => ", params)


  const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE)
  const [state2, setState2] = useState(DEFAULT_VALUE)
  const [loading, setLoading] = useState(false)

  
  async function getDetailData() {
    setLoading(true)
    await axios.get(`https://6a635d61b30b52361e1a3009.mockapi.io/kanban/${params.id}`)
    .then((response) => {
      dispatch({
        type: "all",
        data: response.data
      })
    })
    .catch(() => {

    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getDetailData()
  }, [])

  async function updateData(data) {
    setLoading(true)
    await axios.put(`https://6a635d61b30b52361e1a3009.mockapi.io/kanban/${params.id}`, data)
    .then(() => {
      console.log("Success edit task")
      navigation("/")
    })
    .catch(() => {
      console.log("Failed edit data")
    })
    .finally(() => {
      setLoading(false)
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateData(state)
    console.log("Submit => ", state)
  }

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <NavLink to="/">Back To Home Page</NavLink>
        <h1>Edit Task</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            type='text'
            defaultValue={state.title} 
            onChange={(event) => {
              dispatch({
                type: "title",
                data: event.target.value
              })
            }}
          />
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            defaultValue={state.description}
            onChange={(event) => {
              dispatch({
                type: "description",
                data: event.target.value
              })
            }}
          />
          <label htmlFor="priority">Priority</label>
          <select 
            id="priority"
            defaultValue={state.priority}
            onChange={(event) => {
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
            onChange={(event) => {
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
          <button type='submit'>{loading ? "Loading" : "Edit"}</button>
        </form>
      </div>
    </div>
  )
}

export default Edit