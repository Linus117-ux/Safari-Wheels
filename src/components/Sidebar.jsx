import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../components/assets/logo.png";


const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const user = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  return (
    <>
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`sidebar ${open ? "open" : "closed"}`}>

        <h3>{open ? "🚗 SW" : "🚗"}</h3>

        {/* ALWAYS VISIBLE */}
        <Link to="/">
          <i className="bi bi-house"></i>
          {open && <span> Home</span>}
        </Link>

        <Link to="/getcar">
          <i className="bi bi-car-front"></i>
          {open && <span> Cars</span>}
        </Link>

        {/* ONLY WHEN LOGGED IN */}
        {user && (
          <Link to="/getbookings">
            <i className="bi bi-calendar-check"></i>
            {open && <span> My Bookings</span>}
          </Link>
        )}

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <>
            <Link to="/admin">
              <i className="bi bi-speedometer2"></i>
              {open && <span> Dashboard</span>}
            </Link>

            <Link to="/users">
              <i className="bi bi-people"></i>
              {open && <span> Users</span>}
            </Link>
          </>
        )}

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/signin">
              <i className="bi bi-box-arrow-in-right"></i>
              {open && <span> Login</span>}
            </Link>

            <Link to="/signup">
              <i className="bi bi-person-plus"></i>
              {open && <span> Signup</span>}
            </Link>
          </>
        )}

      </div>
    </>
  );
};

export default Sidebar;