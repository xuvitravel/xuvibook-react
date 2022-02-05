import { useState } from "react";
import BookForm from "./BookForm";

import "./NewBook.css";
const NewBook = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const saveBookDataHandler = (enteredBookData) => {
    const bookData = {
      ...enteredBookData,
      id: Math.random().toString(),
    };
    props.onAddBook(bookData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-book">
      {!isEditing && (
        <button onClick={startEditingHandler}>Thêm sách vào thư viện</button>
      )}
      {isEditing && (
        <BookForm
          onSaveBookData={saveBookDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewBook;
