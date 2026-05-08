import React, { useEffect, useState } from 'react'
import axios from "axios";
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router-dom"

const Getcar = () => {
  let navigate = useNavigate();
 
  const [loading, setLoading] = useState("");
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("")
  const user = localStorage.getItem("user_id"); 
  // Gets logged-in user from browser storage
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // State for pagination/load more
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading state for load more button
  
  // Creates filtered and sorted cars list
  const filtered_products = cars 
    .filter((item) => {
      // Avoids error if search is null/undefined. Converts to lowercase for case-insensitive search.
      const searchTerm = (search || "").toLowerCase(); 
      const brandTerm = (brand || "").toLowerCase();
      const name = (item.car_name || "").toLowerCase();
      const desc = (item.car_description || "").toLowerCase();
      const carBrand = (item.car_brand || "").toLowerCase();
     
      const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm) || carBrand.includes(searchTerm); // Checks if search term is in name, description, or brand.
      const matchesBrand = brandTerm === "" || carBrand.includes(brandTerm); // If brand filter is empty, matches all. Otherwise checks if car brand includes the filter term.
      const price = Number(item.price_per_day); // Converts price to number for comparison. Assumes price_per_day is a valid number string.
      const matchesPrice = (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice)); // Checks if price is within min and max range. If minPrice is empty, ignores lower bound. If maxPrice is empty, ignores upper bound.
      return matchesSearch && matchesBrand && matchesPrice; // Only includes cars that match all filters.
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price_per_day - b.price_per_day;
      if (sort === "high-low") return b.price_per_day - a.price_per_day;
      return 0;
    });

  // Get visible cars based on load more count
  const visibleCars = filtered_products.slice(0, visibleCount);
  const hasMoreCars = visibleCount < filtered_products.length;

  const getcars = async () => {
    setLoading("Please wait");
    try {
      const response = await axios.get("https://linushiggs.alwaysdata.net/api/getproducts");
      setCars(response.data);
      setLoading("");
      setVisibleCount(6); // Reset visible count when new cars are loaded
    } catch (error) {
      setError("Failed to load cars");
      setLoading("");
    }
  };

  // Load more cars function
  const loadMoreCars = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + 6);
      setIsLoadingMore(false);
    }, 500);
  };

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [search, brand, minPrice, maxPrice, sort]);

  useEffect(() => {
    getcars();
  }, []);

  const imagepath = "https://linushiggs.alwaysdata.net/static/images/";

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "1rem"
        }}>
          🚗 Explore Our Premium Cars
        </h1>
        <p className="lead text-white-50">Find your perfect ride from our collection of luxury vehicles</p>
      </div>

      {/* Loading & Error Messages */}
      {loading && (
        <div className="text-center mb-4">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white-50 mt-2">{loading}</p>
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> // Displays error message if loading cars fails.
      )}

      {/* Filters Section */}
              {/* // Search input for filtering cars by name, brand, or description. Updates 'search' state on change. */}
      <div className="card shadow-sm border-0 mb-5" style={{ borderRadius: "20px", background: "#1e293b" }}>
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-semibold text-white">
                <i className="bi bi-search me-2 text-primary"></i>Search
              </label>
              <input
                className="form-control border-0 shadow-sm"
                style={{ borderRadius: "12px", padding: "10px 15px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155" }}
                placeholder="Search by name, brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          
              {/* // Input for filtering cars by brand. Updates 'brand' state on change. */}
            <div className="col-md-2">
              <label className="form-label fw-semibold text-white">
                <i className="bi bi-tag me-2 text-primary"></i>Brand
              </label>
              <input
                className="form-control border-0 shadow-sm"
                style={{ borderRadius: "12px", padding: "10px 15px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155" }}
                placeholder="Filter by brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div> 

              {/* // Input for filtering cars by minimum price. Updates 'minPrice' state on change. */}
            <div className="col-md-2">
              <label className="form-label fw-semibold text-white">
                <i className="bi bi-cash-stack me-2 text-primary"></i>Min Price
              </label>
              <input
                type="number"
                className="form-control border-0 shadow-sm"
                style={{ borderRadius: "12px", padding: "10px 15px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155" }}
                placeholder="Min $"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                />
                </div>

              {/* // Input for filtering cars by maximum price. Updates 'maxPrice' state on change. */}
            <div className="col-md-2">
              <label className="form-label fw-semibold text-white">
                <i className="bi bi-wallet2 me-2 text-primary"></i>Max Price
              </label>
              <input
                type="number"
                className="form-control border-0 shadow-sm"
                style={{ borderRadius: "12px", padding: "10px 15px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155" }}
                placeholder="Max $"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold text-white">
                <i className="bi bi-arrow-down-up me-2 text-primary"></i>Sort By
              </label>
              {/* // Dropdown for sorting cars by price. Updates 'sort' state on change. */}
              <select
                className="form-select border-0 shadow-sm"
                style={{ borderRadius: "12px", padding: "10px 15px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155" }}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Default</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
              </select> 
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="row g-4 mt-2">
        {visibleCars.map((car, index) => (
          <div className="col-md-6 col-lg-4" key={car.id || index}>
            <div className="card h-100 border-0 shadow-lg" style={{ 
              borderRadius: "20px", 
              overflow: "hidden",
              background: "#1e293b",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1rem 3rem rgba(0,0,0,0.2)";
            }}> 
            {/* // Card for each car. Displays image, name, brand, description, price, and action buttons. Has hover effects for interactivity. */}
              
              {/* Image Container */}
              <div className="position-relative overflow-hidden" style={{ height: "240px" }}>
                <img
                  src={imagepath + car.car_image}
                  alt={car.car_name}
                  className="w-100 h-100"
                  style={{ 
                    objectFit: "cover",
                    transition: "transform 0.5s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-primary rounded-pill px-3 py-2 shadow-sm">
                    <i className="bi bi-star-fill me-1"></i> Featured
                  </span>
                </div>
              </div>

              {/* Card Body - Car Details Section */}
              <div className="card-body p-4" style={{ background: "#1e293b" }}>
                <h4 className="card-title fw-bold mb-2" style={{ color: "#f1f5f9" }}>
                  {car.car_name}
                </h4>
                <p className="text-primary mb-3" style={{ fontSize: "0.9rem" }}>
                  <i className="bi bi-tag me-1"></i>
                  {car.car_brand || "Premium Vehicle"}
                </p>
                
                {/* Car Description */}
                <p className="card-text mb-3" style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  {car.car_description || "Experience luxury and comfort with this premium vehicle. Perfect for any occasion."}
                </p>
                
                {/* Price Tag */}
                <div className="d-flex align-items-baseline mb-3">
                  <span className="display-6 fw-bold text-primary">${car.price_per_day}</span>
                  <span className="text-white-50 ms-2">/ day</span>
                </div>
              </div>

              {/* Card Footer with Action Buttons */}
              <div className="card-footer bg-transparent border-0 p-4 pt-0" style={{ background: "#1e293b" }}>
                <button 
                  className="btn btn-primary w-100 mb-2 fw-semibold py-2"
                  style={{ 
                    borderRadius: "12px",
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => {
                    if (!user) {
                      navigate("/signin");
                    } else {
                      navigate("/book", { state: { car } });
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(13,110,253,0.3)";
                  }} // Button for booking the car. If user is not logged in, redirects to sign-in page. Otherwise, navigates to booking page with car details in state.
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <i className="bi bi-calendar-check me-2"></i>
                  Book Now
                </button>
                
                <button
                  className="btn w-100 py-2"
                  style={{ 
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    background: "rgba(13, 110, 253, 0.1)",
                    color: "#3b82f6",
                    border: "1px solid rgba(59, 130, 246, 0.3)"
                  }}
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("openChatbot", {
                        detail: {
                          message: `Tell me about ${car.car_brand} ${car.car_name}`
                        } // Dispatches custom event to open chatbot with specific car details; Chatbot component listens for this event
                      })
                    )
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(13, 110, 253, 0.2)";
                    e.currentTarget.style.border = "1px solid #3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(13, 110, 253, 0.1)";
                    e.currentTarget.style.border = "1px solid rgba(59, 130, 246, 0.3)";
                  }}
                >
                  <i className="bi bi-robot me-2"></i>
                  Chat with Assistant
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
      {!loading && filtered_products.length > 0 && (
        <div className="text-center mt-5">
          {hasMoreCars ? (
            <button
              className="btn px-5 py-3 fw-semibold"
              onClick={loadMoreCars}
              disabled={isLoadingMore}
              style={{
                borderRadius: "50px",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "white",
                border: "none",
                transition: "all 0.3s ease",
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
              }}
              onMouseEnter={(e) => {
                if (!isLoadingMore) {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.3)";
              }}
            >
              {isLoadingMore ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Loading More Cars...
                </>
              ) : (
                <>
                  <i className="bi bi-arrow-down-circle me-2 fs-5"></i>
                  Load More Cars ({filtered_products.length - visibleCount} remaining)
                </>
              )}
            </button>
          ) : (
            <div className="mt-4 p-3 rounded-3" style={{ background: "#1e293b", borderRadius: "12px" }}>
              <p className="text-white-50 mb-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                You've seen all {filtered_products.length} cars! 🎉
              </p>
            </div>
          )}
          
          {/* Show current count */}
          <p className="text-white-50 small mt-3">
            Showing {visibleCars.length} of {filtered_products.length} cars
          </p>
        </div>
      )}
      
      {/* No Results Message */}
      {filtered_products.length === 0 && !loading && (
        <div className="text-center py-5 mt-4">
          <i className="bi bi-emoji-frown display-1 text-white-50"></i>
          <h3 className="mt-3 text-white">No cars found</h3>
          <p className="text-white-50">Try adjusting your search or filter criteria</p>
          <button 
            className="btn btn-primary mt-2"
            onClick={() => {
              setSearch("");
              setBrand("");
              setMinPrice("");
              setMaxPrice("");
              setSort("");
            }}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Clear All Filters
          </button>
        </div>
      )}

      <Chatbot />

      {/* Custom CSS Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card {
          animation: fadeIn 0.6s ease-out;
          animation-fill-mode: both;
        }
        
        .card:nth-child(n) {
          animation-delay: calc(0.1s * var(--index, 0));
        }
        
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
          border-color: #3b82f6;
        }
        
        .form-control::placeholder {
          color: #64748b;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f172a;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}

export default Getcar;