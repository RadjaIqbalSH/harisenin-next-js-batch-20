import { useNavigate } from "react-router";

function Navbar () {

  let navigate = useNavigate();

  function handleClick () {
    navigate("/create");
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