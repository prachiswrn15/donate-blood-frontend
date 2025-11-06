import React, { useEffect, useState } from "react";
import axios from "axios";

function DonationHistory() {
  const [history, setHistory] = useState([]);
  const donorId = localStorage.getItem("donorId"); // ya tumhare login logic ke hisaab se

  useEffect(() => {
    axios.get(`http://localhost:8080/api/donors/${donorId}/donation-history`)
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, [donorId]);

  // Calculate next eligible donation date (90 days after last donation)
  const nextEligibleDate = () => {
    if (history.length === 0) return "N/A";
    const lastDonation = new Date(history[history.length - 1].donationDate);
    lastDonation.setDate(lastDonation.getDate() + 90);
    return lastDonation.toLocaleDateString();
  }

  return (
    <div className="container mt-4">
      <h3>Donation History</h3>
      <p>Next eligible donation: {nextEligibleDate()}</p>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Request ID</th>
          </tr>
        </thead>
        <tbody>
          {history.map(item => (
            <tr key={item.id}>
              <td>{new Date(item.donationDate).toLocaleDateString()}</td>
              <td>{item.status}</td>
              <td>{item.bloodRequestId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonationHistory;
