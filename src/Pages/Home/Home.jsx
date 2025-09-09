

import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { db } from '../../configureFirebase/config';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const loggedinUser = JSON.parse(localStorage.getItem("loggedInAdmin")) || JSON.parse(localStorage.getItem("loggedInUser"));
  const [searchTerm, setSearchTerm] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movieRatings, setMovieRatings] = useState({});
  
  // Enhanced movie data with more details
  const bannerImageUrl = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

  const popularMovies = [
    {
      id: 1,
      title: "Inception",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      rating: 4.8,
      director: "Christopher Nolan",
      year: 2010,
      genre: "Sci-Fi",
      review: "A mind-bending masterpiece that redefines the heist genre...",
      duration: "2h 28m"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      rating: 4.9,
      director: "Frank Darabont",
      year: 1994,
      genre: "Drama",
      review: "A story of hope and friendship that stands the test of time...",
      duration: "2h 22m"
    },
    {
      id: 3,
      title: "Parasite",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
      rating: 4.7,
      director: "Bong Joon Ho",
      year: 2019,
      genre: "Thriller",
      review: "A brilliant social satire that keeps you on the edge...",
      duration: "2h 12m"
    }
  ];

  const featuredMovies = [
    // Hollywood
    {
      id: 1,
      title: "Dune",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      year: 2021,
      genre: "Sci-Fi"
    },
    {
      id: 2,
      title: "Interstellar",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      year: 2014,
      genre: "Sci-Fi"
    },
    // Telugu
    {
      id: 7,
      title: "RRR",
      posterUrl: "https://image.tmdb.org/t/p/w500/ljHw5eIMnki3HekwkKwCCHsRSbH.jpg",
      year: 2022,
      genre: "Action"
    },
    {
      id: 8,
      title: "Baahubali: The Beginning",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMzA4MjE3NTIzN15BMl5BanBnXkFtZTgwMzkxODIzNTE@._V1_FMjpg_UY2881_.jpg",
      year: 2015,
      genre: "Epic"
    },
    // More Telugu
    {
      id: 9,
      title: "Pushpa: The Rise",
      posterUrl: "https://superstarsbio.com/wp-content/uploads/2022/01/pushpa-the-rise.jpg",
      year: 2021,
      genre: "Action"
    },
    {
      id: 10,
      title: "Jersey",
      posterUrl: "https://www.celebrityhow.com/wp-content/uploads/2019/05/Jersy1.jpg",
      year: 2019,
      genre: "Sports"
    },
    // Additional
    {
      id: 3,
      title: "The Dark Knight",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      year: 2008,
      genre: "Action"
    },
    {
      id: 4,
      title: "Pulp Fiction",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      year: 1994,
      genre: "Crime"
    }
  ];

  const slugify = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  // Initialize random ratings for featured movies
  useEffect(() => {
    const initialRatings = {};
    featuredMovies.forEach(movie => {
      initialRatings[movie.id] = (Math.random() * 1 + 4).toFixed(1);
    });
    setMovieRatings(initialRatings);
  }, []);

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

  const handleMovieClick = (movieName) => {
    const slug = slugify(movieName);
    setSearchTerm('');
    navigate(`/movie/${slug}`);
  };

  // Render star rating
  const renderStars = (rating) => {
    const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    const stars = [];
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="banner-overlay"></div>
        <img src={bannerImageUrl} alt="Movie Banner" className="banner-image" />
        <div className="banner-content">
          <h1>Welcome to MovieReviewr</h1>
          <p>Discover, rate, and review your favorite movies from Hollywood to Tollywood</p>
          <div className="search-bar">
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
        </div>
      </div>

      {/* Trending Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Currently Trending</h2>
          <Link to="/movies" className="view-all">View All</Link>
        </div>
        <div className="movie-grid">
          {featuredMovies.slice(0, 8).map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
              <div className="movie-poster-container">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/180x270?text=Poster+Not+Found";
                  }}
                />
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                {movieRatings[movie.id] && (
                  <div className="rating">
                    {renderStars(movieRatings[movie.id])}
                    <span className="rating-value">{movieRatings[movie.id]}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Reviews */}
      <section className="reviews-section">
        <h2>Popular Reviews</h2>
        <div className="review-cards">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="review-card">
              <div className="review-poster-container">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="review-poster"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100x150?text=Poster+Not+Found";
                  }}
                />
              </div>
              <div className="review-content">
                <div className="review-header">
                  <h3>{movie.title}</h3>
                  <div className="review-meta">
                    <span className="rating">
                      {renderStars(movie.rating)}
                      <span className="rating-value">{movie.rating}</span>
                    </span>
                    <span className="movie-duration">{movie.duration}</span>
                  </div>
                </div>
                <div className="review-details">
                  <span className="director">Director: {movie.director}</span>
                  <span className="year">{movie.year} • {movie.genre}</span>
                </div>
                <p className="review-text">"{movie.review}"</p>
                <Link to={`/movie/${movie.id}`} className="read-more">Read Full Review</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Join Our Movie Community</h2>
          <p>Share your thoughts on the latest movies and discover hidden gems recommended by fellow cinephiles.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary">Sign Up Free</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;