import { useState, Fragment } from "react";
import classes from "./Books.module.css";
import Card from "../UI/Card";
import BooksFilter from "./BooksFilter";
import BooksList from "./BooksList";
// import BooksChart from "./BooksChart";

function Books(props) {
  const [yearFilter, setYearFilter] = useState("2020");

  const yearFilterHandler = (selectedYear) => {
    setYearFilter(selectedYear);
    console.log(yearFilter);
  };

  const filteredBooks = props.books.filter((book) => {
    return book.date.getFullYear().toString() === yearFilter;
  });

  return (
    <Fragment>
      <Card className={classes["books"]}>
        <h2>{props.title}</h2>
        <BooksFilter
          yearSelected={yearFilter}
          onYearFilter={yearFilterHandler}
        />
        <BooksList items={filteredBooks} />
        {/* <BooksChart books={filteredBooks} /> */}
      </Card>
    </Fragment>
  );
}

export default Books;
