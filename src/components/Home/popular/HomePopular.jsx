import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import MovieGrid from "../../../views/views/MovieGrid";
import MovieInfiniteScroll from "../../../views/views/MovieInfiniteScroll";
import URLService from "../../../util/movie/URL";

const HomePopular = () => {
  const [currentView, setCurrentView] = useState("grid"); // 현재 뷰 상태 (grid or list)
  const [apiKey, setApiKey] = useState(localStorage.getItem("TMDb-Key") || "");

  // 컴포넌트가 마운트될 때 스크롤 비활성화
  useEffect(() => {
    disableScroll();
    return () => {
      enableScroll(); // 언마운트될 때 스크롤 복구
    };
  }, []);

  const setView = (view) => {
    setCurrentView(view);
    if (view === "grid") {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  const getFetchURL = () => {
    return URLService.getURL4PopularMovies(apiKey);
  };

  return (
    <div className="popular-container">
      <div className="view-toggle">
        <button
          onClick={() => setView("grid")}
          className={currentView === "grid" ? "active" : ""}
        >
          <FontAwesomeIcon icon={faTh} />
        </button>
        <button
          onClick={() => setView("list")}
          className={currentView === "list" ? "active" : ""}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {currentView === "grid" && (
        <MovieGrid title="인기 영화" fetchUrl={getFetchURL()} />
      )}

      {currentView === "list" && (
        <MovieInfiniteScroll
          apiKey={apiKey}
          genreCode="28"
          sortingOrder="all"
          voteAverage={-1}
        />
      )}
    </div>
  );
};

export default HomePopular;
