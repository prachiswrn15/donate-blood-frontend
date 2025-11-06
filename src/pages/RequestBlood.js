import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function RequestBlood() {
  const [form, setForm] = useState({
    patientName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    location: '',
    reason: '',
    requestedBy: '' // hidden - backend ke liye
  });

  // Logged-in user email ko requestedBy me set karo
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setForm(prev => ({ ...prev, requestedBy: user?.email || '' }));
      }
    } catch (e) {
      console.error("localStorage parse error:", e);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () =>
    form.patientName.trim() &&
    form.age.trim() &&
    form.gender.trim() &&
    form.bloodGroup.trim() &&
    form.location.trim() &&
    form.reason.trim() &&
    form.requestedBy.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error('⚠️ Please fill in all fields');
      return;
    }
    try {
       
      const payload = {
        ...form,
        age: form.age ? parseInt(form.age, 10) : null, // ✅ number
      };
       console.log("Submitting payload:", payload); // debug log
    await axios.post("http://localhost:8080/api/requests", payload);
      toast.success("✅ Request Submitted Successfully");

      setForm(prev => ({
        patientName: '',
        age: '',
        gender: '',
        bloodGroup: '',
        location: '',
        reason: '',
        requestedBy: prev.requestedBy // email same rehna chahiye
      }));
    } catch (err) {
      console.error(err);
      toast.error("❌ Error submitting request");
    }
  };

  return (
    <div className="request-background d-flex justify-content-center align-items-center">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="glass-card request-card p-4">
        <h3 className="text-center mb-4 text-danger">🩸 Request Blood</h3>
        <form onSubmit={handleSubmit}>

          <input
            className="form-control custom-input mb-3"
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
          />

          <input
            type="number"
            className="form-control custom-input mb-3"
            name="age"
            placeholder="Age"
           value={form.age || ""}
            onChange={handleChange}
          />

          <select
            className="form-control custom-input mb-3"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male </option>
            <option value="Female">Female </option>
            <option value="Other">Other </option>
          </select>

          <select
            className="form-control custom-input mb-3"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
          >
            <option value="">Select Blood Group</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          <input
            className="form-control custom-input mb-3"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            className="form-control custom-input mb-4"
            name="reason"
            placeholder="Reason"
            value={form.reason}
            onChange={handleChange}
          />

          {/* requestedBy UI me nahi dikhana */}
          <button className="btn custom-btn w-100" type="submit">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestBlood;
