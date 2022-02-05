import BookItem from "./BookItem";
import "./BooksList.css";

const BooksList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="books-list__fallback">Không tìm thấy sách.</h2>;
  }

  return (
    <ul className="books-list">
      {props.items.map((book) => (
        <BookItem
          key={book.id}
          title={book.title}
          amount={book.amount}
          date={book.date}
        />
      ))}
    </ul>
  );
};

export default BooksList;
