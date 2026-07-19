import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import { NavLink } from "react-router";

function Create() {

  const [state, setState] = useState()
  const data = useRef(3000)

  // useEffect(() => {
  //   data.current = setInterval(() => {
  //     setTimeout(() => {
  //       console.log("test")
  //     }, 1000)
  //   }, 1000)

  //   return () => {
  //     clearInterval(data.current)
  //   }
  // })

  const example = useCallback(() => {
    console.log()
  }, [state])

  const example2 = useMemo(() => {
    const a = 10
    const b = 20
    const result = a + b
    return result
  }, [state])

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <NavLink to="/">Back To Home Page</NavLink>
        <h1>Craete Task</h1>
      </div>
    </div>
  )
}

export default Create