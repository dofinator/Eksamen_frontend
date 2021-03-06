import { URL } from "./settings.js";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;

    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const getRole = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let role = decodedJwtData.roles;
    console.log(role);

    return role;
  };

  const getUserName = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let username = decodedJwtData.username;
    console.log(username);

    return username;
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token

    let role = getRole();

    return fetch(URL + "/api/users/" + role, options).then(handleHttpErrors);
  };

  const fetchHotels = () => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/users/hotels", options).then(handleHttpErrors);
  };

  const fetchHotel = (id) => {
    const options = makeOptions("GET");
    return fetch(URL + "/api/users/hotel/" + id, options).then(handleHttpErrors);
  };

  const bookHotel = (booking, id) => {
    const options = makeOptions("PUT",true, booking);
    return fetch(URL + "/api/users/bookhotel/" + id, options).then(handleHttpErrors);
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    bookHotel,
    getUserName,
    fetchHotel,
    fetchHotels,
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getRole
  };
}

const facade = apiFacade();
export default facade;
