import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        page not found , try <Link to="/">Home Page</Link>
    </div>
  )
}

export default PageNotFound
