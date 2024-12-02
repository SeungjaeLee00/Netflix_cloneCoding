import axios from "axios";

// TMDB API 기본 설정
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // 환경 변수에서 API 키 읽기
// const BEARER_TOKEN = process.env.REACT_APP_TMDB_BEARER_TOKEN;

// Authorization 토큰 (여기서는 직접 지정하였으므로, 실제 프로젝트에서는 안전하게 환경 변수로 관리해야 합니다)
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzg4OTIxODdhZmJmNWEzNjNjYzg1YzM5M2Q0M2MyMCIsIm5iZiI6MTczMjkzODMxOS40MDcsInN1YiI6IjY3NGE4YTRmZjA0M2JjOGE2NzcxOWEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PQtS6H2n9dICF_DBnMaqJd0Zkfa7rQdeAEHZtmqkbDM";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US", // 기본 언어 설정
  },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`, // Authorization 헤더 추가
  },
});

// 인기 영화 가져오기
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/popular", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// 영화 검색
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

// 특정 영화 정보 가져오기
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// 장르 목록 가져오기
export const getGenres = async () => {
  try {
    const response = await api.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// 추천 영화 가져오기
export const getRecommendedMovies = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    throw error;
  }
};

export default api;
