import React from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";
import MovieCard from "../components/MovieCard";
import Modal from "../components/Modal";
import "../styles/pages/WishListPage.css";

const WishlistPage = () => {
  const [wishlist, setWishlist] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false); // 모달을 띄울지 여부
  const [selectedMovie, setSelectedMovie] = React.useState(null); // 선택된 영화

  // 찜한 영화 목록을 localStorage에서 가져오기
  React.useEffect(() => {
    const storedWishlist = getFromLocalStorage("favoriteMovies") || []; // localStorage에서 찜 목록 가져오기
    setWishlist(storedWishlist);
  }, []);

  // 찜 목록에서 영화 삭제
  const handleRemoveFromWishlist = (movie) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== movie.id); // 삭제할 영화 제외한 목록
    setWishlist(updatedWishlist); // 상태 업데이트
    saveToLocalStorage("favoriteMovies", updatedWishlist); // localStorage에 찜 목록 저장
  };

  // 영화 클릭 시 모달 띄우기
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null); // 선택된 영화 초기화
  };

  // 찜 취소
  const handleFavoriteAction = (movie) => {
    handleRemoveFromWishlist(movie); // 찜 목록에서 영화 제거
    closeModal(); // 모달 닫기
  };

  return (
    <div className="wishlist-page">
      <h1>찜한 콘텐츠</h1>
      {wishlist.length > 0 ? (
        <div className="movie-list">
          {wishlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => openModal(movie)}
            />
          ))}
        </div>
      ) : (
        <p>찜한 영화가 없습니다.</p>
      )}

      {showModal && selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={closeModal}
          handleAddToWishlist={() => {}}
          handleRemoveFromWishlist={handleFavoriteAction} // 찜 취소 함수 전달
          isFavorite={true} // 찜 상태는 항상 true로 설정 (찜한 상태)
        />
      )}
    </div>
  );
};

export default WishlistPage;
