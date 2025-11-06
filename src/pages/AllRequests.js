import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/requests")
      .then(res => {
        setRequests(res.data);
        setFiltered(res.data); // initially show all
      })
      .catch(err => console.error("Error fetching requests", err));
  }, []);

  // Filter requests on dropdown change
  const handleFilter = (e) => {
    const value = e.target.value;
    setBloodGroup(value);

    if (value === "") {
      setFiltered(requests);
    } else {
      setFiltered(requests.filter(req => req.bloodGroup === value));
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Blood Requests</h2>

      {/* Dropdown Filter */}
      <div className="mb-3">
        <label>Filter by Blood Group: </label>
        <select value={bloodGroup} onChange={handleFilter} className="form-select w-25">
          <option value="">All</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Blood Group</th>
            <th>Location</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((req, index) => (
            <tr key={index}>
              <td>{req.patientName}</td>
              <td>{req.bloodGroup}</td>
              <td>{req.location}</td>
              <td>{req.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllRequests;