import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <Link to='post_job' className="text-decoration-none text-dark px-3 py-2 rounded hover-bg-primary">
        Post Movie
      </Link>
      <Link to='my_posting' className="text-decoration-none text-dark px-3 py-2 rounded hover-bg-primary">
        My  Movies
      </Link>
    </div>
  )
}

export default Sidebar
