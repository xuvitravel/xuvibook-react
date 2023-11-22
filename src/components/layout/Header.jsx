import { Link } from "react-router-dom";
import { MdPostAdd, MdMenuBook, MdLogin } from "react-icons/md";

import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMenuBook />
        XuVi Book
      </h1>
      <p>
        <Link to="/create-post" className={classes.button}>
          <MdPostAdd size={18} />
          New Post
        </Link>
      </p>
      <ul>
      <li>
        <Link to="/user">Profile</Link>
      </li>
      <li>
        <Link to="/author">Author</Link>
      </li>
      <li>
        <Link to="/book-info">Book Info</Link>
      </li>
      </ul>
      <p>
        <Link to="/login" className={classes.button}>
          <MdLogin size={18} />
          Login
        </Link>
      </p>
    </header>
  );
}

export default Header;
