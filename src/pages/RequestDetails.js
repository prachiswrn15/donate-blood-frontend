// src/pages/RequestDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error('Error fetching request details:', err));
  }, [id]);

  if (!request) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-danger mb-3">Blood Request Details</h2>
        <p><strong>Patient Name:</strong> {request.patientName}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Urgency:</strong> {request.urgency}</p>
        <p><strong>Quantity:</strong> {request.quantity}</p>
        <p><strong>Location:</strong> {request.location}</p>
        <p><strong>Reason:</strong> {request.reason}</p>
        <p><strong>Requested By:</strong> {request.requestedBy}</p>
        <p><strong>Status:</strong> {request.status}</p>
      </div>
    </div>
  );
};

export default RequestDetails;
