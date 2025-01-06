// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./MySimulations.module.css";
// import { useAuth } from "../Auth/UserAuthContext";
// import { useNavigate } from "react-router-dom";

// const MySimulations = () => {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const {authState,logout } = useAuth();
//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/api/jobs/",{
//                     params: { gmail: authState.username },
//                 });
//                 setJobs(response.data);
//             } catch (error) {
//                 console.error("Error fetching job posts:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJobs();
//     }, []);


//     const handleTakeInterview = (commandId) => {
//         navigate(`/CompatibilityTest/${commandId}`);
//     };

//     return (
//         <div className={styles.container}>
//           <h1>Welcome!</h1>
//           {loading ? (
//             <p>Loading jobs...</p>
//           ) : jobs.length === 0 ? (
//             <p>No jobs available at the moment.</p>
//           ) : (
//             <ul className={styles.jobList}>
//               {jobs.map((job) => (
//                 <li key={job.id} className={styles.jobCard}>
//                   <h4>{job.title}</h4>
//                   <p>{job.description}</p>
//                   <p>Posted on: {new Date(job.created_at).toLocaleDateString()}</p>
//                   <button
//                     className={styles.takeInterviewBtn}
//                     onClick={() => handleTakeInterview(job.command_id)}
//                   >
//                     Take Interview
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       );    
// };

// export default MySimulations;












import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MySimulations.module.css";
import { useAuth } from "../Auth/UserAuthContext";
import { useNavigate } from "react-router-dom";

const MySimulations = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { authState, logout } = useAuth();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/jobs/", {
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
    }, [authState.username]);

    const handleTakeInterview = (commandId) => {
        navigate(`/CompatibilityTest/${commandId}`);
    };

    // Helper function to check if the interview is available
    const isInterviewAvailable = (scheduledTime) => {
        const currentTime = new Date();
        const interviewStartTime = new Date(scheduledTime); // Convert the string to a Date object
        
        // Convert both times to UTC for comparison
        const currentTimeUTC = currentTime.getTime();
        const interviewStartTimeUTC = interviewStartTime.getTime();
        const timeDifference = currentTimeUTC - interviewStartTimeUTC;

        console.log("Current time (UTC):", new Date(currentTimeUTC).toISOString());
        console.log("Interview start time (UTC):", new Date(interviewStartTimeUTC).toISOString());

        // If the current time is less than the interview start time, return false (interview is in the future)
        return currentTimeUTC < interviewStartTimeUTC || timeDifference > 10000 * 60 * 1000;
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
                            <p>Scheduled Time: {new Date(job.scheduled_time).toLocaleString()}</p>

                            {/* Show either the Take Interview button or the message depending on the interview's time */}
                            {isInterviewAvailable(job.scheduled_time) ? (
                                <p className={styles.interviewMessage}>
                                    Your interview will start on {new Date(job.scheduled_time).toLocaleString()}
                                </p>
                            ) : (
                                <button
                                    className={styles.takeInterviewBtn}
                                    onClick={() => handleTakeInterview(job.command_id)}
                                >
                                    Take Interview
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MySimulations;

