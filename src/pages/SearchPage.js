import React, { useState, useEffect, useCallback } from "react";
import { searchMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import ScrollToTop from "../components/ScrollToTop";
import Modal from "../components/Modal";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage"; // Local Storage 유틸리티
import "../styles/pages/SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState(""); // 검색어
  const [movies, setMovies] = useState([]); // 검색 결과
  const [filteredMovies, setFilteredMovies] = useState([]); // 필터링된 결과
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지
  const [filters, setFilters] = useState({
    genre: "",
    rating: 0,
    sortBy: "popularity.desc",
  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Local Storage에서 찜 목록 가져오기
  useEffect(() => {
    const storedWishlist = getFromLocalStorage("favoriteMovies") || [];
    setWishlist(storedWishlist);
  }, []);

  // 찜 목록에 영화 추가
  const handleAddToWishlist = (movie) => {
    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    saveToLocalStorage("favoriteMovies", updatedWishlist);
  };

  // 찜 목록에서 영화 제거
  const handleRemoveFromWishlist = (movie) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== movie.id);
    setWishlist(updatedWishlist);
    saveToLocalStorage("favoriteMovies", updatedWishlist);
  };

  // 모달 열기
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  // 검색어 변경 시 호출
  const handleSearch = useCallback(async () => {
    try {
      const data = await searchMovies(query, page); // api.js에서 제공하는 searchMovies 함수 호출
      setMovies(data.results); // 검색된 영화 목록 설정
      setTotalPages(data.total_pages); // 전체 페이지 수 설정
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [query, page]);

  // 필터링 처리
  const applyFilters = useCallback(() => {
    let updatedMovies = [...movies];

    // 장르 필터링
    if (filters.genre) {
      updatedMovies = updatedMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(filters.genre))
      );
    }

    // 평점 필터링
    if (filters.rating > 0) {
      updatedMovies = updatedMovies.filter(
        (movie) => movie.vote_average >= filters.rating
      );
    }

    // 정렬
    if (filters.sortBy) {
      updatedMovies.sort((a, b) => {
        if (filters.sortBy === "popularity.desc") {
          return b.popularity - a.popularity;
        } else if (filters.sortBy === "release_date.desc") {
          return new Date(b.release_date) - new Date(a.release_date);
        }
        return 0;
      });
    }

    setFilteredMovies(updatedMovies); // 필터링된 영화 목록 설정
  }, [movies, filters]);

  // 검색어 및 페이지 변경 시 데이터를 새로 불러옴
  useEffect(() => {
    if (query) {
      handleSearch(); // 검색어가 있을 때만 검색 수행
    }
  }, [page, query, handleSearch]);

  // 필터링 적용 시마다 필터링된 목록 갱신
  useEffect(() => {
    applyFilters();
  }, [movies, filters, applyFilters]);

  return (
    <div className="search-page">
      <h1>영화 검색</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className="filters">
        <select
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
        >
          <option value="">장르 선택</option>
          <option value="28">액션</option>
          <option value="35">코미디</option>
          <option value="18">드라마</option>
        </select>
        <select
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">최신순</option>
        </select>
        <input
          type="number"
          placeholder="최소 평점"
          onChange={(e) =>
            setFilters({ ...filters, rating: parseFloat(e.target.value) })
          }
        />
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => openModal(movie)}
          />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      <ScrollToTop />
      {isModalOpen && selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={closeModal}
          handleAddToWishlist={handleAddToWishlist}
          handleRemoveFromWishlist={handleRemoveFromWishlist}
          isFavorite={wishlist.some((item) => item.id === selectedMovie.id)} // 찜 여부 확인
        />
      )}
    </div>
  );
};

export default SearchPage;
