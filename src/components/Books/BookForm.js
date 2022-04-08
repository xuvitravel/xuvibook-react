import { useRef } from "react/cjs/react.production.min";
import classes from "./BookForm.module.css";

const BookForm = (props) => {
  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const submit_handler = (event) => {
    event.preventDefault();

    const bookData = {
      title: titleInputRef.current.value,
      amount: +amountInputRef.current.value,
      date: new Date(dateInputRef.current.value),
    };
    props.onSaveBookData(bookData);
    titleInputRef.current.value = "";
    amountInputRef.current.value = "";
    dateInputRef.current.value = "";
  };

  return (
    <form onSubmit={submit_handler}>
      <div className={classes["new-book__controls"]}>
        <div className={classes["new-book__control"]}>
          <label>Tiêu đề</label>
          <input type="text" ref={titleInputRef} />
        </div>
        <div className={classes["new-book__control"]}>
          <label>Số lượng</label>
          <input type="number" ref={amountInputRef} />
        </div>
        <div className={classes["new-book__control"]}>
          <label>Ngày</label>
          <input type="date" ref={dateInputRef} />
        </div>
      </div>
      <div className={classes["new-book__actions"]}>
        <button type="button" onClick={props.onCancel}>
          Hủy
        </button>
        <button type="submit">Thêm sách</button>
      </div>
    </form>
  );
};

export default BookForm;
