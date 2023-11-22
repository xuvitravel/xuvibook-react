import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submit_handler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    //add validation
    fetch(
      "http://127.0.0.1:8000/api",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //assumption: Always succeds!
      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submit_handler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
