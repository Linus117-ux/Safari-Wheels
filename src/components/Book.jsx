import axios from "axios"
import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const Book = () => {
  const { car } = useLocation().state || {}
  const imagepath = "http://linushiggs.alwaysdata.net/static/images/"

  const [phone, setPhone] = useState("")
  const [startdate, setStartdate] = useState("")
  const [enddate, setEnddate] = useState("")
  const [total, setTotal] = useState(0)

  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  // =========================
  // CALCULATE TOTAL PRICE
  // =========================
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

  // =========================
  // MPESA PAYMENT REQUEST
  // =========================
  const Mpesapayment = async (amount, phone) => {
    const formdata = new FormData()
    formdata.append("amount", amount)
    formdata.append("phone", phone)

    const res = await axios.post(
      "http://linushiggs.alwaysdata.net/api/mpesa_payment",
      formdata
    )

    return res.data
  }

  // =========================
  // HANDLE BOOKING
  // =========================
  const handlesubmit = async (e) => {
    e.preventDefault()
     const user_id = localStorage.getItem("user_id")

    setError("")
    setSuccess("")
    setLoading("")

    // VALIDATIONS
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

    try {
      // =========================
      // 1. SAVE BOOKING FIRST (PENDING)
      // =========================
      setLoading("Saving booking...")

      const formdata = new FormData()
      formdata.append("user_id", user_id)
      formdata.append("car_id", car.car_id)
      formdata.append("start_date", startdate)
      formdata.append("end_date", enddate)
      formdata.append("total_price", total)
      formdata.append("phone", phone)
      formdata.append("payment_status", "pending")

      // const bookingRes = await axios.post(
      //   "http://linushiggs.alwaysdata.net/api/bookings",
      //   formdata
      // )

      // const bookingId = bookingRes.data.booking_id

      // =========================
      // 2. INITIATE PAYMENT
      // =========================
      setLoading("Initiating M-Pesa payment...")

      await Mpesapayment(total, phone)

      // =========================
      // SUCCESS MESSAGE
      // =========================
      setSuccess(
        "Booking saved successfully! Check your phone to complete payment."
      )
      setLoading("")

    } catch (error) {
      console.log(error)

      // IMPORTANT: booking is still saved even if payment fails
      setError(
        "Booking saved but payment failed or not completed."
      )
      setLoading("")
    }
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-8">

          <div className="card shadow-lg border-0 rounded-4 p-4">

            <h2 className="text-center fw-bold mb-3 text-primary">
              Book Car
            </h2>

            {success && (
              <div className="alert alert-success py-2">
                {success}
              </div>
            )}

            {error && (
              <div className="alert alert-danger py-2">
                {error}
              </div>
            )}

            {loading && (
              <div className="alert alert-warning py-2">
                {loading}
              </div>
            )}

            <div className="text-center mb-3">
              <h5>{car?.car_name}</h5>

              {car && (
                <img
                  src={imagepath + car.car_image}
                  alt={car.car_name}
                  className="img-fluid rounded-3 mt-2"
                  style={{
                    maxHeight: "180px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            <form onSubmit={handlesubmit}>
              <div className="mb-3">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                    setStartdate(e.target.value)
                  }
                />
              </div>

              <div className="mb-3">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) =>
                    setEnddate(e.target.value)
                  }
                />
              </div>

              <h6 className="text-primary">
                Ksh {car?.price_per_day} / day
              </h6>

              <h5 className="text-success">
                Total: Ksh {total}
              </h5>

              <input
                type="tel"
                className="form-control mt-3 bg-white text-dark"
                placeholder="+2547XXXXXXXX"
                onChange={(e) => setPhone(e.target.value)}
              />

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
              >
                Book Now
              </button>
            </form>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Book