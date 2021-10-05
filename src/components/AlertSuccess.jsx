import { useEffect, useState } from "react";
import { useAlert } from "../hooks/useAlert";

const AlertSuccess = ({ message }) => {
  const [isHidden, Hide] = useState(false);
  const { showAlert, setShowAlert } = useAlert();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert((prevState) => ({
        ...prevState,
        status: "",
        whatWasAddedToCart: ""
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [isHidden, setShowAlert]);

  useEffect(() => {
    const timer = setTimeout(() => Hide(true), 2000);

    return () => clearTimeout(timer);
  });
  return (
    <div className="alert-wrapper">
      <div className={`alert-content alert-success ${isHidden ? "exit" : ""}`}>
        <p className="alert-message" style={{ textTransform: "capitalize" }}>
          {`${showAlert.whatWasAddedToCart} ${message}`}
          <i
            className="fas fa-check-circle"
            style={{ marginLeft: "0.5rem" }}
          ></i>
        </p>
        <span
          className="btn-dismiss"
          id="btn-danger-close"
          onClick={() => {
            Hide(true);
          }}
        >
          &times;
        </span>
      </div>
    </div>
  );
};

export { AlertSuccess };
