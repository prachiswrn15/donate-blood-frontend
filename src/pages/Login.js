
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Login response:", response.data);
      toast.success("Login successful");
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      localStorage.setItem("role", response.data.role);

      navigate('/profile');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Something went wrong, please try again later");
      }
    }
  };
  return (
    <div className="login-wrapper">
      <ToastContainer position="top-center" />
      <div className="login-card shadow">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control login-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control login-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="btn login-button w-100" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
