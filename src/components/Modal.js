import React from "react";
import "../styles/components/Modal.css";
import "font-awesome/css/font-awesome.min.css";

const Modal = ({
  movie,
  onClose,
  handleAddToWishlist,
  handleRemoveFromWishlist,
  isFavorite, // 영화가 찜 목록에 있는지 여부
}) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    if (isFavorite) {
      // 찜 해제 시 alert 표시
      if (
        window.confirm(
          `정말 "${movie.title}"을(를) 찜 목록에서 삭제하시겠습니까?`
        )
      ) {
        handleRemoveFromWishlist(movie); // 찜 해제
      }
    } else {
      handleAddToWishlist(movie); // 찜 추가
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Overview:</strong>
          <span>{movie.overview || "No description available."}</span>
        </p>

        <div className="modal-buttons">
          <button
            className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
            onClick={handleFavoriteClick}
          >
            <i className={`fa ${isFavorite ? "fa-heart" : "fa-heart-o"}`} />
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
