import React, { useState, useEffect } from "react";
import {
  getFromLocalStorage,
  saveFavoriteMovies,
  saveToLocalStorage,
} from "../utils/storage";
import { getPopularMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal"; // Modal 컴포넌트 가져오기
import "../styles/pages/HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState(
    getFromLocalStorage("favoriteMovies") || []
  );
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // 영화 클릭 시 상세 정보를 모달로 보여주기
  };

  const handleAddToWishlist = (movie) => {
    saveFavoriteMovies(movie);
    setWishlist(getFromLocalStorage("favoriteMovies"));
  };

  const handleRemoveFromWishlist = (movie) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== movie.id);
    setWishlist(updatedWishlist);
    saveToLocalStorage("favoriteMovies", updatedWishlist);
  };

  const isMovieFavorited = (movie) => {
    return wishlist.some((fav) => fav.id === movie.id); // 찜 목록에 해당 영화가 있으면 true
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); // 모달 닫기
  };

  return (
    <div className="home-page">
      <h1>Popular Movies</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleMovieClick}
              isFavorite={isMovieFavorited(movie)}
              handleAddToWishlist={handleAddToWishlist}
              handleRemoveFromWishlist={handleRemoveFromWishlist}
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={handleCloseModal}
          handleAddToWishlist={handleAddToWishlist}
          handleRemoveFromWishlist={handleRemoveFromWishlist}
          isFavorite={isMovieFavorited(selectedMovie)}
        />
      )}
    </div>
  );
};

export default HomePage;
