import React, { useState } from 'react'
import FliterOptions from './FilterOptions/FliterOptions'
import DisplayJobs from './Displayjobs/DisplayJobs'
import "./Jobseekerdashboard.css"
const Jobseekerdashboard = () => {
  const [selectJobsRole, setselectJobsRole] = useState("All Movies");
  
  return (
    <div className='jobseeker-dashboard'>
      <div className='dashboard-header'>
        <h1>Movie Collection</h1>
        <p>Browse through our extensive movie library</p>
      </div>
      
      <div className='dashboard-content'>
        <div className='filter-section'>
          <FliterOptions 
            setselectJobsRole={setselectJobsRole} 
            currentFilter={selectJobsRole}
          />
        </div>
        
        <div className='movies-display-section'>
          <DisplayJobs selectJobsRole={selectJobsRole} />
        </div>
      </div>
    </div>
  );
};

export default Jobseekerdashboard;