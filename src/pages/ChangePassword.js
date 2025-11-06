// ChangePassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../App.css'; // Import the new CSS file

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New and Confirm Password do not match");
      return;
    }

    const email = localStorage.getItem('loggedInUser');

    try {
      const response = await axios.put('http://localhost:8080/api/users/change-password', {
        email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(response.data);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect current password");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="change-password-background">
      <div className="change-password-container">
        <div className="glass-card">
          <h2 className="text-center mb-4">🔒 Change Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              className="form-control custom-input"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="form-control custom-input"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="form-control custom-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn custom-btn w-100">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
