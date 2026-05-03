import axios from 'axios'
import React, { useState } from 'react'

const Addcar = () => {

  const [car_name, setCar_name] = useState("")
  const [car_brand, setCar_brand] = useState("")
  const [car_description, setCar_description] = useState("")
  const [price_per_day, setPrice_per_day] = useState("")
  const [car_image, setCar_image] = useState("")

  const[loading,setLoading]=useState("")
const[success,setSuccess]=useState("")
const[error,setError]=useState("")

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("Please wait...")
    const formdata = new FormData()
    formdata.append("car_name", car_name)
    formdata.append("car_brand", car_brand)
    formdata.append("car_description", car_description)
    formdata.append("price_per_day", price_per_day)
    formdata.append("car_image", car_image)
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/addcar", formdata) 
      setSuccess(response.data.message)
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">

      <div className="col-md-5">

        <div className="card shadow-lg p-4 rounded-4">
           <h1>{loading}</h1>
             <h1>{success}</h1>
             <h1>{error}</h1>

          
          <h1 className="text-center mb-4 fw-bold">
            <i className="bi bi-car-front-fill me-2" style={{ color: "#3b82f6" }}></i>
            Add New Car
          </h1>

          <form onSubmit={handlesubmit}>

            {/* CAR NAME */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder=""
                onChange={(e) => setCar_name(e.target.value)}
              />
              <label>
                <i className="bi bi-car-front me-2 text-primary"></i>
                Car Name
              </label>
            </div>

            {/* BRAND */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder=""
                onChange={(e) => setCar_brand(e.target.value)}
              />
              <label>
                <i className="bi bi-tag-fill me-2 text-primary"></i>
                Car Brand
              </label>
            </div>

            {/* DESCRIPTION */}
            <div className="form-floating mb-3">
              <textarea
                className="form-control rounded-4"
                placeholder=""
                style={{ height: "100px" }}
                onChange={(e) => setCar_description(e.target.value)}
              ></textarea>
              <label>
                <i className="bi bi-card-text me-2 text-primary"></i>
                Description
              </label>
            </div>

            {/* PRICE */}
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control rounded-pill"
                placeholder=""
                onChange={(e) => setPrice_per_day(e.target.value)}
              />
              <label>
                <i className="bi bi-cash-stack me-2 text-primary"></i>
                Price per Day (Ksh)
              </label>
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-image-fill me-2 text-primary"></i>
                Upload Car Image
              </label>
              <input
                type="file"
                className="form-control rounded-3"
                onChange={(e) => setCar_image(e.target.files[0])}
              />
            </div>

            {/* BUTTON */}
            <button type="submit" className="btn btn-primary w-100 rounded-pill fw-semibold">
              <i className="bi bi-plus-circle me-2"></i>
              Add Car
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Addcar