import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from './Navbar';
import { Navigate, useNavigate } from "react-router-dom"

const Getcar = () => {
  let navigate = useNavigate();
  
  const [loading, setLoading] = useState("");
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const[search,setSearch]=useState("")
  

 const filtered_products = cars.filter((item) => {
  const name = (item.car_name || "").toLowerCase()
  const desc = (item.car_description || "").toLowerCase()
  const term = (search || "").toLowerCase()

  return name.includes(term) || desc.includes(term)
})
  const getcars = async () => {
    setLoading("Please wait");
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/getproducts");
      setCars(response.data);
      setLoading("");
    } catch (error) {
      setError("Failed to load cars");
      setLoading("");
    }
  };

  useEffect(() => {
    getcars();
  }, []);
  
  const imagepath = "http://127.0.0.1:5000/static/images/";

  return (
    <div className="container py-5">
      <Navbar search={search} setSearch={setSearch}/>
      
      
      
      <h2 className="text-center fw-bold mb-4">🚗 Explore Our Cars</h2>
      <p className="text-center text-info">{loading}</p>
      <p className="text-center text-danger">{error}</p>

      <div className="row mt-4">
        {/* FIX 2: Map over 'filtered_products' instead of 'cars' */}
        {filtered_products.map((car, index) => (
          <div className="col-md-4 mb-4" key={car.id || index}>
            <div className="card car-card h-100 border-0 d-flex flex-column">
              <div className="image-container">
                <img
                  src={imagepath + car.car_image}
                  alt={car.car_name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body flex-grow-1">
                <h5 className="fw-bold">{car.car_name}</h5>
                <p className="text-white small">{car.car_description || "No description available"}</p>
                <h6 className="text-primary fw-bold">
                  Ksh {car.price_per_day} / day
                </h6>
              </div>
              <div className="card-footer bg-white border-0 mt-auto">
                <button 
                  className="btn btn-primary w-100 mb-2" 
                  onClick={() => navigate("/book", { state: { car } })}
                >
                  🚗 Book Now
                </button>
                <button className="btn w-100 veiw-btn">
                  👁 View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show message if no cars match search */}
      {filtered_products.length === 0 && !loading && (
        <p className="text-center">No cars found matching "{search}"</p>
      )}
    </div>
  );
}


export default Getcar