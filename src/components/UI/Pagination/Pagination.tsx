import React from 'react';
import styles from './pagination.module.css';

interface PaginationProps {
  ordersPerPage: number;
  totalOrders: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  ordersPerPage,
  totalOrders,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.nav}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <span
          key={pageNumber}
          className={styles.pageNumber}
          onClick={() => paginate(pageNumber)}
          style={{
            backgroundColor: currentPage === pageNumber ? '#007bff' : '',
            color: currentPage === pageNumber ? '#fff' : '',
          }}
        >
          {pageNumber}
        </span>
      ))}
      <button
        className={styles.nav}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;