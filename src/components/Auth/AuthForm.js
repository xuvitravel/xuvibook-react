import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  const email_input_ref = useRef();
  const password_input_ref = useRef();
  const name_input_ref = useRef();
  const password_confirmation_input_ref = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const login_submit_handler = (event) => {
    event.preventDefault();

    const entered_email = email_input_ref.current.value;
    const entered_password = password_input_ref.current.value;
    //Optional: Add validation
    setIsLoading(true);
    let url;

    if (isLogin) {
      url = "http://127.0.0.1:8000/api";
    } else {
      url = "http://127.0.0.1:8000/api/register";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: entered_email,
        password: entered_password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // Show an error modal
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace("/book");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const register_submit_handler = (event) => {
    event.preventDefault();

    const entered_email = email_input_ref.current.value;
    const entered_password = password_input_ref.current.value;
    const entered_name = name_input_ref.current.value;
    const entered_password_confirmation = password_input_ref.current.value;
    //Optional: Add validation
    setIsLoading(true);
    let url;

    url = "http://127.0.0.1:8000/api/register";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: entered_name,
        email: entered_email,
        password: entered_password,
        password_confirmation: entered_password_confirmation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // Show an error modal
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        //improve: Throw a ssucces message
        if (data.success) {
          switchAuthModeHandler();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {isLogin && (
        <form onSubmit={login_submit_handler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={email_input_ref} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={password_input_ref}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>{"Login"}</button>}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {"Create new account"}
            </button>
          </div>
        </form>
      )}
      {!isLogin && (
        <form onSubmit={register_submit_handler}>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="name"
              id="name"
              required
              ref={name_input_ref}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={email_input_ref} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={password_input_ref}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password_confirmation">Your Password Confirmation</label>
            <input
              type="password_confirmation"
              id="password_confirmation"
              required
              ref={password_confirmation_input_ref}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>{"Register"}</button>}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {"Create new account"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AuthForm;
