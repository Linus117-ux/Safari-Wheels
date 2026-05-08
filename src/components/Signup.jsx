import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  
  const [showPassword, setShowPassword] = useState(false)

  const checkPasswordStrength = (password) => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++ // Check for special characters
    
    if (password.length === 0) return ""
    if (score <= 2) return { text: "Weak", color: "#ef4444", width: "33%" }
    if (score <= 4) return { text: "Medium", color: "#f59e0b", width: "66%" }
    return { text: "Strong", color: "#10b981", width: "100%" }
  }

  const passwordStrength = checkPasswordStrength(password) // Get password strength info based on current password input

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    
    const formdata = new FormData()
    formdata.append("username", username)
    formdata.append("email", email)
    formdata.append("password", password)
    formdata.append("phone", phone)
    
    try {
      const response = await axios.post("https://linushiggs.alwaysdata.net/api/signup", formdata)
      setSuccess(response.data.message)
      setTimeout(() => {
        navigate("/signin")
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" 
         style={{ 
           background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
           padding: "20px"
         }}>
      <div className="col-md-5 col-lg-4">
        {/* Main Card */}
        <div className="card border-0 shadow-xl" style={{ 
          borderRadius: "24px", 
          background: "#1e293b",
          backdropFilter: "blur(10px)",
          overflow: "hidden"
        }}>
          
          {/* Decorative Header */}
          <div style={{ 
            height: "4px", 
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)"
          }}></div>
          
          <div className="p-4 p-md-5">
            {/* Logo and Title */}
            <div className="text-center mb-4">
              <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                borderRadius: "20px",
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
              }}>
                <i className="bi bi-car-front-fill fs-1 text-white"></i>
              </div>
              <h1 className="fw-bold mb-2" style={{ 
                background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.75rem"
              }}>
                Create Account
              </h1>
              <p className="text-white-50 small">Join Safari Wheels and start your journey</p>
            </div>

            {/* Alerts */}
            {success && (
              <div className="alert alert-success border-0 rounded-3 mb-3 d-flex align-items-center" style={{ background: "#064e3b", color: "#a7f3d0", border: "1px solid #10b981" }}>
                <i className="bi bi-check-circle-fill me-2"></i>
                <div className="flex-grow-1">{success}</div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSuccess("")}></button>
              </div>
            )}
            
            {error && (
              <div className="alert alert-danger border-0 rounded-3 mb-3 d-flex align-items-center" style={{ background: "#7f1d1d", color: "#fecaca", border: "1px solid #ef4444" }}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div className="flex-grow-1">{error}</div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setError("")}></button>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="mb-3">
                <label className="form-label text-white-50 small fw-semibold mb-2">
                  <i className="bi bi-person-fill-add me-1 text-primary"></i> Username
                </label>
                <div className="input-group">
                  <span className="input-group-text border-0" style={{ background: "#0f172a", borderRadius: "12px 0 0 12px" }}>
                    <i className="bi bi-person text-primary"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-0" 
                    style={{ 
                      background: "#0f172a", 
                      color: "#f1f5f9",
                      borderRadius: "0 12px 12px 0",
                      padding: "12px 15px"
                    }}
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label className="form-label text-white-50 small fw-semibold mb-2">
                  <i className="bi bi-envelope-at-fill me-1 text-primary"></i> Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text border-0" style={{ background: "#0f172a", borderRadius: "12px 0 0 12px" }}>
                    <i className="bi bi-envelope text-primary"></i>
                  </span>
                  <input 
                    type="email" 
                    className="form-control border-0" 
                    style={{ 
                      background: "#0f172a", 
                      color: "#f1f5f9",
                      borderRadius: "0 12px 12px 0",
                      padding: "12px 15px"
                    }}
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="mb-3">
                <label className="form-label text-white-50 small fw-semibold mb-2">
                  <i className="bi bi-telephone-fill me-1 text-primary"></i> Phone Number
                </label>
                <div className="input-group">
                  <span className="input-group-text border-0" style={{ background: "#0f172a", borderRadius: "12px 0 0 12px" }}>
                    <i className="bi bi-phone text-primary"></i>
                  </span>
                  <input 
                    type="tel" 
                    className="form-control border-0" 
                    style={{ 
                      background: "#0f172a", 
                      color: "#f1f5f9",
                      borderRadius: "0 12px 12px 0",
                      padding: "12px 15px"
                    }}
                    placeholder="254712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-2">
                <label className="form-label text-white-50 small fw-semibold mb-2">
                  <i className="bi bi-shield-lock-fill me-1 text-primary"></i> Password
                </label>
                <div className="input-group">
                  <span className="input-group-text border-0" style={{ background: "#0f172a", borderRadius: "12px 0 0 12px" }}>
                    <i className="bi bi-lock text-primary"></i>
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control border-0" 
                    style={{ 
                      background: "#0f172a", 
                      color: "#f1f5f9",
                      borderRadius: 0,
                      padding: "12px 15px"
                    }}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* Toggle Password Visibility */}
                  <button
                    type="button"
                    className="input-group-text border-0"
                    style={{ background: "#0f172a", borderRadius: "0 12px 12px 0", cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-primary`}></i>
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-white-50">Password Strength</small>
                    <small style={{ color: passwordStrength.color }}>{passwordStrength.text}</small>
                  </div>
                  <div className="progress rounded-pill" style={{ height: "6px", background: "#334155" }}>
                    <div 
                      className="progress-bar rounded-pill transition-all" 
                      style={{ 
                        width: passwordStrength.width,
                        background: passwordStrength.color,
                        transition: "width 0.3s ease"
                      }}
                    ></div>
                  </div>
                  <ul className="list-unstyled mt-2 small">
                    <li className={password.length >= 8 ? "text-success" : "text-white-50"}>
                      <i className={`bi ${password.length >= 8 ? "bi-check-circle-fill" : "bi-circle"} me-1`}></i>
                      At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(password) && /[0-9]/.test(password) ? "text-success" : "text-white-50"}>
                      <i className={`bi ${/[A-Z]/.test(password) && /[0-9]/.test(password) ? "bi-check-circle-fill" : "bi-circle"} me-1`}></i>
                      Contains letter & number
                    </li>
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn w-100 fw-semibold py-3 mt-2"
                disabled={loading}
                style={{ 
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  color: "white",
                  border: "none",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i>
                    Create Account
                  </>
                )}
              </button>

              {/* Login Link */}
              <p className="text-center mt-4 mb-0 text-white-50">
                Already have an account?
                <Link to="/signin" className="text-decoration-none fw-semibold ms-2" style={{ color: "#3b82f6" }}>
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-white-50 small mt-4">
          By signing up, you agree to our <a href="/" className="text-primary text-decoration-none">Terms</a> and <a href="/" className="text-primary text-decoration-none">Privacy Policy</a>
        </p>
      </div>

      <style jsx>{`
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .form-control:focus, .input-group-text:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #0f172a inset !important;
          -webkit-text-fill-color: #f1f5f9 !important;
        }
      `}</style>
    </div>
  )
}

export default Signup