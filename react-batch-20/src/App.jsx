import './App.css'
import Card from './components/Card'
import Navbar from "./components/Navbar"

function App() {

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <Card/>
      </div>
    </div>
  )
}

export default App
