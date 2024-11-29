import React from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage";
import MovieCard from "../components/MovieCard";
import "../styles/pages/WishListPage.css";

const WishlistPage = () => {
  const [wishlist, setWishlist] = React.useState([]);

  // 찜한 영화 가져오기
  React.useEffect(() => {
    const storedWishlist = getFromLocalStorage("wishlist") || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (movie) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== movie.id);
    setWishlist(updatedWishlist);
    saveToLocalStorage("wishlist", updatedWishlist);
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
              onClick={() => handleRemoveFromWishlist(movie)}
            />
          ))}
        </div>
      ) : (
        <p>찜한 영화가 없습니다.</p>
      )}
    </div>
  );
};

export default WishlistPage;
