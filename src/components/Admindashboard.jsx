import axios from "axios"
import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [cars, setCars] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  const fetchData = async () => {
    setLoading("Loading dashboard...")

    try {
      const [bookingsRes, carsRes, usersRes] = await Promise.all([
        axios.get("https://linushiggs.alwaysdata.net/api/getbookings"),
        axios.get("https://linushiggs.alwaysdata.net/api/getcars"),
        axios.get("https://linushiggs.alwaysdata.net/api/getusers"),
      ])

      setBookings(bookingsRes.data)
      setCars(carsRes.data)
      setUsers(usersRes.data)

      setLoading("")
    } catch (err) {
      console.log(err)
      setError("Failed to load dashboard data")
      setLoading("")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container py-4">

      <Navbar />

      <h2 className="text-center fw-bold mb-4">
        🧑‍💼 Admin Dashboard
      </h2>

      {loading && <p className="text-warning text-center">{loading}</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* STATS CARDS */}
      <div className="row text-center mb-4">

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Total Bookings</h5>
            <h2 className="text-primary">{bookings.length}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Total Cars</h5>
            <h2 className="text-success">{cars.length}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Total Users</h5>
            <h2 className="text-warning">{users.length}</h2>
          </div>
        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <h4 className="mb-3">📅 Recent Bookings</h4>

     <div className="table-responsive">
  <table className="table table-dark table-striped table-hover">

    <thead>
      <tr>
        <th>#</th>
        <th>Car</th>
        <th>User ID</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Total</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {bookings.slice(0, 5).map((b, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{b.car_name}</td>
          <td>{b.user_id}</td>
          <td>{b.start_date}</td>
          <td>{b.end_date}</td>
          <td>Ksh {b.total_price}</td>
          <td>
            <span className="badge bg-warning">
              {b.payment_status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>

    </div>
  )
}

export default AdminDashboard