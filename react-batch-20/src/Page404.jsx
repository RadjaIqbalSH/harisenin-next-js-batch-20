import React from 'react'
import { NavLink } from 'react-router'

function Page404() {
  return (
    <div className='not-found'>
      <h1>Page Not Found 404</h1>
      <NavLink to="/">Back To Home Page</NavLink>
    </div>
  )
}

export default Page404