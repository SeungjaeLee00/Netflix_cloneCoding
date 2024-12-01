// Local Storage 저장
export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Local Storage에서 데이터 가져오기
export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// Local Storage에서 데이터 삭제
export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const initializeUserStorage = () => {
  if (!getFromLocalStorage("users")) {
    saveToLocalStorage("users", []);
  }
};

// 사용자 선호 영화 저장
export const saveUserPreferences = (preferences) => {
  let currentPreferences = getFromLocalStorage("userPreferences") || [];
  currentPreferences.push(preferences);
  saveToLocalStorage("userPreferences", currentPreferences);
};

// 최근 검색어 저장
export const saveRecentSearch = (searchTerm) => {
  let recentSearches = getFromLocalStorage("recentSearches") || [];
  // 검색어 중복 방지
  if (!recentSearches.includes(searchTerm)) {
    recentSearches.push(searchTerm);
    // 최대 5개의 최근 검색어만 저장
    if (recentSearches.length > 5) {
      recentSearches.shift(); // 첫 번째 검색어 제거
    }
    saveToLocalStorage("recentSearches", recentSearches);
  }
};

// 즐겨찾기한 영화 목록 저장
export const saveFavoriteMovies = (movie) => {
  let favoriteMovies = getFromLocalStorage("favoriteMovies") || [];
  // 중복 방지
  if (!favoriteMovies.some((fav) => fav.id === movie.id)) {
    favoriteMovies.push(movie);
    saveToLocalStorage("favoriteMovies", favoriteMovies);
  }
};
