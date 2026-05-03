import React, { useState } from 'react'
import axios from "axios";

const Signin = () => {
   const [email, setEmail]= useState("")
   const [password , setPassword]= useState("")
   const [loading , setLoading]= useState("")
   const [success , setSuccess]= useState("")
   const [error , setError]= useState("")
   const handlesubmit = async(e)=>{
      e.preventDefault()
      setLoading("Please wait...")
      const formdata = new FormData()
      formdata.append("email" , email)
      formdata.append("password" , password)
      try {
         const response = await axios.post("http://127.0.0.1:5000/api/signin" , formdata)
         setSuccess(response.data.message)
         setLoading("")
      } catch (error) {
         setError(error.message)
         setLoading("")
      }
   }
   return (
    
    <div className=" justify-content-center container-fluid min-vh-100 d-flex  align-items-center">
        <div className="card shadow p-4 col-md-6 " style={{width: 500 }}>
             <h3 class="text-center mb-3 fw-bold thick-underline"><i className='bi bi-person' style={{ color: "#3b82f6" }}></i>Welcome back</h3>
             <h1>{loading}</h1>
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