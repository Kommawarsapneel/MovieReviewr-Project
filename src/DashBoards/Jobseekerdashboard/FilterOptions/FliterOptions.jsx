import React from 'react'
import "./FilterOptions.css"
const FliterOptions = ({ setselectJobsRole }) => {
  const handlejobRole = (role) => {
    setselectJobsRole(role);
  };

  return (
    <div className='filter-options-container'>
      <div className='filter-options'>
        <button 
          className='filter-btn' 
          onClick={() => handlejobRole("All Movies")}
        >
          All Movies
        </button>
        <button 
          className='filter-btn' 
          onClick={() => handlejobRole("Action")}
        >
          Action Movies
        </button>
        <button 
          className='filter-btn' 
          onClick={() => handlejobRole("Comedy")}
        >
          Comedy Movies
        </button>
        <button 
          className='filter-btn' 
          onClick={() => handlejobRole("Romance")}
        >
          Romance Movies
        </button>
        <button 
          className='filter-btn' 
          onClick={() => handlejobRole("Drama")}
        >
          Drama Movies
        </button>
      </div>
    </div>
  );
};

export default FliterOptions