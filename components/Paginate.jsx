import React, { useState, useEffect } from "react";

import Page from "./Page";

const Paginate = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const maxPageNumbers = 10;
  const totalPages = props.totalPages;
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  let start = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let end = Math.min(totalPages, start + maxPageNumbers - 1);
  if (currentPage === totalPages) {
    start = end - maxPageNumbers + 1;
  }

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage]);

  const handlePageClick = (number) => {
    props.paginate(number);
    setCurrentPage(number);
  };
  return (
    <Page
      totalPages={totalPages}
      pageNumbers={pageNumbers}
      currentPage={currentPage}
      handlePageClick={handlePageClick}
      start={start}
      end={end}
    />
  );
};

export default Paginate;
