import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MySimulations.module.css";
import { useAuth } from "../Auth/UserAuthContext";
import { useNavigate } from "react-router-dom";

const MySimulations = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {authState,logout } = useAuth();
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/jobs/",{
                    params: { gmail: authState.username },
                });
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching job posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);


    const handleTakeInterview = (commandId) => {
        navigate(`/CompatibilityTest/${commandId}`);
    };

    return (
        <div className={styles.container}>
          <h1>Welcome!</h1>
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs available at the moment.</p>
          ) : (
            <ul className={styles.jobList}>
              {jobs.map((job) => (
                <li key={job.id} className={styles.jobCard}>
                  <h4>{job.title}</h4>
                  <p>{job.description}</p>
                  <p>Posted on: {new Date(job.created_at).toLocaleDateString()}</p>
                  <button
                    className={styles.takeInterviewBtn}
                    onClick={() => handleTakeInterview(job.command_id)}
                  >
                    Take Interview
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );    
};

export default MySimulations;
