import './BookDate.css'

function BookDate(props) {
  const day = props.date.toLocaleString("vi-VN", { day: "2-digit" });
  const month = props.date.toLocaleString("vi-VN", { month: "long" });
  const year = props.date.getFullYear();
  return (
    <div className='book-date'>
      <div className='book-date__day'>{day}</div>
      <div className='book-date__month'>{month}</div>
      <div className='book-date__year'>{year}</div>
    </div>
  );
}
export default BookDate;
