
import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

    const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgot = ()=>{
    navigate("/reset-password");
    setLogin(false)
  } 

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let newUrl = currentState === "Login" ? `${url}/api/user/login` : `${url}/api/user/register`;
      // let newUrl = `${url}/api/user/${currentState === "Login" ? "login" : "register"}`;
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token); // ✅ trigger re-render with token
        localStorage.setItem("token", response.data.token); // ✅ store token
        setLogin(false);
        toast.success(response.data.message || "Logged in successfully!");
        navigate("/dashboard");
      }
       else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Please try again.");
    }finally {
        setLoading(false)}
  };

  

  const toggleForm = () => {
    setCurrentState((prev) => (prev === "Login" ? "Sign Up" : "Login"));
    setData({ name: "", email: "", password: "" });
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <p>{currentState === "Login" ? "Login" : "Sign Up"}</p>
          <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-input">
          {currentState === "Sign Up" && (
            <input name="name" type="text" placeholder="Name" value={data.name} onChange={onChangeHandler} required />
          )}
          <input name="email" type="email" placeholder="Email" value={data.email} onChange={onChangeHandler} required />
          <div className="password-container">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
            {showPassword ? (
              <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye className="eye-icon" onClick={() => setShowPassword(true)} />
            )}
            
          </div>
            {
              currentState === "Login" && <div className="forgot" onClick={handleForgot}><p>Forgot password</p></div>
            }
        </div>
        <button type="submit" disabled = {loading} >{ loading ? currentState === "login" ? "Logging in..." : "Creating..." : currentState === "Login" ? "Login" : "Create account"}</button>
        
        <div className="account">
          <p>{currentState === "Sign Up" ? "Already have an account?" : "Not registered yet?"}</p>
          <p onClick={toggleForm} className="blue">
            {currentState === "Sign Up" ? "Login" : "Create account"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
