import React, { use, useCallback, useEffect, useMemo, useRef, useState, useContext } from 'react'
import Navbar from './components/Navbar'
import { NavLink } from "react-router";

import { ThemeContext } from './App';
import { useStoreTheme } from "../src/store/theme"

function Create() {

  const [state, setState] = useState()
  const data = useRef(3000);

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

  return (
    <div>
      {/* <Navbar/> */}
      <div className='container'>
        <NavLink to="/">Back To Home Page</NavLink>
        <h1>Craete Task {storeTheme.theme}</h1>
        <button onClick={() => {
          if (storeTheme.theme === "light") {
            storeTheme.setTheme("dark")
          } else {
            storeTheme.setTheme("light")
          }
        }} >click</button>
      </div>
    </div>
  )
}

export default Create