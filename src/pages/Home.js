import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';



const Home = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/requests')
      .then((response) => setRequests(response.data))
      .catch((error) => console.error('Error fetching requests:', error));
  }, []);

  const totalRequests = requests.length;
  const urgentRequests = requests.filter(r => r.urgency === "High").length;
  const bloodGroupCounts = requests.reduce((acc, curr) => {
    acc[curr.bloodGroup] = (acc[curr.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="home-background">
      <div className="container py-5">
        <h2 className="text-center text-white mb-4">Donate Blood, Save Lives</h2>

    {/* Summary Cards */}
    <div className="row text-center mb-4 g-4">
      <div className="col-md-4">
        <div className="summary-card bg-primary text-white shadow">
          <h5>Total Requests</h5>
          <h3>{totalRequests}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="summary-card bg-danger text-white shadow">
          <h5>Urgent Requests</h5>
          <h3>{urgentRequests}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="summary-card bg-success text-white shadow">
          <h5>Blood Group Count</h5>
          {Object.entries(bloodGroupCounts).map(([group, count]) => (
            <p key={group} className="mb-1 fs-6">
              {group}: {count}
            </p>
          ))}
        </div>
      </div>
    </div>

    {/* Section Title */}
    <h4 className="text-white section-divider">Available Blood Requests</h4>

    {/* Request Cards */}
    <div className="row">
      {requests.map((request) => (
        <div
          key={request.id}
          className="col-lg-4 col-md-6 col-sm-12 d-flex"
        >
          <div className="card blood-card w-100 mb-4">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title fw-semibold mb-2">
                Blood Group: {request.bloodGroup}
              </h5>
              <p className="card-text mb-1">Urgency: {request.urgency}</p>
              <p className="card-text mb-3">Quantity: {request.quantity}</p>
              <Link
                to={`/view-requests/${request.id}`}
                className="btn btn-primary mt-auto"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Home;