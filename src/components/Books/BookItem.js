import BookDate from "./BookDate";
import Card from '../UI/Card'
import classes from "./BookItem.module.css";
function BookItem(props) {
  return (
    <li>
      <Card className={classes["book-item"]}>
        <BookDate date={props.date} />
        <div className={classes["book-item__description"]}>
          <h2>{props.title}</h2>
          <div className={classes["book-item__price"]}>{props.amount} quyển</div>
        </div>
      </Card>
    </li>
  );
}
export default BookItem;
