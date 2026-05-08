import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  // Sidebar closed by default
  const [open, setOpen] = useState(false);

  const user = localStorage.getItem("user_id");  // Retrieve the user's ID from localStorage to determine if a user is logged in. This is used to conditionally render certain navigation options and the user dropdown menu.
  const role = localStorage.getItem("role");  // Retrieve the user's role from localStorage to determine if the user is an admin. This allows the component to conditionally render admin-specific links in the sidebar, such as the "Add car" link and admin dashboard access.

  const location = useLocation();

  // Auto close on mobile when route changes
  useEffect(() => {  // Whenever the route changes, check if the screen width is less than 768 pixels (indicating a mobile device). If it is, automatically close the sidebar by setting the 'open' state to false. This ensures that the sidebar does not remain open on smaller screens when navigating to different pages, improving the user experience on mobile devices.
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  }, [location]); // The dependency array includes 'location' to trigger this effect whenever the route changes, ensuring the sidebar behaves responsively across different screen sizes.

  return (
    <>
      {/* TOGGLE BUTTON */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(!open)}
      >
        <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`}></i>
      </button> 

      {/* SIDEBAR */}
      <div className={`modern-sidebar ${open ? "open" : "closed"}`}>

        {/* LOGO */}
        <div className="sidebar-logo">
          <div className="logo-circle">🚗</div>

          {open && (
            <div>
              <h4 className="mb-0 fw-bold text-white">
                Safari Wheels
              </h4>

              <small className="text-secondary">
                Premium Rentals
              </small>
            </div>
          )}
        </div>

        {/* MENU */}
        <div className="sidebar-links">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "active-link"
                : ""
            }
          >
            <i className="bi bi-house-door"></i>
            {open && <span>Home</span>}
          </Link>

          <Link
            to="/getcar"
            className={
              location.pathname === "/getcar"
                ? "active-link"
                : ""
            }
          >
            <i className="bi bi-car-front"></i>
            {open && <span>Cars</span>}
          </Link>

          {user && (
            <Link
              to="/getbookings"
              className={
                location.pathname === "/getbookings"
                  ? "active-link"
                  : ""
              }
            >
              <i className="bi bi-calendar-check"></i>
              {open && <span>My Bookings</span>}
            </Link>
          )}

          {role === "admin" && (
            <>
              <Link
                to="/admin"
                className={
                  location.pathname === "/admin"
                    ? "active-link"
                    : ""
                }
              >
                <i className="bi bi-speedometer2"></i>
                {open && <span>Dashboard</span>}
              </Link>

              <Link
                to="/users"
                className={
                  location.pathname === "/users"
                    ? "active-link"
                    : ""
                }
              >
                <i className="bi bi-people"></i>
                {open && <span>Users</span>}
              </Link>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/signin"
                className={
                  location.pathname === "/signin"
                    ? "active-link"
                    : ""
                }
              >
                <i className="bi bi-box-arrow-in-right"></i>
                {open && <span>Login</span>}
              </Link>

              <Link
                to="/signup"
                className={
                  location.pathname === "/signup"
                    ? "active-link"
                    : ""
                }
              >
                <i className="bi bi-person-plus"></i>
                {open && <span>Signup</span>}
              </Link>
            </>
          )}
        </div>

      </div>
    </>
  );
};

export default Sidebar;