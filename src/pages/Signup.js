import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userSignUpDetails, setUserSignUpDetails] = useState({});
  const navigate = useNavigate();

  const signupUser = async () => {
    try {
      const response = await axios.post(
        `https://fruitBasketWithMongo2.prajwaljain.repl.co/user/signup`,
        {
          username: userSignUpDetails.username,
          password: userSignUpDetails.password
        }
      );
      navigate("/login");
    } catch (err) {
      console.log("something is wrong..!", err);
    }
  };
  const SignUpHandler = (e) => {
    e.preventDefault();
    signupUser();
  };

  return (
    <>
      <form onSubmit={(e) => SignUpHandler(e)} className="form">
        <div className="form-container">
          <div className="form-title header header-secondary text-center">
            sign up
          </div>
          <div className="form-row">
            <input
              type="text"
              className="input input-email"
              id="username"
              onChange={(event) =>
                setUserSignUpDetails((prevState) => ({
                  ...prevState,
                  username: event.target.value
                }))
              }
              required
            />
            <label htmlFor="username" className="label-name">
              <span className="content-name">username</span>
            </label>
          </div>
          <div className="form-row">
             
            <input
              type="password"
              className="input input-password"
              id="password"
              onChange={(event) =>
                setUserSignUpDetails((prevState) => ({
                  ...prevState,
                  password: event.target.value
                }))
              }
              required
            />
             
            <label htmlFor="password" className="label-name">
               <span className="content-name">password</span>
            </label>
          </div>
          <button className="btn btn-primary btn-input"> sign up</button>
        </div>
      </form>
      <Link to="/login">
        <div>
          Already have an account?
          <button className="btn btn-primary">Login</button>
        </div>
      </Link>
    </>
  );
};

export { Signup };
