import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/forms')  // Change this to your correct API endpoint
      .then((response) => {
        setSubmissions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div>Error loading submissions: {error.message}</div>;

  return (
    <div className="submissions-container">
      <h2>Submissions</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <p><strong>Name:</strong> {submission.name}</p>
            <p><strong>Phone:</strong> {submission.phone_number}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Address:</strong> {submission.address}</p>
            <p><strong>Password:</strong> {submission.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmissionsList;
