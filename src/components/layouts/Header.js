import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cleanAuth } from "../../redux/slice/authSlice";
import { cleanUser } from "../../redux/slice/userSlice";

const Header = () => {
  const authData = useSelector((state) => state.auth);
  let resultUI = null;
  const dispatch = useDispatch();

  const logout = () => {
    // Todo call api logout
    dispatch(cleanAuth());
    dispatch(cleanUser());
    localStorage.setItem('token', null);
  };
  
  if (authData.token != null) {
    resultUI = (
      <ul>
        <li>
          <Link to="/user">Profile</Link>
        </li>
        <li>
          <Link to="/author">Author</Link>
        </li>
        <li>
          <Link to="/book-info">BookInfo</Link>
        </li>
        <li>
          <Link to="/library">Library</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/book-give">Book give</Link>
        </li>
        <li>
          <Link to="/" onClick={() => logout()}>
            Logout
          </Link>
        </li>
      </ul>
    );
  } else {
    resultUI = (
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
    );
  }
  return (
    <div className="conatainer">
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>Xuvi book</div>
        </Link>
        <nav>{resultUI}</nav>
      </header>
    </div>
  );
};

export default Header;
