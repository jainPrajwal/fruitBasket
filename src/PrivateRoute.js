import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
  const login = JSON.parse(localStorage.getItem("user"));
  if (login) {
    return <Route {...props} path={path} />;
  } else {
    return <Navigate replace to="/login" state={{ from: path }} />;
  }
};
