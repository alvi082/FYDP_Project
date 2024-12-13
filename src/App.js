import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./JobPost/Header"; // The header should include the navigation links
import JobPostForm from "./JobPost/JobPost";
import Dashboard from "./Dashboard/Dashboard";
import HomeScreen from "./Home/HomeScreen";
import Login from './LogReg/Login';
import Reg from "./LogReg/Reg";
import Analyser from "./Analyser/Analyser";
import JobSearchDashboard from "./JobSearchDashboard/JobSearchDashboard";
import Profile from "./Profile/Profile";
import "./App.css";


function App() {
    return (
        <Router>
            <MainApp />
        </Router>
    );
}

const MainApp = () => {
    const location = useLocation();

    // Define the routes where the Header should be visible
    const headerVisibleRoutes = ["/JobPost", "/dashboard","/analyser"];

    return (
        <div className="app-container">
            {/* Conditionally render the Header */}
            {headerVisibleRoutes.includes(location.pathname) && <Header />}

            {/* Main Content */}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Reg />} />
                    <Route path="/JobPost" element={<JobPostForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/JobSearchDashboard" element={<JobSearchDashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/analyser" element={<Analyser />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
