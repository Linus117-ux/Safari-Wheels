import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  // Sidebar closed by default
  const [open, setOpen] = useState(false);

  const user = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  const location = useLocation();

  // Auto close on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  }, [location]);

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