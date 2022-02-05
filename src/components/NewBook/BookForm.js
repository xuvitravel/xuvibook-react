import { useState } from "react";
import "./BookForm.css";

const BookForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const bookData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };
    props.onSaveBookData(bookData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-book__controls">
        <div className="new-book__control">
          <label>Tiêu đề</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-book__control">
          <label>Số lượng</label>
          <input
            type="number"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-book__control">
          <label>Ngày</label>
          <input type="date" value={enteredDate} onChange={dateChangeHandler} />
        </div>
      </div>
      <div className="new-book__actions">
        <button type="button" onClick={props.onCancel}>
          Hủy
        </button>
        <button type="submit">
          Thêm sách
        </button>
      </div>
    </form>
  );
};

export default BookForm;
