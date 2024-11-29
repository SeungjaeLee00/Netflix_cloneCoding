import React, { useState, useEffect } from "react";
import "../styles/components/ScrollToTop.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 감지
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-button">
          ▲ Top
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
