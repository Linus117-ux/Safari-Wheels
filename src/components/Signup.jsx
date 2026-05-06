import axios from 'axios'
import React, { useState } from 'react'

const Signup = () => {
  const [username , setUsername]=useState("")
  const [email , setEmail]=useState("")
  const [password , setPassword]=useState("")
  const [phone , setPhone]= useState("") 
  const [loading , setLoading]= useState("")
  const [success , setSuccess]= useState("")
  const [error , setError]= useState("")
  const [strength, setStrength] = useState("");
 const checkPasswordStrength = (password) => {
  if (password.length < 4) {
    return "Weak";
  } else if (password.length < 8) {
    return "Medium";
  } else {
    return "Strong";
  }
};
  const handlesubmit = async(e)=>{
        e.preventDefault()
        setLoading("Please wait...")
        const formdata = new FormData()
        formdata.append("username" , username)
        formdata.append("email" , email)
        formdata.append("password" , password)
        formdata.append("phone" , phone)
        try {
          const response = await axios.post("https://linushiggs.alwaysdata.net/api/signup" , formdata)
          setSuccess(response.data.message)
          setLoading("")
        } catch (error) {
          setError(error.message)
          setLoading("")
        }
      }

  return (
    <div className="justify-content-center container-fluid min-vh-100 d-flex  align-items-center">
        <div className="col-md-5">
          <div className='card shadow-lg p-4 rounded-4'>

            <h1 className='text-center mb-4 fw-bold'><i className='bi bi-car-front-fill me-2 thick-underline' style={{ color: "#3b82f6" }}></i>Create account</h1>
            <h2>{loading}</h2>
            <h2>{error}</h2>
            <h2>{success}</h2>
            <form action="" onSubmit={handlesubmit}>
              <div className='form-floating mb-3'>      
            <input type="username" className="form-control rounded-pill" placeholder='Enter you username' onChange={(e)=>setUsername(e.target.value)}/>          
            <label htmlFor=""><i className="bi bi-person-fill-add me-2 " style={{ color: "#3b82f6" }}></i>
              Enter username</label>       
              </div>
              <div className='form-floating mb-3 '>
            <input type="email" className="form-control rounded-pill" placeholder='enter your email'  onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor=""> <i className='bi bi-envelope-at-fill me-2 ' style={{ color: "#3b82f6" }}></i>Enter email(name@example)</label>
              </div>
              <div className='form-floating mb-3'>
            <input type="number" className="form-control rounded-pill" placeholder='enter your phone'  onChange={(e)=>setPhone(e.target.value)}/>
            <label htmlFor=""> <i className="bi bi-telephone-fill text-primary me-2"></i>254*********</label>
              </div>
              <div className='form-floating mb-3'>
            <input
  type="password"
  className="form-control rounded-pill"
  placeholder="enter your password"
  onChange={(e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(checkPasswordStrength(value));
  }}
/>
            <label htmlFor=""> <i className="bi bi-shield-lock-fill text-primary me-2"></i>Enter your password</label>
              </div>
           {password && (
  <p
    style={{
      color:
        strength === "Weak"
          ? "red"
          : strength === "Medium"
          ? "orange"
          : "green",
    }}
  >
    Password Strength: {strength}
  </p>
)}
            <button type="submit" className="btn btn-primary w-100 rounded-pill click-btn">
               <i className="bi bi-person-plus me-2"></i>
                   Create Account
                  </button>
              <p className='text-center mt-2 '>Already have an account?
                <a href="/signin" className='text-decoration-none fw-semibold ms-2 '>Login/signin</a>
              </p>
            </form>
        </div>
          </div>
    </div>
  )
}

export default Signup