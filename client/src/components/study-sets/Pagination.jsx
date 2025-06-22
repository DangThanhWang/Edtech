// client/src/components/study-sets/Pagination.jsx
import React from 'react';

const Pagination = ({ pagination, onPageChange, isLoading = false }) => {
  const { current, pages, total } = pagination;

  if (pages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, current - Math.floor(maxVisible / 2));
    let endPage = Math.min(pages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="pagination__page"
          disabled={isLoading}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className="pagination__ellipsis">...</span>);
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination__page ${i === current ? 'pagination__page--current' : ''}`}
          disabled={isLoading}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < pages) {
      if (endPage < pages - 1) {
        pageNumbers.push(<span key="ellipsis2" className="pagination__ellipsis">...</span>);
      }
      pageNumbers.push(
        <button
          key={pages}
          onClick={() => onPageChange(pages)}
          className="pagination__page"
          disabled={isLoading}
        >
          {pages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <div className="pagination__info">
        Hiển thị {Math.min((current - 1) * 12 + 1, total)} - {Math.min(current * 12, total)} của {total} học phần
      </div>
      
      <div className="pagination__controls">
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current <= 1 || isLoading}
          className="pagination__prev"
        >
          ← Trước
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current >= pages || isLoading}
          className="pagination__next"
        >
          Sau →
        </button>
      </div>
    </div>
  );
};

export default Pagination;