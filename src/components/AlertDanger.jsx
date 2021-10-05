import { useEffect, useState } from "react";
import { useAlert } from "../hooks/useAlert";

const AlertDanger = ({ message }) => {
  const [isHidden, Hide] = useState(false);
  const { showAlert, setShowAlert } = useAlert();
  useEffect(() => {
    console.log("set showAlert changed");
    const timer = setTimeout(() => {
      Hide(true);
      setShowAlert((prevState) => ({
        ...prevState,
        status: "",
        whatWasRemovedFromCart: ""
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [Hide, setShowAlert]);

  return (
    <div className="alert-wrapper">
      <div className={`alert-content alert-danger ${isHidden ? "exit" : ""}`}>
        <p className="alert-message" style={{ textTransform: "capitalize" }}>
          {`${showAlert.whatWasRemovedFromCart} ${message}`}
          <i
            className="fas fa-check-circle"
            style={{ marginLeft: "0.5rem" }}
          ></i>
        </p>
        <span
          className="btn-dismiss"
          id="btn-danger-close"
          onClick={() => Hide(true)}
        >
          &times;
        </span>
      </div>
    </div>
  );
};

export { AlertDanger };
