import { useState, useEffect } from "react";
import { getPopularMovies } from "../utils/api";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import ScrollToTop from "../components/ScrollToTop";
import Modal from "../components/Modal"; // 모달 컴포넌트 가져오기
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage"; // 로컬스토리지 저장/불러오기 함수
import "../styles/pages/PopularPage.css";

function PopularPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화
  const [wishlist, setWishlist] = useState(
    getFromLocalStorage("favoriteMovies") || []
  ); // 찜 목록 상태

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

  // 영화 클릭 시 모달 띄우기
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // 찜 목록에 추가
  const handleAddToWishlist = (movie) => {
    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    saveToLocalStorage("favoriteMovies", updatedWishlist); // 로컬스토리지에 저장
  };

  // 찜 목록에서 제거
  const handleRemoveFromWishlist = (movie) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== movie.id);
    setWishlist(updatedWishlist);
    saveToLocalStorage("favoriteMovies", updatedWishlist); // 로컬스토리지에 저장
  };

  // 찜 목록에 해당 영화가 있는지 확인
  const isMovieFavorited = (movie) => {
    return wishlist.some((fav) => fav.id === movie.id); // 찜 목록에 해당 영화가 있으면 true
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); // 모달 닫기
  };

  return (
    <div className="popular-page">
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => handleMovieClick(movie)} // 영화 클릭 시 모달 띄우기
            isFavorite={isMovieFavorited(movie)} // 찜 목록에 있는지 확인
            handleAddToWishlist={handleAddToWishlist} // 찜하기
            handleRemoveFromWishlist={handleRemoveFromWishlist} // 찜 해제
          />
        ))}
      </div>

      {/* 로딩 스피너 표시 */}
      {loading && <LoadingSpinner />}

      {/* 페이지네이션 컴포넌트 */}
      <Pagination currentPage={page} onPageChange={handlePageChange} />

      {/* 스크롤 투탑 버튼 */}
      <ScrollToTop />

      {/* 선택된 영화가 있을 때만 모달을 띄움 */}
      {selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={handleCloseModal} // 모달 닫기
          handleAddToWishlist={handleAddToWishlist}
          handleRemoveFromWishlist={handleRemoveFromWishlist}
          isFavorite={isMovieFavorited(selectedMovie)}
        />
      )}
    </div>
  );
}

export default PopularPage;
