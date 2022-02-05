import BookDate from "./BookDate";
import Card from '../UI/Card'
import "./BookItem.css";
function BookItem(props) {
  return (
    <li>
      <Card className="book-item">
        <BookDate date={props.date} />
        <div className="book-item__description">
          <h2>{props.title}</h2>
          <div className="book-item__price">{props.amount} quyển</div>
        </div>
      </Card>
    </li>
  );
}
export default BookItem;
