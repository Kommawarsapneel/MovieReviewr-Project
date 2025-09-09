import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Recuiterdashboard.css";
import { Outlet } from "react-router-dom";

export const Recuiterdashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="recruiter_dashbaord">
      {/* Mobile Menu Button (only visible on small screens) */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{ display: window.innerWidth < 768 ? 'block' : 'none' }}
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>
      
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar/>
      </div>
      
      {/* Main Content */}
      <div className="main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          {/* Add any header buttons or controls here */}
        </div>
        <div className="dashboard-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};