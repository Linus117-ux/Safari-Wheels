import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Mainnav = () => {
    const navigate = useNavigate();
   
     const user = localStorage.getItem("user_id");
     const role = localStorage.getItem("role");
     const username = localStorage.getItem("user_name");
     const handleLogout = () => {
       localStorage.clear();
       navigate("/signin");
     };
  return (
     <div className="row">
          <nav className="navbar navbar-expand-lg navbar-dark sticky-top border-bottom border-secondary py-3 shadow-sm">
            <div className="container">
    
              {/* Brand */}
              <Link className="navbar-brand fw-bold fs-4" to="/" style={{ letterSpacing: "1px" }}>
                <span className="text-primary">SAFARI</span> <span className="text-white">WHEELS</span>
              </Link>
    
              <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
    
              <div className="collapse navbar-collapse" id="navbarNav">
    
                {/* Center Links */}
                <ul className="navbar-nav mx-auto gap-3">
                  <li className="nav-item">
                    <Link className="nav-link active fw-semibold" to="/">Home</Link>
                  </li>
    
                 <li className="nav-item dropdown">
  <button
    className="nav-link dropdown-toggle text-light btn btn-link"
    type="button"
    onClick={() => {
      document.getElementById("footer")?.scrollIntoView({
        behavior: "smooth"
      });
    }}
  >
    Services
  </button>

  <ul className="dropdown-menu dropdown-menu-dark shadow">
    <li><span className="dropdown-item">Car Rentals</span></li>
    <li><span className="dropdown-item">Chauffeur Services</span></li>
    <li><hr className="dropdown-divider" /></li>
    <li><span className="dropdown-item">Support</span></li>
  </ul>
</li>
    {role === "admin" && (
      <li className="nav-item">
        <Link className="nav-link text-light opacity-75" to="/addcar">
          Add car
        </Link>
      </li>
    )}
                </ul>
    
               
    
                {/* 🔥 AUTH BUTTONS */}
               <div className="d-flex align-items-center">
    
      {!user ? (
        <>
          <Link to="/signin" className="btn btn-outline-light me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Signup
          </Link>
        </>
      ) : (
        <div className="dropdown">
          <button 
            className="btn btn-dark dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-person-circle me-2"></i>
            {username || "User"}
          </button>
    
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow">
    
            <li>
              <span className="dropdown-item-text small text-white-50">
                Signed in as <strong>{username}</strong>
              </span>
            </li>
    
            <li><hr className="dropdown-divider" /></li>
    
            {/* USER */}
            <li>
              <Link to="/getbookings" className="dropdown-item">
                <i className="bi bi-calendar-check me-2"></i>
                My Bookings
              </Link>
            </li>
    
            {/* ADMIN ONLY */}
            {role === "admin" && (
              <>
                <li>
                  <Link to="/dashboard" className="dropdown-item">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard
                  </Link>
                </li>
    
                <li>
                  <Link to="/users" className="dropdown-item">
                    <i className="bi bi-people me-2"></i>
                    Manage Users
                  </Link>
                </li>
              </>
            )}
    
            <li><hr className="dropdown-divider" /></li>
    
            <li>
              <button onClick={handleLogout} className="dropdown-item text-danger">
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </li>
    
          </ul>
        </div>
      )}
    
    </div>
    
              </div>
            </div>
          </nav>
        </div>
     );
}

export default Mainnav