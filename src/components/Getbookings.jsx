import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Getbookings = () => {
  const [loading, setLoading] = useState("")
  const [cars, setCars] = useState([])
  const [error, setError] = useState("")
  const[search,setSearch]=useState("")
  

  
 const filtered_products = cars.filter((item) => {
  const name = (item.car_name || "").toLowerCase()
  const desc = (item.car_description || "").toLowerCase()
  const term = (search || "").toLowerCase()

  return name.includes(term) || desc.includes(term)
})

  const getbookings = async () => {
    setLoading("Please wait...")
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/getbookings")
      setCars(response.data)
      setLoading("")
    } catch (error) {
      console.log(error)
      setError("Failed to load bookings")
      setLoading("")
    }
  }

  useEffect(() => {
    getbookings()
  }, [])

  const imagepath = "http://127.0.0.1:5000/static/images/"

  return (
    <div className="container py-5">
      <Navbar search={search}  setSearch={setSearch}/>
      

      {/* Header */}
      <h2 className="text-center fw-bold mb-4">
        📅 My Bookings
      </h2>

      <p className="text-center text-warning">{loading}</p>
      <p className="text-center text-danger">{error}</p>

      <div className="row">
        {filtered_products.map((booking, index) => (
          <div className="col-md-4 mb-4" key={index}>

            <div className="card car-card h-100 border-0 d-flex flex-column">

              {/* Image */}
              <div className="image-container">
                <img
                  src={imagepath + booking.car_image}
                  alt={booking.car_name}
                  className="card-img-top"
                />
              </div>

              {/* Body */}
              <div className="card-body flex-grow-1">
                <h5 className="fw-bold">{booking.car_name}</h5>

               <p className="small mb-1">
                 📅 <span style={{ color: "#94a3b8" }}>Start:</span> {booking.start_date}
                </p>

                <p className="small mb-2">
              📅 <span style={{ color: "#94a3b8" }}>End:</span> {booking.end_date}
                </p>

                <h6 className="text-primary fw-bold">
                  Ksh {booking.total_price}
                </h6>
              </div>

              {/* Footer */}
              <div className="card-footer bg-white border-0 mt-auto">
                <button className="btn btn-outline-primary w-100">
                  📄 View Booking
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Getbookings