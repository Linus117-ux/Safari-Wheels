import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`sidebar ${open ? "open" : "closed"}`}>

        <h3>{open ? "🚗 Safari wheels" : "🚗"}</h3>

        <Link to="/">
          <i className="bi bi-speedometer2"></i>
          {open && <span> Dashboard</span>}
        </Link>

        <Link to="/getcar">
          <i className="bi bi-car-front"></i>
          {open && <span> Cars</span>}
        </Link>
         <Link to="/getbookings">
          <i className="bi bi-car-front"></i>
          {open && <span> My bookings</span>}
        </Link>

        <Link to="/signup">
          <i className="bi bi-people"></i>
          {open && <span> Users</span>}
        </Link>

        <Link to="/signin">
          <i className="bi bi-box-arrow-in-right"></i>
          {open && <span> Login</span>}
        </Link>

      </div>
    </>
  );
};

export default Sidebar;