import React, { useState } from "react";

const MovieSearch = ({ changeOptions }) => {
  const [originalLanguage, setOriginalLanguage] = useState("all");
  const [translationLanguage, setTranslationLanguage] = useState("평점 (전체)");
  const [sorting, setSorting] = useState("all");

  const handleChange = () => {
    changeOptions({
      originalLanguage,
      translationLanguage,
      sorting,
    });
  };

  return (
    <div>
      {/* Example of selecting genre, sorting, and rating */}
      <select
        value={originalLanguage}
        onChange={(e) => setOriginalLanguage(e.target.value)}
      >
        {/* options for original language */}
        <option value="all">장르 (전체)</option>
        <option value="en">영어</option>
        <option value="ko">한국어</option>
      </select>

      <select
        value={translationLanguage}
        onChange={(e) => setTranslationLanguage(e.target.value)}
      >
        {/* options for age rating */}
        <option value="평점 (전체)">평점 (전체)</option>
        <option value="9~10">9~10</option>
        <option value="8~9">8~9</option>
      </select>

      <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
        {/* options for sorting */}
        <option value="all">언어 (전체)</option>
        <option value="en">영어</option>
        <option value="ko">한국어</option>
      </select>

      <button onClick={handleChange}>변경</button>
    </div>
  );
};

export default MovieSearch;
