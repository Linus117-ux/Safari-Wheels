import React from 'react'

const Navbar = ({ search, setSearch }) => {

  return (
    <div className="row">

  <nav className="navbar navbar-expand-lg navbar-dark  sticky-top border-bottom border-secondary py-3 shadow-sm">
  <div className="container">
    {/* Brand - Added slight letter spacing for a premium look */}
    <a className="navbar-brand fw-bold fs-4" href="#" style={{ letterSpacing: "1px" }}>
      <span className="text-primary">SAFARI</span> <span className="text-white">WHEELS</span>
    </a>

    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      {/* Centered Links - Added gap-3 for better horizontal spacing */}
      <ul className="navbar-nav mx-auto gap-3">
        <li className="nav-item">
          <a className="nav-link active fw-semibold" href="/">Home</a>
        </li>
        
        {/* Dropdown */}
        <li className="nav-item dropdown">
          <a 
            className="nav-link dropdown-toggle text-light" 
            href="#" 
            role="button" 
            data-bs-toggle="dropdown" 
          >
            Services
          </a>
          <ul className="dropdown-menu dropdown-menu-dark shadow">
            <li><a className="dropdown-item" href="#">Car Rentals</a></li>
            <li><a className="dropdown-item" href="#">Chauffeur Services</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Support</a></li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link text-light opacity-75" href="/addcar">Add car</a>
        </li>
      </ul>

      {/* Search Bar - Wider button, placeholder changed to match context */}
      <form className="d-flex align-items-center" role="search">
        <div className="input-group">
          <input 
            className="form-control bg-dark border-secondary text-white shadow-none" 
            type="search" 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Find a car..." 
            style={{ borderRadius: "20px 0 0 20px" }}
          />
          <button 
            className="btn btn-primary text-dark fw-bold px-4" 
            type="submit"
            style={{ borderRadius: "0 20px 20px 0" }}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  </div>
</nav>
              </div>
  )
}

export default Navbar