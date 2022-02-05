import { useState } from "react";
import "./Books.css";
import Card from "../UI/Card";
import BooksFilter from "./BooksFilter";
import BooksList from "./BooksList";
import BooksChart from "./BooksChart";

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
    <div>
      <Card className="books">
        <h2>{props.title}</h2>
        <BooksFilter
          yearSelected={yearFilter}
          onYearFilter={yearFilterHandler}
        />
        <BooksList items={filteredBooks} />
        <BooksChart books={filteredBooks} />
      </Card>
    </div>
  );
}

export default Books;
