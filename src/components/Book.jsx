import axios from "axios"
import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Book = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { car } = location.state || {}

  const imagepath = "https://linushiggs.alwaysdata.net/static/images/"

  const [phone, setPhone] = useState("")
  const [startdate, setStartdate] = useState("")
  const [enddate, setEnddate] = useState("")
  const [total, setTotal] = useState(0)
  const [days, setDays] = useState(0)

  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  // Redirect if no car
  useEffect(() => {
    if (!car) navigate("/getcar")
  }, [car, navigate])

  // Calculate total and days
  useEffect(() => {
    if (!startdate || !enddate || !car?.price_per_day) return

    const start = new Date(startdate)
    const end = new Date(enddate)

    if (isNaN(start) || isNaN(end)) return

    if (end > start) {
      const calculatedDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      const calculatedTotal = calculatedDays * Number(car.price_per_day)
      
      setDays(calculatedDays)
      setTotal(calculatedTotal > 0 ? calculatedTotal : 0)
    } else {
      setDays(0)
      setTotal(0)
    }
  }, [startdate, enddate, car])

  const Mpesapayment = async (amount, phone) => {
    const formdata = new FormData()
    formdata.append("amount", amount)
    formdata.append("phone", phone)

    return await axios.post(
      "https://linushiggs.alwaysdata.net/api/mpesa_payment",
      formdata
    )
  }

  const handlesubmit = async (e) => {
    e.preventDefault()

    const user_id = localStorage.getItem("user_id")

    setError("")
    setSuccess("")
    setLoading("")

    // Validation
    if (!user_id) return navigate("/signin")

    if (!car?.car_id) {
      setError("Car not found. Please try again.")
      return
    }

    if (!startdate || !enddate) {
      setError("Please select both dates")
      return
    }

    if (new Date(enddate) <= new Date(startdate)) {
      setError("End date must be after start date")
      return
    }

    if (!phone) {
      setError("Enter phone number")
      return
    }

    if (!total || total <= 0) {
      setError("Invalid total amount")
      return
    }

    try {
      setLoading("Saving booking...")

      const bookingResponse = await axios.post(
        "https://linushiggs.alwaysdata.net/api/createbooking",
        {
          user_id: Number(user_id),
          car_id: Number(car.car_id),
          start_date: startdate,
          end_date: enddate,
          total_price: Number(total)
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (!bookingResponse.data.success) {
        throw new Error(bookingResponse.data.message || "Booking failed")
      }

      setLoading("Initiating M-Pesa payment...")
      await Mpesapayment(Number(total), phone)

      setSuccess("Booking successful! Complete payment on your phone.")

      // Reset form
      setStartdate("")
      setEnddate("")
      setPhone("")
      setTotal(0)
      setDays(0)

      setTimeout(() => navigate("/getbookings"), 3000)

    } catch (err) {
      console.error("Booking error:", err)
      setError(
        err.response?.data?.message ||
        err.message ||
        "Booking failed"
      )
    } finally {
      setLoading("")
    }
  }

  if (!car) return null

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="display-5 fw-bold" style={{ color: "#084ab4" }}>
              🚗 Complete Your Booking
            </h1>
            <p className="text-muted">Review your rental details and confirm your booking</p>
          </div>

          {/* Main Content */}
          <div className="row">
            {/* Left Column - Car Details */}
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow-lg h-100" style={{ borderRadius: "20px", overflow: "hidden" }}>
                <div className="position-relative">
                  <img
                    src={imagepath + car.car_image}
                    alt={car.car_name}
                    className="img-fluid"
                    style={{ 
                      width: "100%", 
                      height: "300px", 
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x400?text=Car+Image"
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
                      ${car.price_per_day}/day
                    </span>
                  </div>
                </div>
                
                <div className="card-body p-4">
                  <h2 className="card-title fw-bold mb-2">{car.car_name}</h2>
                  <p className="text-muted mb-3">
                    <i className="bi bi-tag me-2"></i>
                    {car.car_brand || "Luxury Vehicle"}
                  </p>
                  <p className="card-text text-secondary">{car.car_description || "Experience comfort and style with this premium vehicle. Perfect for your journey ahead."}</p>
                  
                  <hr className="my-3" />
                  
                  <div className="row text-center">
                    <div className="col-4">
                      <i className="bi bi-fuel-pump fs-4 text-primary"></i>
                      <p className="small  mt-1">Fuel Efficient</p>
                    </div>
                    <div className="col-4">
                      <i className="bi bi-shield-check fs-4 text-primary"></i>
                      <p className="small  mt-1">Insurance</p>
                    </div>
                    <div className="col-4">
                      <i className="bi bi-headphones fs-4 text-primary"></i>
                      <p className="small  mt-1">24/7 Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow-lg" style={{ borderRadius: "20px" }}>
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4" >
                    <i className="bi bi-calendar-check me-2 text-primary"></i>
                    Booking Details
                  </h3>

                  {/* Alert Messages */}
                  {error && (
                    <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center mb-3">
                      <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                      <div>{error}</div>
                    </div>
                  )}
                  
                  {success && (
                    <div className="alert alert-success border-0 rounded-3 d-flex align-items-center mb-3">
                      <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                      <div>{success}</div>
                    </div>
                  )}
                  
                  {loading && (
                    <div className="alert alert-info border-0 rounded-3 d-flex align-items-center mb-3">
                      <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                      <div>{loading}</div>
                    </div>
                  )}

                  <form onSubmit={handlesubmit}>
                    {/* Date Range */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold mb-2">
                        <i className="bi bi-calendar-range me-2 text-primary"></i>
                        Rental Period
                      </label>
                      <div className="row g-2">
                        <div className="col-6">
                          <input
                            type="date"
                            value={startdate}
                            onChange={(e) => setStartdate(e.target.value)}
                            className="form-control form-control-lg"
                            min={new Date().toISOString().split('T')[0]}
                            style={{ borderRadius: "12px" }}
                          />
                          <small className="">Pick-up Date</small>
                        </div>
                        <div className="col-6">
                          <input
                            type="date"
                            value={enddate}
                            onChange={(e) => setEnddate(e.target.value)}
                            className="form-control form-control-lg"
                            min={startdate || new Date().toISOString().split('T')[0]}
                            style={{ borderRadius: "12px" }}
                          />
                          <small className="">Return Date</small>
                        </div>
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold mb-2">
                        <i className="bi bi-phone me-2 text-primary"></i>
                        M-Pesa Phone Number
                      </label>
                      <div className="input-group" style={{ borderRadius: "12px", overflow: "hidden" }}>
                        <span className="input-group-text bg-white border-end-0">
                          <i className="bi bi-credit-card text-primary"></i>
                        </span>
                        <input
                          type="tel"
                          placeholder="254712345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control form-control-lg border-start-0"
                          style={{ borderRadius: "0 12px 12px 0" }}
                        />
                      </div>
                      <small className="">Format: 254XXXXXXXX (without +)</small>
                    </div>

                    {/* Price Breakdown */}
                    {days > 0 && (
                      <div className="mb-4 p-3 bg-dark rounded-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "16px" }}>
                        <h5 className="fw-bold mb-3">Price Breakdown</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-secondary">Daily Rate:</span>
                          <span className="fw-semibold">${car.price_per_day}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-secondary">Number of Days:</span>
                          <span className="fw-semibold">{days} {days === 1 ? 'day' : 'days'}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-secondary">Rental Dates:</span>
                          <span className="small">
                            {formatDate(startdate)} - {formatDate(enddate)}
                          </span>
                        </div>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between">
                          <strong className="fs-5">Total Amount:</strong>
                          <strong className="fs-4 text-success">${total}</strong>
                        </div>
                      </div>
                    )}

                    {/* Important Info */}
                    <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: "#e3f2fd", borderRadius: "12px" }}>
                      <div className="d-flex align-items-start">
                        <i className="bi bi-info-circle-fill text-primary me-2 mt-1"></i>
                        <small className="text-secondary">
                          <strong>Important Information:</strong> You will receive an M-Pesa prompt on your phone to complete the payment. Please ensure your phone is nearby.
                        </small>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-3">
                      <button
                        type="button"
                        onClick={() => navigate("/getcar")}
                        className="btn btn-outline-secondary flex-grow-1"
                        style={{ borderRadius: "12px", padding: "12px" }}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading !== "" || total === 0}
                        className="btn btn-primary flex-grow-1"
                        style={{ 
                          borderRadius: "12px", 
                          padding: "12px",
                          fontWeight: "bold",
                          background: loading ? "#6c757d" : "#0d6efd"
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-lock-fill me-2"></i>
                            Confirm & Pay
                          </>
                        )}
                      </button>
                    </div>

                    {/* Secure Payment Badge */}
                    <div className="text-center mt-4">
                      <small className="">
                        <i className="bi bi-shield-lock-fill me-1 text-success"></i>
                        Secure payment via M-Pesa Express
                      </small>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book