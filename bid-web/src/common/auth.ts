import { CREDENTIALS_STORE_KEY } from "./confing";

const key = CREDENTIALS_STORE_KEY || "bid-web-credentials";

const addAuthToHeader = () => {
    const default_value = JSON.stringify({ username: "", password: "" });
    const credentials = JSON.parse(localStorage.getItem(key) || default_value);

    console.log(credentials);
    const res = {
        authorization: `Basic ${credentials.username}-${credentials.password}`,
    };

    return res;
};

const getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem(key) || "{}");
};

const removeUserFromStorage = () => {
  return localStorage.removeItem(key)
}

export { addAuthToHeader, getUserFromStorage, removeUserFromStorage };
