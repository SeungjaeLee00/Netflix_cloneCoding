import React, { useEffect, useState } from "react";

const MovieInfiniteScroll = ({
  apiKey,
  genreCode,
  sortingOrder,
  voteEverage,
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = () => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreCode}&language=${sortingOrder}&vote_average.gte=${voteEverage}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, [genreCode, sortingOrder, voteEverage]);

  return (
    <div>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <button onClick={fetchMovies} disabled={loading}>
        Load More
      </button>
    </div>
  );
};

export default MovieInfiniteScroll;
