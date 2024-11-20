import React from "react";
import "./Banner.css";

const Banner = ({ movie }) => {
  if (!movie) return null;

  return (
    <header className="banner">
      <div className="banner-content">
        <h1 className="banner-title">{movie.title || movie.name}</h1>
        <p className="banner-description">{movie.overview}</p>
      </div>
    </header>
  );
};

export default Banner;
