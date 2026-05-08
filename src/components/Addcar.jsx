import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Addcar = () => {
  const navigate = useNavigate();

  const [car_name, setCar_name] = useState("")
  const [car_brand, setCar_brand] = useState("")
  const [car_description, setCar_description] = useState("")
  const [price_per_day, setPrice_per_day] = useState("")
  const [car_image, setCar_image] = useState("")

  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  
  useEffect(() => {  // Check if user is admin on component mount
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("Please wait...")
    setError("")
    setSuccess("")

    const formdata = new FormData()
    formdata.append("car_name", car_name)
    formdata.append("car_brand", car_brand)
    formdata.append("car_description", car_description)
    formdata.append("price_per_day", price_per_day)
    formdata.append("car_image", car_image)

    try {
      const response = await axios.post("https://linushiggs.alwaysdata.net/api/addcar", formdata)
      setSuccess(response.data.message)
      setLoading("")

      // 🔥 OPTIONAL: clear form
      setCar_name("")
      setCar_brand("")
      setCar_description("")
      setPrice_per_day("")
      setCar_image("")

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
      setLoading("")
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">

      <div className="col-md-5">
        <div className="card shadow-lg p-4 rounded-4">

          {/* STATUS */}
          {loading && <div className="text-info text-center">{loading}</div>}
          {success && <div className="text-success text-center">{success}</div>}
          {error && <div className="text-danger text-center">{error}</div>}

          <h1 className="text-center mb-4 fw-bold">
            <i className="bi bi-car-front-fill me-2 text-primary"></i>
            Add New Car
          </h1>

          <form onSubmit={handlesubmit}>

            {/* CAR NAME */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder=""
                value={car_name}
                onChange={(e) => setCar_name(e.target.value)}
              />
              <label>Car Name</label>
            </div>

            {/* BRAND */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-pill"
                value={car_brand}
                onChange={(e) => setCar_brand(e.target.value)}
              />
              <label>Car Brand</label>
            </div>

            {/* DESCRIPTION */}
            <div className="form-floating mb-3">
              <textarea
                className="form-control rounded-4"
                style={{ height: "100px" }}
                value={car_description}
                onChange={(e) => setCar_description(e.target.value)}
              ></textarea>
              <label>Description</label>
            </div>

            {/* PRICE */}
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control rounded-pill"
                value={price_per_day}
                onChange={(e) => setPrice_per_day(e.target.value)}
              />
              <label>Price per Day (Ksh)</label>
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Upload Car Image</label>
              <input
                type="file"
                className="form-control rounded-3"
                onChange={(e) => setCar_image(e.target.files[0])}
              />
            </div>

            {/* BUTTON */}
            <button type="submit" className="btn btn-primary w-100 rounded-pill fw-semibold">
              Add Car
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Addcar