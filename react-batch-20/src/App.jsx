import './App.css'
import { useState, createContext } from "react"
import Card from './components/Card'
import Navbar from "./components/Navbar"
import { NavLink } from "react-router";

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState("dark")

  return (
    <ThemeContext value={{
      theme: theme,
      setTheme: setTheme,
    }}>
      <div >
        <Navbar/>
        <div className={`container container--${theme}`}>
          <Card/>
        </div>
      </div>
    </ThemeContext>
  )
}

export default App
