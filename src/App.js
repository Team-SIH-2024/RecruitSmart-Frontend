import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard"; // Ensure this path is correct
import AdminLogin from './components/AdminDashboard/AdminLogin.jsx';
import CompatibilityTest from './components/Compatibility/CompatibilityTest.jsx';
import FeedbackPage from './components/FeedbackPage/FeedbackPage';
import Dashboard from './components/Home/Dashboard.jsx';
import Home from './components/Home/Homepage.jsx';
import RequireRedirect from './components/RequireRedirect';
import UserDashboard from './components/UserDashboard/DashboardUser/UserDashboard.jsx';
import UserLogin from './components/UserDashboard/LoginUser/UserLogin.jsx';
import UserSignup from './components/UserDashboard/SignupUser/UserSignup';
import InterviewPage from "./components/UserDashboard/Simulation/Interviewpage"; // Ensure this path is correct
import ResumeUploadPage from "./components/UserDashboard/Simulation/ResumeUploadPage.jsx";
import ExpertUpload from './components/expertdashboard/ExpertUpload.jsx';


function App(){
  const isAllowed = true;
  return (
    <Router>
      <Routes>
        <Route path="/InterviewPage/:command_id" element={<InterviewPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/expert" element={<ExpertUpload />} />
        <Route path="/upload-resume" element={<ResumeUploadPage />} />
        <Route path="/upload-resume/:command_id" element={<ResumeUploadPage />} />
        <Route path="/CompatibilityTest/:command_id" element={<CompatibilityTest />} />
        <Route path="/feedback" element={<FeedbackPage  />} /> {/* Add the feedback route */}
        <Route path="/ExpertUpload" element={<ExpertUpload  />} /> {/* Add the feedback route */}

                <Route
          path="/Dashboard"
          element={
            <RequireRedirect isAllowed={isAllowed}>
              <Dashboard />
            </RequireRedirect>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
