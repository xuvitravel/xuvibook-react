import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expires_in) => {},
  logout: () => {},
});

const calculateRemainingTime = (expires_in) => {
  const currentTime = new Date().getTime();
  const adjexpires_in = new Date(expires_in).getTime();

  const remainingDuration = adjexpires_in - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expires_in");

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  // remainingTime = storedExpirationDate;

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_in");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expires_in");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expires_in) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expires_in", expires_in);

    // const remainingTime = calculateRemainingTime(expires_in);

    // logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
