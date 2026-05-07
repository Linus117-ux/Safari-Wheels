import React from 'react'
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router-dom";
import Mainnav from './Mainnav';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='container-fluid p-0' style={{ background: "#0f172a" }}>
      <Mainnav />
      
      {/* Hero Section with car.jpg background */}
      <div className="hero d-flex flex-column justify-content-center align-items-center text-center">
        <div className="position-relative z-1">
          <h1 className="fw-bold display-1 mb-3 text-white" style={{
            fontSize: "4rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}>
            Find Your Perfect Ride
          </h1>
          <p className="lead fs-3 mb-4 text-white">
            Affordable, reliable car rentals across Nairobi
          </p>
          <button 
            className="btn btn-light btn-lg px-5 py-3 fw-bold shadow-lg"
            style={{
              borderRadius: "50px",
              transition: "all 0.3s ease",
              fontSize: "1.2rem",
              color: "#1e40af"
            }}
            onClick={() => navigate("/getcar")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
            }}
          >
            🚗 Browse Cars
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <div className="position-relative">
              <img
                src="/images/about-car.png"
                alt="About us"
                className="img-fluid rounded-4 shadow-lg"
                style={{ 
                  borderRadius: "20px",
                  transition: "transform 0.3s ease",
                  width: "100%",
                  height: "auto"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(30,64,175,0.1) 100%)" }}>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-4" style={{ 
              color: "#3b82f6",
              fontSize: "2.5rem"
            }}>
              About Us
            </h2>
            <p className="text-white-50 mb-3" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              At <strong className="text-primary">Linus Enterprises</strong>, we provide reliable and affordable
              car rental services designed to make your journey smooth and enjoyable.
              Whether you're traveling for business or leisure, we have the perfect
              vehicle for you.
            </p>
            <p className="text-white-50 mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              Our mission is to simplify transportation by offering a fast booking
              process, flexible rental options, and secure payments through M-Pesa.
            </p>

            <div className="row g-3 mt-2">
              <div className="col-6">
                <div className="d-flex align-items-center gap-2 p-3 rounded-3" style={{ background: "#1e293b" }}>
                  <i className="bi bi-car-front fs-4 text-primary"></i>
                  <span className="text-white fw-semibold">Wide Range of Cars</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2 p-3 rounded-3" style={{ background: "#1e293b" }}>
                  <i className="bi bi-cash-coin fs-4 text-primary"></i>
                  <span className="text-white fw-semibold">Affordable Pricing</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2 p-3 rounded-3" style={{ background: "#1e293b" }}>
                  <i className="bi bi-lightning-charge fs-4 text-primary"></i>
                  <span className="text-white fw-semibold">Easy Booking</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2 p-3 rounded-3" style={{ background: "#1e293b" }}>
                  <i className="bi bi-phone fs-4 text-primary"></i>
                  <span className="text-white fw-semibold">M-Pesa Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section py-5 mt-3" style={{ background: "#1e293b" }}>
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="p-4 rounded-3" style={{ background: "#0f172a", transition: "transform 0.3s ease", borderBottom: "3px solid #3b82f6" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <h2 className="fw-bold display-4 text-primary mb-2">50+</h2>
                <p className="text-white-50 mb-0">Cars Available</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-3" style={{ background: "#0f172a", transition: "transform 0.3s ease", borderBottom: "3px solid #3b82f6" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <h2 className="fw-bold display-4 text-primary mb-2">500+</h2>
                <p className="text-white-50 mb-0">Bookings</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-3" style={{ background: "#0f172a", transition: "transform 0.3s ease", borderBottom: "3px solid #3b82f6" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <h2 className="fw-bold display-4 text-primary mb-2">100+</h2>
                <p className="text-white-50 mb-0">Happy Clients</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-3" style={{ background: "#0f172a", transition: "transform 0.3s ease", borderBottom: "3px solid #3b82f6" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <h2 className="fw-bold display-4 text-primary mb-2">24/7</h2>
                <p className="text-white-50 mb-0">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hot Deals Section */}
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-5" style={{ 
          color: "#3b82f6",
          fontSize: "2.5rem"
        }}>
          🔥 Hot Deals
        </h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 p-4 shadow-lg h-100" style={{ 
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              borderRadius: "20px",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <i className="bi bi-calendar-week fs-1 mb-3 text-white"></i>
              <h5 className="fw-bold text-white">Weekend Offer</h5>
              <p className="text-white-50 mb-0">Get 20% off on weekend bookings</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 p-4 shadow-lg h-100" style={{ 
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
              borderRadius: "20px",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <i className="bi bi-gift fs-1 mb-3 text-white"></i>
              <h5 className="fw-bold text-white">First Booking</h5>
              <p className="text-white-50 mb-0">New users get Ksh 500 discount</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 p-4 shadow-lg h-100" style={{ 
              background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
              borderRadius: "20px",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <i className="bi bi-calendar-range fs-1 mb-3 text-white"></i>
              <h5 className="fw-bold text-white">Long Rentals</h5>
              <p className="text-white-50 mb-0">Save more on weekly rentals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Car Assistant Section */}
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-4" style={{ 
          color: "#3b82f6",
          fontSize: "2.5rem"
        }}>
          🤖 Smart Car Assistant
        </h2>
        <p className="lead text-white-50 mb-5" style={{ fontSize: "1.2rem" }}>
          Our AI-powered chatbot helps you find the perfect car instantly.
          Just ask anything about available vehicles, pricing, performance, or booking details.
        </p>
        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <div className="p-4 rounded-3 h-100" style={{ background: "#1e293b", transition: "transform 0.3s ease", borderTop: "3px solid #3b82f6" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}>
              <i className="bi bi-car-front fs-1 text-primary mb-3 d-block"></i>
              <h5 className="fw-bold text-white mb-3">🚗 Car Information</h5>
              <p className="text-white-50 mb-0">
                Get full details like engine, horsepower, speed, fuel type, and price.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded-3 h-100" style={{ background: "#1e293b", transition: "transform 0.3s ease", borderTop: "3px solid #3b82f6" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}>
              <i className="bi bi-chat-dots fs-1 text-primary mb-3 d-block"></i>
              <h5 className="fw-bold text-white mb-3">💬 Instant Answers</h5>
              <p className="text-white-50 mb-0">
                Ask questions like "Different brands, newton metre and their current prices?" and get instant responses.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded-3 h-100" style={{ background: "#1e293b", transition: "transform 0.3s ease", borderTop: "3px solid #3b82f6" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}>
              <i className="bi bi-calendar-check fs-1 text-primary mb-3 d-block"></i>
              <h5 className="fw-bold text-white mb-3">📅 Booking Help</h5>
              <p className="text-white-50 mb-0">
                The chatbot guides you on how to book your dream car easily.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 p-4 rounded-3" style={{ 
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          borderRadius: "20px"
        }}>
          <strong className="fs-5 text-white">💡 Tip:</strong> <span className="text-white">Want to buy or rent a car? Just talk to the chatbot — it will show you available cars and guide you step by step.</span>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-5 rounded-4 text-center h-100" style={{ background: "#1e293b", borderBottom: "3px solid #3b82f6" }}>
              <h2 className="fw-bold mb-4" style={{ color: "#3b82f6" }}>What Our Customers Say</h2>
              <div className="mb-4">
                <i className="bi bi-star-fill text-warning fs-4"></i>
                <i className="bi bi-star-fill text-warning fs-4 mx-1"></i>
                <i className="bi bi-star-fill text-warning fs-4"></i>
                <i className="bi bi-star-fill text-warning fs-4 mx-1"></i>
                <i className="bi bi-star-fill text-warning fs-4"></i>
              </div>
              <p className="text-white-50 fs-5 mb-0">"Very smooth booking experience!"</p>
              <p className="text-white-50 fs-5 mt-3 mb-0">"Affordable and reliable cars!"</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-5 rounded-4 text-center h-100" style={{ background: "#1e293b", borderBottom: "3px solid #3b82f6" }}>
              <h2 className="fw-bold mb-4" style={{ color: "#3b82f6" }}>Customer Reviews</h2>
              <div className="mb-4">
                <i className="bi bi-star-fill text-warning fs-4"></i>
                <i className="bi bi-star-fill text-warning fs-4 mx-1"></i>
                <i className="bi bi-star-fill text-warning fs-4"></i>
                <i className="bi bi-star-fill text-warning fs-4 mx-1"></i>
                <i className="bi bi-star-fill text-warning fs-4"></i>
              </div>
              <p className="text-white-50 fs-5 mb-0">"Smooth booking and great cars!"</p>
              <p className="text-white-50 fs-5 mt-3 mb-0">"M-Pesa payment was fast and easy!"</p>
              <p className="text-white-50 fs-5 mt-3 mb-0">"Highly recommend for Nairobi travel!"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location & Help Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-5 rounded-4 text-center h-100" style={{ background: "#1e293b", borderBottom: "3px solid #3b82f6" }}>
              <i className="bi bi-geo-alt fs-1 text-primary mb-3 d-block"></i>
              <h2 className="fw-bold mb-3" style={{ color: "#f1f5f9" }}>Where We Operate</h2>
              <p className="text-white-50 fs-5 mb-0">
                Serving Nairobi and surrounding areas including Westlands, CBD, Karen, and Thika Road.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-5 rounded-4 text-center h-100" style={{ background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)" }}>
              <i className="bi bi-headset fs-1 text-white mb-3 d-block"></i>
              <h2 className="fw-bold mb-3 text-white">Need Help?</h2>
              <p className="text-white-50 fs-5 mb-4">Contact us anytime for assistance</p>
              <button className="btn btn-light btn-lg px-5 rounded-pill fw-bold"
                style={{ color: "#1e40af" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "white";
                }}
                onClick={() => window.location.href = "tel:+254700000000"}>
                📞 Call Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Banner */}
      <div className="container mb-5">
        <div className="p-4 text-center rounded-4" style={{ 
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          borderRadius: "20px"
        }}>
          <p className="fs-5 mb-0 fw-semibold text-white">
            🔒 Secure Payments | 📱 M-Pesa Verified | ✅ Trusted Service
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-5 pb-3 mt-5" style={{ background: "#0f172a !important" }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h4 className="fw-bold mb-3">
                <span className="text-primary">LINUS</span> <span className="text-white">ENTERPRISES</span>
              </h4>
              <p className="text-white-50">
                Affordable and reliable car rentals across Nairobi. 
                Book your ride easily and pay securely via M-Pesa.
              </p>
              <h5 className="text-primary mb-3">Stay connected</h5>
              <div className="d-flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                  className="text-white text-decoration-none"
                  style={{ transition: "transform 0.3s ease", display: "inline-block" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <img src="images/fb.png" alt="facebook" style={{ width: "40px" }}/>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  style={{ transition: "transform 0.3s ease", display: "inline-block" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <img src="images/in.png" alt="instagram" style={{ width: "40px" }}/>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  style={{ transition: "transform 0.3s ease", display: "inline-block" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <img src="images/x.png" alt="twitter" style={{ width: "40px" }}/>
                </a>
              </div>
              <p className="text-white-50 mt-3">Make sure you follow us on the Webpages above in order to be notified of any new releases.</p>
            </div>

            <div className="col-md-2">
              <h6 className="fw-bold text-primary mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/" className="text-white-50 text-decoration-none" style={{ transition: "color 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>Home</a></li>
                <li className="mb-2"><a href="/getcar" className="text-white-50 text-decoration-none" style={{ transition: "color 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>Cars</a></li>
                <li className="mb-2"><a href="/getbookings" className="text-white-50 text-decoration-none" style={{ transition: "color 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>Bookings</a></li>
              </ul>
            </div>

            <div className="col-md-3">
              <h6 className="fw-bold text-primary mb-3">Services</h6>
              <ul className="list-unstyled">
                <li className="mb-2 text-white-50">Car Rentals</li>
                <li className="mb-2 text-white-50">Chauffeur Services</li>
                <li className="mb-2 text-white-50">Airport Pickup</li>
              </ul>
            </div>

            <div className="col-md-3">
              <h6 className="fw-bold text-primary mb-3">Contact Us</h6>
              <p className="text-white-50 mb-2">📍 Nairobi, Kenya</p>
              <p className="text-white-50 mb-2">📞 +254 700 000 000</p>
              <p className="text-white-50">✉ info@safariwheels.com</p>
            </div>
          </div>

          <hr className="border-secondary mt-4" />

          <div className="text-center pt-3">
            <p className="mb-0 text-white-50">
              © 2026 Safari Wheels | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}

export default Dashboard