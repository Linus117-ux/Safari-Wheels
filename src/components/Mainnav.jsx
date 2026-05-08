import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/assets/logo.png";


const Mainnav = () => {
    const navigate = useNavigate();
   
     const user = localStorage.getItem("user_id");  // Retrieve the user's ID from localStorage to determine if a user is logged in. This is used to conditionally render certain navigation options and the user dropdown menu.
     const role = localStorage.getItem("role");  // Retrieve the user's role from localStorage to determine if the user is an admin. This allows the component to conditionally render admin-specific links in the navigation bar, such as the "Add car" link and admin dashboard access.
     const username = localStorage.getItem("user_name");  // Retrieve the user's name from localStorage to display it in the navigation bar when the user is logged in. This enhances the user experience by personalizing the interface and providing a clear indication of the logged-in user's identity.
     const handleLogout = () => {
       localStorage.clear(); // Clear all user-related data from localStorage to effectively log the user out of the application. This ensures that any sensitive information is removed and the user's session is terminated.
       navigate("/signin");
     };
  return (
     <div className="row">
          <nav className="navbar navbar-expand-lg navbar-dark sticky-top border-bottom border-secondary py-3 shadow-sm">
           <div className="container" style={{ paddingLeft: window.innerWidth >= 768 ? "70px" : "16px" }}>
    
              {/* Brand */}
              <Link className="navbar-brand d-flex align-items-center" to="/">
  <img 
    src={logo} 
    alt="Safari Wheels" 
    style={{ height: "50px", objectFit: "contain" }}
  />
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
    onClick={() => {  // Instead of using a standard dropdown toggle, we use a button that scrolls to the footer when clicked. This provides a smooth user experience by taking the user directly to the services section in the footer, which is especially useful on single-page applications where traditional dropdowns may not be as effective.
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
    {role === "admin" && ( // Conditionally render the "Add car" link in the navigation bar only if the logged-in user has an admin role. This ensures that only users with the appropriate permissions can access the car management features of the application, enhancing security and user experience.
      <li className="nav-item">
        <Link className="nav-link text-light opacity-75" to="/addcar">
          Add car
        </Link>
      </li>
    )}
                </ul>
    
               
    
            
               <div className="d-flex align-items-center">
    
      {!user ? (  // If there is no user logged in (i.e., no user ID in localStorage), show the Login and Signup buttons. This provides a clear call to action for users who are not authenticated, encouraging them to log in or create an account to access additional features of the application.
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
                  <Link to="/admin" className="dropdown-item">
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