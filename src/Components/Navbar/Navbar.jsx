
import React from 'react';



import './Navbar.css'; // <-- import the CSS file
import { FaClapperboard } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { db } from '../../configureFirebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const Navibar = () => {
  const navigate = useNavigate();
  const loggedinUser = JSON.parse(localStorage.getItem("loggedInAdmin")) || JSON.parse(localStorage.getItem("loggedInUser"));
  const [searchTerm, setSearchTerm] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const slugify = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  useEffect(() => {
    const fetchMovies = async () => {
      const adminsCollection = collection(db, "Admins");
      const allDocs = await getDocs(adminsCollection);
      const allJobs = [];
      allDocs.forEach(doc => {
        const jobs = doc.data().jobs || [];
        allJobs.push(...jobs);
      });
      setAllMovies(allJobs);
    };

    if (loggedinUser) {
      fetchMovies();
    }
  }, [loggedinUser]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMovies([]);
    } else {
      const filtered = allMovies.filter(movie =>
        movie.Movie.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered.slice(0, 5));
    }
  }, [searchTerm, allMovies]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("loggedInAdmin");
      localStorage.removeItem("loggedInUser");
      alert("Logged out successfully");
      navigate("/Login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieClick = (movieName) => {
    const slug = slugify(movieName);
    setSearchTerm('');
    navigate(`/movie/${slug}`);
  };

  return (
    <nav className="navbar">
    <div className="navbar-container">
  <div className="navbar-brand" style={{ color: "white" }}>
    <FaClapperboard
      style={{
        fontSize: '2rem',
        color: "white",
        backgroundColor: '#e74c3c',
        padding: '5px',
        borderRadius: '4px'
      }}
    />
    MovieReviewr
  </div>

  {loggedinUser && (
    <div className="nav-actions">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && filteredMovies.length > 0 && (
          <div className="search-dropdown">
            {filteredMovies.map((movie, idx) => (
              <div
                key={idx}
                className="search-item"
                onClick={() => handleMovieClick(movie.Movie)}
              >
                {movie.Movie}
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleLogout} className="nav-link">Logout</button>
    </div>
  )}

  {!loggedinUser && (
    <div className="nav-links">
      <Link to="/Signup" className="nav-link">Signup</Link>
      <Link to="/Login" className="nav-link">Login</Link>
    </div>
  )}
</div>

    </nav>
  );
};

