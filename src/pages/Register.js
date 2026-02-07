
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: '',
    city: '',
    phoneNumber: '',
    role: 'users',
  });
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const cities = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad'];
  const roles = ['users', 'admin', 'patient', 'donor'];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/users/register`, formData);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error);
      if (error.response && error.response.status === 409) {
        toast.error('This email is already registered!');
      } else {
        toast.error('Registration failed');
      }
    }
  };
  return (
    <div className="change-password-background">
      <div className="glass-card change-password-container">
        <h3 className="text-center mb-4 text-danger">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="custom-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="custom-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="custom-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="bloodGroup"
            className="custom-input"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <select
            name="city"
            className="custom-input"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="custom-input"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="custom-input"
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button type="submit" className="custom-btn w-100 mt-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
