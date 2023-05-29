import React, { useState } from "react";
import classes from "./Paginate.module.css";
import Page from "./Page";

const Paginate = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
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

// this is the old jsx code that was in the Paginate.jsx file before I changed it to the above code
// and moved it to the Page.jsx file

// <div className={classes.paginate}>
//   <ul className={classes.paginate}>
//     {pageNumbers.slice(start - 1, end).map((number) => (
//       <li key={number} className={classes.paginate}>
//         <a
//           onClick={() => handlePageClick(number)}
//           href="#"
//           className={`${classes.paginate} ${
//             number === currentPage ? classes.current : ""
//           }`}
//         >
//           {number}
//         </a>
//       </li>
//     ))}
//   </ul>
// </div>
