import { Link } from "react-router-dom";
import classes from "./Post.module.css";
// const name = ["Xuvi", "Book", "React"];

function Post({ id, author, body }) {
  //   const chosenName = name[Math.floor(Math.random() * name.length)];
  return (
    <li className={classes.post}>
      <Link to={id}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
    </li>
  );
}

export default Post;
