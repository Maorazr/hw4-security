import React, { useState } from "react";
import classes from "./Paginate.module.css";

const Page = (props) => {
  return (
    <div className={classes.paginate}>
      <ul className={classes.paginate}>
        <li className={classes.paginate}>
          <a
            onClick={() => props.handlePageClick(1)}
            href="#"
            className={classes.paginate}
          >
            {"<<"}
          </a>
        </li>
        {props.pageNumbers.slice(props.start - 1, props.end).map((number) => (
          <li key={number} className={classes.paginate}>
            <a
              onClick={() => props.handlePageClick(number)}
              href="#"
              className={`${classes.paginate} ${
                number === props.currentPage ? classes.current : ""
              }`}
            >
              {number}
            </a>
          </li>
        ))}
        <li className={classes.paginate}>
          <a
            onClick={() => props.handlePageClick(props.totalPages)}
            href="#"
            className={classes.paginate}
          >
            {">>"}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Page;
