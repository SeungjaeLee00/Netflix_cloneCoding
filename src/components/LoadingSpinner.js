import React from "react";
import "../styles/components/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>로딩 중입니다...</p>
    </div>
  );
};

export default LoadingSpinner;
