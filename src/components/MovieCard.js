import React from "react";
import "../styles/components/MovieCard.css";

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
}

export default MovieCard;
