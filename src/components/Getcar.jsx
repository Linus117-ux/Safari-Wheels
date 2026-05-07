import React, { useEffect, useState } from 'react'
import axios from "axios";
import Chatbot from "./Chatbot";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom"

const Getcar = () => {
  let navigate = useNavigate();
 
  
  const [loading, setLoading] = useState("");
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const[search,setSearch]=useState("")
  const user = localStorage.getItem("user_id");
  const [brand, setBrand] = useState("");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [sort, setSort] = useState("");
  

 const filtered_products = cars
  .filter((item) => {
    const searchTerm = (search || "").toLowerCase();
    const brandTerm = (brand || "").toLowerCase();

    const name = (item.car_name || "").toLowerCase();
    const desc = (item.car_description || "").toLowerCase();
    const carBrand = (item.car_brand || "").toLowerCase();

   
    const matchesSearch =
      name.includes(searchTerm) ||
      desc.includes(searchTerm) ||
      carBrand.includes(searchTerm);

  
    const matchesBrand =
      brandTerm === "" || carBrand.includes(brandTerm);

   
    const price = Number(item.price_per_day);

    const matchesPrice =
      (!minPrice || price >= Number(minPrice)) &&
      (!maxPrice || price <= Number(maxPrice));

    return matchesSearch && matchesBrand && matchesPrice;
  })
  .sort((a, b) => {
    if (sort === "low-high") return a.price_per_day - b.price_per_day;
    if (sort === "high-low") return b.price_per_day - a.price_per_day;
    return 0;
  });
  const getcars = async () => {
    setLoading("Please wait");
    try {
      const response = await axios.get("https://linushiggs.alwaysdata.net/api/getproducts");
      setCars(response.data);
      setLoading("");
    } catch (error) {
      setError("Failed to load cars");
      setLoading("");
    }
  };

   useEffect(() => {
    if (!user) {
      navigate("/signin");
    }else {
      getcars();
    }
  }, [user, navigate]);
  const imagepath = "https://linushiggs.alwaysdata.net/static/images/";

  return (
    <div className="container py-5">
      <Navbar search={search} setSearch={setSearch}/>
      
      
      
      <h2 className="text-center fw-bold mb-4">🚗 Explore Our Cars</h2>
      <p className="text-center text-info">{loading}</p>
      <p className="text-center text-danger">{error}</p>
      <div className="row mb-4">
  

  <div className="col-md-2">
    <label htmlFor="" className='form-label fw-semibold'><i className="bi bi-lock me-2" style={{ color: "#3b82f6" }} ></i>Brand</label>

    <input
      className="form-control text-white"
      placeholder="Brand"
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
    />
  </div>

  <div className="col-md-2">
    <label htmlFor="" className='form-label fw-semibold'><i className="bi bi-cash-coin" style={{ color: "#3b82f6" }} ></i>Min Price</label>

    <input
      type="number"
      className="form-control"
      placeholder="Min Price"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
    />
  </div>

  <div className="col-md-2">
    <label htmlFor="" className='form-label fw-semibold'><i className="bi bi-wallet2" style={{ color: "#3b82f6" }} ></i>Max Price</label>
    <input
      type="number"
      className="form-control"
      placeholder="Max Price"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
    />
    
  </div>

  <div className="col-md-3">
    <label className="form-label">
  <i className="bi bi-sort-numeric-down me-1"></i>
  Sort By
</label>
    <select
      className="form-control"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="">Select</option>
      <option value="low-high">Price: Low → High</option>
      <option value="high-low">Price: High → Low</option>
    </select>
  </div>
</div>

      <div className="row mt-4">
      
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
                   {car.price_per_day} $/ day
                </h6>
              </div>
              <div className="card-footer bg-white border-0 mt-auto">
                <button 
                  className="btn btn-primary w-100 mb-2" 
                  onClick={() => navigate("/book", { state: { car } })}
                >
                  🚗 Book Now
                </button>
                <button  className="btn w-100 veiw-btn"
  onClick={() => navigate("/chatbot", { state: { car } })}
                    >
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

      <Chatbot />
    </div>
  );
}


export default Getcar