import React, { useState } from "react";
import facade from "./apiFacade";
import LogIn, { LoggedIn } from "./LogIn.js";
import Header from "./Header.js";
import Admin from "./Admin.js";
import User from "./User.js";
import AllHotels from "./AllHotels";
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  //const [role, setRole] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true), setError(""))
      .catch((err) => {
        setError("Wrong username or password");
      });
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/hotels">
          <AllHotels/>
        </Route>
        {!loggedIn ? (
          <div>
            <Route path="/login">
              <LogIn login={login} />
            </Route>
          </div>
        ) : (
            <div>
              <div>
                <Route exact path="/">
                  <LoggedIn />
                  <button onClick={logout}>Logout</button>
                </Route>
              </div>
              <div>
                <Route path="/user">
                  {facade.getRole() === "user" ? (
                    <User />
                  ) : (
                      <p>Du er ikke logget ind som user</p>
                    )}
                </Route>
              </div>
              <div>
                <Route path="/admin">
                  {facade.getRole() === "admin" ? (
                    <Admin />
                  ) : (
                      <p>Du er ikke logget ind som admin</p>
                    )}
                </Route>
              </div>
            </div>
          )}
      </Switch>
    </div>
  );
}
export default App;
