import { useState, useEffect } from "react";
import { getPopularMovies } from "../utils/api"; // api.js에서 getPopularMovies 함수 임포트
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/pages/HomePage.css";

function HomePage() {
  const [movies, setMovies] = useState([]); // 인기 영화 목록
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); // 데이터를 가져오기 전에 로딩 상태 설정
        const data = await getPopularMovies(1); // 첫 번째 페이지 데이터 가져오기
        setMovies(data.results); // 인기 영화 목록 설정
        setLoading(false); // 데이터 로딩 후 로딩 상태 해제
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setLoading(false); // 에러 발생 시 로딩 상태 해제
      }
    };

    fetchMovies(); // 영화 목록 데이터 가져오기
  }, []); // 컴포넌트 마운트 시 한번만 호출

  return (
    <div className="home-page">
      <h1>Popular Movies</h1>
      {loading ? (
        <LoadingSpinner /> // 로딩 중일 때 로딩 스피너 표시
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
