import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
   const navigate = useNavigate();
   const [email, setEmail]= useState("")
   const [password , setPassword]= useState("")
   const [loading , setLoading]= useState("")
   const [success , setSuccess]= useState("")
   const [error , setError]= useState("")
  const handlesubmit = async (e) => {
  e.preventDefault();

  setLoading("Please wait...");
  setError("");
  setSuccess("");

  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  try {
    const response = await axios.post(
      "http://linushiggs.alwaysdata.net/api/signin",
      formdata
    );

    const user = response.data.user; // ✅ FIXED HERE

    setSuccess(response.data.message);
    setLoading("");

    // ✅ store correctly
    localStorage.setItem("user_id", user.user_id);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user_name", user.username);

    setTimeout(() => {
      navigate("/");
    }, 1000);

  } catch (error) {
    setError(error.response?.data?.message || "Login failed");
    setLoading("");
  }
};
   return (
    
    <div className=" justify-content-center container-fluid min-vh-100 d-flex  align-items-center">
        <div className="card shadow p-4 col-md-6 " style={{width: 500 }}>
             <h3 class="text-center mb-3 fw-bold thick-underline"><i className='bi bi-person' style={{ color: "#3b82f6" }}></i>Welcome back</h3>
           {loading && <div className="text-center text-primary">{loading}</div>}
             <h1>{success}</h1>
             <h1>{error}</h1>
             <form action="" onSubmit={handlesubmit}>
                <div className='form-floating mb-3'>
             <input type="email" className="form-control rounded-pill p-1.5" placeholder='name@example.com' onChange={(e)=>setEmail(e.target.value)} /> 
             <label htmlFor="" className='form-label fw-semibold '><i className="bi bi-envelope me-2" style={{ color: "#3b82f6" }}></i>Email</label>
                </div>
                <div className='form-floating mb-3'>
             <input type="password" className="form-control rounded-pill p-1.5" placeholder='Enter you Password'  onChange={(e)=>setPassword(e.target.value)} /> 
             <label htmlFor="" className='form-label fw-semibold'><i className="bi bi-lock me-2" style={{ color: "#3b82f6" }} ></i>Password</label>
                </div>
           <button type="submit" className="btn btn-primary w-100 rounded-pill click-btn">
                   <i className="bi bi-box-arrow-in-right me-2"></i>
                         Login
                  </button>
             <p className='text-center'>Don't have an account?
                <a href="/signup" className="text-decoration-none fw-semibold ms-2">Sign up</a>
             </p>
             </form>
        </div>
    </div>
  )
}

export default Signin