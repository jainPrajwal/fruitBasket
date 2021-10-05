import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const setupAuthExcpetionHandler = (logout, navigate) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logout();
        navigate("/login");
        console.log("unauthorized aCCESS");
      }
      return Promise.reject(error);
    }
  );
};

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["authorization"] = token);
  }
  delete axios.defaults.headers.common["authorization"];
};
const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const loginUserWithCredentials = async ({ username, password }) => {
    try {
      const response = await axios.post(
        `https://fruitBasketWithMongo2.prajwaljain.repl.co/user/login`,
        { username, password }
      );
      console.log("response from loginUserWithCredentials line 9", response);
      const token = `Bearer ${response.data.token}`;
      setToken(token);
      setupAuthHeaderForServiceCalls(token);
      setLoggedInUser(response.data.user._id);
      navigate("/store");
      localStorage.setItem(
        "user",
        JSON.stringify({ userId: response.data.user._id, token })
      );
    } catch ({ request }) {
      console.log(request.response.success);
      return request.response.success;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
    setToken(null);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setLoggedInUser(user);
      console.log("setLoggedInUser usEffct useAuth");
      setToken(user.token);

      setupAuthHeaderForServiceCalls(user.token);
    }
  }, []);

  useEffect(() => {
    setupAuthExcpetionHandler(logout, navigate);
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginUserWithCredentials, loggedInUser, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
