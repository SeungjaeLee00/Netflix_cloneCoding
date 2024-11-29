import { useState, useEffect } from "react";
import { getPopularMovies } from "../utils/api";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import ScrollToTop from "../components/ScrollToTop";
import "../styles/pages/PopularPage.css";

function PopularPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // 인기 영화 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getPopularMovies(page); // getPopularMovies API 호출
        setMovies((prevMovies) => [...prevMovies, ...data.results]); // 기존 영화 목록에 추가
        setLoading(false);
      } catch (error) {
        setLoading(false); // 오류가 있을 경우 로딩 상태 종료
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchMovies();
  }, [page]); // 페이지가 변경될 때마다 데이터를 다시 불러옴

  // 페이지네이션을 위한 페이지 변경 함수
  const handlePageChange = (newPage) => {
    setMovies([]); // 새로운 페이지를 요청할 때 이전 영화 목록을 초기화
    setPage(newPage); // 새로운 페이지 번호로 변경
  };

  return (
    <div className="popular-page">
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => {}} />
        ))}
      </div>

      {/* 로딩 스피너 표시 */}
      {loading && <LoadingSpinner />}

      {/* 페이지네이션 컴포넌트 */}
      <Pagination currentPage={page} onPageChange={handlePageChange} />

      {/* 스크롤 투탑 버튼 */}
      <ScrollToTop />
    </div>
  );
}

export default PopularPage;
