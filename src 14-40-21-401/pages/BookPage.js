import { useState } from "react";
import Books from "../components/Books/Books";
import NewBook from "../components/Books/NewBook";
const BOOKSBORROWED = [
  {
    id: "b1",
    title: "Con đường hồi giáo",
    amount: "2",
    date: new Date(2020, 2, 1),
  },
  {
    id: "b2",
    title: "Thép đã tôi thế đấy",
    amount: "1",
    date: new Date(2022, 2, 1),
  },
  {
    id: "b3",
    title: "Cuộc sống của tôi rất buồn cười",
    amount: "2",
    date: new Date(2022, 2, 1),
  },
  {
    id: "b4",
    title: "Tôi yêu em",
    amount: "2",
    date: new Date(2022, 2, 1),
  },
];
const BOOKSLENT = [
  {
    id: "b2",
    title: "Thép đã tôi thế đấy",
    amount: "1",
    date: new Date(2020, 2, 1),
  },
  {
    id: "b3",
    title: "Cuộc sống của tôi rất buồn cười",
    amount: "2",
    date: new Date(2022, 2, 1),
  },
  {
    id: "b4",
    title: "Tôi yêu em",
    amount: "2",
    date: new Date(2022, 2, 1),
  },
];
const BOOKSINLIB = [
  {
    id: "b3",
    title: "Cuộc sống của tôi rất buồn cười",
    amount: "2",
    date: new Date(2020, 2, 1),
  },
  {
    id: "b4",
    title: "Tôi yêu em",
    amount: "2",
    date: new Date(2022, 2, 1),
  },
];

function BookPage() {
  const [booksBorrowed, setBooksBorrowed] = useState(BOOKSBORROWED);
  const [booksLent, setBooksLent] = useState(BOOKSLENT);
  const [booksInLib, setBooksInLib] = useState(BOOKSINLIB);

  const addBookInLibHandler = (book) => {
    setBooksInLib((prevState) => {
      return [book, ...prevState]
    })
  };
  return (
    <div>
      <NewBook onAddBook={addBookInLibHandler} />
      <Books title="Sách đang mượn" books={booksBorrowed} />
      <Books title="Sách đã cho mượn" books={booksLent} />
      <Books title="Sách còn trong thư viện" books={booksInLib} />
    </div>
  );
}

export default BookPage;
