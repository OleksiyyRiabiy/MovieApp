import React from "react";

import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalMovies / props.moviesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.PagNav}>
      <ul className={styles.Pagination}>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              props.currentPage === pageNumber
                ? styles.ActivePageItem
                : styles.PageItem
            }
            onClick={() => props.onPaginate(pageNumber)}
          >
            <p
              className={
                props.currentPage === pageNumber
                  ? styles.ActivePageLink
                  : styles.PageLink
              }
            >
              {pageNumber}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
