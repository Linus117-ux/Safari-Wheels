import React from 'react'
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router-dom";
import Mainnav from './Mainnav';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='container-fluid p-0'>
      <Mainnav />
       <div className="bg-dark text-white text-center d-flex flex-column justify-content-center align-items-center  hero">
        
        <h1 className="fw-bold display-4">Find Your Perfect Ride</h1>
        <p className="lead">Affordable, reliable car rentals across Nairobi</p>

        <button 
          className="btn btn-primary btn-lg mt-3"
          onClick={() => navigate("/getcar")}
        >
          🚗 Browse Cars
        </button>
      </div>

      <div className=" py-5 text-center">
  <div className="container">
    <h2 className="fw-bold mb-4">Trusted by Drivers</h2>

    <div className="row">
      <div className="col-md-4">
        <h3>500+</h3>
        <p>Bookings</p>
      </div>

      <div className="col-md-4">
        <h3>50+</h3>
        <p>Cars Available</p>
      </div>

      <div className="col-md-4">
        <h3>100%</h3>
        <p>Satisfied Clients</p>
      </div>
    </div>
  </div>
</div>


      <div className="row align-items-center">

    
        <div className="col-md-6 mb-4">
          <img
            src="/images/about-car.png"
            alt="About us"
            className="img-fluid rounded-4 shadow"
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold mb-3">About Us</h2>

          <p className="text-white">
            At <strong>Linus Enterprises</strong>, we provide reliable and affordable
            car rental services designed to make your journey smooth and enjoyable.
            Whether you're traveling for business or leisure, we have the perfect
            vehicle for you.
          </p>

          <p className="text-white">
            Our mission is to simplify transportation by offering a fast booking
            process, flexible rental options, and secure payments through M-Pesa.
          </p>



        
        
          <div className="row mt-4">
            <div className="col-6 mb-3">
              <h6>🚗 Wide Range of Cars</h6>
            </div>

            <div className="col-6 mb-3">
              <h6>💰 Affordable Pricing</h6>
            </div>

            <div className="col-6 mb-3">
              <h6>⚡ Easy Booking</h6>
            </div>

            <div className="col-6 mb-3">
              <h6>📱 M-Pesa Payments</h6>
            </div>
          </div>

        </div>
      </div>


      <div className=" text-white py-5">
  <div className="container text-center">

    <div className="row">

      <div className="col-md-3" >
        <h2 className="fw-bold">50+</h2>
        <p>Cars Available</p>
      </div>

      <div className="col-md-3">
        <h2 className="fw-bold">500+</h2>
        <p>Bookings</p>
      </div>

      <div className="col-md-3" >
        <h2 className="fw-bold">100+</h2>
        <p>Happy Clients</p>
      </div>

      <div className="col-md-3" >
        <h2 className="fw-bold">24/7</h2>
        <p>Support</p>
      </div>

    </div>

  </div>
</div>


<div className="container py-5 text-center">
  <h2 className="fw-bold mb-4">🔥 Hot Deals</h2>

  <div className="row">
    <div className="col-md-4">
      <div className="card shadow border-0 p-3 bg-primary">
        <h5>Weekend Offer</h5>
        <p>Get 20% off on weekend bookings</p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card shadow border-0 p-3 bg-primary">
        <h5>First Booking</h5>
        <p>New users get Ksh 500 discount</p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card shadow border-0 p-3 bg-primary">
        <h5>Long Rentals</h5>
        <p>Save more on weekly rentals</p>
      </div>
    </div>
  </div>
</div>
<div className="container py-5 text-center">
  <h2 className="fw-bold mb-3">🤖 Smart Car Assistant</h2>

  <p className="lead text-white">
    Our AI-powered chatbot helps you find the perfect car instantly.
    Just ask anything about available vehicles, pricing, performance, or booking details.
  </p>

  <div className="row mt-4">
    <div className="col-md-4">
      <h5>🚗 Car Information</h5>
      <p className="text-white">
        Get full details like engine, horsepower, speed, fuel type, and price.
      </p>
    </div>

    <div className="col-md-4">
      <h5>💬 Instant Answers</h5>
      <p className="text-white">
        Ask questions like "Different brands, newton metre  and their current prices?" and get instant responses.
      </p>
    </div>

    <div className="col-md-4">
      <h5>📅 Booking Help</h5>
      <p className="text-white">
        The chatbot guides you on how to book your dream car easily.
      </p>
    </div>
  </div>

  <div className="mt-4 p-3 bg-primary text-white rounded">
    <strong>💡 Tip:</strong> Want to buy or rent a car? Just talk to the chatbot — it will show you available cars and guide you step by step.
  </div>
</div>




<div className="row">


    <div className=" py-5 text-center col-md-6">
  <h2 className="fw-bold mb-4">What Our Customers Say</h2>

  <p>"Very smooth booking experience!"</p>
  <p>"Affordable and reliable cars!"</p>
</div>

<div className=" py-5 text-center col-md-6">
  <div className="container">
    <h2 className="fw-bold mb-4">Customer Reviews</h2>

    <p>"Smooth booking and great cars!" ⭐⭐⭐⭐⭐</p>
    <p>"M-Pesa payment was fast and easy!" ⭐⭐⭐⭐⭐</p>
    <p>"Highly recommend for Nairobi travel!" ⭐⭐⭐⭐⭐</p>
  </div>
</div>

</div>

<div className="row">

<div className="col-md-6 py-5 text-center">
  <h2 className="fw-bold mb-3">Where We Operate</h2>
  <p className="text-white">
    Serving Nairobi and surrounding areas including Westlands, CBD, Karen, and Thika Road.
  </p>
</div>

<div className=" text-white text-center py-5 col-md-6">
  <h2 className="fw-bold">Need Help?</h2>
  <p>Contact us anytime for assistance</p>

  <button className="btn btn-light mt-2">
    📞 Call Us
  </button>
</div>


</div>



<div className="container py-4 text-center bg-primary text-white rounded-3">
  <p>🔒 Secure Payments | 📱 M-Pesa Verified | ✅ Trusted Service</p>
</div>



 <footer id="footer" className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">

        <div className="row">

         
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">
              <span className="text-primary">LINUS</span> ENTERPRISES
            </h4>
            <p >
              Affordable and reliable car rentals across Nairobi. 
              Book your ride easily and pay securely via M-Pesa.
            </p>
             <h2 class=" text-primary">Stay connected</h2>
                <a href="https://facebook.com">
                    <img src="images/fb.png" alt="facebook"/>
                </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://instagram.com">
                    <img src="images/in.png" alt="instagram"/>
                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://x.com">
                    <img src="images/x.png" alt="twitter"/>
                </a>
                <p class="text-white">Make sure you follow us on the Webpages above in order to be notified of any new
                    releases.</p>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none">Home</a></li>
              <li><a href="/getcar" className=" text-decoration-none">Cars</a></li>
              <li><a href="/getbookings" className=" text-decoration-none">Bookings</a></li>
            </ul>
          </div>

     
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Services</h6>
            <ul className="list-unstyled">
              <li className="">Car Rentals</li>
              <li className="">Chauffeur Services</li>
              <li className="">Airport Pickup</li>
            </ul>
          </div>

    
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Contact Us</h6>
            <p className=" mb-1">📍 Nairobi, Kenya</p>
            <p className=" mb-1">📞 +254 700 000 000</p>
            <p className="text-white">✉ info@safariwheels.com</p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          <p className="mb-0 text-white">
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