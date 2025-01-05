import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OverallPerformance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch overall performance data from the backend
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin-dashboard/overall_performance/');
        setPerformanceData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setError('Failed to fetch performance data. Please try again.');
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (loading) {
    return <p>Loading performance data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Overall Candidate Performance</h1>
      <p>View the total scores of candidates for each job interview.</p>
      <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Email</th>
            <th>Interview ID</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.length > 0 ? (
            performanceData.map((data, index) => (
              <tr key={index}>
                <td>{data.candidate_name}</td>
                <td>{data.email}</td>
                <td>{data.command_id}</td>
                <td>{data.total_score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No performance data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OverallPerformance;
