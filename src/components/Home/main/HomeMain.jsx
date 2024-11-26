import React, { useEffect, useState } from "react";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../../../views/home-main/Banner";
import MovieRow from "../../../views/home-main/MovieRow";
import URLService from "../../../utils/movie/URL";

const HomeMain = () => {
  const [apiKey] = useState(localStorage.getItem("TMDb-Key") || "");
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMoviesUrl, setPopularMoviesUrl] = useState("");
  const [newReleasesUrl, setNewReleasesUrl] = useState("");
  const [actionMoviesUrl, setActionMoviesUrl] = useState("");

  useEffect(() => {
    const urlService = new URLService();
    setPopularMoviesUrl(urlService.getURL4PopularMovies(apiKey));
    setNewReleasesUrl(urlService.getURL4ReleaseMovies(apiKey));
    setActionMoviesUrl(urlService.getURL4GenreMovies(apiKey, "28"));

    const loadFeaturedMovie = async () => {
      const movie = await urlService.fetchFeaturedMovie(apiKey);
      setFeaturedMovie(movie);
    };

    loadFeaturedMovie();

    const handleScroll = () => {
      const header = document.querySelector(".app-header");
      if (window.scrollY > 50) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [apiKey]);

  return (
    <div className="home">
      <Banner movie={featuredMovie} />
      <MovieRow title="인기 영화" fetchUrl={popularMoviesUrl} />
      <MovieRow title="최신 영화" fetchUrl={newReleasesUrl} />
      <MovieRow title="액션 영화" fetchUrl={actionMoviesUrl} />
    </div>
  );
};

export default HomeMain;
