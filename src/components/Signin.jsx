import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");
    setSuccess("");

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    try {
      const response = await axios.post(
        "https://linushiggs.alwaysdata.net/api/signin",
        formdata
      );

      const user = response.data.user;

      setSuccess(response.data.message);
      
      // Store user data in localStorage
      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user_name", user.username);
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem("remembered_email", email);
      } else {
        localStorage.removeItem("remembered_email");
      }

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("remembered_email");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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
                <i className="bi bi-person-check-fill fs-1 text-white"></i>
              </div>
              <h1 className="fw-bold mb-2" style={{ 
                background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.75rem"
              }}>
                Welcome Back
              </h1>
              <p className="text-white-50 small">Sign in to continue your journey with Safari Wheels</p>
            </div>

            {/* Success Alert */}
            {success && (
              <div className="alert border-0 rounded-3 mb-3 d-flex align-items-center" style={{ background: "#064e3b", color: "#a7f3d0", border: "1px solid #10b981" }}>
                <i className="bi bi-check-circle-fill me-2"></i>
                <div className="flex-grow-1">{success}</div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSuccess("")}></button>
              </div>
            )}
            
            {/* Error Alert */}
            {error && (
              <div className="alert border-0 rounded-3 mb-3 d-flex align-items-center" style={{ background: "#7f1d1d", color: "#fecaca", border: "1px solid #ef4444" }}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div className="flex-grow-1">{error}</div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setError("")}></button>
              </div>
            )}

            {/* Signin Form */}
            <form onSubmit={handleSubmit}>
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
                    autoFocus
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
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

              {/* Remember Me & Forgot Password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="rememberMe"
                    style={{ 
                      backgroundColor: rememberMe ? "#3b82f6" : "#0f172a",
                      borderColor: "#334155",
                      cursor: "pointer"
                    }}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label text-white-50 small" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="/forgot-password" className="text-decoration-none small" style={{ color: "#3b82f6" }}>
                  Forgot Password?
                </a>
              </div>

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
                  if (!loading) {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)"
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </>
                )}
              </button>

              {/* Sign Up Link */}
              <p className="text-center mt-4 mb-0 text-white-50">
                Don't have an account?
                <Link to="/signup" className="text-decoration-none fw-semibold ms-2" style={{ color: "#3b82f6" }}>
                  Create Account
                </Link>
              </p>
            </form>

            {/* Divider */}
            <div className="position-relative my-4">
              <hr className="text-secondary" />
              <span className="position-absolute top-50 start-50 translate-middle px-3 small" style={{ 
                background: "#1e293b", 
                color: "#94a3b8",
                fontSize: "12px"
              }}>
                OR
              </span>
            </div>

            {/* Demo Credentials */}
            <div className="text-center">
              <small className="text-white-50 d-block mb-2">Demo Credentials:</small>
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn btn-sm px-3 py-1"
                  style={{ 
                    background: "#0f172a", 
                    color: "#94a3b8",
                    border: "1px solid #334155",
                    borderRadius: "20px",
                    fontSize: "11px"
                  }}
                  onClick={() => {
                    setEmail("user@example.com");
                    setPassword("password123");
                  }}
                >
                  <i className="bi bi-person me-1"></i> User
                </button>
                <button
                  type="button"
                  className="btn btn-sm px-3 py-1"
                  style={{ 
                    background: "#0f172a", 
                    color: "#94a3b8",
                    border: "1px solid #334155",
                    borderRadius: "20px",
                    fontSize: "11px"
                  }}
                  onClick={() => {
                    setEmail("admin@example.com");
                    setPassword("admin123");
                  }}
                >
                  <i className="bi bi-shield-lock me-1"></i> Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-white-50 small mt-4">
          Secure Login 🔒 | Your data is protected with SSL encryption
        </p>
      </div>

      <style jsx>{`
        .form-control:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3) !important;
        }
        
        .input-group-text:focus-within {
          outline: none;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #0f172a inset !important;
          -webkit-text-fill-color: #f1f5f9 !important;
        }
        
        .form-check-input:checked {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }
        
        .form-check-input:focus {
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .alert {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  )
}

export default Signin