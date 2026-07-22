import React, {useContext} from 'react'
import { ThemeContext } from '../App';

function Button(props) {

  const { onClick, children } = props

  const state = useContext(ThemeContext);

  return (
    <button 
      className={`navbar-button navbar-button--${state.theme}`} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button