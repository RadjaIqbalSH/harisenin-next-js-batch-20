function Navbar () {

  function handleClick () {
    console.log("Add Task Button Cliked")
  }

  return (
    <div className="navbar">
      <p className="navbar-title">Logo</p>
      <div>
        <button className="navbar-button" onClick={handleClick} >Add Task</button>
      </div>
    </div>
  )
}

export default Navbar