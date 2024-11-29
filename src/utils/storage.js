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
