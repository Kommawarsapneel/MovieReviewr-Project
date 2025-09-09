import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../configureFirebase/config';
import { collection, getDocs } from 'firebase/firestore';
import "./MovieDetails.css"
// Slugify function for comparison
const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

const MovieDetails = () => {
  const { id } = useParams(); // This is the slug of the movie name
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const adminsCollection = collection(db, "Admins");
      const allDocs = await getDocs(adminsCollection);
      let found = false;

      for (const doc of allDocs.docs) {
        const jobs = doc.data().jobs || [];
        const foundMovie = jobs.find(job => slugify(job.Movie) === id);
        if (foundMovie) {
          setMovie(foundMovie);
          found = true;
          break;
        }
      }

      if (!found) setMovie(null);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details">
      <h2>{movie.Movie}</h2>
      {movie.posterUrl && <img src={movie.posterUrl} alt={movie.Movie} />}
      <p><strong>Category:</strong> {movie.Category}</p>
      <p><strong>IMDb :</strong> {movie.md}</p>
      <p><strong>Rating :</strong> {"⭐".repeat(movie.rating)}{"☆".repeat(5 - movie.rating)}</p>
      <p><strong>releaseYear :</strong>{movie.releaseYear}</p>
         <p><strong>director :</strong>{movie.director}</p>
              <p><strong>cast:</strong>{movie.cast}</p>
              <p><strong> duration :</strong>{movie. duration} <span>min</span></p>
               <p><strong>cast :</strong>{movie.cast}</p>
    </div>
  );
};

export default MovieDetails;
