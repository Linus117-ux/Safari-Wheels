import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

const Book = () => {

  const { car } = useLocation().state || {}
  const imagepath = "http://127.0.0.1:5000/static/images/"

  const [phone, setPhone] = useState("")
  const [startdate, setStartdate] = useState("")
  const [enddate, setEnddate] = useState("")
  const [total, setTotal] = useState(0)
  

  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  // Calculating totals when the date changes
  useEffect(() => {
    if (startdate && enddate && car) {
      const start = new Date(startdate)
      const end = new Date(enddate)

      if (end > start) {
        const days = Math.ceil(
          (end - start) / (1000 * 60 * 60 * 24)
        )
        setTotal(days * car.price_per_day)
      } else {
        setTotal(0)
      }
    }
  }, [startdate, enddate, car])



  const Mpesapayment = async (amount, phone) => {
  const formdata = new FormData()
  formdata.append("amount", amount)
  formdata.append("phone", phone)

  const res = await axios.post("http://127.0.0.1:5000/api/mpesa_payment",formdata)

  return res.data
}

 const handlesubmit = async (e) => {
  e.preventDefault()

  if (!startdate || !enddate) {
    setError("Please select both dates")
    return
  }

  if (new Date(enddate) <= new Date(startdate)) {
    setError("End date must be after start date")
    return
  }

  if (!phone) {
    setError("Please enter your phone number")
    return
  }

  setLoading("Initializing M-Pesa payment...")
  setError("")
  setSuccess("")

  try {
    const mpesaResponse = await Mpesapayment(total, phone)
    console.log(mpesaResponse)
    setLoading("Check your phone to complete payment...")
    const formdata = new FormData()
    formdata.append("user_id", 1)
    formdata.append("car_id", car.car_id)
    formdata.append("start_date", startdate)
    formdata.append("end_date", enddate)
    formdata.append("total_price", total)
    formdata.append("phone", phone)
    await axios.post( "http://127.0.0.1:5000/api/bookings",
      formdata
    )
    setSuccess("Booking successful & payment initiated!")
    setLoading("")

  } catch (error) {
    console.log(error)
    setError("Payment or booking failed")
    setLoading("")
  }
}
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center w-100">
        <div className="col-md-8">

          <div className="card shadow-lg border-0 rounded-4 p-4">

            <h2 className="text-center fw-bold mb-3" style={{ color: "#1e3a8a" }}>
              <i className="bi bi-car-front-fill me-2"></i>
              Book Car
            </h2>

            {success && <div className="alert alert-success py-2">{success}</div>}
            {error && <div className="alert alert-danger py-2">{error}</div>}
            {loading && <div className="alert alert-warning py-2">{loading}</div>}

            <div className="text-center mb-3">
              <h5 className="fw-semibold">{car?.car_name}</h5>

              {car && (
                <img
                  src={imagepath + car.car_image}
                  alt={car.car_name}
                  className="img-fluid rounded-3 shadow-sm mt-2"
                  style={{ maxHeight: "180px", objectFit: "cover" }}
                />
              )}
            </div>

            <form onSubmit={handlesubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">Start Date</label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  onChange={(e) => setStartdate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">End Date</label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  onChange={(e) => setEnddate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <h6 className="text-primary fw-bold">
                  Ksh {car?.price_per_day} / day
                </h6>

                <h5 className="text-success fw-bold mt-2">
                  Total: Ksh {total}
                </h5>

                <input
                  type="tel"
                  className="form-control rounded-3 bg-light mt-3 text-dark"
                  placeholder="Enter your number +254*********"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <input
                type="submit"
                className="btn btn-primary w-100 rounded-3 fw-semibold"
                value="Book Now"
              />

            </form>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Book