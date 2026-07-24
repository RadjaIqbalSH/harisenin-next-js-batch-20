import './App.css'
import { useState, createContext, useEffect } from "react"
import Card from './components/Card'
import Navbar from "./components/Navbar"
import { NavLink } from "react-router";

import axios from "axios";

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  async function deleteData(id) {
    await axios.delete(`https://6a635d61b30b52361e1a3009.mockapi.io/kanban/${id}`)
    .then(async (response) => {
      await getData()
      // kondisi request api nya success
    })
    .catch(() => {
      // kondisi request api nya error

    })
    .finally(() => {
      // di jalankan setelah salah satu kondisi di atas telah di jalankan
    })
  }

  async function getData () {
    setLoading(true)
    await axios.get("https://6a635d61b30b52361e1a3009.mockapi.io/kanban")
    .then((response) => {
      setData(response.data)
      // kondisi request api nya success
    })
    .catch(() => {
      // kondisi request api nya error

    })
    .finally(() => {
      setLoading(false)
      // di jalankan setelah salah satu kondisi di atas telah di jalankan
    })
  }

  useEffect(() => {
    getData()
  }, []) // code hanya akan di jalankan 1 kali di fase mount pertamaz

  return (
    <ThemeContext value={{
      theme: theme,
      setTheme: setTheme,
    }}>
      <div >
        <Navbar/>
        <div className={`container container--${theme}`}>
          {
            loading ? <h1>Loading....</h1> : data.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                handleDelete={deleteData}
              />
            ))
          }
        </div>
      </div>
    </ThemeContext>
  )
}

export default App
