import React from "react";

const Pagination = ({ page, totalPages, setPage }) => {
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={page === 1}>
        ◀︎
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        ▶︎
      </button>
    </div>
  );
};

export default Pagination;
