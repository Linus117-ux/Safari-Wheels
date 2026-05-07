import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'

const BASE = "https://linushiggs.alwaysdata.net"

const Getbookings = () => {
  const [loading, setLoading]   = useState(true)
  const [cars, setCars]         = useState([])
  const [error, setError]       = useState("")
  const [search, setSearch]     = useState("")
  const [cancelling, setCancelling] = useState(null) // booking id being cancelled

  const user_id = localStorage.getItem("user_id")

  /* ── Fetch bookings ── */
  const getbookings = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const { data } = await axios.get(`${BASE}/api/getbookings`)
      const userBookings = data.filter(
        (b) => String(b.user_id) === String(user_id)
      )
      setCars(userBookings)
    } catch (err) {
      console.error(err)
      setError("Failed to load bookings. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [user_id])

  useEffect(() => { getbookings() }, [getbookings])

  /* ── Cancel booking ── */
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return
    setCancelling(bookingId)
    try {
      await axios.delete(`${BASE}/api/cancelbooking/${bookingId}`)
      setCars((prev) => prev.filter((b) => b.id !== bookingId))
    } catch (err) {
      alert("Could not cancel booking. Please try again.")
    } finally {
      setCancelling(null)
    }
  }

  /* ── Helpers ── */
  const imagepath = `${BASE}/static/images/`

  const getDuration = (start, end) => {
    if (!start || !end) return null
    const days = Math.ceil(
      (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
    )
    return days > 0 ? days : null
  }

  const getStatus = (start, end) => {
    const now   = new Date()
    const sDate = new Date(start)
    const eDate = new Date(end)
    if (now < sDate) return { label: "Upcoming",  color: "#3b82f6" }
    if (now > eDate) return { label: "Completed", color: "#22c55e" }
    return               { label: "Active",    color: "#f59e0b" }
  }

  const filtered = cars.filter((b) => {
    const term = (search || "").toLowerCase()
    return (
      (b.car_name        || "").toLowerCase().includes(term) ||
      (b.car_description || "").toLowerCase().includes(term)
    )
  })

  /* ── Render ── */
  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex flex-column flex-md-row align-items-center
                      justify-content-between mb-4 gap-3">
        <h2 className="fw-bold mb-0">📅 My Bookings</h2>

        {/* Search */}
        <div className="input-group" style={{ maxWidth: 320 }}>
          <span className="input-group-text"
                style={{ background: "#1e293b", border: "1px solid #334155" }}>
            <i className="bi bi-search text-secondary"></i>
          </span>
          <input
            className="form-control"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: "#1e293b", color: "#e2e8f0",
                     border: "1px solid #334155" }}
          />
          {search && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => setSearch("")}
              style={{ border: "1px solid #334155" }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      {!loading && cars.length > 0 && (
        <div className="d-flex gap-3 mb-4 flex-wrap">
          {[
            { label: "Total",     count: cars.length,                              color: "#94a3b8" },
            { label: "Upcoming",  count: cars.filter(b => getStatus(b.start_date, b.end_date).label === "Upcoming").length,  color: "#3b82f6" },
            { label: "Active",    count: cars.filter(b => getStatus(b.start_date, b.end_date).label === "Active").length,    color: "#f59e0b" },
            { label: "Completed", count: cars.filter(b => getStatus(b.start_date, b.end_date).label === "Completed").length, color: "#22c55e" },
          ].map(({ label, count, color }) => (
            <div key={label}
                 className="px-3 py-2 rounded-3 small fw-semibold"
                 style={{ background: "#1e293b", border: `1px solid ${color}33`,
                          color }}>
              {label}: {count}
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p className="text-secondary">Loading your bookings...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert d-flex align-items-center gap-2"
             style={{ background: "#1e293b", border: "1px solid #ef4444",
                      color: "#fca5a5", borderRadius: 12 }}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          {error}
          <button className="btn btn-sm btn-outline-danger ms-auto"
                  onClick={getbookings}>
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: 60 }}>🚗</div>
          <h5 className="mt-3 text-secondary">
            {search ? `No bookings matching "${search}"` : "No bookings yet"}
          </h5>
          {!search && (
            <a href="/getcar" className="btn btn-primary mt-3">
              Browse Cars
            </a>
          )}
        </div>
      )}

      {/* Cards */}
      <div className="row">
        {filtered.map((booking) => {
          const status   = getStatus(booking.start_date, booking.end_date)
          const duration = getDuration(booking.start_date, booking.end_date)
          const isCancel = cancelling === booking.id

          return (
            <div className="col-md-4 mb-4" key={booking.id}>
              <div className="card car-card h-100 border-0 d-flex flex-column"
                   style={{ background: "#1e293b", borderRadius: 18,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>

                {/* Image */}
                <div className="image-container" style={{ position: "relative" }}>
                  <img
                    src={imagepath + booking.car_image}
                    alt={booking.car_name}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover",
                             borderRadius: "18px 18px 0 0" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=No+Image"
                    }}
                  />
                  {/* Status badge */}
                  <span className="position-absolute top-0 end-0 m-2 px-2 py-1
                                   rounded-pill small fw-bold"
                        style={{ background: status.color + "22",
                                 color: status.color,
                                 border: `1px solid ${status.color}55`,
                                 backdropFilter: "blur(4px)" }}>
                    {status.label}
                  </span>
                </div>

                {/* Body */}
                <div className="card-body flex-grow-1 px-3 pt-3 pb-1">
                  <h5 className="fw-bold mb-3" style={{ color: "#f1f5f9" }}>
                    {booking.car_name}
                  </h5>

                  <div className="d-flex flex-column gap-1 mb-3">
                    <p className="small mb-0" style={{ color: "#94a3b8" }}>
                      <i className="bi bi-calendar-event me-2"
                         style={{ color: "#3b82f6" }}></i>
                      <span className="text-white-50">Start:</span>{" "}
                      <span style={{ color: "#e2e8f0" }}>{booking.start_date}</span>
                    </p>
                    <p className="small mb-0" style={{ color: "#94a3b8" }}>
                      <i className="bi bi-calendar-check me-2"
                         style={{ color: "#22c55e" }}></i>
                      <span className="text-white-50">End:</span>{" "}
                      <span style={{ color: "#e2e8f0" }}>{booking.end_date}</span>
                    </p>
                    {duration && (
                      <p className="small mb-0">
                        <i className="bi bi-clock me-2"
                           style={{ color: "#f59e0b" }}></i>
                        <span style={{ color: "#e2e8f0" }}>
                          {duration} day{duration !== 1 ? "s" : ""}
                        </span>
                      </p>
                    )}
                  </div>

                  <h6 className="fw-bold mb-0" style={{ color: "#22c55e" }}>
                    💵 ${booking.total_price}
                  </h6>
                </div>

                {/* Footer */}
                <div className="card-footer border-0 mt-auto px-3 pb-3 pt-2"
                     style={{ background: "transparent" }}>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary flex-grow-1"
                            style={{ borderRadius: 10 }}>
                      📄 View Details
                    </button>

                    {status.label !== "Completed" && (
                      <button
                        className="btn btn-outline-danger"
                        style={{ borderRadius: 10, minWidth: 44 }}
                        onClick={() => handleCancel(booking.id)}
                        disabled={isCancel}
                        title="Cancel booking"
                      >
                        {isCancel
                          ? <span className="spinner-border spinner-border-sm" />
                          : <i className="bi bi-x-lg"></i>
                        }
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Getbookings