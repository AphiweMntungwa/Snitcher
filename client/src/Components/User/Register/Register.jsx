import React, { useRef } from "react";
// import "./register.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { showNext } from "../../../app/Redux/Auth/showActions";
// import "../../../styles/Auth/Auth.css";

const Register = ({locSt}) => {
  // const show = useSelector((state) => state.auth.show);
  const dispatch = useDispatch();
  const input1 = useRef(null);
  const input2 = useRef(null);

  const handleAuth = () => {
    function inp(n) {
      return n.current.value;
    }
    if (inp(input1) && inp(input2)) {
      dispatch(showNext("final"));
    }
    locSt('firstName', `${inp(input1)}`)
    locSt('lastName', `${inp(input2)}`)
  };

  return (
    <div className="registry">
      <form>
        <h1
          className="login-header"
          style={{ textAlign: "center", paddingBottom: "8px" }}
        >
          Create New Account.
        </h1>

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          id="firstName"
          placeholder="first name"
          ref={input1}
          required
          defaultValue={locSt('firstName')}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          id="lastName"
          placeholder="last name"
          ref={input2}
          defaultValue={locSt('lastName')}
          required
        />
        <Button variant="outline-primary" onClick={handleAuth}>
          Next
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => dispatch(showNext(false))}
        >
          Back &#8592;
        </Button>
      </form>
    </div>
  );
};
export default Register;
