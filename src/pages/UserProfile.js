import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './UserProfile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    city: '',
    bloodGroup: '',
    email: '',
    role: '',
    isAvailable: true
  });

  const cities = ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const email = storedUser?.email;

  // Fetch user profile
  useEffect(() => {
    if (!email) return;

   axios.get(`http://localhost:8080/api/users/email?email=${encodeURIComponent(email)}`)

      .then(res => {
        const data = res.data;
        setUserData(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          city: data.city || '',
          bloodGroup: data.bloodGroup || '',
          role: data.role || '',
          isAvailable: data.isAvailable ?? true
        });
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load user info");
      });
  }, [email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put('http://localhost:8080/api/users/update', formData)
      .then(res => {
        toast.success("Profile updated successfully");
        setUserData({ ...formData });
        setEditMode(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Update failed");
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('profileImage', reader.result);
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Toggle donor availability
  const handleAvailabilityToggle = () => {
    if (!userData?.id) return;

    axios.put(`http://localhost:8080/api/users/${userData.id}/availability?isAvailable=${!userData.isAvailable}`)
      .then(res => {
        const updatedUser = res.data;
        setFormData(prev => ({ ...prev, isAvailable: updatedUser.isAvailable }));
        setUserData(prev => ({ ...prev, isAvailable: updatedUser.isAvailable }));
        toast.success("Availability updated!");
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to update availability");
      });
  };

  if (!userData) return <p className="text-center mt-4">Loading user info...</p>;

  return (
    <div className={`profile-background ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`container mt-5 profile-container ${darkMode ? 'dark-mode' : ''}`}>
        <div className="d-flex justify-content-between mb-3">
          <h2 className="fw-bold">User Profile</h2>
          <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="card shadow-lg profile-card p-4 animated-fade">
          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <img
                src={profileImage || "https://www.w3schools.com/howto/img_avatar.png"}
                alt="profile"
                className="rounded-circle profile-img mb-3"
              />
              {editMode && (
                <input type="file" accept="image/*" className="form-control" onChange={handleImageUpload} />
              )}
            </div>

            <div className="col-md-8">
              {editMode ? (
                <>
                  <input name="name" className="form-control my-2" value={formData.name} onChange={handleChange} />
                  <input name="email" className="form-control my-2" value={formData.email} readOnly />
                  <input name="phoneNumber" className="form-control my-2" value={formData.phoneNumber} onChange={handleChange} />

                  <select name="city" className="form-control my-2" value={formData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>

                  <select name="bloodGroup" className="form-control my-2" value={formData.bloodGroup} onChange={handleChange}>
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>

                  <input name="role" className="form-control my-2" value={formData.role} readOnly />

                  <button className="btn btn-success me-2 mt-2" onClick={handleUpdate}>💾 Save</button>
                  <button className="btn btn-secondary mt-2" onClick={() => setEditMode(false)}>❌ Cancel</button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Phone:</strong> {userData.phoneNumber}</p>
                  <p><strong>City:</strong> {userData.city}</p>
                  <p><strong>Blood Group:</strong> {userData.bloodGroup}</p>
                  <p><strong>Role:</strong> {userData.role}</p>

                  {userData.role === 'donor' && (
                    <div className="form-check form-switch my-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.isAvailable}
                        onChange={handleAvailabilityToggle}
                        id="availabilitySwitch"
                      />
                      <label className="form-check-label" htmlFor="availabilitySwitch">
                        {formData.isAvailable ? 'Available to Donate' : 'Not Available'}
                      </label>
                    </div>
                  )}

                  <button className="btn btn-primary mt-2" onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
