import React from 'react';

import classes from './BooksFilter.module.css';

const BooksFilter = (props) => {
  const dropBoxChangeHandler = (event) => {
    props.onYearFilter(event.target.value)
  }
  return (
    <div className={classes['books-filter']}>
      <div className={classes['books-filter__control']}>
        <label>Filter by year</label>
        <select value={props.yearSelected} onChange={dropBoxChangeHandler}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default BooksFilter;